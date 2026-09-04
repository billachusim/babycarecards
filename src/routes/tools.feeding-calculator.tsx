import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_NAME, absoluteUrl, breadcrumbLd, publicHead } from "@/lib/seo";

const TITLE = "Baby Feeding Planner";
const DESCRIPTION =
  "Free bottle, formula and meal planning tool for babies and toddlers: enter age group and weight to get a general starting point for ounces per feed, feeds per day and meal ideas, then write it into a care card for your sitter. General planning guidance only — not medical advice.";

export const Route = createFileRoute("/tools/feeding-calculator")({
  head: () =>
    publicHead({
      title: `${TITLE} — Bottle and Meal Planning by Age | ${SITE_NAME}`,
      description: DESCRIPTION,
      path: "/tools/feeding-calculator",
    }),
  component: FeedingPlanner,
});

type AgeBand =
  | "Newborn (0–1 month)"
  | "Infant (1–3 months)"
  | "Infant (4–6 months)"
  | "Infant (6–12 months)"
  | "Toddler (1–2 years)"
  | "Preschooler (2+ years)";

const AGE_BANDS: AgeBand[] = [
  "Newborn (0–1 month)",
  "Infant (1–3 months)",
  "Infant (4–6 months)",
  "Infant (6–12 months)",
  "Toddler (1–2 years)",
  "Preschooler (2+ years)",
];

interface BandGuidance {
  ouncesPerLb: number;
  feedsPerDay: [number, number];
  notes: string;
  solids: string;
}

const GUIDANCE: Record<AgeBand, BandGuidance> = {
  "Newborn (0–1 month)": {
    ouncesPerLb: 2.5,
    feedsPerDay: [8, 12],
    notes: "Feed on demand — roughly every 2–3 hours, including overnight.",
    solids: "Breast milk or formula only. No solid foods yet.",
  },
  "Infant (1–3 months)": {
    ouncesPerLb: 2.5,
    feedsPerDay: [7, 9],
    notes: "Feeds may stretch to every 3–4 hours as your baby grows.",
    solids: "Breast milk or formula only. No solid foods yet.",
  },
  "Infant (4–6 months)": {
    ouncesPerLb: 2.5,
    feedsPerDay: [6, 8],
    notes: "Some babies start showing readiness cues for solids around this window.",
    solids: "Talk with your pediatrician about first tastes of iron-fortified cereal or purées.",
  },
  "Infant (6–12 months)": {
    ouncesPerLb: 2,
    feedsPerDay: [4, 6],
    notes: "Bottles/breastfeeds gradually decrease as solid meals increase.",
    solids: "2–3 small meals a day of purées or soft finger foods, plus milk feeds.",
  },
  "Toddler (1–2 years)": {
    ouncesPerLb: 0,
    feedsPerDay: [3, 3],
    notes: "Most toddlers move to whole milk in a cup and drop overnight bottles.",
    solids: "3 meals plus 1–2 snacks a day of chopped, soft table foods.",
  },
  "Preschooler (2+ years)": {
    ouncesPerLb: 0,
    feedsPerDay: [3, 3],
    notes: "Milk becomes a drink alongside meals rather than a main food source.",
    solids: "3 meals plus 1–2 snacks a day, similar portions to the rest of the family, sized down.",
  },
};

const isBottleStage = (band: AgeBand) => GUIDANCE[band].ouncesPerLb > 0;

function FeedingPlanner() {
  const [ageBand, setAgeBand] = useState<AgeBand>("Infant (4–6 months)");
  const [weight, setWeight] = useState("14");
  const [unit, setUnit] = useState<"lb" | "kg">("lb");

  const guidance = GUIDANCE[ageBand];

  const result = useMemo(() => {
    const raw = Number(weight);
    if (!raw || raw <= 0) return null;
    if (!isBottleStage(ageBand)) return { perFeed: null, feedsPerDay: guidance.feedsPerDay };
    const lb = unit === "lb" ? raw : raw * 2.2046;
    if (lb > 60) return null;
    const dailyOunces = lb * guidance.ouncesPerLb;
    const [minFeeds, maxFeeds] = guidance.feedsPerDay;
    const avgFeeds = (minFeeds + maxFeeds) / 2;
    const perFeed = dailyOunces / avgFeeds;
    return {
      dailyOunces: Math.round(dailyOunces * 10) / 10,
      perFeed: Math.round(perFeed * 10) / 10,
      feedsPerDay: guidance.feedsPerDay,
    };
  }, [weight, unit, ageBand, guidance]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: TITLE,
        url: absoluteUrl("/tools/feeding-calculator"),
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any modern web browser",
        description: DESCRIPTION,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much formula does a baby need per feed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A common general starting point is about 2 to 2.5 ounces of formula per pound of body weight per day, split across the day's feeds. Every baby is different, so use this as a rough planning guide and follow your pediatrician's advice, especially in the first weeks.",
            },
          },
          {
            "@type": "Question",
            name: "Is this feeding planner medical advice?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This tool gives a general planning starting point only, not medical advice. Feeding needs vary with growth, appetite, and whether a baby is breastfed, formula-fed or eating solids. Always check with your pediatrician about your child's specific feeding plan.",
            },
          },
          {
            "@type": "Question",
            name: "When do babies start eating solid food?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many babies show readiness for solids around 4 to 6 months, but timing varies. Talk with your pediatrician before introducing solid foods or making major changes to feeding.",
            },
          },
        ],
      },
    ],
  };

  return (
    <AppShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Feeding planner", path: "/tools/feeding-calculator" },
            ]),
          ),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">Feeding planner</span>
      </nav>

      <h1 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
        Baby feeding planner
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Get a general starting point for bottles, formula and meals by age group and weight. Use it
        as a planning guide, then write the final routine on your child&apos;s care card so whoever
        feeds them gets it right.
      </p>

      <form className="mt-6 space-y-5 rounded-3xl border border-border bg-card p-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="ageBand">Age group</Label>
          <select
            id="ageBand"
            value={ageBand}
            onChange={(e) => setAgeBand(e.target.value as AgeBand)}
            className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-base"
          >
            {AGE_BANDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {isBottleStage(ageBand) && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                inputMode="decimal"
                min="1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 h-11 rounded-xl"
              />
            </div>
            <fieldset>
              <legend className="text-sm font-medium">Unit</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["lb", "kg"] as const).map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={unit === option ? "default" : "secondary"}
                    className="h-11 rounded-xl"
                    aria-pressed={unit === option}
                    onClick={() => setUnit(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </fieldset>
          </div>
        )}
      </form>

      <section className="mt-6 rounded-3xl border border-primary/25 bg-primary/5 p-5" aria-live="polite">
        <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">General planning estimate</h2>
        {isBottleStage(ageBand) ? (
          result && result.perFeed !== null ? (
            <div className="mt-3 space-y-2 text-base">
              <p>
                <span className="font-display text-3xl font-semibold">{result.perFeed}</span> oz per
                bottle (roughly)
              </p>
              <p className="text-muted-foreground">
                About {result.dailyOunces} oz total per day, split across {result.feedsPerDay[0]}–
                {result.feedsPerDay[1]} feeds. {guidance.notes}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-base text-muted-foreground">Enter a realistic weight to see an estimate.</p>
          )
        ) : (
          <div className="mt-3 space-y-2 text-base">
            <p className="font-display text-xl font-semibold">
              {guidance.feedsPerDay[0]} meals a day, plus milk as a drink
            </p>
            <p className="text-muted-foreground">{guidance.notes}</p>
          </div>
        )}
        <p className="mt-3 text-sm text-muted-foreground">{guidance.solids}</p>
      </section>

      <p className="mt-4 flex gap-3 rounded-2xl border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          This is general planning guidance only, not medical advice. Every baby feeds differently,
          and needs change quickly with growth. Always confirm feeding amounts, timing and the
          introduction of solid foods with your pediatrician, especially for newborns, premature
          babies, or any child with feeding or medical concerns.
        </span>
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">How this planner works</h2>
        <p className="mt-3 text-base leading-relaxed">
          For bottle-fed babies, a commonly used general starting point is about 2 to 2.5 ounces of
          formula per pound of body weight per day, divided across the typical number of feeds for
          that age group. As babies move onto solids, milk feeds gradually give way to meals and
          snacks. These figures are approximate ranges meant to help you plan a routine — not a
          prescription for your specific child.
        </p>
      </section>

      <aside className="mt-10 rounded-3xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold">Put the routine where it is needed</h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          A feeding plan only helps if the person caring for your child can see it. Add it to a care
          card with bottle or meal times, snack notes and foods to avoid, then share, print or scan
          it.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-xl px-6">
            <Link to="/children/new">Create a care card</Link>
          </Button>
        </div>
      </aside>
    </AppShell>
  );
}
