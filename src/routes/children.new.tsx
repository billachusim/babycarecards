import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/app-shell";
import { TextField } from "@/components/app/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotoPicker } from "@/features/children/components/photo-picker";
import { useCareStore } from "@/features/children/hooks/use-care-store";
import type { Sex, AgeGroup } from "@/features/children/models";
import { applyParsedDetails } from "@/features/voice/apply-parsed-details";
import { VoiceFillButton } from "@/features/voice/voice-fill-button";
import type { ParsedCareDetails } from "@/features/voice/voice-types";
import { firstError, childSchema } from "@/lib/validation";

export const Route = createFileRoute("/children/new")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Add a child — Baby Care Cards" },
      {
        name: "description",
        content: "Add your child's name and a few basics. Everything except the name is optional.",
      },
      { property: "og:title", content: "Add a child — Baby Care Cards" },
      { property: "og:description", content: "Start a care card in under two minutes." },
    ],
  }),
  component: NewChild,
});

const AGE_GROUPS: AgeGroup[] = ["Newborn", "Infant", "Toddler", "Preschooler", "School age", "Other"];
const SEXES: Sex[] = ["Boy", "Girl", "Prefer not to say"];

function NewChild() {
  const navigate = useNavigate();
  const store = useCareStore();
  const { addChild, children, isPremium } = store;

  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [allergies, setAllergies] = useState("");
  const [sex, setSex] = useState<Sex | "">("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [approximateAge, setApproximateAge] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [error, setError] = useState<string>();

  const applyVoice = (details: ParsedCareDetails) => {
    if (!isPremium && children.length >= 1) {
      void navigate({ to: "/premium" });
      return;
    }
    const childName = details.child.name?.trim();
    if (!childName) return;
    const child = addChild({
      name: childName,
      ageGroup: details.child.ageGroup ?? undefined,
      allergies: details.child.allergies ?? undefined,
      sex: details.child.sex ?? undefined,
      approximateAge: details.child.approximateAge ?? undefined,
      weight: details.child.weight ?? undefined,
    });
    applyParsedDetails(store, child.id, details);
    toast.success(`${child.name}'s card is filled in — please check it over.`);
    void navigate({ to: "/children/$childId/edit", params: { childId: child.id } });
  };

  const submit = () => {
    if (!isPremium && children.length >= 1) {
      void navigate({ to: "/premium" });
      return;
    }
    try {
      childSchema.parse({ name, allergies, weight, approximateAge });
      const child = addChild({
        name: name.trim(),
        ageGroup: ageGroup || undefined,
        allergies: allergies.trim() || undefined,
        sex: sex || undefined,
        dateOfBirth: dateOfBirth || undefined,
        approximateAge: approximateAge.trim() || undefined,
        weight: weight.trim() || undefined,
        photoDataUrl: photo,
      });
      toast.success(`${child.name}'s card created.`);
      void navigate({ to: "/children/$childId/edit", params: { childId: child.id } });
    } catch (err) {
      const message = firstError(err);
      setError(message);
      toast.error(message);
    }
  };

  return (
    <AppShell>
      <Button
        variant="ghost"
        className="mb-4 -ml-2 rounded-xl"
        onClick={() => void navigate({ to: "/" })}
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back
      </Button>

      <h1 className="font-display text-3xl font-semibold">Add Child</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Only the name is required — you can fill in the rest any time.
      </p>

      <div className="mt-6">
        <VoiceFillButton isPremium={isPremium} onConfirm={applyVoice} />
      </div>

      <div className="mt-6 space-y-5 rounded-3xl border border-border bg-card p-5">
        <TextField
          label="Name"
          value={name}
          onChange={(v) => {
            setName(v);
            setError(undefined);
          }}
          placeholder="e.g. Mia"
          error={error}
        />

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <Label className="text-sm font-medium">AgeGroup</Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as AgeGroup)}>
            <SelectTrigger className="h-12 w-full rounded-xl bg-card">
              <SelectValue placeholder="Choose an age group" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUPS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TextField label="Allergies" optional value={allergies} onChange={setAllergies} placeholder="e.g. Peanuts, penicillin" />

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <Label className="text-sm font-medium">Sex</Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
            <SelectTrigger className="h-12 w-full rounded-xl bg-card">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {SEXES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TextField
          label="Date of birth"
          optional
          type="date"
          value={dateOfBirth}
          onChange={setDateOfBirth}
        />
        <TextField
          label="Approximate age"
          optional
          value={approximateAge}
          onChange={setApproximateAge}
          placeholder="e.g. About 4 years"
        />
        <TextField
          label="Weight"
          optional
          value={weight}
          onChange={setWeight}
          placeholder="e.g. 12 kg"
        />

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Photo</Label>
          <PhotoPicker value={photo} onChange={setPhoto} />
        </div>
      </div>

      <Button size="lg" className="mt-6 h-14 w-full rounded-2xl text-base" onClick={submit}>
        Save and continue
      </Button>
    </AppShell>
  );
}
