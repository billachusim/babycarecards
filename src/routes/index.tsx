import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Baby, Bell, Pencil, Plus, QrCode, Share2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app/app-shell";
import { EmptyState } from "@/components/app/empty-state";
import { ChildAvatar } from "@/features/children/components/child-avatar";
import { Button } from "@/components/ui/button";
import { STORAGE_KEYS } from "@/features/children/data/care-data-repository";
import { useCareStore } from "@/features/children/hooks/use-care-store";
import { PaywallDialog } from "@/features/premium/components/paywall-dialog";
import { readJson } from "@/lib/storage/local-store";
import { SITE_NAME, SOCIAL_IMAGE_URL, absoluteUrl, publicHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    publicHead({
      title: "Baby Care Cards — Create a Baby Care Cards for Your Sitter in Minutes",
      description:
        "Leaving your child with a sitter? Build one care card with feeding, routine, medication, emergency and pediatrician details, then share it by link, print it, or hand it over as a QR code.",
      path: "/",
    }),
  component: Home,
});


function Home() {
  const navigate = useNavigate();
  const { ready, children, isPremium } = useCareStore();
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const seen = readJson<boolean>(STORAGE_KEYS.onboarded, false);
    if (!seen && children.length === 0) void navigate({ to: "/onboarding" });
  }, [ready, children.length, navigate]);

  const handleAddPet = () => {
    if (!isPremium && children.length >= 1) {
      setPaywallOpen(true);
      return;
    }
    void navigate({ to: "/children/new" });
  };

  if (!ready) {
    return (
      <AppShell>
        <div className="h-64 animate-pulse rounded-3xl bg-card" aria-label="Loading" />
        <HomeMarketing />
      </AppShell>
    );
  }



  return (
    <AppShell>
      <PaywallDialog open={paywallOpen} onOpenChange={setPaywallOpen} />

      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold">Your care cards</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Leaving your child with someone? Give them everything they need to know.
        </p>
      </div>

      {children.length === 0 ? (
        <EmptyState
          icon={<Baby className="size-7" aria-hidden="true" />}
          title="Your child's care card starts here."
          description="No care cards yet. Create one for your child before their next stay with a sitter."
          action={
            <Button size="lg" className="h-12 rounded-xl px-6" onClick={handleAddPet}>
              <Plus className="size-4" aria-hidden="true" /> Add Child
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {children.map((child) => (
            <article
              key={child.id}
              className="rounded-3xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <ChildAvatar child={child} size={64} />
                <div className="min-w-0">
                  <h2 className="truncate font-display text-2xl font-semibold">{child.name}</h2>
                  <p className="truncate text-sm text-muted-foreground">
                    {[child.ageGroup, child.allergies, child.approximateAge].filter(Boolean).join(" · ") ||
                      "Add a few details to complete the card"}
                  </p>
                </div>
              </div>

              <Button asChild size="lg" className="mt-5 h-12 w-full rounded-xl text-base">
                <Link to="/care/$childId" params={{ childId: child.id }}>
                  View Care Card
                </Link>
              </Button>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button asChild variant="secondary" className="h-11 rounded-xl">
                  <Link to="/children/$childId/edit" params={{ childId: child.id }}>
                    <Pencil className="size-4" aria-hidden="true" /> Edit
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="h-11 rounded-xl">
                  <Link to="/care/$childId" params={{ childId: child.id }} hash="share">
                    <Share2 className="size-4" aria-hidden="true" /> Share
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="h-11 rounded-xl">
                  <Link to="/care/$childId/qr" params={{ childId: child.id }}>
                    <QrCode className="size-4" aria-hidden="true" /> QR
                  </Link>
                </Button>
              </div>
            </article>
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="h-12 rounded-xl">
              <Link to="/reminders">
                <Bell className="size-4" aria-hidden="true" /> Reminders
              </Link>
            </Button>
            <Button variant="outline" className="h-12 rounded-xl" onClick={handleAddPet}>
              <Plus className="size-4" aria-hidden="true" /> Add Child
            </Button>
          </div>

          {!isPremium && (
            <Link
              to="/premium"
              className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-4 text-sm transition-colors hover:bg-secondary"
            >
              <Sparkles className="size-5 text-primary" aria-hidden="true" />
              <span>
                <span className="font-medium">Unlock Lifetime — $4.99.</span>{" "}
                <span className="text-muted-foreground">
                  Unlimited children, PDF export, reminders. One payment, no subscription.
                </span>
              </span>
            </Link>
          )}
        </div>
      )}
      {children.length === 0 && <HomeMarketing />}
    </AppShell>
  );
}

function HomeMarketing() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        url: absoluteUrl("/"),
        image: SOCIAL_IMAGE_URL,
        applicationCategory: "LifestyleApplication",
        featureList: [
          "Voice-to-care-card: talk about your child and the care card is written for you",
          "Feeding amounts, times and foods to avoid",
          "Daily routine: naps, bedtime, diapering and soothing",
          "Medication names, doses and schedules",
          "Emergency contacts and pediatrician details",
          "Share by link, print, export a PDF or hand over a QR code",
        ],
        operatingSystem: "Any modern web browser",
        description:
          "Create a complete child care card with feeding, routine, medication, emergency and pediatrician details, then share it by link, print it, or hand it over as a QR code.",
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "USD",
            description: "One child with a full care card, QR code and basic reminders.",
          },
          {
            "@type": "Offer",
            name: "Lifetime unlock",
            price: "4.99",
            priceCurrency: "USD",
            description:
              "One payment, no subscription. Unlimited children, medication schedules, advanced reminders, PDF export and sharing.",
          },
        ],
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
    ],
  };

  const steps = [
    {
      title: "Add your child",
      body: "Name is all that's required. Add a photo, allergies, age and weight if you have a moment.",
    },
    {
      title: "Fill in the essentials",
      body: "Short, skippable steps for feeding, daily routine, medication and emergency contacts.",
    },
    {
      title: "Hand it over",
      body: "Share a link, print a copy for the fridge, or let your sitter scan a QR code at the door.",
    },
  ];

  return (
    <section className="mt-12" aria-labelledby="how-it-works">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="how-it-works" className="font-display text-2xl font-semibold">
        A complete child care card in minutes
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
        Baby Care Cards collects the details a caregiver actually asks for — feeding amounts and times,
        naps and bedtime, diapering and soothing routines, prescribed medication, emergency contacts and your pediatrician — and turns
        them into one readable card you can share, print or show as a QR code. No account needed, and
        your child&apos;s details stay on your device.
      </p>
      <ol className="mt-6 space-y-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-semibold text-primary">
              {i + 1}
            </span>
            <span>
              <span className="block font-display text-lg font-semibold">{step.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-3xl border border-border bg-secondary/50 p-5">
        <h3 className="font-display text-lg font-semibold">
          Don&apos;t feel like typing? Talk about your child
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Speak for about a minute — what your child eats and when, their routine, any medication, who
          to call and your pediatrician — and Baby Care Cards writes the sitter instructions for you. You check
          every field before anything saves, and your recording is never stored.
        </p>
        <Link
          to="/talk-about-your-child"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          See how Talk about your child works
        </Link>
      </div>

      <div className="mt-4 rounded-3xl border border-border bg-secondary/50 p-5">
        <h3 className="font-display text-lg font-semibold">Not sure what to write down?</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Our Caregiver Guides cover sitter checklists, feeding schedules, medication notes and
          emergency contact sheets.
        </p>
        <Link
          to="/guides"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Read the Caregiver Guides
        </Link>
      </div>
    </section>
  );
}
