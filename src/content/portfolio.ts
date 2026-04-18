export type LinkSet = {
  label: string;
  href: string;
  external?: boolean;
  emphasis?: "primary" | "secondary";
  note?: string;
};

export type HighlightMetric = {
  value: string;
  label: string;
  detail?: string;
};

export type ProjectSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type ProjectEntry = {
  slug: "trade-insights-pro" | "qb-translation" | "ballard-center-crm" | "shadowrock-analytics-platform";
  title: string;
  eyebrow: string;
  summary: string;
  homeHook: string;
  role: string;
  status: string;
  impact: string;
  stack: string[];
  heroTitle: string;
  heroSummary: string;
  metaDescription: string;
  metrics: HighlightMetric[];
  sections: ProjectSection[];
  links: LinkSet[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  school: string;
  credential: string;
  location: string;
  period: string;
  details: string[];
};

export const siteMeta = {
  name: "Brayden Cherry",
  title: "Product + Analytics",
  location: "Utah",
  email: "braydenmcherry@gmail.com",
  github: "https://github.com/cherryb16",
  linkedin: "https://www.linkedin.com/in/braydencherry",
  resume: "/brayden-cherry-resume.pdf",
  heroKicker: "PM-minded operator",
  heroTitle:
    "I turn fuzzy operational and product questions into systems teams can trust.",
  heroSummary:
    "My best work sits between product judgment, analytics depth, and execution detail. I build the dashboards, workflows, and tools that help teams decide faster and ship with more confidence.",
};

export const heroMetrics: HighlightMetric[] = [
  {
    value: "450+",
    label: "Organizations centralized into a single CRM view",
    detail: "Ballard Center strategic relations system",
  },
  {
    value: "25%",
    label: "Reduction in overdue receivables",
    detail: "ShadowRock collections dashboard",
  },
  {
    value: "$20K+",
    label: "Revenue managed during peak ops season",
    detail: "Storage Scholars team leadership",
  },
  {
    value: "3.93",
    label: "BYU GPA",
    detail: "Strategic Management with Economics minor",
  },
];

export const portfolioLinks: LinkSet[] = [
  {
    label: "Open Resume",
    href: siteMeta.resume,
    emphasis: "primary",
  },
  {
    label: "View GitHub",
    href: siteMeta.github,
    external: true,
    emphasis: "secondary",
  },
  {
    label: "LinkedIn",
    href: siteMeta.linkedin,
    external: true,
    emphasis: "secondary",
  },
  {
    label: "Email Brayden",
    href: `mailto:${siteMeta.email}`,
    emphasis: "secondary",
  },
];

export const projects: ProjectEntry[] = [
  {
    slug: "trade-insights-pro",
    title: "Trade Insights Pro",
    eyebrow: "Product Builder",
    summary:
      "A trading journal and decision workspace that ties reflection to live brokerage data instead of screenshots and memory.",
    homeHook:
      "The strongest builder story: turning trading behavior into a product surface with real user workflows, data freshness, and feedback loops.",
    role: "Product, full-stack build, and workflow design",
    status: "Closed beta",
    impact:
      "Reframed the trading journal from a notes app into a decision system grounded in live account context.",
    stack: ["Next.js", "Firebase", "Genkit", "SnapTrade"],
    heroTitle:
      "Building a journal that behaves more like a trading copilot than a spreadsheet.",
    heroSummary:
      "Trade Insights Pro started from a simple product problem: most traders review decisions in disconnected tools. I designed the product around one principle - every entry should inherit enough live context to make reflection actionable.",
    metaDescription:
      "Trade Insights Pro is Brayden Cherry's product-builder case study focused on journaling, brokerage integrations, and product workflow design.",
    metrics: [
      {
        value: "Live",
        label: "Brokerage-backed journal entries",
      },
      {
        value: "1",
        label: "Core workflow anchored around review, not logging",
      },
      {
        value: "PM",
        label: "Strongest product-builder proof in the portfolio",
      },
    ],
    sections: [
      {
        title: "Context",
        body:
          "Retail traders have plenty of charts and plenty of notes tools, but almost nothing that connects the two in a clean review loop. The product opportunity was to make post-trade reflection less manual and more structured.",
      },
      {
        title: "Problem",
        body:
          "Most journaling tools rely on memory, screenshots, or hand-entered trade details. That creates friction, weakens trust in the data, and makes it harder to see patterns in decision quality over time.",
      },
      {
        title: "Users / stakeholders",
        body:
          "The primary user is an active trader who wants to improve process, not just archive trades. Secondary stakeholders are future collaborators and hiring teams evaluating whether I can think in product systems.",
      },
      {
        title: "What you owned",
        body:
          "I defined the product direction, shaped the review workflow, mapped the integration boundaries, and built the full-stack experience needed to tie account data to reflection.",
      },
      {
        title: "Product / analytics approach",
        body:
          "The product centers on one durable idea: entries inherit live brokerage context first, then layer notes, tags, and review prompts on top. That reduces manual input while making patterns easier to analyze later.",
        bullets: [
          "Designed the product around real post-trade review behavior instead of generic note taking.",
          "Used integration choices to reduce data-entry friction and increase trust in the record.",
          "Kept the workflow compact so insight arrives before the user abandons the habit.",
        ],
      },
      {
        title: "Outcome",
        body:
          "The result is a more credible product story than a polished mockup alone: a tool with a clear user problem, a defensible workflow, and an architecture shaped by actual product tradeoffs.",
      },
      {
        title: "Tools",
        body: "Next.js, Firebase, Genkit, SnapTrade, product workflow design, and analytics thinking.",
      },
    ],
    links: [
      {
        label: "GitHub Profile",
        href: siteMeta.github,
        external: true,
        emphasis: "secondary",
        note: "Public project links can expand here as the beta matures.",
      },
      {
        label: "Email for a Walkthrough",
        href: `mailto:${siteMeta.email}?subject=Trade%20Insights%20Pro`,
        emphasis: "primary",
      },
    ],
  },
  {
    slug: "qb-translation",
    title: "QB Translation",
    eyebrow: "Decision Analytics",
    summary:
      "A data-backed case study testing which college quarterback signals actually translate to early NFL performance.",
    homeHook:
      "The strongest analytics story: framing a real decision question, building the evidence, and turning the result into a sharp recommendation.",
    role: "Problem framing, analysis, data product, and narrative",
    status: "Published case study",
    impact:
      "Turned a sports analytics question into a defensible product-style argument about signal, noise, and better decisions.",
    stack: ["Python", "SQL", "Next.js", "Recharts", "CFBD", "PFR"],
    heroTitle:
      "Using product-style decision framing to challenge how teams evaluate quarterbacks.",
    heroSummary:
      "QB Translation looks like a sports project on the surface, but the underlying move is product management: identify the decision, isolate the misleading signal, and build a tool that helps people argue from evidence instead of intuition.",
    metaDescription:
      "QB Translation is Brayden Cherry's flagship analytics case study about college quarterback traits, NFL outcomes, and evidence-led decision making.",
    metrics: [
      {
        value: "40",
        label: "Quarterbacks in the drafted cohort",
      },
      {
        value: "-0.45",
        label: "Correlation between college passing PPA and NFL composite score",
      },
      {
        value: "-0.05",
        label: "Correlation between recruit rating and NFL pressure outcomes",
      },
    ],
    sections: [
      {
        title: "Context",
        body:
          "This started as a capstone, but I treated it like a product question: what signal should decision-makers trust when the existing consensus seems directionally wrong?",
      },
      {
        title: "Problem",
        body:
          "Quarterback evaluation gets crowded with reputation, pedigree, and familiar scouting language. I wanted to test whether those inputs actually help predict early NFL outcomes or whether teams are overweighting the wrong evidence.",
      },
      {
        title: "Users / stakeholders",
        body:
          "The direct audience is anyone making or evaluating draft decisions. The broader audience is hiring teams looking for proof that I can translate ambiguous questions into analytical decision support.",
      },
      {
        title: "What you owned",
        body:
          "I owned the framing, data collection, composite score design, exploratory analysis, visualization strategy, and the final interactive presentation.",
      },
      {
        title: "Product / analytics approach",
        body:
          "I built a composite NFL score, tested college predictors against it, and turned the findings into an interactive case study designed to help the user move from curiosity to conclusion quickly.",
        bullets: [
          "Weighted multiple early-NFL outcomes into one interpretable score.",
          "Compared recruiting pedigree, production, efficiency, and usage signals.",
          "Used visual storytelling to make the evidence legible without requiring the user to read code.",
        ],
      },
      {
        title: "Outcome",
        body:
          "The finished artifact argues for better signal selection, not just an interesting finding. It demonstrates how I structure evidence, communicate implications, and package analysis into a usable decision surface.",
      },
      {
        title: "Tools",
        body:
          "Python, SQL, CSV pipelines, Next.js, Recharts, cohort design, scoring logic, and interactive storytelling.",
      },
    ],
    links: [
      {
        label: "Portfolio Repo",
        href: "https://github.com/cherryb16/portfolio-next",
        external: true,
        emphasis: "secondary",
      },
      {
        label: "Email for the Full Pipeline",
        href: `mailto:${siteMeta.email}?subject=QB%20Translation`,
        emphasis: "primary",
      },
    ],
  },
  {
    slug: "ballard-center-crm",
    title: "Ballard Center CRM + Dashboards",
    eyebrow: "Internal Product Systems",
    summary:
      "Centralizing relationship and outreach data for the Ballard Center into a single operating system for strategic relations.",
    homeHook:
      "The strongest internal-product story: messy data, many stakeholders, and a clear systems redesign with measurable operating value.",
    role: "Systems design, dashboard design, and stakeholder translation",
    status: "In progress",
    impact:
      "Created the foundation for shared visibility across departments that had been working from siloed relationship data.",
    stack: ["Airtable", "Dashboard design", "CRM architecture", "Analytics"],
    heroTitle:
      "Turning fragmented relationship data into a system teams can actually operate from.",
    heroSummary:
      "At the Ballard Center, the product challenge was internal but real: several teams needed one trustworthy picture of institutional relationships, outreach gaps, and contact strength. I approached it as a workflow and information-design problem, not just a database cleanup.",
    metaDescription:
      "Ballard Center CRM is Brayden Cherry's internal product case study covering CRM consolidation, dashboards, and stakeholder-facing systems design.",
    metrics: [
      {
        value: "450+",
        label: "Organizations mapped into the CRM",
      },
      {
        value: "1,500+",
        label: "Contacts consolidated from siloed sources",
      },
      {
        value: "10+",
        label: "Hours per week expected to be redirected from manual work",
      },
    ],
    sections: [
      {
        title: "Context",
        body:
          "Multiple teams needed better visibility into external relationships, but the information lived across disconnected spreadsheets and locally managed systems.",
      },
      {
        title: "Problem",
        body:
          "Without a shared CRM structure, teams had weak visibility into who knew whom, where outreach was stalled, and which relationships were strongest. The operational cost was duplicated effort and slower coordination.",
      },
      {
        title: "Users / stakeholders",
        body:
          "Strategic Relations, Campus Relations, and adjacent departments needed one system they could all read, trust, and use for action without specialized analytics support.",
      },
      {
        title: "What you owned",
        body:
          "I helped define the data model, centralize source data, and design dashboards and interfaces that turned raw records into something usable for day-to-day coordination.",
      },
      {
        title: "Product / analytics approach",
        body:
          "The project focused on structure before polish: consolidate the underlying entities, define relationship logic clearly, then expose it through interfaces that make strength, gaps, and next actions obvious.",
        bullets: [
          "Merged multiple data sources into one CRM shape.",
          "Designed views for different departments instead of forcing one generic dashboard.",
          "Used analytics to support recruiting and engagement decisions, not just reporting.",
        ],
      },
      {
        title: "Outcome",
        body:
          "The value is operational clarity. Teams gain a shared system for prioritizing outreach and tracking relationship coverage instead of relying on fragmented memory and manual compilation.",
      },
      {
        title: "Tools",
        body:
          "Airtable, dashboard/interface design, data structuring, internal workflow mapping, and stakeholder-facing analytics.",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        href: siteMeta.linkedin,
        external: true,
        emphasis: "secondary",
      },
      {
        label: "Request Details",
        href: `mailto:${siteMeta.email}?subject=Ballard%20Center%20CRM`,
        emphasis: "primary",
        note: "Sensitive implementation details are intentionally abstracted.",
      },
    ],
  },
  {
    slug: "shadowrock-analytics-platform",
    title: "ShadowRock Analytics Platform",
    eyebrow: "Business Impact Analytics",
    summary:
      "Reusable collections, RevOps, and dashboard systems that improved visibility for consulting clients without overbuilding custom tooling.",
    homeHook:
      "The strongest business-impact story: dashboards, data integration, and stakeholder adoption tied directly to cash flow and pitch quality.",
    role: "Analytics consulting, dashboard design, and integration support",
    status: "Delivered",
    impact:
      "Helped convert fragmented operational data into dashboards teams could use for collections, marketing visibility, and sales conversations.",
    stack: ["SQL", "BigQuery", "Salesforce", "Dashboards"],
    heroTitle:
      "Using lean analytics systems to improve cash flow, visibility, and sales conversations.",
    heroSummary:
      "At ShadowRock, the product challenge was practical: create systems that improved decision speed and usability for teams who needed answers, not analytics theater. My work focused on the decision surface as much as the pipeline underneath it.",
    metaDescription:
      "ShadowRock is Brayden Cherry's analytics platform case study focused on RevOps dashboards, SQL integrations, and measurable business outcomes.",
    metrics: [
      {
        value: "25%",
        label: "Reduction in overdue receivables",
      },
      {
        value: "25%",
        label: "Increase in successful pitches",
      },
      {
        value: "6",
        label: "Platforms integrated into a clearer operating view",
      },
    ],
    sections: [
      {
        title: "Context",
        body:
          "Consulting teams and sales stakeholders needed a cleaner way to understand collections, marketing performance, and customer data across multiple systems.",
      },
      {
        title: "Problem",
        body:
          "Without integrated reporting, decisions were slower and harder to trust. Teams were spending time reconciling systems rather than acting on insight.",
      },
      {
        title: "Users / stakeholders",
        body:
          "Sales, consulting, and operations stakeholders needed dashboards that answered specific commercial questions clearly enough to use in real workflows.",
      },
      {
        title: "What you owned",
        body:
          "I helped shape collections reporting, dashboard outputs, and the SQL-based integration work that improved visibility across six systems.",
      },
      {
        title: "Product / analytics approach",
        body:
          "The work emphasized usable reporting over complexity. Each dashboard or data improvement had to tighten the loop between information and a business action.",
        bullets: [
          "Built a collections dashboard tied to aging receivables.",
          "Integrated marketing insights into Salesforce-facing workflows.",
          "Focused on stakeholder usefulness, not just data completeness.",
        ],
      },
      {
        title: "Outcome",
        body:
          "The system improvements supported faster decision-making, stronger collections follow-up, and more credible pitch preparation for the sales team.",
      },
      {
        title: "Tools",
        body: "SQL, BigQuery, Salesforce dashboards, and RevOps analytics workflows.",
      },
    ],
    links: [
      {
        label: "GitHub Profile",
        href: siteMeta.github,
        external: true,
        emphasis: "secondary",
      },
      {
        label: "Request Details",
        href: `mailto:${siteMeta.email}?subject=ShadowRock%20Analytics`,
        emphasis: "primary",
        note: "Client-specific implementation details stay selective by design.",
      },
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "BYU Ballard Center",
    role: "Special Projects Consultant",
    location: "Provo, UT",
    period: "Jan 2026 - Present",
    summary:
      "Designing internal systems that help multiple teams work from the same relationship and recruiting data.",
    highlights: [
      "Centralizing data across 450+ organizations and 1,500+ contacts into one Airtable CRM.",
      "Designing dashboards and interfaces for 4+ departments to reduce manual coordination work.",
      "Building recruiting analytics that turn behavioral data into programming and outreach recommendations.",
    ],
  },
  {
    company: "ShadowRock",
    role: "Data Analytics Consultant",
    location: "Remote",
    period: "Jan 2025 - Feb 2026",
    summary:
      "Built commercial analytics systems that improved cash flow visibility and made client-facing data easier to use.",
    highlights: [
      "Reduced overdue receivables 25% through a collections dashboard focused on aging accounts.",
      "Integrated dashboards into Salesforce so sales teams could use analytics directly in pitch workflows.",
      "Contributed to SQL-based integration work across six platforms, improving visibility and decision speed.",
    ],
  },
  {
    company: "ASARCO",
    role: "HR Data Analytics and Strategy Intern",
    location: "Tucson, AZ",
    period: "Jun 2024 - Feb 2025",
    summary:
      "Used automation and workforce dashboards to improve reporting reliability and HR decision-making.",
    highlights: [
      "Automated recurring reports, saving 20+ hours per month and reducing manual error.",
      "Built retention, recognition, and workforce dashboards tied to lower turnover and clearer performance visibility.",
      "Trained 30+ managers and associates on Power Platform and Excel so the team could self-serve more reporting work.",
    ],
  },
  {
    company: "Storage Scholars",
    role: "Operations Manager",
    location: "Tucson, AZ",
    period: "Mar 2024 - Aug 2024",
    summary:
      "Led an operational team through high-volume seasonal logistics while improving timing and throughput.",
    highlights: [
      "Managed logistics and customer operations tied to $20K+ in revenue.",
      "Hired and led a six-person team through 50+ storage operations.",
      "Improved operating efficiency by 30% during peak semester transitions.",
    ],
  },
  {
    company: "Amazon",
    role: "Area Manager Intern (Incoming)",
    location: "Tucson, AZ",
    period: "Summer 2026",
    summary:
      "Upcoming operations role that strengthens the portfolio's execution-at-scale story.",
    highlights: [
      "Included briefly because it signals the next environment where I will apply product, process, and analytics thinking.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "Brigham Young University - Marriott School of Business",
    credential: "BS in Strategic Management, Minor in Economics",
    location: "Provo, UT",
    period: "Apr 2027",
    details: [
      "GPA: 3.93/4.00, ACT: 35/36, Dean's List (Top 5%).",
      "4x BYU Academic Scholarship, 2x Economics Scholarship, Career and Leadership Academy Scholarship.",
      "Case competitions: Bain (2024), Weave (2024), BYU Marriott (2025).",
    ],
  },
];

export const capabilityBuckets = [
  {
    title: "PM strengths",
    items: [
      "Ambiguous problem framing",
      "Workflow design",
      "Decision support systems",
      "Cross-functional translation",
    ],
  },
  {
    title: "Technical stack",
    items: [
      "Python",
      "SQL",
      "Next.js",
      "Airtable",
      "Power Platform",
      "Firebase",
    ],
  },
  {
    title: "Signals",
    items: [
      "Strategic Management + Economics",
      "Consulting and internal systems work",
      "Operator experience in high-stakes environments",
      "Strong writing and quantitative communication",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects;
}
