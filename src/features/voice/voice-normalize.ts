import type { ParsedCareDetails } from "./voice-types";

const str = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): T | null => {
  const text = str(value);
  return text && (allowed as readonly string[]).includes(text) ? (text as T) : null;
};

/** Normalizes the model output so the UI always receives a complete shape. */
export function normalizeParsedDetails(raw: unknown): ParsedCareDetails {
  const source = (raw ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const pick = <K extends keyof ParsedCareDetails>(
    group: K,
    keys: readonly string[],
  ): Record<string, string | null> => {
    const from = source[group as string] ?? {};
    return Object.fromEntries(keys.map((key) => [key, str(from[key])]));
  };

  const medsRaw = Array.isArray((source["medications"] as unknown) ?? [])
    ? (source["medications"] as unknown as Array<Record<string, unknown>>)
    : [];

  return {
    child: {
      ...(pick("child", [
        "name",
        "allergies",
        "approximateAge",
        "weight",
        "personality",
        "thingsToKnow",
      ]) as ParsedCareDetails["child"]),
      ageGroup: oneOf(source["child"]?.["ageGroup"], [
        "Newborn",
        "Infant",
        "Toddler",
        "Preschooler",
        "School age",
        "Other",
      ] as const),
      sex: oneOf(source["child"]?.["sex"], ["Boy", "Girl", "Prefer not to say"] as const),
    },
    feeding: pick("feeding", [
      "foodName",
      "amount",
      "times",
      "mealsPerDay",
      "snacks",
      "foodsToAvoid",
      "notes",
    ]) as ParsedCareDetails["feeding"],
    routine: pick("routine", [
      "outdoorTime",
      "playtime",
      "sleepRoutine",
      "diaperingRoutine",
      "soothingInstructions",
      "screenTimeNotes",
      "other",
    ]) as ParsedCareDetails["routine"],
    medications: medsRaw
      .map((med) => ({
        name: str(med["name"]) ?? "",
        dosage: str(med["dosage"]),
        time: str(med["time"]),
        frequency: str(med["frequency"]),
        notes: str(med["notes"]),
      }))
      .filter((med) => med.name.length > 0),
    emergency: pick("emergency", [
      "primaryName",
      "primaryPhone",
      "secondaryName",
      "secondaryPhone",
      "specialInstructions",
    ]) as ParsedCareDetails["emergency"],
    pediatrician: pick("pediatrician", [
      "doctorName",
      "clinicName",
      "phone",
      "address",
    ]) as ParsedCareDetails["pediatrician"],
  };
}
