import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Compass, Github, Mail, Moon, Sun, HelpCircle, ListTree, FlaskConical, ShieldCheck } from "lucide-react";



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



type MilestoneSide = "left" | "right";



interface MilestoneProps {

  title: string;

  subtitle: string;

  year: string;

  img: string; // URL or /public path

  side?: MilestoneSide;

  details?: string; // extra info revealed on hover/focus

  forceOpen?: boolean; // controlled open from roadmap beacons

  anchorId?: string; // id for deep linking

  onIntent?: () => void; // hover/focus intent callback

}



// --------------------------------------------------

// Milestone with hover-reveal details

// --------------------------------------------------



const Milestone = ({ title, subtitle, year, img, side = "left", details, forceOpen = false, anchorId, onIntent }: MilestoneProps) => {

  const [localOpen, setLocalOpen] = React.useState(false);

  const open = forceOpen || localOpen;

  return (

    <div

      id={anchorId}

      className={`relative flex items-center gap-4 ${side === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}

      onMouseEnter={() => { setLocalOpen(true); onIntent?.(); }}

      onMouseLeave={() => setLocalOpen(false)}

      onFocus={() => { setLocalOpen(true); onIntent?.(); }}

      onBlur={() => setLocalOpen(false)}

    >

      <motion.img

        loading="lazy"

        decoding="async"

        whileHover={{ scale: 1.03 }}

        src={img}

        alt={title}

        className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow border bg-white dark:bg-slate-800 dark:border-slate-700"

      />

      <motion.div

        whileHover={{ y: -2 }}

        className="p-4 rounded-2xl shadow-sm border bg-white/80 backdrop-blur dark:bg-slate-900/70 dark:border-slate-700"

      >

        <div className="text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400">{year}</div>

        <div className="font-semibold text-slate-900 dark:text-slate-100">{title}</div>

        <div className="text-slate-600 dark:text-slate-300 text-sm">{subtitle}</div>

      </motion.div>



      {/* Hover card */}

      <AnimatePresence>

        {open && details && (

          <motion.div

            initial={{ opacity: 0, y: 6 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: 6 }}

            transition={{ type: "spring", stiffness: 380, damping: 30 }}

            role="dialog"

            aria-label={`${title} details`}

            className={`absolute ${side === "left" ? "md:left-40" : "md:right-40"} left-0 right-0 md:w-[28rem] z-20 mt-2 md:mt-0`}

          >

            <div className="rounded-2xl border shadow-lg p-4 bg-white/95 dark:bg-slate-900/95 dark:border-slate-700">

              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{details}</p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

};





// --------------------------------------------------

// Main component with Dark/Light theme + new "How I Work" section with Dark/Light theme + new "How I Work" section

// --------------------------------------------------



export default function QuantumJourneyHero() {

  const { theme, toggle } = useTheme();

  React.useState<number | null>(null);



  const milestones: MilestoneProps[] = [

    {

      year: "2016–2021",

      title: "Integrated BSc + MSc in Physics",

      subtitle: "Foundations in quantum mechanics, statistics, and modelling",

      img: "/images/milestones/integrated-physics.jpg",

      side: "left",

      details:

        "Coursework in QM, stat mech, stochastic processes; first exposure to information theory and numerical modelling. Built comfort with linear algebra and probability that later fed into Gaussian-state work.",

      anchorId: "ms-0",

    },

    {

      year: "2019–2021",

      title: "MSc: Advanced Optical Technology",

      subtitle: "Thesis on open quantum systems; experimental & theoretical tools",

      img: "/images/milestones/optics.jpg",

      side: "right",

      details:

        "Studied open-system dynamics (Lindblad, QLEs), laser/optics lab skills, and noise modelling—skills that translate directly to CV-QKD channel models and parameter estimation.",

      anchorId: "ms-1",

    },

    {

      year: "2021–2025",

      title: "PhD: Continuous-Variable QKD",

      subtitle: "Gaussian states, finite-size effects, multi-user QPON, quotient-graph methods",

      img: "/images/milestones/cvqkd.jpg",

      side: "left",

      details:

        "Key-rate derivations under imperfections, quotient-graph CV cluster states for multi-user networks, and careful finite-size/composable security analyses.",

      anchorId: "ms-2",

    },

    {

      year: "2024–2025",

      title: "Composable Security & Entropies",

      subtitle: "Smooth min-/max-entropy, parameter estimation, privacy amplification",

      img: "/images/milestones/security.jpg",

      side: "right",

      details:

        "Bridged operational definitions (H_min^ε, H_max^ε) to concrete key-rate bounds with PE statistics and 2-universal hashing. Emphasis on clear ε-accounting.",

      anchorId: "ms-3",

    },

    {

      year: "2025 →",

      title: "Applied Modelling & Data",

      subtitle: "Time-series, factor models, risk, ML; bridging physics intuition with real systems",

      img: "/images/milestones/quant.jpg",

      side: "left",

      details:

        "Exploring stationary vs. regime-switching models, volatility clustering, and inference under noise. Translating Gaussian toolkits into market microstructure intuition.",

      anchorId: "ms-4",

    },

  ];



  

// Inside src/App.tsx, around line 168
const shellBg =
  theme === "dark"
    ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black" // Removed text-slate-100
    : "bg-gradient-to-br from-indigo-50 via-white to-emerald-50"; // Removed text-slate-900

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

            <a href="#About" className="opacity-80 hover:opacity-100 focus:underline">About</a>

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

              
 <p className="mt-4 font-medium text-gray-900 dark:text-gray-100">
                Welcome to my corner of the internet. If you are here to find a data-focused researcher, you have come to the right place. If you are an old friend wondering what I have been up to, I am glad you are here. Get in touch with me if you find time.
            </p>

              <div className="mt-6 flex flex-wrap gap-2 bg-white/80 px-3 py-2 rounded dark:bg-transparent">

                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs border border-transparent">CV-QKD</span>

                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs border border-transparent">Gaussian states</span>

                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs border border-transparent">Time-series</span>

                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs border border-transparent">Risk & ML</span>

                <span className="px-3 py-1 rounded-full bg-slate-800 text-white text-xs border border-transparent">Python • Mathematica</span>

              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                <a href="#work" className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-md dark:bg-slate-100 dark:text-slate-900">View Work</a>

                <a href="#contact" className="px-4 py-2 rounded-xl bg-white text-slate-900 border shadow hover:shadow-md dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">Contact</a>

                <a

                  href="https://github.com/"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="px-4 py-2 rounded-xl bg-white text-slate-900 border shadow hover:shadow-md dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"

                >

                  GitHub

                </a>

              </div>

            </div>



            {/* Personal photo */}

            <div className="relative flex justify-center items-center">

              <motion.img

                src="/DSCF2112.jpg"

                alt="Akash profile photo"

                className="w-65 h-65 object-cover rounded-full border-4 border-white shadow-2xl dark:border-slate-800 mt-7"

                initial={{ opacity: 0, scale: 1 }}

                animate={{ opacity: 1, scale: 1 }}

                transition={{ duration: 0.8 }}

                loading="eager"

                decoding="async"

              />

            </div>

          </div>

        </section>



        {/* HOW I WORK */}

        <section id="approach" className="mx-auto max-w-6xl px-6 pb-16">

          <h2 className="text-2xl font-semibold mb-3">How I Work</h2>

          <div className="max-w-4xl rounded-2xl border bg-white/95 px-5 py-4 shadow-sm dark:bg-slate-900/80 dark:border-slate-800"><p className="text-sm md:text-base text-slate-900 dark:text-slate-300">

            Answers are cheap; good questions aren’t. My focus is framing the problem well, decomposing it cleanly, and

            testing solutions until they break—so what remains is robust. That’s how I ship work I can defend.

          </p></div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="rounded-2xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-800">

              <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100"><HelpCircle className="h-4 w-4"/> Ask sharper questions</div>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Clarify constraints, success criteria, and unknowns before touching code or math.</p>

            </div>

            <div className="rounded-2xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-800">

              <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100"><ListTree className="h-4 w-4"/> Decompose → define</div>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Structure problems into orthogonal components with explicit interfaces.</p>

            </div>

            <div className="rounded-2xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-800">

              <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100"><FlaskConical className="h-4 w-4"/> Hypothesize → test</div>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Write falsifiable checks: invariants, back‑tests, sanity bounds, adversarial cases.</p>

            </div>

            <div className="rounded-2xl border bg-white p-4 dark:bg-slate-900 dark:border-slate-800">

              <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100"><ShieldCheck className="h-4 w-4"/> Robustness first</div>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Prefer stable, explainable wins over brittle SOTA—document trade‑offs and failures.</p>

            </div>

          </div>

        </section>



        {/* JOURNEY ROAD WITH MILESTONES */}

        <section id="About" className="mx-auto max-w-6xl px-6 pb-20">
    <h2 className="text-2xl font-semibold mb-6">About</h2>
    <div className="grid gap-10">
        {milestones.map((m, _) => (  // <-- The fix is here
            <Milestone key={m.title} {...m} />
        ))}
    </div>
</section>



        {/* WORK SHOWCASE */}

        <section id="work" className="mx-auto max-w-6xl px-6 pb-16">

          <h2 className="text-2xl font-semibold mb-4">Selected Work</h2>

          <div className="grid md:grid-cols-3 gap-4">

            {[

              { k: "cvqkd", t: "CV-QKD with Squeezed States", s: "QKD protocols, imperfections, key rates" },

              { k: "finite", t: "Finite-Size Security", s: "Composable security, smooth entropies" },

              { k: "qpON", t: "Quantum PON Networks", s: "Downstream multi-user access" },

            ].map((w) => (

              <motion.a

                key={w.k}

                href="#"

                whileHover={{ y: -4 }}

                className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900 dark:border-slate-800 dark:focus:ring-indigo-500/40"

              >

                <div className="text-sm text-slate-500 dark:text-slate-400">Research</div>

                <div className="font-semibold text-slate-900 dark:text-slate-100">{w.t}</div>

                <div className="text-sm text-slate-700 dark:text-slate-300">{w.s}</div>

                <div className="mt-3 text-xs text-slate-500">Read more →</div>

              </motion.a>

            ))}

          </div>

        </section>



        {/* CONTACT */}

        <footer id="contact" className="border-t bg-white/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">

          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Akash. All rights reserved.</div>

            <div className="flex items-center gap-4 text-sm">

              <a

                href="mailto:email@example.com"

                className="flex items-center gap-2 hover:underline"

                aria-label="Send email to Akash"

              >

                <Mail className="h-4 w-4" aria-hidden="true" /> email@example.com

              </a>

              <a

                href="https://github.com/"

                target="_blank"

                rel="noopener noreferrer"

                className="flex items-center gap-2 hover:underline"

                aria-label="Open GitHub profile"

              >

                <Github className="h-4 w-4" aria-hidden="true" /> GitHub

              </a>

            </div>

          </div>

        </footer>

      </div>

    </div>

  );

}
