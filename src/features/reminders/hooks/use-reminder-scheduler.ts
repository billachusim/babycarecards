import { useEffect, useRef } from "react";

import { useCareStore } from "@/features/children/hooks/use-care-store";
import { notificationSupported, showReminderNotification } from "../reminder-service";

/**
 * Fires due reminders while the app is open. Web notifications cannot run in the
 * background reliably, which the UI states plainly.
 */
export function useReminderScheduler() {
  const { reminders, children } = useCareStore();
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!notificationSupported()) return;

    const tick = () => {
      if (Notification.permission !== "granted") return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const stampKey = `${now.toDateString()}-${hh}:${mm}`;

      reminders
        .filter((r) => r.enabled && r.time === `${hh}:${mm}`)
        .forEach((reminder) => {
          const key = `${reminder.id}-${stampKey}`;
          if (firedRef.current.has(key)) return;
          firedRef.current.add(key);
          const child = children.find((p) => p.id === reminder.childId);
          showReminderNotification(reminder, child?.name ?? "Your child");
        });
    };

    tick();
    const interval = window.setInterval(tick, 20_000);
    return () => window.clearInterval(interval);
  }, [reminders, children]);
}
