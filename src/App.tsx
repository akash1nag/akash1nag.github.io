import React from "react";

import { motion, AnimatePresence } from "framer-motion";

//import { Compass, Github, Mail, Moon, Sun, HelpCircle, ListTree, FlaskConical, ShieldCheck } from "lucide-react";

import { Compass, Mail, Moon, Sun, FlaskConical } from "lucide-react";

// --------------------------------------------------

// Theme hook (persists + respects system)

// --------------------------------------------------



type Theme = "light" | "dark";



function useTheme() {

  const [theme, setTheme] = React.useState<Theme>(() => {

    if (typeof window === "undefined") return "dark";

    const saved = (window.localStorage.getItem("theme") as Theme | null) ?? null;

    if (saved) return saved;

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";

  });



  React.useEffect(() => {

    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");

    else root.classList.remove("dark");

    try { window.localStorage.setItem("theme", theme); } catch {}

  }, [theme]);



  const toggle = React.useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, toggle };

}



// --------------------------------------------------

// Types

// --------------------------------------------------



// REPLACE the existing MilestoneProps interface entirely (around Line 104)
type MilestoneSide = "left" | "right"; // Keep this type definition

interface MilestoneProps {
  title: string;
  subtitle: string;
  year: string;
  img?: string; // CRITICAL FIX: Made 'img' optional (?) to resolve TS2741 error
  side?: MilestoneSide;
  details?: string; // extra info revealed on hover/focus
  forceOpen?: boolean; // controlled open from roadmap beacons
  anchorId?: string; // id for deep linking
  onIntent?: () => void; // hover/focus intent callback
  
  // RESTORED: Structure to match your affiliations data
  affiliations: {
    name: string;
  }[];
}


// --------------------------------------------------

// Milestone with hover-reveal details

// --------------------------------------------------



// REPLACE the entire Milestone component function (starting around Line 123)
const Milestone = ({ title, subtitle, details, anchorId, affiliations }: MilestoneProps) => {
  const [open, setOpen] = React.useState(false);
  
  // Joins the affiliation names with ' / '
  const affiliationNames = affiliations?.map(a => a.name).join(' / ') || '';

  return (
    <div
      id={anchorId}
      // Clean vertical alignment: full width, no staggering or offsets
      className={`relative flex items-start w-full`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <motion.div
        whileHover={{ y: -2 }}
        // Card takes full width for clean vertical alignment
        className="p-4 rounded-2xl shadow-sm border bg-white/80 backdrop-blur dark:bg-slate-900/70 dark:border-slate-700 w-full cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-start">
          {/* Left Side Text */}
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">{title}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">{subtitle}</div>
            
            {/* RESTORED AFFILIATIONS DISPLAY */}
            {affiliationNames && (
              <div className="mt-1 text-xs text-indigo-700 dark:text-indigo-400 font-medium">
                {affiliationNames}
              </div>
            )}
          </div>
          
          {/* Right Side Year 
          <div className="text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap ml-4 pt-1">
            {year}
          </div> */}
        </div>

        {/* EXPANDABLE DETAIL SECTION */}
        <AnimatePresence>
          {open && details && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden pt-2 border-t border-slate-200 dark:border-slate-700/50 mt-2"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};



// ADD this interface definition near the existing MilestoneProps interface (around line 99)

interface Work {
  k: string; // key
  t: string; // title
  s: string; // subtitle
  tags: string[]; // for the tags display
  doi: string; // official journal link
  pdfLink: string; // direct pdf file path
}

// --------------------------------------------------

// Main component with Dark/Light theme + new "How I Work" section with Dark/Light theme + new "How I Work" section

// --------------------------------------------------



export default function QuantumJourneyHero() {

  const { theme, toggle } = useTheme();

  React.useState<number | null>(null);

// ADD this array definition above the QuantumJourneyHero function's return statement (around line 200)

const workData: Work[] = [
  {
    k: "p1",
    t: "Multiuser quantum key distribution using quotient graph states derived from continuous-variable dual-rail cluster states",
    s: "This paper studies a three user conference key protocol built from CV dual rail cluster states, examining its six mode construction, security, and key capacity under finite size and imperfect squeezing.",
    tags: ["CV-QKD", "Security Proofs","Multiuser","graph state","Quantum Networks","QPON"],
    doi: "https://doi.org/10.1103/vsqj-ndkn",
    pdfLink: "/Multiuser_QKD_quotient_graph_state.pdf", // Place your PDF in the project's 'public/pdfs' folder
  },
  {
    k: "p2",
    t: "Finite-size security of continuous-variable quantum key distribution with imperfect heterodyne measurement",
    s: "This paper analyses CVQKD with coherent states under heterodyne phase imbalance, providing a finite size security proof, a post processing fix, and experimental validation on integrated photonic receivers.",
    tags: ["Finite-size Security", "Experimental imperfections","CV-QKD"],
    doi: "https://doi.org/10.1364/PRJ.559136",
    pdfLink: "/imperfect-heterodyne-paper2.pdf",
  },
  {
    k: "p3",
    t: "Continuous-variable quantum key distribution with noisy squeezed states",
    s: "This paper studies how noisy squeezing affects the security and key rates of squeezed state CV QKD across fibre and free space, under trusted and untrusted noise, in both asymptotic and finite size regimes.",
    tags: ["Finite-size Security", "Experimental imperfections","CV-QKD"],
    doi: "https://doi.org/10.1088/2058-9565/ada9c4",
    pdfLink: "/noisy-squeezed-qkd.pdf",
  },
  {
    k: "t1",
    t: "Master Thesis: Quantum theory of actively-phase-locked optical parametric oscillators subject to limit-cycle motion",
    s: "This thesis analyses actively phase locked optical parametric oscillators, extends linearisation to treat limit cycle dynamics via a Gaussian mixture along the cycle, and shows they generate strong intracavity entanglement even during periodic motion.",
    tags: ["Open quantum system", "linear stability analysis", "Fokker Planck equation"],
    doi: "https://www.maot.studium.fau.de/achievements/masters-theses/theses-2019/#Oruganti", // Link to university repository or similar
    pdfLink: "/master-thesis.pdf",
  },
];




const milestones: MilestoneProps[] = [
  {
    year: "2019–2025",
    title: "Ph.D. in Multiuser Quantum Communications",
    subtitle: "Research in CV-QKD, Composable Security, and Network Architectures",
    affiliations: [
      {
        name: "Palacký University (Czechia)",
    
      },
      {
        name: "DTU Technical University of Denmark (Experimental Collaboration)",
        
      },
    ],
    details:
      "Core research involved key-rate derivations for multi-user CV-QKD protocols and extensive collaborative experimental validation with the DTU group.",
    side: "left", // PhD is on the left side
    anchorId: "ms-upol",
  },
  {
    year: "2016–2019",
    title: "Master’s in Advanced Optical Technology",
    subtitle: "Thesis: Quantum theory of actively-phase-locked OPOs",
    affiliations: [
      {
        name: "FAU Erlangen-Nuremberg (Germany)",
         
      },
      {
        name: "Max Planck Institute for Science of Light",
         
      },
    ],
    details:
      "Focused on open quantum systems and limit-cycle dynamics. Work done at Max Planck Institute provided deep insight into Gaussian state analysis, which is crucial for my later CV-QKD work.",
    side: "right", // Master's (Germany) is on the right side
    anchorId: "ms-fau",
  },
  {
    year: "2010–2016",
    title: "Integrated Master’s (BSc + MSc) in Physics",
    subtitle: "Thesis: Laser-Induced Breakdown Spectroscopy (LIBS)",
    affiliations: [
      {
        name: "University of Hyderabad (India)",
        
      },
    ],
    details:
      "Master's thesis focused on calibrating LIBS emissions to accurately infer sodium content in materials, providing strong foundational experience in experimental data calibration and analysis.",
    side: "left", // Integrated Master's is on the left side
    anchorId: "ms-uohyd",
  },
];

  

const shellBg =

    theme === "dark"

      ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100"

      : "bg-gradient-to-br from-indigo-50 via-white to-emerald-50 text-slate-900";

  return (

    <div className={`w-full min-h-screen scroll-smooth`}>

      <div className={`min-h-screen ${shellBg}`}>

        {/* NAV */}

        <nav className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">

          <div className="flex items-center gap-2 font-semibold">

            <Compass className="h-5 w-5" aria-hidden="true" />

            <span>Akash</span>

          </div>

          <div className="flex items-center gap-3 text-sm">

            <a href="#Education" className="opacity-80 hover:opacity-100 focus:underline">Education</a>

            <a href="#work" className="opacity-80 hover:opacity-100 focus:underline">Work</a>

            <a href="#contact" className="opacity-80 hover:opacity-100 focus:underline">Contact</a>

            <button

              onClick={toggle}

              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs shadow hover:bg-slate-50 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:bg-slate-800/60"

              aria-label="Toggle theme"

              title="Toggle theme"

            >

              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} {theme === "dark" ? "Dark" : "Light"}

            </button>

          </div>

        </nav>



        {/* HERO with personal photo */}

        <section className="mx-auto max-w-6xl px-6 pt-2 pb-10">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">

                Akash nag <span className="text-indigo-700 dark:text-indigo-300">Oruganti</span>

              </h1>

              
 <p className="mt-4 font-medium">
                Welcome to my corner of the internet. If you are here to find a data-focused researcher, you have come to the right place. If you are an old friend wondering what I have been up to, I am glad you are here. Get in touch with me if you find time.
            </p>

              <div className="mt-6 flex flex-wrap gap-2 bg-white/80 px-3 py-2 rounded dark:bg-transparent">

                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs border border-transparent">CV-QKD</span>

                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs border border-transparent">Gaussian states</span>

                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs border border-transparent">Multipartite state</span>

                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs border border-transparent">Time-series</span>

                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs border border-transparent">Risk & ML</span>

                <span className="px-3 py-1 rounded-full bg-slate-800 text-white text-xs border border-transparent">Python • Mathematica</span>

              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#work" className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-md dark:bg-slate-100 dark:text-slate-900">View Work</a>
                <a href="#contact" className="px-4 py-2 rounded-xl bg-white text-slate-900 border shadow hover:shadow-md dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">Contact</a>
                <a
                  href="https://www.researchgate.net/profile/Akash-Oruganti/research" // <-- Replace with your actual ResearchGate URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 border shadow hover:shadow-md dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                >
                  ResearchGate 🔬
                </a>
              </div>
  </div>



            {/* Personal photo */}

            <div className="relative flex justify-center items-center">

              <motion.img

                src="/DSCF2112.jpg"

                alt="Akash profile photo"

                className="w-64 h-65 object-cover rounded-full border-4 border-white shadow-2xl dark:border-slate-800 mt-7"

                initial={{ opacity: 0, scale: 1 }}

                animate={{ opacity: 1, scale: 1 }}

                transition={{ duration: 0.8 }}

                loading="eager"

                decoding="async"

              />

            </div>

          </div>

        </section>



       {/* WHO AM I? -> CONTEXTUAL TEXT WITH CALLOUTS */}
        <section id="who-am-i" className="mx-auto max-w-6xl px-6 pb-16">
          {/* New Title */}
          <h2 className="text-2xl font-semibold mb-6">Who Am I?</h2>
          
          {/* Using a text block that adapts to the theme colors */}
          <div className="max-w-4xl space-y-5 text-lg">
            <p>
              I am a quantum information theorist who enjoys turning messy questions into precise models and testable claims. Answers grow cheaper every day, but meaningful questions do not. I give more weight to the question than to the answer. Most of the work is in framing the right question. Once that is clear the answer tends to follow.
            </p>
            <p>
              Most of my <a href="#work" className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">work</a> sits in continuous variable quantum key distribution, where multivariate Gaussian structure, careful covariance modelling and information theoretic reasoning are everyday tools rather than buzzwords. My toolkit includes stochastic modelling and coupled stochastic differential equations with linear stability analysis, optimisation under constraints and Monte Carlo methods for model validation, stress testing and uncertainty propagation through resampling and simulation. I work in Mathematica and Python, moving between symbolic derivations and numerical experiments as needed.
            </p>
            <p>
              Information theory guides many of my choices. I use Shannon entropy and mutual information to think about signal content. I rely on Fisher information and Cramér Rao bounds to judge estimator quality. I compare models with Kullback Leibler divergence and related f divergences. For time series I look at entropy rate. For feature design I lean on the data processing inequality and the information bottleneck view. These tools help me decide what the data can actually support.
            </p>
            <p>
              I like proof by attempted destruction. Before I trust a result I try to break it. I run ablation studies and back tests, use bootstrap intervals and keep a clear account of noise sources. In quantum crypto this shows up as finite size analyses with confidence intervals that hold outside the asymptotic limit. In applied projects it means reporting uncertainty with the same prominence as point estimates.
            </p>
            <p>
              Right now I am building a stock selection feature space that blends dynamical systems intuition with information theoretic criteria. The plan is simple. Design interpretable features. Test them with falsification minded checks. Keep what survives. Before any modelling I write an exhaustive list of the conditions under which the data was obtained and the assumptions those imply. The vetted features then feed machine learning models such as logistic regression, random forests, gradient boosted trees, and small neural networks.
            </p>
            
            {/* The skimming part is styled to stand out */}
            <p className="font-semibold text-xl border-t pt-4 mt-6 border-slate-200 dark:border-slate-700">
              <strong className="font-extrabold">If you are skimming:</strong> I bridge rigorous modelling with practical validation. Give me a noisy dataset or a hard constraint and I will propose a model, quantify uncertainty, and show where it holds and where it does not.
            </p>
          </div>
        </section>



        {/* JOURNEY ROAD WITH MILESTONES */}

       



         {/* WORK SHOWCASE - ELEGANT 2x2 GRID */}
        <section id="work" className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-4">Selected Work</h2>
          
          {/* CRITICAL CHANGE: Using 2 columns on medium/large screens for a balanced 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {workData.map((w) => (
              <motion.div
                key={w.k}
                whileHover={{ y: -2 }}
                // Added h-full to ensure cards have the same height in the grid row
                className="p-5 border rounded-xl shadow-lg bg-white/70 backdrop-blur hover:shadow-xl transition-shadow dark:bg-slate-800/70 dark:border-slate-700 h-full flex flex-col" 
              >
                {/* Title and Subtitle */}
                <div className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{w.t}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 flex-grow">{w.s}</div> {/* flex-grow helps push buttons down */}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {w.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* DUAL LINK BUTTONS */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-3">
                  {/* Link 1: Direct PDF Access/Download */}
                  <a
                    href={w.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition flex items-center"
                    title={`View or download the full PDF for ${w.t}`}
                  >
                    View / Download PDF
                  </a>

                  {/* Link 2: Official Journal DOI */}
                  <a
                    href={w.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-800 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 transition flex items-center"
                    title={`Open the official journal page (DOI) for ${w.t}`}
                  >
                    Official DOI
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

 <section id="Education" className="mx-auto max-w-6xl px-6 pb-20">
    <h2 className="text-2xl font-semibold mb-6">Education</h2>
    <div className="flex flex-col gap-10">
        {milestones.map((m, _) => (  // <-- The fix is here
            <Milestone key={m.title} {...m} />
        ))}
    </div>
</section>


        {/* CONTACT */}

        <footer id="contact" className="border-t bg-white/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">

          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Akash. All rights reserved.</div>

            <div className="flex items-center gap-4 text-sm">

              <a

                href="mailto:akash.nag.10@gmail.com"

                className="flex items-center gap-2 hover:underline"

                aria-label="Send email to Akash"

              >

                <Mail className="h-4 w-4" aria-hidden="true" /> akash.nag.10@gmail.com

              </a>

             <a
                href="https://www.researchgate.net/profile/Akash-Oruganti/research" // <-- Replace with your actual ResearchGate URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
                aria-label="Open ResearchGate profile"
              >
                {/* ResearchGate uses a different icon, but we'll use an existing one for simplicity */}
                <FlaskConical className="h-4 w-4" aria-hidden="true" /> ResearchGate
              </a>

            </div>

          </div>

        </footer>

      </div>

    </div>

  );

}
