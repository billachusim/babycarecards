import { useCallback, useEffect, useState } from "react";

import { useBackupAccount } from "@/features/backup/use-backup-account";
import type { CareCard } from "@/features/children/models";

import { buildCareCardUrl, buildSharedCardUrl } from "./care-card-sharing-service";
import {
  getSharedCardToken,
  publishSharedCard,
  revokeSharedCard,
} from "./shared-card.functions";

export interface ShareLinkState {
  /** True while the account state is still unknown. */
  ready: boolean;
  signedIn: boolean;
  token: string | null;
  /** Public link when published, otherwise the device-only card address. */
  url: string;
  publishing: boolean;
  /** Publishes / refreshes the public snapshot and returns its URL. */
  publish: (card: CareCard) => Promise<string>;
  stopSharing: () => Promise<void>;
}

/**
 * Publishing a card stores a snapshot in the owner's account so anyone with the
 * link (WhatsApp, QR, email) can open it on any device. Signed-out owners keep
 * the local-only behaviour.
 */
export function useShareLink(childId: string): ShareLinkState {
  const { ready, user } = useBackupAccount();
  const [token, setToken] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!ready || !user) {
      setToken(null);
      return;
    }
    let active = true;
    void getSharedCardToken({ data: { childId } })
      .then((result) => {
        if (active) setToken(result.token);
      })
      .catch(() => {
        /* link state is optional */
      });
    return () => {
      active = false;
    };
  }, [ready, user, childId]);

  const publish = useCallback(
    async (card: CareCard) => {
      if (!user) throw new Error("Sign in and turn on backup to share a link that works anywhere.");
      setPublishing(true);
      try {
        const result = await publishSharedCard({
          data: { childId, childName: card.child.name, card },
        });
        setToken(result.token);
        return buildSharedCardUrl(result.token);
      } catch {
        throw new Error("We couldn't publish the link just now. Please try again.");
      } finally {
        setPublishing(false);
      }
    },
    [childId, user],
  );

  const stopSharing = useCallback(async () => {
    try {
      await revokeSharedCard({ data: { childId } });
      setToken(null);
    } catch {
      throw new Error("We couldn't stop sharing that link. Please try again.");
    }
  }, [childId]);

  return {
    ready,
    signedIn: Boolean(user),
    token,
    url: token ? buildSharedCardUrl(token) : buildCareCardUrl(childId),
    publishing,
    publish,
    stopSharing,
  };
}
