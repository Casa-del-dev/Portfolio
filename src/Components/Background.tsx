import { useEffect, useRef, useState } from "react"; // ⬅️ add useState
import "./Background.css";

type EduStatus = "done" | "ongoing" | "planned";

type EduItem = {
  name: string;
  place?: string;
  dates?: string;
  status: EduStatus;
};

type WorkItem = {
  position: string;
  company?: string;
  logo?: string;
  startYear?: number;
  startMonth: string;
  endYear?: number | "Present";
  endMonth?: string;
  status: EduStatus;
  description?: string[];
};

const EDUCATION: EduItem[] = [
  {
    name: "MSc Computer Science",
    place: "ETH Zürich",
    dates: "2025 - Present",
    status: "ongoing",
  },
  {
    name: "BSc Computer Science",
    place: "ETH Zürich",
    dates: "2022 – 2025",
    status: "done",
  },
  {
    name: "High School",
    place: "Liceo di Mendrisio",
    dates: "2017 – 2021",
    status: "done",
  },
];

const WORK: WorkItem[] = [
  {
    position: "GenAI R&D Engineer",
    company: "ETH AI Center",
    logo: "/Logos/AICENTER.png",
    startYear: 2025,
    startMonth: "Nov",
    endYear: "Present",
    status: "ongoing",
    description: [
      "Developing and improving the front-end of the open-source EthelApp platform (desktop & mobile) using React and TypeScript",
      "Implementing user interfaces and interaction flows that support 20,000+ students across STEM courses at ETH",
      "Designing and implementing an interactive flow that enables ~2,000 students to upload and grade their exams simultaneously",
      "Collaborating with researchers and instructors to design and iterate on educational AI tools",
      "Ensuring smooth integration between front-end components and Python-based backend systems",
      "Maintaining clear documentation and contributing to the open-source community under GNU-GPL",
    ],
  },
  {
    position: "Full Stack Developer",
    company: "ASTAZ",
    logo: "/Logos/ASTAZ.png",
    startYear: 2025,
    startMonth: "Jun",
    endYear: "Present",
    status: "ongoing",
    description: [
      "Maintain a website with 4,000+ registered users.",
      "Deploy and operate the site on Hostpoint with a PHP backend.",
      "Build and provide accessible admin functions for other team members.",
      "Understand the needs of the committee and match them with possible technical solutions.",
    ],
  },
];

export default function Resume() {
  const eduRef = useRef<HTMLOListElement | null>(null);
  const workRef = useRef<HTMLOListElement | null>(null);

  const [expanded, setExpanded] = useState<boolean[]>(() =>
    WORK.map(() => false)
  );

  const toggleExpanded = (idx: number) => {
    setExpanded((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  useEffect(() => {
    const eduEl = eduRef.current;
    const workEl = workRef.current;
    if (!eduEl) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const revealWork = () => {
      workEl?.classList.add("is-visible");
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        eduEl.classList.add("is-visible");
        io.disconnect();

        const lastEdu = eduEl.querySelector<HTMLLIElement>(
          "li.edu-step-vertical:last-of-type"
        );

        if (prefersReduced || !lastEdu) {
          revealWork();
          return;
        }

        const onEnd = (e: TransitionEvent) => {
          if (
            e.target === lastEdu &&
            (e.propertyName === "opacity" || e.propertyName === "transform")
          ) {
            revealWork();
          }
        };

        lastEdu.addEventListener("transitionend", onEnd, { once: true });
      },
      { threshold: 0.35 }
    );

    io.observe(eduEl);

    return () => io.disconnect();
  }, []);

  return (
    <div className="resume-container">
      <div className="education">
        <h2 className="resume-title">Education</h2>
        <ol
          ref={eduRef}
          className="edu-timeline-vertical"
          aria-label="Education timeline"
        >
          {EDUCATION.map((item, i) => (
            <li
              className="edu-step-vertical"
              key={`${item.name}-${i}`}
              style={{ ["--i" as any]: EDUCATION.length - i }}
            >
              <div className="edu-marker" aria-hidden>
                <span className={`edu-circle circle--${item.status}`} />
              </div>
              <div className="edu-info">
                <div className="edu-name">{item.name}</div>
                {(item.place || item.dates) && (
                  <div className="edu-meta">
                    {item.place && <span>{item.place}</span>}
                    {item.place && item.dates && <span className="dot">•</span>}
                    {item.dates && <span>{item.dates}</span>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="work">
        <h2 className="resume-title">Work Experience</h2>
        <ol
          ref={workRef}
          className="edu-timeline-vertical timeline--right"
          aria-label="Work timeline"
        >
          {WORK.map((item, i) => {
            const isOpen = expanded[i];
            const descId = `work-desc-${i}`;
            const titleId = `work-title-${i}`;

            return (
              <li
                className="edu-step-vertical"
                key={`${item.position}-${i}`}
                style={{ ["--i" as any]: WORK.length - i }}
              >
                <div className="edu-info work-info">
                  {/* Logo + Company */}
                  <div className="work-header">
                    {item.logo && (
                      <img
                        className="company-logo"
                        src={item.logo}
                        alt={`${item.company ?? item.position} logo`}
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                    )}
                    {item.company && (
                      <div className="company-name">{item.company}</div>
                    )}
                  </div>

                  <button
                    id={titleId}
                    className={`position-toggle ${isOpen ? "is-open" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={descId}
                    onClick={() => toggleExpanded(i)}
                    type="button"
                  >
                    <span className="chevron" aria-hidden>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        role="presentation"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="position-name">{item.position}</span>
                  </button>

                  {/* Years */}
                  {(item.startYear || item.endYear) && (
                    <div className="work-years">
                      {item.startYear === item.endYear ? (
                        <>
                          {item.startMonth} – {item.endMonth} {item.endYear}
                        </>
                      ) : (
                        <>
                          {item.startMonth && `${item.startMonth} `}
                          {item.startYear ?? "NaN"}
                          {item.endYear === "Present"
                            ? " – Present"
                            : item.endYear
                            ? ` – ${item.endMonth ? `${item.endMonth} ` : ""}${
                                item.endYear
                              }`
                            : ""}
                        </>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {item.description && item.description.length > 0 && (
                    <div
                      id={descId}
                      role="region"
                      aria-labelledby={titleId}
                      className={`work-desc-wrap ${isOpen ? "is-open" : ""}`}
                    >
                      <ul className="work-desc">
                        {item.description.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="edu-marker" aria-hidden>
                  <span className={`edu-circle circle--${item.status}`} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
