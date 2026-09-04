import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { MedicationStep } from "@/features/care-card/components/medication-step";
import { useCareStore } from "@/features/children/hooks/use-care-store";

export const Route = createFileRoute("/children/$childId/medications")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Medications — Baby Care Cards" },
      {
        name: "description",
        content:
          "Record the medication instructions you already have so a caregiver can follow them exactly.",
      },
      { property: "og:title", content: "Medications — Baby Care Cards" },
      {
        property: "og:description",
        content: "Organize medication instructions for your child's caregiver.",
      },
    ],
  }),
  component: MedicationsPage,
});

function MedicationsPage() {
  const { childId } = Route.useParams();
  const navigate = useNavigate();
  const { getChild, ready } = useCareStore();
  const child = getChild(childId);

  return (
    <AppShell>
      <Button
        variant="ghost"
        className="mb-4 -ml-2 rounded-xl"
        onClick={() => void navigate({ to: "/care/$childId", params: { childId } })}
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back
      </Button>
      <h1 className="mb-6 font-display text-3xl font-semibold">
        {ready && child ? `${child.name}'s medications` : "Medications"}
      </h1>
      {ready && child ? (
        <MedicationStep childId={childId} />
      ) : (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}
    </AppShell>
  );
}
