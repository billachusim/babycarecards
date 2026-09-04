import { TextField } from "@/components/app/form-field";
import { useCareStore } from "@/features/children/hooks/use-care-store";

const FIELDS = [
  { key: "outdoorTime", label: "Outdoor / walk time", placeholder: "e.g. 9 am and 4 pm" },
  { key: "playtime", label: "Playtime" },
  { key: "sleepRoutine", label: "Nap and bedtime routine" },
  { key: "diaperingRoutine", label: "Diapering / potty routine" },
  { key: "soothingInstructions", label: "Soothing / calming instructions" },
  { key: "screenTimeNotes", label: "Screen time notes" },
  { key: "other", label: "Anything else" },
] as const;

export function RoutineStep({ childId }: { childId: string }) {
  const { routineFor, saveRoutine } = useCareStore();
  const routine = routineFor(childId);

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card p-5">
      {FIELDS.map((field) => (
        <TextField
          key={field.key}
          label={field.label}
          optional
          multiline
          rows={2}
          placeholder={"placeholder" in field ? field.placeholder : undefined}
          value={(routine?.[field.key] as string | undefined) ?? ""}
          onChange={(value) => saveRoutine(childId, { [field.key]: value })}
        />
      ))}
    </div>
  );
}
