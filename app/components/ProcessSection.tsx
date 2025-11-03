"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const path3Ref = useRef<SVGPathElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const card4Ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const paths = [path1Ref.current, path2Ref.current, path3Ref.current].filter(
      (p): p is SVGPathElement => !!p
    );
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(
      (c): c is HTMLDivElement => !!c
    );

    // Initialize stroke lengths and hide cards
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    // Hide cards initially
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 30 });
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startSequentialAnimation(paths, cards);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Start animation a bit before the section is fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const startSequentialAnimation = (paths: SVGPathElement[], cards: HTMLDivElement[]) => {
    const tl = gsap.timeline();

    // Step 1: Show first card
    tl.to(cards[0], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 0);

    // Step 2: Draw first arrow and show second card
    tl.to(paths[0], {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 0.8);
    
    tl.to(cards[1], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 1.2);

    // Step 3: Draw second arrow and show third card
    tl.to(paths[1], {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 2.0);
    
    tl.to(cards[2], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 2.4);

    // Step 4: Draw third arrow and show fourth card
    tl.to(paths[2], {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 3.2);
    
    tl.to(cards[3], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 3.6);
  };

  return (
    <section id="process" ref={sectionRef} className="relative bg-white py-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Our Process
        </h2>

        <div className="relative min-h-[400px]">
          {/* SVG Arrows overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 400">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#d97706" />
              </marker>
            </defs>
            {/* Path 1: Card 1 to Card 2 */}
            <path
              ref={path1Ref}
              d="M 240 120 Q 320 120 400 180"
              stroke="#d97706"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Path 2: Card 2 to Card 3 */}
            <path
              ref={path2Ref}
              d="M 480 180 Q 560 180 640 120"
              stroke="#d97706"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Path 3: Card 3 to Card 4 */}
            <path
              ref={path3Ref}
              d="M 760 120 Q 900 120 980 180"
              stroke="#d97706"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Cards positioned horizontally with alternating heights */}
          <div className="relative">
            {/* Step 01 - Top Left */}
            <div 
              ref={card1Ref} 
              className="absolute left-0 top-0 w-56 rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
            >
              <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 01</div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Planning</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Requirements analysis and <strong>solution architecture</strong> to ensure scalability and performance.
              </p>
            </div>

            {/* Step 02 - Bottom Center-Left */}
            <div 
              ref={card2Ref} 
              className="absolute left-80 top-32 w-56 rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
            >
              <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 02</div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Development</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Coding with <strong>agile methodologies and clean code</strong> using industry best practices.
              </p>
            </div>

            {/* Step 03 - Top Center-Right */}
            <div 
              ref={card3Ref} 
              className="absolute right-80 top-0 w-56 rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
            >
              <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 03</div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Testing & QA</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <strong>Automated and manual testing</strong> ensures code quality and reliability.
              </p>
            </div>

            {/* Step 04 - Bottom Right */}
            <div 
              ref={card4Ref} 
              className="absolute right-0 top-32 w-56 rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
            >
              <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 04</div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Deploy & Monitoring</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <strong>CI/CD pipelines and continuous monitoring</strong> for safe and efficient deliveries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}