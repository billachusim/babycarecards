import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearChildData,
  emptyDatabase,
  loadDatabase,
  saveDatabase,
  stamp,
  type CareDatabase,
} from "../data/care-data-repository";
import type {
  CareCard,
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
import { nowIso } from "@/lib/storage/local-store";

export interface CareStoreValue {
  ready: boolean;
  db: CareDatabase;
  isPremium: boolean;
  entitlement: PremiumEntitlement;
  children: Child[];

  getChild: (id: string) => Child | undefined;
  buildCareCard: (childId: string) => CareCard | undefined;
  addChild: (child: Omit<Child, "id" | "createdAt" | "updatedAt">) => Child;
  updateChild: (id: string, changes: Partial<Child>) => void;
  deleteChild: (id: string) => void;
  feedingsFor: (childId: string) => FeedingSchedule[];
  saveFeeding: (feeding: Partial<FeedingSchedule> & { childId: string }) => void;
  deleteFeeding: (id: string) => void;
  routineFor: (childId: string) => CareRoutine | undefined;
  saveRoutine: (childId: string, changes: Partial<CareRoutine>) => void;
  medicationsFor: (childId: string) => Medication[];
  saveMedication: (med: Partial<Medication> & { childId: string; name: string }) => void;
  deleteMedication: (id: string) => void;
  emergencyFor: (childId: string) => EmergencyContact | undefined;
  saveEmergency: (childId: string, changes: Partial<EmergencyContact>) => void;
  pediatricianFor: (childId: string) => Pediatrician | undefined;
  savePediatrician: (childId: string, changes: Partial<Pediatrician>) => void;
  reminders: Reminder[];
  remindersFor: (childId: string) => Reminder[];
  saveReminder: (reminder: Partial<Reminder> & { childId: string; title: string; time: string }) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string, enabled: boolean) => void;
  caregiver: CaregiverInfo;
  saveCaregiver: (info: CaregiverInfo) => void;
  setEntitlement: (entitlement: PremiumEntitlement) => void;
  deleteAllData: () => void;
  /** Replaces every local care record (used when restoring an account backup). */
  replaceAll: (data: Omit<CareDatabase, "premium">) => void;
  exportData: () => string;

}

const CareStoreContext = createContext<CareStoreValue | null>(null);

export function CareStoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<CareDatabase>(emptyDatabase);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadDatabase();
    setDb(loaded);
    setReady(true);

    // Re-verify a stored unlock against the server so entitlement can never be
    // granted (or kept) by editing local storage alone.
    const email = loaded.premium.email;
    if (!email) return;
    void (async () => {
      try {
        const { verifyEntitlement } = await import("@/features/premium/premium-service");
        const verified = await verifyEntitlement(email);
        setDb((current) => {
          const next = { ...current, premium: verified };
          saveDatabase(next);
          return next;
        });
      } catch {
        // Offline or transient failure: keep the last verified state.
      }
    })();
  }, []);


  const commit = useCallback((updater: (current: CareDatabase) => CareDatabase) => {
    setDb((current) => {
      const next = updater(current);
      saveDatabase(next);
      return next;
    });
  }, []);

  const value = useMemo<CareStoreValue>(() => {
    const touch = <T extends { updatedAt: string }>(record: T): T => ({
      ...record,
      updatedAt: nowIso(),
    });

    return {
      ready,
      db,
      isPremium: db.premium.lifetimeUnlocked,
      entitlement: db.premium,
      children: db.children,
      getChild: (id) => db.children.find((p) => p.id === id),
      buildCareCard: (childId) => {
        const child = db.children.find((p) => p.id === childId);
        if (!child) return undefined;
        return {
          child,
          feedings: db.feedings.filter((f) => f.childId === childId),
          routine: db.routines.find((r) => r.childId === childId),
          medications: db.medications.filter((m) => m.childId === childId),
          emergency: db.emergency.find((e) => e.childId === childId),
          pediatrician: db.pediatricians.find((v) => v.childId === childId),
          generatedAt: nowIso(),
        };
      },
      addChild: (child) => {
        const created = stamp<Child>(child);
        commit((c) => ({ ...c, children: [...c.children, created] }));
        return created;
      },
      updateChild: (id, changes) =>
        commit((c) => ({
          ...c,
          children: c.children.map((p) => (p.id === id ? touch({ ...p, ...changes }) : p)),
        })),
      deleteChild: (id) =>
        commit((c) => ({
          ...c,
          children: c.children.filter((p) => p.id !== id),
          feedings: c.feedings.filter((f) => f.childId !== id),
          routines: c.routines.filter((r) => r.childId !== id),
          medications: c.medications.filter((m) => m.childId !== id),
          emergency: c.emergency.filter((e) => e.childId !== id),
          pediatricians: c.pediatricians.filter((v) => v.childId !== id),
          reminders: c.reminders.filter((r) => r.childId !== id),
        })),
      feedingsFor: (childId) => db.feedings.filter((f) => f.childId === childId),
      saveFeeding: (feeding) =>
        commit((c) => {
          const existing = feeding.id && c.feedings.find((f) => f.id === feeding.id);
          if (existing) {
            return {
              ...c,
              feedings: c.feedings.map((f) =>
                f.id === feeding.id ? touch({ ...f, ...feeding }) : f,
              ),
            };
          }
          return { ...c, feedings: [...c.feedings, stamp<FeedingSchedule>(feeding as never)] };
        }),
      deleteFeeding: (id) =>
        commit((c) => ({ ...c, feedings: c.feedings.filter((f) => f.id !== id) })),
      routineFor: (childId) => db.routines.find((r) => r.childId === childId),
      saveRoutine: (childId, changes) =>
        commit((c) => {
          const existing = c.routines.find((r) => r.childId === childId);
          if (existing) {
            return {
              ...c,
              routines: c.routines.map((r) =>
                r.childId === childId ? touch({ ...r, ...changes }) : r,
              ),
            };
          }
          return { ...c, routines: [...c.routines, stamp<CareRoutine>({ childId, ...changes })] };
        }),
      medicationsFor: (childId) => db.medications.filter((m) => m.childId === childId),
      saveMedication: (med) =>
        commit((c) => {
          const existing = med.id && c.medications.find((m) => m.id === med.id);
          if (existing) {
            return {
              ...c,
              medications: c.medications.map((m) =>
                m.id === med.id ? touch({ ...m, ...med }) : m,
              ),
            };
          }
          return { ...c, medications: [...c.medications, stamp<Medication>(med as never)] };
        }),
      deleteMedication: (id) =>
        commit((c) => ({ ...c, medications: c.medications.filter((m) => m.id !== id) })),
      emergencyFor: (childId) => db.emergency.find((e) => e.childId === childId),
      saveEmergency: (childId, changes) =>
        commit((c) => {
          const existing = c.emergency.find((e) => e.childId === childId);
          if (existing) {
            return {
              ...c,
              emergency: c.emergency.map((e) =>
                e.childId === childId ? touch({ ...e, ...changes }) : e,
              ),
            };
          }
          return {
            ...c,
            emergency: [...c.emergency, stamp<EmergencyContact>({ childId, ...changes })],
          };
        }),
      pediatricianFor: (childId) => db.pediatricians.find((v) => v.childId === childId),
      savePediatrician: (childId, changes) =>
        commit((c) => {
          const existing = c.pediatricians.find((v) => v.childId === childId);
          if (existing) {
            return {
              ...c,
              pediatricians: c.pediatricians.map((v) => (v.childId === childId ? touch({ ...v, ...changes }) : v)),
            };
          }
          return { ...c, pediatricians: [...c.pediatricians, stamp<Pediatrician>({ childId, ...changes })] };
        }),
      reminders: db.reminders,
      remindersFor: (childId) => db.reminders.filter((r) => r.childId === childId),
      saveReminder: (reminder) =>
        commit((c) => {
          const existing = reminder.id && c.reminders.find((r) => r.id === reminder.id);
          if (existing) {
            return {
              ...c,
              reminders: c.reminders.map((r) =>
                r.id === reminder.id ? touch({ ...r, ...reminder }) : r,
              ),
            };
          }
          return {
            ...c,
            reminders: [
              ...c.reminders,
              stamp<Reminder>({
                type: "custom",
                repeat: "daily",
                enabled: true,
                ...reminder,
              } as never),
            ],
          };
        }),
      deleteReminder: (id) =>
        commit((c) => ({ ...c, reminders: c.reminders.filter((r) => r.id !== id) })),
      toggleReminder: (id, enabled) =>
        commit((c) => ({
          ...c,
          reminders: c.reminders.map((r) => (r.id === id ? touch({ ...r, enabled }) : r)),
        })),
      caregiver: db.caregiver,
      saveCaregiver: (info) => commit((c) => ({ ...c, caregiver: { ...c.caregiver, ...info } })),
      setEntitlement: (entitlement) => commit((c) => ({ ...c, premium: entitlement })),
      deleteAllData: () => {
        clearChildData();
        setDb((c) => ({ ...emptyDatabase(), premium: c.premium }));
      },
      replaceAll: (data) => commit((c) => ({ ...data, premium: c.premium })),

      exportData: () =>
        JSON.stringify(
          {
            exportedAt: nowIso(),
            app: "Baby Care Cards",
            data: { ...db, premium: undefined },
          },
          null,
          2,
        ),
    };
  }, [db, ready, commit]);

  return <CareStoreContext.Provider value={value}>{children}</CareStoreContext.Provider>;
}

export function useCareStore(): CareStoreValue {
  const ctx = useContext(CareStoreContext);
  if (!ctx) throw new Error("useCareStore must be used inside CareStoreProvider");
  return ctx;
}
