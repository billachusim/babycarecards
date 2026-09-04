/**
 * Core domain models for Baby Care Cards.
 * All data is local-first: stored per browser/device, no account required.
 */

export type AgeGroup = "Newborn" | "Infant" | "Toddler" | "Preschooler" | "School age" | "Other";
export type Sex = "Boy" | "Girl" | "Prefer not to say";

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface Child extends Timestamped {
  id: string;
  name: string;
  ageGroup?: AgeGroup | undefined;
  allergies?: string | undefined;
  sex?: Sex | undefined;
  dateOfBirth?: string | undefined;
  approximateAge?: string | undefined;
  weight?: string | undefined;
  photoDataUrl?: string | undefined;
  personality?: string | undefined;
  thingsToKnow?: string | undefined;
}

export interface FeedingSchedule extends Timestamped {
  id: string;
  childId: string;
  foodName?: string | undefined;
  amount?: string | undefined;
  times?: string | undefined;
  mealsPerDay?: string | undefined;
  snacks?: string | undefined;
  foodsToAvoid?: string | undefined;
  notes?: string | undefined;
}

export interface CareRoutine extends Timestamped {
  id: string;
  childId: string;
  outdoorTime?: string | undefined;
  playtime?: string | undefined;
  sleepRoutine?: string | undefined;
  diaperingRoutine?: string | undefined;
  soothingInstructions?: string | undefined;
  screenTimeNotes?: string | undefined;
  other?: string | undefined;
}

export interface Medication extends Timestamped {
  id: string;
  childId: string;
  name: string;
  dosage?: string | undefined;
  time?: string | undefined;
  frequency?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  notes?: string | undefined;
}

export interface EmergencyContact extends Timestamped {
  id: string;
  childId: string;
  primaryName?: string | undefined;
  primaryPhone?: string | undefined;
  secondaryName?: string | undefined;
  secondaryPhone?: string | undefined;
  specialInstructions?: string | undefined;
}

export interface Pediatrician extends Timestamped {
  id: string;
  childId: string;
  doctorName?: string | undefined;
  clinicName?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
}

export type ReminderType = "feeding" | "medication" | "activity" | "diaper" | "custom";
export type RepeatSchedule = "once" | "daily" | "weekdays" | "weekly";

export interface Reminder extends Timestamped {
  id: string;
  childId: string;
  type: ReminderType;
  title: string;
  time: string; // HH:mm
  repeat: RepeatSchedule;
  startDate?: string | undefined;
  endDate?: string | undefined;
  enabled: boolean;
}

/** Aggregate view assembled for rendering / sharing a care card. */
export interface CareCard {
  child: Child;
  feedings: FeedingSchedule[];
  routine?: CareRoutine | undefined;
  medications: Medication[];
  emergency?: EmergencyContact | undefined;
  pediatrician?: Pediatrician | undefined;
  generatedAt: string;
}

export interface CaregiverInfo {
  name?: string | undefined;
  phone?: string | undefined;
  notes?: string | undefined;
}

export interface PremiumEntitlement {
  lifetimeUnlocked: boolean;
  /** Email used at checkout — the key the server verifies the purchase against. */
  email?: string | undefined;
  environment?: "sandbox" | "live" | undefined;
  purchasedAt?: string | undefined;
  reference?: string | undefined;
  verifiedAt?: string | undefined;
}
