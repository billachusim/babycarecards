import { TextField } from "@/components/app/form-field";
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

const AGE_GROUPS: AgeGroup[] = ["Newborn", "Infant", "Toddler", "Preschooler", "School age", "Other"];
const SEXES: Sex[] = ["Boy", "Girl", "Prefer not to say"];

export function AboutStep({ childId }: { childId: string }) {
  const { getChild, updateChild } = useCareStore();
  const child = getChild(childId);
  if (!child) return null;

  return (
    <div className="space-y-5">
      <PhotoPicker
        value={child.photoDataUrl}
        onChange={(photoDataUrl) => updateChild(childId, { photoDataUrl })}
      />
      <TextField label="Name" value={child.name} onChange={(name) => updateChild(childId, { name })} />

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Age group</Label>
        <Select
          value={child.ageGroup ?? ""}
          onValueChange={(v) => updateChild(childId, { ageGroup: v as AgeGroup })}
        >
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

      <TextField
        label="Allergies"
        optional
        value={child.allergies ?? ""}
        onChange={(allergies) => updateChild(childId, { allergies })}
      />

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Sex</Label>
        <Select value={child.sex ?? ""} onValueChange={(v) => updateChild(childId, { sex: v as Sex })}>
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
        value={child.dateOfBirth ?? ""}
        onChange={(dateOfBirth) => updateChild(childId, { dateOfBirth })}
      />
      <TextField
        label="Approximate age"
        optional
        value={child.approximateAge ?? ""}
        onChange={(approximateAge) => updateChild(childId, { approximateAge })}
      />
      <TextField
        label="Weight"
        optional
        value={child.weight ?? ""}
        onChange={(weight) => updateChild(childId, { weight })}
      />
      <TextField
        label="Personality / temperament"
        optional
        multiline
        value={child.personality ?? ""}
        onChange={(personality) => updateChild(childId, { personality })}
        placeholder="Easygoing, loves music, gets fussy when overtired…"
      />
      <TextField
        label="Things to know"
        optional
        multiline
        value={child.thingsToKnow ?? ""}
        onChange={(thingsToKnow) => updateChild(childId, { thingsToKnow })}
        placeholder="Anything a caregiver should hear before day one."
      />
    </div>
  );
}
