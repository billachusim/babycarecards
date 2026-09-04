import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { SITE_NAME, absoluteUrl, breadcrumbLd, publicHead } from "@/lib/seo";

const TITLE = "Talk About Your Child — Voice Babysitter Instructions";
const DESCRIPTION =
  "Speak for a minute and get a complete care card for your babysitter, nanny, grandparents or daycare. Voice fills in feeding, routine, medication, emergency contacts and your pediatrician — you check it before anything saves.";

const EXAMPLE_SPOKEN =
  "This is Mia, a fourteen-month-old toddler, about ten kilos. She has six ounces of formula at 7am, noon and 6pm, plus soft finger foods at lunch. No honey or whole nuts. She naps from 1 to 3 and needs her sound machine on. She takes half a dropper of vitamin D drops each morning. If anything happens, call her mom Sarah on 555 0134, and our pediatrician is Green Lane Pediatrics.";

const EXAMPLE_FIELDS: { label: string; value: string }[] = [
  { label: "Child", value: "Mia · Toddler · about 14 months · 10 kg" },
  { label: "Feeding", value: "6 oz formula at 7am, noon and 6pm; soft finger foods at lunch" },
  { label: "Foods to avoid", value: "Honey, whole nuts" },
  { label: "Routine", value: "Nap 1–3pm with sound machine on" },
  { label: "Medication", value: "Vitamin D drops — half a dropper each morning" },
  { label: "Emergency contact", value: "Sarah (mom) — 555 0134" },
  { label: "Pediatrician", value: "Green Lane Pediatrics" },
];

const STEPS: { name: string; text: string }[] = [
  {
    name: "Press the microphone",
    text: "Open Add Child and tap “Talk about your child”. Your browser asks for microphone access once.",
  },
  {
    name: "Say what a sitter should know",
    text: "Talk normally: who your child is, what and when they eat, their nap and bedtime routine, any medication, who to call and which pediatrician you use.",
  },
  {
    name: "Check what we wrote",
    text: "Every field appears on a review screen before anything is saved. Fix a word, add what was missed, and double-check medication against the label.",
  },
  {
    name: "Hand the card over",
    text: "Share the finished care card by link, print it for the fridge, or let your sitter scan a QR code at the door.",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How does voice babysitter instructions work?",
    answer:
      "You speak a short description of your baby or child — feeding, nap and bedtime routine, medication, who to call and your pediatrician. Baby Care Cards writes it into the matching care card fields and shows them to you for review. Nothing is saved until you confirm it, so you stay in control of every word.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes. It runs in the browser on phones, tablets and computers. Where your browser has built-in dictation, the speech is turned into text on the device itself; otherwise the recording is transcribed and then discarded.",
  },
  {
    question: "Is my voice recording stored?",
    answer:
      "No. Recordings are never saved. They are used only to produce the text you see on the review screen, and your child's details stay on your own device.",
  },
  {
    question: "Is it free?",
    answer:
      "You get two free voice fills. After that, voice is part of the one-off lifetime unlock — $4.99, one payment, no subscription. Typing everything in by hand stays free and unlimited.",
  },
  {
    question: "What languages does it support?",
    answer: "Voice fill is English only for now. You can type in any language you like.",
  },
  {
    question: "What if it gets something wrong?",
    answer:
      "Everything lands on an editable review screen first, so you can correct it before it saves. Always check medication names and doses against the label — Baby Care Cards never suggests, changes or interprets a dose.",
  },
];

export const Route = createFileRoute("/talk-about-your-child")({
  head: () =>
    publicHead({
      title: `${TITLE} | ${SITE_NAME}`,
      description: DESCRIPTION,
      path: "/talk-about-your-child",
    }),
  component: TalkAboutYourPetPage,
});

function TalkAboutYourPetPage() {
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create baby and child sitter instructions by talking",
    description: DESCRIPTION,
    url: absoluteUrl("/talk-about-your-child"),
    totalTime: "PT2M",
    tool: [{ "@type": "HowToTool", name: "A phone or computer with a microphone" }],
    step: STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${absoluteUrl("/talk-about-your-child")}#step-${index + 1}`,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <AppShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Talk about your child", path: "/talk-about-your-child" },
            ]),
          ),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">Talk about your child</span>
      </nav>

      <header>
        <h1 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
          Talk about your child — we&apos;ll write the care card
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Nobody wants to type out feeding times at 11pm the night before you go out. Speak for about a
          minute and Baby Care Cards fills in the babysitter instructions for you: bottles and meals,
          nap and diapering routine, medication, emergency contacts and your pediatrician. You check
          every field before anything is saved.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-xl px-6">
            <Link to="/children/new">
              <Mic className="size-4" aria-hidden="true" /> Try it — talk about your child
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-xl px-6">
            <Link to="/guides/$slug" params={{ slug: "voice-child-sitter-instructions" }}>
              Read the how-to guide
            </Link>
          </Button>
        </div>
      </header>

      <section className="mt-10" aria-labelledby="example-heading">
        <h2 id="example-heading" className="font-display text-2xl font-semibold">
          One minute of talking, one finished care card
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <figure className="rounded-3xl border border-border bg-secondary/50 p-6">
            <figcaption className="text-sm font-medium text-primary">What you say</figcaption>
            <blockquote className="mt-2 text-base leading-relaxed">
              &ldquo;{EXAMPLE_SPOKEN}&rdquo;
            </blockquote>
          </figure>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-primary">What your sitter gets</p>
            <dl className="mt-3 space-y-3 text-sm">
              {EXAMPLE_FIELDS.map((field) => (
                <div key={field.label} className="flex gap-3">
                  <dt className="w-36 shrink-0 text-muted-foreground">{field.label}</dt>
                  <dd className="min-w-0 flex-1">{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="font-display text-2xl font-semibold">
          How it works
        </h2>
        <ol className="mt-4 space-y-3">
          {STEPS.map((step, index) => (
            <li
              key={step.name}
              id={`step-${index + 1}`}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-semibold text-primary">
                {index + 1}
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">{step.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="who-heading">
        <h2 id="who-heading" className="font-display text-2xl font-semibold">
          Who you&apos;re handing the card to
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          The same spoken description works for whoever is stepping in:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "A professional babysitter who has never met your child before",
            "A nanny covering a few days while you travel",
            "Grandparents or family watching the kids for the weekend",
            "A neighbour or friend doing school pickup and an afternoon of care",
            "A daycare or preschool that asks for written care instructions",
            "A partner or older sibling handling the routine on their own for once",
          ].map((audience) => (
            <li key={audience} className="rounded-2xl border border-border bg-card p-4 text-sm">
              {audience}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="font-display text-2xl font-semibold">
          What voice does and doesn&apos;t do
        </h2>
        <ul className="mt-4 space-y-3 text-base leading-relaxed">
          <li className="rounded-2xl border border-border bg-card p-4">
            <strong>Nothing saves until you say so.</strong> Everything lands on an editable review
            screen first, with blanks left blank rather than guessed.
          </li>
          <li className="rounded-2xl border border-border bg-card p-4">
            <strong>Your recording isn&apos;t kept.</strong> Audio is used to produce the text and
            then discarded. Your child&apos;s details stay on your device.
          </li>
          <li className="rounded-2xl border border-border bg-card p-4">
            <strong>Medication is copied, never interpreted.</strong> Doses are written down exactly
            as you say them and flagged for you to check against the label. Baby Care Cards gives no
            medical advice.
          </li>
          <li className="rounded-2xl border border-border bg-card p-4">
            <strong>Two free voice fills, then the one-off unlock.</strong> $4.99, one payment,
            lifetime access, no subscription. Typing stays free.
          </li>
          <li className="rounded-2xl border border-border bg-card p-4">
            <strong>English for now.</strong> Voice fill understands English; you can always type in
            any language.
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-2xl font-semibold">
          Questions people ask
        </h2>
        <dl className="mt-4 space-y-5">
          {FAQS.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-card p-5">
              <dt className="font-display text-lg font-semibold">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="mt-10 rounded-3xl border border-border bg-secondary/50 p-6">
        <h2 className="font-display text-2xl font-semibold">Rather write it out?</h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Use the free{" "}
          <Link to="/templates" className="text-primary hover:underline">
            printable child care templates
          </Link>{" "}
          or work through the{" "}
          <Link
            to="/guides/$slug"
            params={{ slug: "child-sitter-care-card-checklist" }}
            className="text-primary hover:underline"
          >
            babysitter care card checklist
          </Link>
          . Both cover exactly the same details voice fills in for you.
        </p>
        <Button asChild size="lg" className="mt-5 h-12 rounded-xl px-6">
          <Link to="/children/new">Create a care card</Link>
        </Button>
      </aside>
    </AppShell>
  );
}
