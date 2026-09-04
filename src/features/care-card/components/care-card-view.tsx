import { MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ChildAvatar } from "@/features/children/components/child-avatar";
import type { CareCard } from "@/features/children/models";
import { MEDICATION_DISCLAIMER } from "./medication-step";

const has = (value?: string) => Boolean(value && value.trim().length > 0);

function Section({
  title,
  children,
  emphasis,
}: {
  title: string;
  children: ReactNode;
  emphasis?: boolean | undefined;
}) {
  return (
    <section
      className={`print-block rounded-3xl border p-6 ${
        emphasis ? "border-destructive/35 bg-destructive/5" : "border-border bg-card"
      }`}
    >
      <h2
        className={`font-display text-xs font-semibold tracking-[0.18em] uppercase ${
          emphasis ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string | undefined }) {
  if (!has(value)) return null;
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 text-lg leading-snug whitespace-pre-wrap">{value}</dd>
    </div>
  );
}

export function CareCardView({ card }: { card: CareCard }) {
  const { child, feedings, routine, medications, emergency, pediatrician } = card;

  const aboutRows = [
    { label: "Sex", value: child.sex },
    { label: "Age", value: child.approximateAge },
    { label: "Date of birth", value: child.dateOfBirth },
    { label: "Weight", value: child.weight },
    { label: "Personality", value: child.personality },
  ].filter((r) => has(r.value));

  const routineRows = [
    { label: "Outdoor / walk time", value: routine?.outdoorTime },
    { label: "Playtime", value: routine?.playtime },
    { label: "Sleep", value: routine?.sleepRoutine },
    { label: "Diapering", value: routine?.diaperingRoutine },
    { label: "Soothing", value: routine?.soothingInstructions },
    { label: "Screen time", value: routine?.screenTimeNotes },
    { label: "Other", value: routine?.other },
  ].filter((r) => has(r.value));

  const emergencyRows = [
    { label: "Primary contact", value: emergency?.primaryName },
    { label: "Primary phone", value: emergency?.primaryPhone },
    { label: "Secondary contact", value: emergency?.secondaryName },
    { label: "Secondary phone", value: emergency?.secondaryPhone },
  ].filter((r) => has(r.value));

  const vetRows = [
    { label: "Pediatrician", value: pediatrician?.doctorName },
    { label: "Clinic", value: pediatrician?.clinicName },
    { label: "Phone", value: pediatrician?.phone },
    { label: "Address", value: pediatrician?.address },
  ].filter((r) => has(r.value));

  return (
    <div className="print-sheet space-y-4">
      <header className="print-block rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-5">
          <ChildAvatar child={child} size={88} />
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Care Card
            </p>
            <h1 className="mt-1 font-display text-4xl leading-tight font-semibold">{child.name}</h1>
            <p className="mt-1 text-base text-muted-foreground">
              {[child.ageGroup, child.allergies].filter(has).join(" · ")}
            </p>
          </div>
        </div>
      </header>

      {(aboutRows.length > 0 || has(child.thingsToKnow)) && (
        <Section title="About">
          <dl className="grid gap-4 sm:grid-cols-2">
            {aboutRows.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
          {has(child.thingsToKnow) && (
            <dl>
              <Row label="Things to know" value={child.thingsToKnow} />
            </dl>
          )}
        </Section>
      )}

      {feedings.length > 0 && (
        <Section title="Feeding">
          {feedings.map((feeding, index) => (
            <div key={feeding.id} className="print-block space-y-3">
              {feedings.length > 1 && (
                <h3 className="font-display text-xl font-semibold">
                  {feeding.foodName || `Feeding ${index + 1}`}
                </h3>
              )}
              <dl className="grid gap-4 sm:grid-cols-2">
                {feedings.length === 1 && <Row label="Food" value={feeding.foodName} />}
                <Row label="Amount" value={feeding.amount} />
                <Row label="Times" value={feeding.times} />
                <Row label="Meals per day" value={feeding.mealsPerDay} />
              </dl>
              <dl className="space-y-4">
                <Row label="Snacks" value={feeding.snacks} />
                <Row label="Foods to avoid" value={feeding.foodsToAvoid} />
                <Row label="Notes" value={feeding.notes} />
              </dl>
            </div>
          ))}
        </Section>
      )}

      {routineRows.length > 0 && (
        <Section title="Routine">
          <dl className="space-y-4">
            {routineRows.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
        </Section>
      )}

      {medications.length > 0 && (
        <Section title="Medication">
          {medications.map((med) => (
            <div key={med.id} className="print-block space-y-3">
              <h3 className="font-display text-xl font-semibold">{med.name}</h3>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Row label="Instructions" value={med.dosage} />
                <Row label="Time" value={med.time} />
                <Row label="Frequency" value={med.frequency} />
                <Row
                  label="Dates"
                  value={
                    med.startDate || med.endDate
                      ? `${med.startDate || "—"} to ${med.endDate || "ongoing"}`
                      : undefined
                  }
                />
              </dl>
              <dl>
                <Row label="Notes" value={med.notes} />
              </dl>
            </div>
          ))}
          <p className="text-xs leading-relaxed text-muted-foreground">{MEDICATION_DISCLAIMER}</p>
        </Section>
      )}

      {(emergencyRows.length > 0 || has(emergency?.specialInstructions)) && (
        <Section title="Emergency" emphasis>
          <dl className="grid gap-4 sm:grid-cols-2">
            {emergencyRows.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
          {has(emergency?.primaryPhone) && (
            <Button asChild variant="destructive" className="no-print h-12 rounded-xl">
              <a href={`tel:${emergency?.primaryPhone}`}>
                <Phone className="size-4" aria-hidden="true" /> Call {emergency?.primaryName || "primary contact"}
              </a>
            </Button>
          )}
          {has(emergency?.specialInstructions) && (
            <dl>
              <Row label="Special instructions" value={emergency?.specialInstructions} />
            </dl>
          )}
        </Section>
      )}

      {vetRows.length > 0 && (
        <Section title="Pediatrician">
          <dl className="grid gap-4 sm:grid-cols-2">
            {vetRows.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
          <div className="no-print flex flex-wrap gap-2">
            {has(pediatrician?.phone) && (
              <Button asChild variant="secondary" className="h-11 rounded-xl">
                <a href={`tel:${pediatrician?.phone}`}>
                  <Phone className="size-4" aria-hidden="true" /> Call clinic
                </a>
              </Button>
            )}
            {has(pediatrician?.address) && (
              <Button asChild variant="secondary" className="h-11 rounded-xl">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(pediatrician!.address!)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="size-4" aria-hidden="true" /> Directions
                </a>
              </Button>
            )}
          </div>
        </Section>
      )}

      {has(child.thingsToKnow) && (
        <Section title="Special instructions">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{child.thingsToKnow}</p>
        </Section>
      )}

      <p className="pt-2 text-center text-xs text-muted-foreground">
        Baby Care Cards · updated {new Date(child.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
