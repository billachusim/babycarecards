import type { CareStoreValue } from "@/features/children/hooks/use-care-store";

import type { ParsedCareDetails } from "./voice-types";

type Store = Pick<
  CareStoreValue,
  "updateChild" | "saveFeeding" | "saveRoutine" | "saveMedication" | "saveEmergency" | "savePediatrician"
>;

const clean = <T extends Record<string, string | null>>(input: T) =>
  Object.fromEntries(
    Object.entries(input).filter(([, value]) => Boolean(value)),
  ) as Partial<Record<keyof T, string>>;

/** Writes reviewed voice-fill details onto an existing child. */
export function applyParsedDetails(
  store: Store,
  childId: string,
  details: ParsedCareDetails,
): void {
  const child = clean({
    allergies: details.child.allergies,
    approximateAge: details.child.approximateAge,
    weight: details.child.weight,
    personality: details.child.personality,
    thingsToKnow: details.child.thingsToKnow,
  });
  if (details.child.ageGroup) Object.assign(child, { ageGroup: details.child.ageGroup });
  if (details.child.sex) Object.assign(child, { sex: details.child.sex });
  if (Object.keys(child).length > 0) store.updateChild(childId, child);

  const feeding = clean(details.feeding);
  if (Object.keys(feeding).length > 0) store.saveFeeding({ childId, ...feeding });

  const routine = clean(details.routine);
  if (Object.keys(routine).length > 0) store.saveRoutine(childId, routine);

  for (const med of details.medications) {
    store.saveMedication({
      childId,
      name: med.name,
      ...clean({
        dosage: med.dosage,
        time: med.time,
        frequency: med.frequency,
        notes: med.notes,
      }),
    });
  }

  const emergency = clean(details.emergency);
  if (Object.keys(emergency).length > 0) store.saveEmergency(childId, emergency);

  const pediatrician = clean(details.pediatrician);
  if (Object.keys(pediatrician).length > 0) store.savePediatrician(childId, pediatrician);
}
