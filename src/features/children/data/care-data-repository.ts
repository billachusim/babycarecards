import {
  newId,
  nowIso,
  readJson,
  removeKey,
  writeJson,
} from "@/lib/storage/local-store";
import type {
  CareRoutine,
  CaregiverInfo,
  EmergencyContact,
  FeedingSchedule,
  Medication,
  Child,
  PremiumEntitlement,
  Reminder,
  Pediatrician,
} from "../models";

export const STORAGE_KEYS = {
  children: "bcc.children",
  feedings: "bcc.feedings",
  routines: "bcc.routines",
  medications: "bcc.medications",
  emergency: "bcc.emergency",
  pediatricians: "bcc.pediatricians",
  reminders: "bcc.reminders",
  caregiver: "bcc.caregiver",
  premium: "bcc.premium",
  onboarded: "bcc.onboarded",
} as const;

export interface CareDatabase {
  children: Child[];
  feedings: FeedingSchedule[];
  routines: CareRoutine[];
  medications: Medication[];
  emergency: EmergencyContact[];
  pediatricians: Pediatrician[];
  reminders: Reminder[];
  caregiver: CaregiverInfo;
  premium: PremiumEntitlement;
}

export const emptyDatabase = (): CareDatabase => ({
  children: [],
  feedings: [],
  routines: [],
  medications: [],
  emergency: [],
  pediatricians: [],
  reminders: [],
  caregiver: {},
  premium: { lifetimeUnlocked: false },
});

export function loadDatabase(): CareDatabase {
  const base = emptyDatabase();
  return {
    children: readJson(STORAGE_KEYS.children, base.children),
    feedings: readJson(STORAGE_KEYS.feedings, base.feedings),
    routines: readJson(STORAGE_KEYS.routines, base.routines),
    medications: readJson(STORAGE_KEYS.medications, base.medications),
    emergency: readJson(STORAGE_KEYS.emergency, base.emergency),
    pediatricians: readJson(STORAGE_KEYS.pediatricians, base.pediatricians),
    reminders: readJson(STORAGE_KEYS.reminders, base.reminders),
    caregiver: readJson(STORAGE_KEYS.caregiver, base.caregiver),
    premium: readJson(STORAGE_KEYS.premium, base.premium),
  };
}

export function saveDatabase(db: CareDatabase): void {
  writeJson(STORAGE_KEYS.children, db.children);
  writeJson(STORAGE_KEYS.feedings, db.feedings);
  writeJson(STORAGE_KEYS.routines, db.routines);
  writeJson(STORAGE_KEYS.medications, db.medications);
  writeJson(STORAGE_KEYS.emergency, db.emergency);
  writeJson(STORAGE_KEYS.pediatricians, db.pediatricians);
  writeJson(STORAGE_KEYS.reminders, db.reminders);
  writeJson(STORAGE_KEYS.caregiver, db.caregiver);
  writeJson(STORAGE_KEYS.premium, db.premium);
}

/** Deletes every child-related record. Premium entitlement is stored separately and kept. */
export function clearChildData(): void {
  (
    [
      STORAGE_KEYS.children,
      STORAGE_KEYS.feedings,
      STORAGE_KEYS.routines,
      STORAGE_KEYS.medications,
      STORAGE_KEYS.emergency,
      STORAGE_KEYS.pediatricians,
      STORAGE_KEYS.reminders,
      STORAGE_KEYS.caregiver,
    ] as const
  ).forEach(removeKey);
}

export function stamp<T extends { id: string; createdAt: string; updatedAt: string }>(
  partial: Omit<T, "id" | "createdAt" | "updatedAt"> & Partial<Pick<T, "id">>,
): T {
  const ts = nowIso();
  return {
    ...(partial as object),
    id: partial.id ?? newId(),
    createdAt: ts,
    updatedAt: ts,
  } as T;
}
