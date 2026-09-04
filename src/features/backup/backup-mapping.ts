import type { CareDatabase } from "@/features/children/data/care-data-repository";
import type {
  CareRoutine,
  EmergencyContact,
  FeedingSchedule,
  Medication,
  Child,
  Reminder,
  Sex,
  AgeGroup,
  Pediatrician,
} from "@/features/children/models";

/** Wire shape pushed to / pulled from the backend. Snake_case mirrors the tables. */
export type BackupValue = string | number | boolean | null;
export type BackupRow = Record<string, BackupValue>;

export interface BackupPayload {
  children: BackupRow[];
  feedings: BackupRow[];
  routines: BackupRow[];
  medications: BackupRow[];
  emergency: BackupRow[];
  pediatricians: BackupRow[];
  reminders: BackupRow[];
  caregiver: { name?: string | null; phone?: string | null; notes?: string | null };
}

const base = (r: { id: string; createdAt: string; updatedAt: string }) => ({
  id: r.id,
  created_at: r.createdAt,
  updated_at: r.updatedAt,
});

export function toBackupPayload(db: CareDatabase): BackupPayload {
  return {
    children: db.children.map((p) => ({
      ...base(p),
      name: p.name,
      ageGroup: p.ageGroup ?? null,
      allergies: p.allergies ?? null,
      sex: p.sex ?? null,
      date_of_birth: p.dateOfBirth ?? null,
      approximate_age: p.approximateAge ?? null,
      weight: p.weight ?? null,
      photo_data_url: p.photoDataUrl ?? null,
      personality: p.personality ?? null,
      things_to_know: p.thingsToKnow ?? null,
    })),
    feedings: db.feedings.map((f) => ({
      ...base(f),
      child_id: f.childId,
      food_name: f.foodName ?? null,
      amount: f.amount ?? null,
      times: f.times ?? null,
      meals_per_day: f.mealsPerDay ?? null,
      snacks: f.snacks ?? null,
      foods_to_avoid: f.foodsToAvoid ?? null,
      notes: f.notes ?? null,
    })),
    routines: db.routines.map((r) => ({
      ...base(r),
      child_id: r.childId,
      outdoor_time: r.outdoorTime ?? null,
      playtime: r.playtime ?? null,
      sleep_routine: r.sleepRoutine ?? null,
      diapering_routine: r.diaperingRoutine ?? null,
      soothing_instructions: r.soothingInstructions ?? null,
      screen_time_notes: r.screenTimeNotes ?? null,
      other: r.other ?? null,
    })),
    medications: db.medications.map((m) => ({
      ...base(m),
      child_id: m.childId,
      name: m.name,
      dosage: m.dosage ?? null,
      time: m.time ?? null,
      frequency: m.frequency ?? null,
      start_date: m.startDate ?? null,
      end_date: m.endDate ?? null,
      notes: m.notes ?? null,
    })),
    emergency: db.emergency.map((e) => ({
      ...base(e),
      child_id: e.childId,
      primary_name: e.primaryName ?? null,
      primary_phone: e.primaryPhone ?? null,
      secondary_name: e.secondaryName ?? null,
      secondary_phone: e.secondaryPhone ?? null,
      special_instructions: e.specialInstructions ?? null,
    })),
    pediatricians: db.pediatricians.map((v) => ({
      ...base(v),
      child_id: v.childId,
      doctor_name: v.doctorName ?? null,
      clinic_name: v.clinicName ?? null,
      phone: v.phone ?? null,
      address: v.address ?? null,
    })),
    reminders: db.reminders.map((r) => ({
      ...base(r),
      child_id: r.childId,
      type: r.type,
      title: r.title,
      time: r.time,
      repeat: r.repeat,
      start_date: r.startDate ?? null,
      end_date: r.endDate ?? null,
      enabled: r.enabled,
    })),
    caregiver: {
      name: db.caregiver.name ?? null,
      phone: db.caregiver.phone ?? null,
      notes: db.caregiver.notes ?? null,
    },
  };
}

const str = (value: BackupValue | undefined): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const stamps = (row: BackupRow) => ({
  id: String(row["id"]),
  createdAt: str(row["created_at"]) ?? new Date().toISOString(),
  updatedAt: str(row["updated_at"]) ?? new Date().toISOString(),
});

/** Rebuilds the local database shape from a pulled backup. */
export function fromBackupPayload(payload: BackupPayload): Omit<CareDatabase, "premium"> {
  return {
    children: payload.children.map((row): Child => ({
      ...stamps(row),
      name: String(row["name"] ?? "Child"),
      ageGroup: str(row["ageGroup"]) as AgeGroup | undefined,
      allergies: str(row["allergies"]),
      sex: str(row["sex"]) as Sex | undefined,
      dateOfBirth: str(row["date_of_birth"]),
      approximateAge: str(row["approximate_age"]),
      weight: str(row["weight"]),
      photoDataUrl: str(row["photo_data_url"]),
      personality: str(row["personality"]),
      thingsToKnow: str(row["things_to_know"]),
    })),
    feedings: payload.feedings.map((row): FeedingSchedule => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      foodName: str(row["food_name"]),
      amount: str(row["amount"]),
      times: str(row["times"]),
      mealsPerDay: str(row["meals_per_day"]),
      snacks: str(row["snacks"]),
      foodsToAvoid: str(row["foods_to_avoid"]),
      notes: str(row["notes"]),
    })),
    routines: payload.routines.map((row): CareRoutine => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      outdoorTime: str(row["outdoor_time"]),
      playtime: str(row["playtime"]),
      sleepRoutine: str(row["sleep_routine"]),
      diaperingRoutine: str(row["diapering_routine"]),
      soothingInstructions: str(row["soothing_instructions"]),
      screenTimeNotes: str(row["screen_time_notes"]),
      other: str(row["other"]),
    })),
    medications: payload.medications.map((row): Medication => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      name: String(row["name"] ?? ""),
      dosage: str(row["dosage"]),
      time: str(row["time"]),
      frequency: str(row["frequency"]),
      startDate: str(row["start_date"]),
      endDate: str(row["end_date"]),
      notes: str(row["notes"]),
    })),
    emergency: payload.emergency.map((row): EmergencyContact => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      primaryName: str(row["primary_name"]),
      primaryPhone: str(row["primary_phone"]),
      secondaryName: str(row["secondary_name"]),
      secondaryPhone: str(row["secondary_phone"]),
      specialInstructions: str(row["special_instructions"]),
    })),
    pediatricians: payload.pediatricians.map((row): Pediatrician => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      doctorName: str(row["doctor_name"]),
      clinicName: str(row["clinic_name"]),
      phone: str(row["phone"]),
      address: str(row["address"]),
    })),
    reminders: payload.reminders.map((row): Reminder => ({
      ...stamps(row),
      childId: String(row["child_id"]),
      type: (str(row["type"]) ?? "custom") as Reminder["type"],
      title: String(row["title"] ?? "Reminder"),
      time: String(row["time"] ?? "08:00"),
      repeat: (str(row["repeat"]) ?? "daily") as Reminder["repeat"],
      startDate: str(row["start_date"]),
      endDate: str(row["end_date"]),
      enabled: row["enabled"] !== false,
    })),
    caregiver: {
      name: payload.caregiver.name ?? undefined,
      phone: payload.caregiver.phone ?? undefined,
      notes: payload.caregiver.notes ?? undefined,
    },
  };
}
