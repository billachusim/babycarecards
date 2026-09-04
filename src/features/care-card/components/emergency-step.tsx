import { TextField } from "@/components/app/form-field";
import { useCareStore } from "@/features/children/hooks/use-care-store";
import { phoneSchema } from "@/lib/validation";

function phoneError(value: string): string | undefined {
  const result = phoneSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function EmergencyStep({ childId }: { childId: string }) {
  const { emergencyFor, saveEmergency, pediatricianFor, savePediatrician } = useCareStore();
  const emergency = emergencyFor(childId);
  const pediatrician = pediatricianFor(childId);

  return (
    <div className="space-y-4">
      <div className="space-y-5 rounded-3xl border border-border bg-card p-5">
        <h3 className="font-display text-lg font-semibold">Emergency contacts</h3>
        <TextField
          label="Primary contact name"
          optional
          value={emergency?.primaryName ?? ""}
          onChange={(primaryName) => saveEmergency(childId, { primaryName })}
        />
        <TextField
          label="Primary contact phone"
          optional
          type="tel"
          value={emergency?.primaryPhone ?? ""}
          error={phoneError(emergency?.primaryPhone ?? "")}
          onChange={(primaryPhone) => saveEmergency(childId, { primaryPhone })}
        />
        <TextField
          label="Secondary contact name"
          optional
          value={emergency?.secondaryName ?? ""}
          onChange={(secondaryName) => saveEmergency(childId, { secondaryName })}
        />
        <TextField
          label="Secondary contact phone"
          optional
          type="tel"
          value={emergency?.secondaryPhone ?? ""}
          error={phoneError(emergency?.secondaryPhone ?? "")}
          onChange={(secondaryPhone) => saveEmergency(childId, { secondaryPhone })}
        />
        <TextField
          label="Special emergency instructions"
          optional
          multiline
          value={emergency?.specialInstructions ?? ""}
          onChange={(specialInstructions) => saveEmergency(childId, { specialInstructions })}
        />
      </div>

      <div className="space-y-5 rounded-3xl border border-border bg-card p-5">
        <h3 className="font-display text-lg font-semibold">Pediatrician</h3>
        <TextField
          label="Pediatrician name"
          optional
          value={pediatrician?.doctorName ?? ""}
          onChange={(doctorName) => savePediatrician(childId, { doctorName })}
        />
        <TextField
          label="Clinic"
          optional
          value={pediatrician?.clinicName ?? ""}
          onChange={(clinicName) => savePediatrician(childId, { clinicName })}
        />
        <TextField
          label="Phone"
          optional
          type="tel"
          value={pediatrician?.phone ?? ""}
          error={phoneError(pediatrician?.phone ?? "")}
          onChange={(phone) => savePediatrician(childId, { phone })}
        />
        <TextField
          label="Address"
          optional
          multiline
          rows={2}
          value={pediatrician?.address ?? ""}
          onChange={(address) => savePediatrician(childId, { address })}
        />
      </div>
    </div>
  );
}
