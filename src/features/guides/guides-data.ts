export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  checklist?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** Short, citation-friendly answer shown at the top of the page. */
  answer: string;
  published: string;
  updated: string;
  readMinutes: number;
  medicalDisclaimer?: boolean;
  intro: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: string[];
  /** True for guides written by the weekly automatic publisher. */
  generated?: boolean;
}

export const AUTHOR = "The Baby Care Cards team";

export const GUIDES: Guide[] = [
  {
    slug: "babysitter-care-card-checklist",
    title: "The babysitter care card checklist",
    metaTitle: "Babysitter Care Card Checklist (What to Include) — Baby Care Cards",
    description:
      "A complete checklist of what to write down for a babysitter: feeding, routine, nap schedule, medication, emergency contacts and pediatrician details, in the order a sitter needs them.",
    answer:
      "A babysitter care card should cover seven things: who the child is, feeding, daily routine, nap and bedtime, medication, emergency contacts, and the pediatrician's name, phone and address. Write it in that order so a sitter can find what they need in seconds, and leave one copy visible in the home plus a shareable digital copy.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 6,
    intro: [
      "Most babysitting problems are not caused by bad sitters. They are caused by missing information: nobody wrote down that the stair gate sticks, that the last bottle should be smaller before bed, or that the pediatrician's line closes at noon on Saturdays.",
      "This checklist is the same structure Baby Care Cards uses, and you can work through it in about two minutes per child.",
    ],
    sections: [
      {
        heading: "1. Who the child is",
        paragraphs: [
          "Start with the basics a stranger cannot guess: name, age, allergies, and temperament. Age matters because it changes everything from portion size to bedtime. Temperament tells the sitter what normal looks like.",
        ],
        checklist: [
          "Name, nickname and a recent photo",
          "Age, allergies and any medical conditions",
          "Weight (approximate is fine, useful if a pediatrician asks)",
          "Personality notes: shy with strangers, scared of the vacuum, comfort object needed to settle",
          "Preferred way to be comforted when upset",
        ],
      },
      {
        heading: "2. Feeding",
        paragraphs: [
          "Be specific about amounts and containers. \"A bit of milk\" means nothing to someone who has never made your child's bottle.",
        ],
        checklist: [
          "Formula or food brand and where it is stored",
          "Amount per feed or meal, in ounces or grams",
          "Number of feeds/meals and the times",
          "Snacks: which ones, how many per day",
          "Foods to avoid, including choking hazards and known allergens",
          "Cup or bottle preferences and how to warm a bottle safely",
        ],
      },
      {
        heading: "3. Daily routine",
        paragraphs: [
          "Routine is what keeps a small child calm while you are away. Write the shape of the day rather than an exact schedule.",
        ],
        checklist: [
          "Nap times and typical length",
          "Diaper change or bathroom routine",
          "Playtime and what they actually enjoy",
          "Bedtime routine, in order, step by step",
          "Screen time rules and any household limits",
        ],
      },
      {
        heading: "4. Medication",
        paragraphs: [
          "List only what your pediatrician has already prescribed: the name, the dose exactly as written on the label, when it is given, and how. Note where the medication is stored and what to do if a dose is missed.",
        ],
      },
      {
        heading: "5. Emergency information",
        paragraphs: [
          "This section should be visually separate from everything else so it can be found under stress.",
        ],
        checklist: [
          "Your phone number, plus a second contact who can make decisions",
          "Pediatrician's clinic name, phone number and full address",
          "Nearest urgent care or children's emergency room",
          "Any spending authorisation you want to give in writing",
          "Known conditions, allergies and reactions",
        ],
      },
      {
        heading: "6. House details the sitter will need",
        bullets: [
          "Where diapers, wipes, spare clothes and cleaning supplies live",
          "Alarm codes, door locks and parking instructions",
          "Anything that is off limits, including rooms or stairs",
        ],
      },
      {
        heading: "7. Leave it in two places",
        paragraphs: [
          "Print one copy and leave it on the fridge or by the changing table, and share a digital copy so the sitter has it on their phone when they are out for a walk. A QR code taped near the door covers both.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much detail is too much for a babysitter?",
        answer:
          "If a detail changes what the sitter does, include it. If it only explains why, leave it out. One page per child is a good target, with the emergency section always visible.",
      },
      {
        question: "Should I give the sitter permission to authorise medical care?",
        answer:
          "Yes, in writing. State a limit you are comfortable with and confirm it with your pediatrician's office, so treatment is not delayed while someone tries to reach you.",
      },
      {
        question: "What if I have more than one child?",
        answer:
          "Make a separate card for each child. Shared instructions get skimmed, and feeding or nap mix-ups between children are one of the most common sitter mistakes.",
      },
    ],
    related: ["what-to-leave-for-a-babysitter", "child-emergency-contact-sheet", "printable-child-care-card-template", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "what-to-leave-for-a-babysitter",
    title: "What to leave for a babysitter",
    metaTitle: "What to Leave for a Babysitter: Info, Supplies, Access — Baby Care Cards",
    description:
      "Exactly what a babysitter needs from you: written care instructions, supplies laid out, house access, pediatrician authorisation and the details parents usually forget.",
    answer:
      "Leave a babysitter three things: written care instructions (feeding, routine, medication, emergencies), the supplies they need laid out in one place, and access details for your home. Add your pediatrician's contact information and written permission to authorise treatment up to an amount you choose.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 5,
    intro: [
      "A good handover takes ten minutes and prevents almost every awkward text message while you are out.",
    ],
    sections: [
      {
        heading: "Written instructions come first",
        paragraphs: [
          "Verbal handovers are forgotten within an hour. Give the sitter something they can re-read: feeding amounts and times, nap schedule, bedtime routine, medication, house rules and emergency contacts.",
        ],
      },
      {
        heading: "Supplies to lay out",
        checklist: [
          "Enough formula or food for the full evening, plus a backup portion",
          "Bottles, sippy cup, or a pre-portioned set of meals",
          "Diapers, wipes and a spare outfit",
          "Snacks, separated from any allergen foods in the house",
          "Comfort item: blanket, pacifier or favourite toy",
          "First aid basics: thermometer, infant pain reliever if authorised",
          "Crib, monitor and a nightlight if needed",
        ],
      },
      {
        heading: "Access and house details",
        checklist: [
          "Keys or door code, and how the lock behaves if it sticks",
          "Alarm code and what to do if it goes off",
          "Wi-Fi password",
          "Which doors, gates or stairs must stay closed",
          "Neighbour's number as a backup",
        ],
      },
      {
        heading: "Pediatrician and emergency authorisation",
        paragraphs: [
          "Give the pediatrician's name, phone number and address, the nearest children's urgent care, and a written note authorising treatment up to a set amount. Tell your pediatrician's office who is caring for your child so they will accept the sitter's call.",
        ],
      },
      {
        heading: "The details parents forget",
        bullets: [
          "Which foods are choking hazards at this age",
          "How the child reacts to strangers or loud noises",
          "Whether the child can be left alone in a room, and for how long",
          "What settles the child during a meltdown",
          "How much crying or fussing is normal at bedtime",
        ],
      },
      {
        heading: "Do a short walkthrough",
        paragraphs: [
          "Walk the sitter through one feed and one nap or bedtime step before you leave if you can. It surfaces the things you would never think to write down.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much food should I leave for a babysitter?",
        answer:
          "Leave enough for the full evening plus one extra portion, in case you are delayed. Pre-portioning bottles or meals removes any guesswork about amounts.",
      },
      {
        question: "Should the sitter have my pediatrician's details even for a short evening?",
        answer:
          "Yes. Emergencies are not proportional to how long you are out, and a clinic will move faster when the caller already has the child's name, age and details.",
      },
    ],
    related: ["babysitter-care-card-checklist", "infant-feeding-schedule-template", "child-emergency-contact-sheet", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "leaving-your-baby-with-grandparents",
    title: "Leaving your baby with grandparents: what to write down",
    metaTitle: "Leaving Your Baby With Grandparents: A Checklist — Baby Care Cards",
    description:
      "How to prepare grandparents to care for your baby, covering feeding, sleep, safe sleep rules, medication, and the updates in child care that have changed since they raised their own children.",
    answer:
      "When leaving a baby with grandparents, write down feeding amounts and times, the current safe sleep setup, nap and bedtime routine, medication, and warning signs that need a pediatrician call. Gently note anything that has changed since they raised their own children, especially safe sleep and allergen introduction guidance.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 5,
    intro: [
      "Grandparents are often the most trusted caregivers, but childcare guidance has changed a lot in a generation. Written instructions bridge that gap without an awkward conversation in the moment.",
    ],
    sections: [
      {
        heading: "Feeding",
        checklist: [
          "Formula or milk amounts, per feed, with times",
          "Where food is stored and how long an opened bottle is safe to use",
          "Any new foods being introduced, and known allergies",
          "Water: cup, bottle, or both, and how much is normal",
        ],
      },
      {
        heading: "Safe sleep, updated",
        paragraphs: [
          "Current guidance recommends babies sleep alone, on their back, on a firm flat surface with nothing loose in the crib. This is a common area where advice has changed since grandparents raised their own children, so it is worth writing down plainly rather than assuming it is known.",
        ],
      },
      {
        heading: "Routine and comfort",
        paragraphs: [
          "Write down what a normal day looks like so a grandparent can spot when something is off, and what usually settles your baby when upset.",
        ],
      },
      {
        heading: "Car seats and safety equipment",
        bullets: [
          "How the car seat buckles and reclines",
          "Which rooms or stairs need a gate",
          "Choking hazards at this age, including small toys and certain foods",
        ],
      },
      {
        heading: "Medication",
        paragraphs: [
          "If your baby takes prescribed medication, write the name, the dose exactly as labelled, the time, and how it is given. Note what to do if a dose is spat out or missed.",
        ],
      },
      {
        heading: "When to call a pediatrician",
        paragraphs: [
          "Give a short, plain list of things that need a call rather than a wait: a fever over a stated threshold for the baby's age, repeated vomiting, unusual drowsiness, or breathing that seems laboured. Add the pediatrician's number next to it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I raise updated safe sleep guidance without it sounding like criticism?",
        answer:
          "Frame it as what your pediatrician recommends now rather than a correction of the past. Most grandparents appreciate clear, current instructions rather than a debate.",
      },
      {
        question: "What should a grandparent report back after a visit?",
        answer:
          "Ask for a short message covering how much was eaten, how naps went, and how the baby's mood was. That is enough to spot most problems early.",
      },
    ],
    related: ["babysitter-care-card-checklist", "infant-feeding-schedule-template", "child-emergency-contact-sheet", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "child-emergency-contact-sheet",
    title: "How to make a child emergency contact sheet",
    metaTitle: "Child Emergency Contact Sheet: What to Include — Baby Care Cards",
    description:
      "Build a one-page child emergency contact sheet with parent and backup contacts, pediatrician and urgent care details, medical history and written treatment authorisation.",
    answer:
      "A child emergency contact sheet needs the parent's number, a backup decision-maker, the regular pediatrician's name, phone and address, the nearest children's urgent care or emergency room, the child's known conditions and medications, and written authorisation for treatment up to a stated amount. Keep it to one page and post it where a caregiver can see it.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 4,
    intro: [
      "Emergency information is only useful if it can be read by a stressed person in ten seconds. That means one page, big type, and no searching.",
    ],
    sections: [
      {
        heading: "People",
        checklist: [
          "Parent name and mobile number",
          "Second contact who can make decisions if you cannot be reached",
          "Neighbour or trusted key holder",
        ],
      },
      {
        heading: "Pediatric care",
        checklist: [
          "Regular pediatrician: name, phone, full address, opening hours",
          "Nearest children's urgent care or emergency room: name, phone, address",
          "Health insurance provider and policy number",
          "Preferred hospital, if you have one",
        ],
      },
      {
        heading: "Medical context",
        paragraphs: [
          "List diagnosed conditions, current prescribed medications, known allergies and past reactions, exactly as your pediatrician has recorded them. This is context for the clinic, not instructions to act on.",
        ],
      },
      {
        heading: "Written authorisation",
        paragraphs: [
          "Add a line such as: \"I authorise [caregiver name] to seek medical treatment for [child name] and approve costs up to [amount].\" Sign and date it, and give your pediatrician a copy before you travel.",
        ],
      },
      {
        heading: "Where to keep it",
        bullets: [
          "Printed on the fridge or by the front door",
          "On the caregiver's phone as a shared link",
          "A QR code near the changing table, so anyone in the home can open it",
        ],
      },
    ],
    faqs: [
      {
        question: "What information does an emergency room ask for first?",
        answer:
          "Your child's age, weight, known allergies, what happened and when, and any medications or conditions. Having those written down saves several minutes at intake.",
      },
      {
        question: "Should I include a spending limit?",
        answer:
          "Yes. A stated limit lets a clinic begin care immediately instead of waiting for you, and it protects the caregiver from making a financial decision on your behalf.",
      },
    ],
    related: ["babysitter-care-card-checklist", "medication-instructions-for-a-babysitter", "printable-child-care-card-template"],
  },
  {
    slug: "medication-instructions-for-a-babysitter",
    title: "Writing medication instructions for a babysitter",
    metaTitle: "Medication Instructions for a Babysitter — Baby Care Cards",
    description:
      "How to write down your child's prescribed medication for a babysitter: name, dose as labelled, timing, method, storage, missed doses and when to call the pediatrician.",
    answer:
      "Copy each medication exactly as your pediatrician labelled it: medication name, dose, how often, how it is given, and start and end dates. Add where it is stored, what to do about a missed or spat-out dose, and the pediatrician's number to call with questions. Never ask a babysitter to judge a dose.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 5,
    medicalDisclaimer: true,
    intro: [
      "Medication is the part of child care where vague notes cause real harm. The goal is a babysitter who never has to interpret anything.",
    ],
    sections: [
      {
        heading: "Copy the label, do not paraphrase",
        paragraphs: [
          "Write the medication name, strength and dose exactly as printed on your pediatrician's label, including the units. If the label says half a teaspoon, say half a teaspoon and note which measuring device to use.",
        ],
      },
      {
        heading: "One line per medication",
        checklist: [
          "Medication name and strength",
          "Dose, exactly as labelled",
          "Times of day, written as clock times",
          "With food or without",
          "How it is given: liquid, chewable, drops",
          "Start and end date, if the course ends",
          "Where it is stored, including anything refrigerated",
        ],
      },
      {
        heading: "Make the timing unmissable",
        paragraphs: [
          "Attach medication to something the caregiver already does, such as the evening meal. A reminder on their phone plus a written schedule works better than either alone.",
        ],
      },
      {
        heading: "Missed and refused doses",
        paragraphs: [
          "Ask your pediatrician in advance what to do if a dose is missed or the child spits it out, and write down their answer. Then the babysitter follows your pediatrician's instruction rather than guessing.",
        ],
      },
      {
        heading: "When to call",
        bullets: [
          "Two or more missed doses",
          "Vomiting shortly after a dose",
          "Any new symptom after a medication change",
          "Anything the babysitter is unsure about",
        ],
      },
      {
        heading: "Hand over the actual packaging",
        paragraphs: [
          "Leave the medication in its original labelled container. It confirms your written notes and gives a pediatrician everything they need if something goes wrong.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I ask a babysitter to give an epinephrine auto-injector?",
        answer:
          "Only if they have agreed, are comfortable doing it, and have been shown how by you or a medical professional. Confirm it before booking rather than on the day, and always call emergency services after use.",
      },
      {
        question: "What should the babysitter do if unsure about a dose?",
        answer:
          "They should not give it and should call your pediatrician's office, which is why the clinic number belongs on the same page as the medication list.",
      },
    ],
    related: ["babysitter-care-card-checklist", "child-emergency-contact-sheet", "infant-feeding-schedule-template"],
  },
  {
    slug: "infant-feeding-schedule-template",
    title: "An infant feeding schedule template you can hand over",
    metaTitle: "Infant Feeding Schedule Template for Sitters — Baby Care Cards",
    description:
      "A simple feeding schedule template for babysitters: feed times, exact amounts, snacks, foods to avoid and what to do when a baby refuses a feed.",
    answer:
      "A usable feeding schedule lists each feed by clock time with an exact amount in ounces or grams, names the formula or food and where it is stored, states any snack allowance, lists foods to avoid, and says what to do if the baby does not feed. Amounts should never be described as \"a bit\" or \"however much they want.\"",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 4,
    intro: [
      "Feeding is the instruction a babysitter follows most often, so it is worth making it precise.",
    ],
    sections: [
      {
        heading: "The template",
        bullets: [
          "Feed 1 — time — formula/food — amount — with or without medication",
          "Feed 2 — time — formula/food — amount",
          "Snacks — which ones — maximum per day",
          "Water — cup or bottle — how much is normal",
          "Foods to avoid — including known allergens and choking hazards",
          "If they do not feed — what to try, and when to call you",
        ],
      },
      {
        heading: "Use measurable amounts",
        paragraphs: [
          "Ounces or millilitres are best. If you use a scoop for formula, say exactly how many scoops per ounce of water and whether they are level.",
        ],
      },
      {
        heading: "Pre-portion for an evening out",
        paragraphs: [
          "Pre-measuring formula into containers, or pre-portioning solid meals, removes every possible mistake and lets you see at a glance whether feeds were given.",
        ],
      },
      {
        heading: "Multi-child households",
        paragraphs: [
          "Say which child eats what, especially if one has an allergy. Note which foods must never cross between children's plates.",
        ],
      },
      {
        heading: "When a baby will not feed",
        paragraphs: [
          "Give one simple fallback, such as trying again in twenty minutes, and a clear threshold for calling you or the pediatrician. A baby who refuses two feeds in a row, or seems unusually sleepy, needs a call.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I introduce a new food before leaving my baby with a sitter?",
        answer:
          "No. Introduce new foods when you are present, in case of an allergic reaction, and keep the diet familiar while a sitter is in charge.",
      },
      {
        question: "How do I handle a baby who feeds on demand rather than a schedule?",
        answer:
          "Give a daily total range and typical spacing between feeds, and ask the sitter to note times and amounts as they go, so you still know how much was taken.",
      },
    ],
    related: ["what-to-leave-for-a-babysitter", "toddler-feeding-schedule", "babysitter-care-card-checklist"],
  },
  {
    slug: "printable-child-care-card-template",
    title: "Printable child care card template",
    metaTitle: "Printable Baby Care Cards Template (Free) — Baby Care Cards",
    description:
      "The structure of a printable one-page child care card, how to lay it out for readability, and how to make a digital and QR version for your babysitter.",
    answer:
      "A printable child care card fits on one page in this order: child header with photo, about, feeding, routine, medication, emergency contacts and pediatrician. Use large type, keep the emergency block visually distinct, and pair the printed copy with a shareable link or QR code so the babysitter has it on their phone.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 4,
    intro: [
      "A printed card on the fridge is still the most reliable format, because it works with no phone, no battery and no signal.",
    ],
    sections: [
      {
        heading: "The layout that works",
        bullets: [
          "Header: photo, name, age, allergies, weight",
          "About: personality and things to know",
          "Feeding: times and exact amounts",
          "Routine: naps, bedtime, diaper changes",
          "Medication: name, dose as labelled, times",
          "Emergency: your number, backup contact, pediatrician, nearest urgent care",
        ],
      },
      {
        heading: "Formatting rules",
        bullets: [
          "One child per page",
          "Body text no smaller than 11pt",
          "Emergency block bordered or shaded so it is found instantly",
          "No colour-only meaning, so it still reads when printed in black and white",
          "Leave the sections you do not need out entirely rather than writing N/A",
        ],
      },
      {
        heading: "Print and digital together",
        paragraphs: [
          "Print one copy for the fridge and one for the child's overnight bag if they are staying elsewhere, then share a link so the caregiver has the same information out and about. A QR code near the door lets anyone in the home open it without asking you.",
        ],
      },
      {
        heading: "Keep it current",
        paragraphs: [
          "Re-check the card before every booking. Doses, pediatrician numbers and feeding amounts change more often than people expect, especially in the first year.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Baby Care Cards produce a printable version?",
        answer:
          "Yes. Every care card has a print-optimised layout, and a PDF export sized for A4 and Letter is available with the lifetime unlock.",
      },
      {
        question: "How many copies should I leave?",
        answer:
          "Two printed copies is a sensible default: one on the fridge and one with the child's overnight bag, plus the shared digital link.",
      },
    ],
    related: ["babysitter-care-card-checklist", "child-emergency-contact-sheet", "infant-feeding-schedule-template", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "newborn-feeding-schedule-by-age",
    title: "Newborn feeding schedule by age",
    metaTitle: "Newborn Feeding Schedule by Age (0 to 12 Months) — Baby Care Cards",
    description:
      "How often to feed a newborn in the first weeks, at 3 months, 6 months and a year, how to split feeds across the day, and how to write the schedule down so a sitter can follow it exactly.",
    answer:
      "Newborns typically feed 8 to 12 times a day in the first few weeks, dropping to around 6 to 8 feeds by 3 months as they take more per feed. From 6 months, solids are usually introduced alongside milk feeds, moving toward 3 meals a day by 12 months. Keep feed times consistent when a caregiver is involved, and follow the amounts your pediatrician recommends for your baby's age and weight.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readMinutes: 6,
    medicalDisclaimer: true,
    intro: [
      "Newborns feed often because their stomachs are small and they grow quickly. The number of feeds drops as they get older and take more per feed, while total daily intake changes with growth and, later, solid food.",
      "This page gives the usual pattern by age, then shows how to write it down so whoever is feeding your baby while you are out gets it right without texting you.",
    ],
    sections: [
      {
        heading: "The usual schedule by age",
        bullets: [
          "0 to 6 weeks: 8 to 12 feeds a day, roughly every 2 to 3 hours, including overnight.",
          "6 weeks to 3 months: around 6 to 8 feeds a day, gradually spacing out.",
          "4 to 6 months: around 5 to 6 milk feeds a day; solids often begin around 6 months.",
          "6 to 12 months: milk feeds reduce as 2 to 3 solid meals a day are introduced, alongside continued milk feeds.",
        ],
        paragraphs: [
          "Every baby's pattern varies, and premature or low-weight babies may need a different schedule set by their pediatrician. A generic table is a starting point, not an instruction.",
        ],
      },
      {
        heading: "How much per feed",
        paragraphs: [
          "For formula-fed babies, follow the amount your pediatrician recommends based on current weight, usually given as ounces per feed or per day. For breastfed babies, feeding is typically on demand, so write down typical timing and duration rather than an exact volume. Always confirm amounts with your pediatrician rather than a generic chart.",
        ],
      },
      {
        heading: "Keep the times consistent for a caregiver",
        paragraphs: [
          "Regular feed times help a babysitter or grandparent know what to expect and when to worry. If you are handing over care, write the actual clock times, not \"morning and afternoon.\"",
        ],
        checklist: [
          "Feed times as clock times: 7:00, 11:00, 15:00, 19:00",
          "Amount per feed in ounces or grams",
          "Formula brand or food, and where it is stored",
          "How to prepare a bottle safely, including water temperature",
          "Snacks or solids allowed, if applicable",
          "Foods that must never be given, including choking hazards",
        ],
      },
      {
        heading: "Common mistakes when someone else feeds your baby",
        bullets: [
          "Feeding on a loose schedule instead of the written times",
          "Using a different bottle or scoop measure than you use",
          "Introducing a new food while you are away",
          "Doubling up because nobody wrote down that the baby already fed",
          "Warming a bottle in the microwave, which can create hot spots",
        ],
      },
      {
        heading: "Write it into a care card",
        paragraphs: [
          "A feeding schedule only works if the person feeding can see it. Put the times, amounts and foods to avoid on one card, leave a printed copy near the changing table, and share a link or QR code so it is on the caregiver's phone too.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many times a day should a 3-month-old feed?",
        answer:
          "Around 6 to 8 feeds a day is typical at 3 months, spaced fairly evenly through the day and night. Every baby differs, so follow your pediatrician's guidance for your baby specifically.",
      },
      {
        question: "When can a baby move to three meals a day?",
        answer:
          "Most babies move toward three solid meals a day between 9 and 12 months, alongside continued milk feeds. Confirm the timing and portions with your pediatrician.",
      },
      {
        question: "Should feeds be strictly scheduled or on demand?",
        answer:
          "Many families use a loose schedule that follows the baby's hunger cues. For a babysitter, write down the typical pattern and amounts so they have a clear guide even if timing shifts slightly.",
      },
      {
        question: "What do I tell a sitter about feeding a baby?",
        answer:
          "The exact feed times, the amount per feed, the formula or food and its location, how to prepare it safely, and what to do if a feed is refused — including when to call you.",
      },
    ],
    related: [
      "infant-feeding-schedule-template",
      "infant-feeding-chart-by-age",
      "babysitter-care-card-checklist",
    ],
  },
  {
    slug: "how-to-give-a-child-medicine",
    title: "How to give a child medicine without the fight",
    metaTitle: "How to Give a Child Medicine: 6 Methods That Work — Baby Care Cards",
    description:
      "Practical ways to give a toddler or young child liquid medicine, chewables or drops, plus how to tell whether it was swallowed and how to write the instructions down for a babysitter.",
    answer:
      "The easiest way to give a young child liquid medicine is with an oral syringe aimed toward the inside of the cheek, given slowly so the child can swallow comfortably, followed by a favourite drink to take away the taste. For chewables, offering it alongside a preferred snack often helps. Never crush, split or mix medication into a full bottle or meal without asking your pediatrician first, since that risks an incomplete dose.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readMinutes: 6,
    medicalDisclaimer: true,
    intro: [
      "Giving medication is the step most likely to go wrong when someone else is looking after a child. The dose gets spat out, refused, or given twice because nobody recorded the first attempt.",
      "Below are the methods that usually work, in the order most parents find easiest, and how to write your child's method down so a babysitter can repeat it.",
    ],
    sections: [
      {
        heading: "Before you start: check with your pediatrician",
        paragraphs: [
          "Ask two things when the medication is prescribed: can it be mixed with a small amount of food or drink, and can it be split or crushed. Some medicines are formulated for a reason, and some are absorbed differently with food. This page explains technique only — never change a dose, a schedule or a formulation on your own.",
        ],
      },
      {
        heading: "Method 1 — the oral syringe",
        paragraphs: [
          "Draw up the exact dose in an oral syringe, sit the child upright or semi-upright, and aim the syringe toward the inside of the cheek rather than the back of the throat. Give it slowly in small amounts so the child can swallow comfortably between squirts.",
        ],
      },
      {
        heading: "Method 2 — a small chaser",
        bullets: [
          "A favourite juice or flavoured drink straight after, to take away the taste",
          "A small ice pop, which can also numb the taste buds slightly beforehand",
          "A preferred snack offered right after chewable medicine",
        ],
        paragraphs: [
          "Only mix medicine into a small amount of food or drink if your pharmacist confirms it will not affect how the medicine works, and only if the child is likely to finish the whole portion — a partly eaten dose is a partial dose.",
        ],
      },
      {
        heading: "Method 3 — offering choice and control",
        checklist: [
          "Let the child choose which cup or spoon is used, within your set options",
          "Count down together or use a favourite short song to structure it",
          "Praise and a small reward immediately after, every time",
          "Stay calm and matter-of-fact rather than anxious, which children pick up on",
          "Avoid describing it as a treat, which can cause confusion later",
        ],
      },
      {
        heading: "How to tell it was actually taken",
        paragraphs: [
          "Watch for a clear swallow and check the syringe or spoon is empty. If a child spits some out, note roughly how much was lost so you can call the pediatrician to ask whether to redose, rather than guessing.",
        ],
      },
      {
        heading: "Writing the instructions for a babysitter",
        checklist: [
          "Medication name exactly as printed on the label",
          "Dose and time, copied from the label rather than memory",
          "The method that works for your child, described step by step",
          "Which drink or snack may be used as a chaser, and which must be avoided",
          "Where the medication is stored",
          "What to do if a dose is refused or spat out, and who to call",
          "A place to tick off each dose so nobody doubles up",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I mix my child's medicine into a full bottle of milk?",
        answer:
          "This is generally discouraged, because if the child does not finish the whole bottle they receive an incomplete dose. Ask your pharmacist for the safest way to give the specific medication your child has been prescribed.",
      },
      {
        question: "What if my child refuses the medicine completely?",
        answer:
          "Do not force it. Write down what was attempted and call your pediatrician's office for guidance on whether and how to redose, rather than trying repeatedly on your own.",
      },
    ],
    related: ["medication-instructions-for-a-babysitter", "child-emergency-contact-sheet", "infant-feeding-schedule-template"],
  },
  {
    slug: "toddler-feeding-schedule",
    title: "A toddler feeding schedule that actually helps a sitter",
    metaTitle: "Toddler Feeding Schedule for Babysitters — Baby Care Cards",
    description:
      "How to write a toddler feeding schedule covering meal times, portion sizes, picky eating, snacks and the warning signs that need a pediatrician call.",
    answer:
      "A toddler feeding schedule should cover three meals and two snacks a day with approximate times, typical portion sizes, foods to avoid, and how to handle picky eating without turning it into a battle. Include what counts as a red flag, such as refusing all food and drink for a full day, which needs a pediatrician call.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 5,
    intro: [
      "Toddlers eat unpredictably by nature, so a sitter needs less time pressure and more guidance on what is normal than an exact schedule can give.",
    ],
    sections: [
      {
        heading: "Meals and snacks",
        checklist: [
          "Breakfast, lunch and dinner times, with typical portion sizes",
          "Morning and afternoon snack times",
          "Where food is stored and how it should be prepared",
          "Cups versus bottles, and preferred drinks",
        ],
      },
      {
        heading: "Picky eating",
        paragraphs: [
          "Note which foods are reliably accepted and which are currently refused. Ask the sitter to offer, not pressure, and to tell you what was actually eaten rather than what was served: toddlers often eat far less than the plate suggests.",
        ],
      },
      {
        heading: "Choking hazards and cutting food",
        paragraphs: [
          "Write down how food must be prepared at this age — grapes halved, hot dogs sliced lengthwise, nuts avoided — and note if the child should always be seated while eating.",
        ],
      },
      {
        heading: "Allergies and known reactions",
        bullets: [
          "Confirmed allergies and what a reaction looks like",
          "Foods being newly introduced, if any, and what to watch for",
          "Whether an allergy medication or auto-injector is on hand and how to use it",
        ],
      },
      {
        heading: "When to call a pediatrician",
        paragraphs: [
          "Give the sitter a short, plain list of things that need a call rather than a wait: refusing all food and drink for a day, repeated vomiting, a rash after eating, or any sign of an allergic reaction. Add your pediatrician's number next to it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a toddler eat when being babysat?",
        answer:
          "Three meals and two snacks a day is typical for most toddlers. A visit should include offering food at the usual times and reporting back what was actually eaten.",
      },
      {
        question: "What should a babysitter report back after mealtimes?",
        answer:
          "Ask for a short message covering how much was eaten at each meal, any refused foods, and any new reactions. That is enough to spot most problems early.",
      },
    ],
    related: ["babysitter-care-card-checklist", "infant-feeding-schedule-template", "child-emergency-contact-sheet", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "infant-feeding-chart-by-age",
    title: "Infant feeding chart by age and weight",
    metaTitle: "Infant Feeding Chart by Age and Weight — Baby Care Cards",
    description:
      "A general guide to how much a baby typically eats at each age and weight, how portions change over the first year, and how to confirm the right amount with your pediatrician.",
    answer:
      "As a general guide, newborns take around 1.5 to 3 ounces per feed in the early weeks, rising to about 4 to 6 ounces per feed by 4 to 6 months, then gradually replacing some milk feeds with solids from 6 months onward. These are general planning ranges only — always confirm the right amount for your baby's age and weight with your pediatrician or the guidance on your formula packaging.",
    published: "2026-09-03",
    updated: "2026-09-03",
    readMinutes: 5,
    medicalDisclaimer: true,
    intro: [
      "Portion sizes change quickly in the first year as babies grow and, later, start solids. This chart gives general planning ranges so you can write an accurate schedule for a caregiver, but it is not a substitute for your pediatrician's guidance on your specific baby.",
    ],
    sections: [
      {
        heading: "General ranges by age",
        bullets: [
          "0 to 2 weeks: roughly 1.5 to 3 ounces per feed, 8 to 12 feeds a day.",
          "1 to 2 months: roughly 3 to 4 ounces per feed, 6 to 8 feeds a day.",
          "3 to 5 months: roughly 4 to 5 ounces per feed, 5 to 6 feeds a day.",
          "6 to 8 months: roughly 5 to 6 ounces per feed alongside introducing solids, 4 to 5 feeds a day.",
          "9 to 12 months: milk feeds reduce as 3 solid meals plus snacks are introduced.",
        ],
        paragraphs: [
          "These ranges are for formula-fed babies as a planning guide; breastfed babies typically feed on demand and volume is harder to measure directly. A baby's weight, growth rate and appetite all affect the right amount, so treat this as a starting point for conversation with your pediatrician, not a target.",
        ],
      },
      {
        heading: "Signs your baby is getting enough",
        bullets: [
          "Steady weight gain, tracked at checkups",
          "Regular wet and dirty diapers appropriate for age",
          "Generally content between feeds",
          "Alert and active periods during the day",
        ],
      },
      {
        heading: "Signs to check with your pediatrician",
        bullets: [
          "Consistently refusing feeds or taking far less than usual",
          "Poor weight gain at checkups",
          "Excessive spit-up or signs of discomfort after feeding",
          "Fewer wet diapers than expected for age",
        ],
      },
      {
        heading: "Writing this into a caregiver's schedule",
        paragraphs: [
          "Once your pediatrician has confirmed the right amount for your baby, write the exact figure into your care card rather than a range, so a sitter or grandparent is following your baby's real numbers, not a general chart.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this chart accurate for my baby specifically?",
        answer:
          "It is a general planning range only. Premature babies, babies with reflux, and babies with other medical needs often follow a different schedule set by their pediatrician, which should always take priority.",
      },
      {
        question: "How do I know if I should increase the amount per feed?",
        answer:
          "Watch for consistent hunger cues shortly after a feed and confirm with your pediatrician at the next checkup rather than adjusting amounts on your own.",
      },
    ],
    related: [
      "newborn-feeding-schedule-by-age",
      "infant-feeding-schedule-template",
      "babysitter-care-card-checklist",
    ],
  },
  {
    slug: "child-first-aid-basics-for-sitters",
    title: "Child first aid basics every babysitter should know",
    metaTitle: "Child First Aid Basics for Babysitters — Baby Care Cards",
    description:
      "The essential first aid steps a babysitter should know for choking, falls, fevers and minor injuries, plus how to write an emergency plan a sitter can follow calmly.",
    answer:
      "A babysitter should know how to respond to choking, a fall or bump to the head, a fever, and a minor cut or burn, and should always call emergency services first for anything serious. Leave a written emergency plan with your address, the child's known conditions, and clear thresholds for when to call you versus when to call for emergency help.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 6,
    medicalDisclaimer: true,
    intro: [
      "Most babysitting shifts never need first aid, but the ones that do move fast. A short written plan turns panic into a sequence of steps.",
    ],
    sections: [
      {
        heading: "Choking",
        paragraphs: [
          "If a child is coughing forcefully, encourage them to keep coughing. If they cannot cough, cry or breathe, call emergency services immediately and begin back blows and chest thrusts for an infant, or abdominal thrusts for an older child, following certified first aid training. Every babysitter caring for a young child should ideally complete a short infant and child first aid course before their first booking.",
        ],
      },
      {
        heading: "Falls and bumps to the head",
        checklist: [
          "Stay calm and check for consciousness and normal breathing first",
          "Watch for repeated vomiting, unusual drowsiness, or a change in behaviour",
          "Apply a cold compress to swelling, never ice directly on skin",
          "Call the parent immediately and call emergency services for any loss of consciousness",
        ],
      },
      {
        heading: "Fever",
        paragraphs: [
          "Note the child's temperature and when it started. Follow only the fever medication instructions the parent has written down, exactly as prescribed or as printed on the packaging for the child's age and weight. Call the parent for any fever in a very young infant, or a high fever accompanied by other symptoms.",
        ],
      },
      {
        heading: "Cuts, scrapes and burns",
        bullets: [
          "Clean a minor cut with water and cover it with a clean dressing",
          "Cool a minor burn under running water for several minutes and cover loosely",
          "Call for emergency help for any deep cut, a burn larger than a small coin, or a burn on the face or hands",
        ],
      },
      {
        heading: "The written plan a sitter needs",
        checklist: [
          "Your full address, in case they need to give it to emergency services",
          "Your phone number and a backup contact",
          "The child's known conditions, allergies and current medications",
          "Where the first aid kit and any emergency medication are kept",
          "A simple rule: call 911 or local emergency services first for anything serious, then call you",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I require a first aid certificate before hiring a babysitter?",
        answer:
          "It is a reasonable and increasingly common requirement, especially for babies and toddlers. Many community centres and Red Cross chapters offer short infant and child first aid courses.",
      },
      {
        question: "What is the single most important instruction to leave a sitter?",
        answer:
          "Call emergency services first for anything serious, then call you. Sitters sometimes delay calling for help because they are trying to reach the parent first, which can waste critical time.",
      },
    ],
    related: ["child-emergency-contact-sheet", "medication-instructions-for-a-babysitter", "babysitter-care-card-checklist"],
  },
  {
    slug: "toddler-bedtime-routine-for-a-sitter",
    title: "A toddler bedtime routine for a sitter to follow",
    metaTitle: "Toddler Bedtime Routine for a Babysitter — Baby Care Cards",
    description:
      "How to write a toddler bedtime routine a babysitter can follow step by step, covering bath, books, lights out, and what to do if the child will not settle.",
    answer:
      "A toddler bedtime routine for a sitter should list each step in order with approximate times: bath or wash-up, pajamas, teeth brushing, one or two books, a comfort object, and lights out, followed by a short, calm plan for what to do if the child does not settle within a stated time.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 5,
    intro: [
      "Bedtime is often the hardest part of a babysitting shift, because a new adult in charge can unsettle a routine that runs on repetition and predictability. Writing the exact sequence down keeps a sitter close to what the child expects.",
    ],
    sections: [
      {
        heading: "The step-by-step routine",
        checklist: [
          "Bath or quick wash-up, at the usual time",
          "Pajamas and a diaper or pull-up change",
          "Teeth brushing",
          "One or two specific books, read in the usual spot",
          "Comfort object: blanket, stuffed animal or pacifier",
          "A short goodnight phrase or song, said the same way each time",
          "Lights out and door position (open, cracked, or closed)",
        ],
      },
      {
        heading: "Timing",
        paragraphs: [
          "Write the actual bedtime and how long the whole routine usually takes, so a sitter knows to start early enough and does not rush a child who is used to a slower pace.",
        ],
      },
      {
        heading: "If the child will not settle",
        paragraphs: [
          "Give one or two calm, brief responses the sitter is allowed to use, such as a short reassurance at the door without turning the light back on, and a clear point at which they should call you rather than keep trying alone.",
        ],
      },
      {
        heading: "Things that break the routine",
        bullets: [
          "Screens in the hour before bed",
          "Sugary snacks close to bedtime",
          "A new or unfamiliar comfort object substituted for the usual one",
          "Skipping a step because the child seems tired enough already",
        ],
      },
      {
        heading: "Overnight",
        paragraphs: [
          "If the sitter is staying overnight, note what a normal night waking looks like, how you usually respond, and when a waking is unusual enough to call you.",
        ],
      },
    ],
    faqs: [
      {
        question: "How detailed should a bedtime routine be for a one-off sitter?",
        answer:
          "Very detailed. A regular sitter picks up the routine over time, but a one-off sitter benefits from every step written out, including the exact words used at goodnight if the child responds to them.",
      },
      {
        question: "What if the sitter changes the routine and the child does not sleep?",
        answer:
          "Ask for a quick note on what was different. Most bedtime struggles with a sitter come down to one skipped or reordered step rather than the child rejecting the sitter.",
      },
    ],
    related: ["babysitter-care-card-checklist", "toddler-feeding-schedule", "voice-instructions-for-a-babysitter"],
  },
  {
    slug: "voice-instructions-for-a-babysitter",
    title: "Recording voice instructions for a babysitter",
    metaTitle: "Voice Instructions for a Babysitter (How and Why) — Baby Care Cards",
    description:
      "Why a short voice note can beat a written page for a babysitter, what to include, and how to pair it with a written care card so nothing gets missed.",
    answer:
      "A short voice note works well alongside a written care card because it captures tone, pronunciation of names, and the small reassurances a page cannot, such as how you say goodnight or calm a meltdown. Keep it under two minutes, cover feeding, routine, and one thing that is easy to miss, and pair it with the written emergency details a sitter can scan quickly.",
    published: "2026-08-24",
    updated: "2026-09-02",
    readMinutes: 4,
    intro: [
      "Text is best for facts a sitter needs to scan under pressure. A short voice note is best for the things that are hard to write down: how you actually say a comfort phrase, or how calm you sound when you say it is fine to let the child fuss for a minute.",
    ],
    sections: [
      {
        heading: "What belongs in a voice note",
        bullets: [
          "How to pronounce the child's name or nickname if it is unusual",
          "The exact wording of a comfort phrase or bedtime song",
          "Reassurance about one thing sitters often worry about unnecessarily",
          "A quick verbal walk-through of the day, in your own words",
        ],
      },
      {
        heading: "What still belongs in writing",
        paragraphs: [
          "Anything the sitter needs to check under stress — feeding amounts, medication doses, emergency numbers — belongs on the written care card, not buried in an audio recording that is slow to search.",
        ],
      },
      {
        heading: "Keep it short",
        paragraphs: [
          "Under two minutes is enough. A long recording will not get replayed, and the details that matter most will end up unwritten and unheard.",
        ],
      },
      {
        heading: "Send it ahead of time",
        paragraphs: [
          "Share the voice note along with the written care card a day before a new sitter's first booking, so they can ask questions before they are alone with your child.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should a voice note replace a written care card?",
        answer:
          "No. Use it alongside a written card. Facts that need to be checked quickly, like a medication dose, should always be written down clearly rather than searched for in an audio file.",
      },
      {
        question: "Is a voice note useful for a regular, familiar sitter?",
        answer:
          "It is most useful for a first booking or when something has changed, such as a new bedtime routine or a new food allergy. A familiar sitter needs shorter, more occasional updates.",
      },
    ],
    related: ["babysitter-care-card-checklist", "toddler-bedtime-routine-for-a-sitter", "printable-child-care-card-template"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
