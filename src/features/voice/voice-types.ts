import type { Sex, AgeGroup } from "@/features/children/models";

export interface ParsedMedication {
  name: string;
  dosage: string | null;
  time: string | null;
  frequency: string | null;
  notes: string | null;
}

export interface ParsedCareDetails {
  child: {
    name: string | null;
    ageGroup: AgeGroup | null;
    allergies: string | null;
    sex: Sex | null;
    approximateAge: string | null;
    weight: string | null;
    personality: string | null;
    thingsToKnow: string | null;
  };
  feeding: {
    foodName: string | null;
    amount: string | null;
    times: string | null;
    mealsPerDay: string | null;
    snacks: string | null;
    foodsToAvoid: string | null;
    notes: string | null;
  };
  routine: {
    outdoorTime: string | null;
    playtime: string | null;
    sleepRoutine: string | null;
    diaperingRoutine: string | null;
    soothingInstructions: string | null;
    screenTimeNotes: string | null;
    other: string | null;
  };
  medications: ParsedMedication[];
  emergency: {
    primaryName: string | null;
    primaryPhone: string | null;
    secondaryName: string | null;
    secondaryPhone: string | null;
    specialInstructions: string | null;
  };
  pediatrician: {
    doctorName: string | null;
    clinicName: string | null;
    phone: string | null;
    address: string | null;
  };
}

export const EMPTY_PARSED: ParsedCareDetails = {
  child: {
    name: null,
    ageGroup: null,
    allergies: null,
    sex: null,
    approximateAge: null,
    weight: null,
    personality: null,
    thingsToKnow: null,
  },
  feeding: {
    foodName: null,
    amount: null,
    times: null,
    mealsPerDay: null,
    snacks: null,
    foodsToAvoid: null,
    notes: null,
  },
  routine: {
    outdoorTime: null,
    playtime: null,
    sleepRoutine: null,
    diaperingRoutine: null,
    soothingInstructions: null,
    screenTimeNotes: null,
    other: null,
  },
  medications: [],
  emergency: {
    primaryName: null,
    primaryPhone: null,
    secondaryName: null,
    secondaryPhone: null,
    specialInstructions: null,
  },
  pediatrician: { doctorName: null, clinicName: null, phone: null, address: null },
};
