import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** A published, link-shareable snapshot of a care card. */
export interface SharedCardSnapshot {
  childName: string;
  card: unknown;
  publishedAt: string;
}

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

function makeToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

interface PublishInput {
  childId: string;
  childName: string;
  card: unknown;
}

const validatePublish = (input: unknown): PublishInput => {
  const raw = (input ?? {}) as Record<string, unknown>;
  const childId = typeof raw["childId"] === "string" ? raw["childId"] : "";
  if (!childId) throw new Error("We couldn't work out which child to share.");
  return {
    childId,
    childName: typeof raw["childName"] === "string" && raw["childName"] ? raw["childName"] : "Child",
    card: raw["card"] ?? null,
  };
};

/** Publishes (or refreshes) the public link for one of the caller's children. */
export const publishSharedCard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validatePublish)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const existing = await supabase
      .from("shared_cards")
      .select("token")
      .eq("user_id", userId)
      .eq("child_id", data.childId)
      .maybeSingle();
    if (existing.error) throw new Error(existing.error.message);

    const token = existing.data?.token ?? makeToken();
    const { error } = await supabase.from("shared_cards").upsert(
      {
        token,
        user_id: userId,
        child_id: data.childId,
        child_name: data.childName,
        snapshot: data.card as never,
        revoked: false,
        updated_at: new Date().toISOString(),
      } as never,
      { onConflict: "token" },
    );
    if (error) throw new Error(error.message);
    return { token };
  });

/** Returns the existing link token for a child, if one has been published. */
export const getSharedCardToken = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ({
    childId: String((input as Record<string, unknown>)?.["childId"] ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("shared_cards")
      .select("token, revoked")
      .eq("user_id", userId)
      .eq("child_id", data.childId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row || row.revoked) return { token: null as string | null };
    return { token: row.token as string };
  });

/** Turns off the public link for a child without touching any stored data. */
export const revokeSharedCard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ({
    childId: String((input as Record<string, unknown>)?.["childId"] ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("shared_cards")
      .update({ revoked: true } as never)
      .eq("user_id", userId)
      .eq("child_id", data.childId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Public read of a shared card by its unguessable token. Uses admin access so
 * the table itself stays closed to anonymous reads (no enumeration possible).
 */
export const readSharedCard = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ({
    token: String((input as Record<string, unknown>)?.["token"] ?? ""),
  }))
  .handler(async ({ data }) => {
    if (!/^[a-z0-9]{8,64}$/.test(data.token)) return { card: null };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("shared_cards")
      .select("child_name, snapshot, revoked, updated_at")
      .eq("token", data.token)
      .maybeSingle();
    if (error) throw new Error("We couldn't load that care card. Please try again.");
    if (!row || row.revoked) return { card: null };
    return {
      card: {
        childName: row.child_name as string,
        card: row.snapshot,
        publishedAt: row.updated_at as string,
      } satisfies SharedCardSnapshot,
    };
  });
