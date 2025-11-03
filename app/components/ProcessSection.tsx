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
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        threshold: isMobile ? 0.2 : 0.3, // Threshold menor para mobile
        rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px", // Margem menor para mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, isMobile]);

  const startSequentialAnimation = (paths: SVGPathElement[], cards: HTMLDivElement[]) => {
    const tl = gsap.timeline();

    // Durações otimizadas para mobile - animações mais rápidas
    const cardDuration = isMobile ? 0.4 : 0.6;
    const pathDuration = isMobile ? 0.5 : 0.8;
    const stepDelay = isMobile ? 0.6 : 0.8;

    // Step 1: Show first card
    tl.to(cards[0], {
      opacity: 1,
      y: 0,
      duration: cardDuration,
      ease: "power2.out",
    }, 0);

    // Step 2: Draw first arrow and show second card (apenas desktop)
    if (!isMobile) {
      tl.to(paths[0], {
        strokeDashoffset: 0,
        duration: pathDuration,
        ease: "power2.inOut",
      }, stepDelay);
    }
    
    tl.to(cards[1], {
      opacity: 1,
      y: 0,
      duration: cardDuration,
      ease: "power2.out",
    }, isMobile ? stepDelay : stepDelay + 0.4);

    // Step 3: Draw second arrow and show third card (apenas desktop)
    if (!isMobile) {
      tl.to(paths[1], {
        strokeDashoffset: 0,
        duration: pathDuration,
        ease: "power2.inOut",
      }, stepDelay * 2.5);
    }
    
    tl.to(cards[2], {
      opacity: 1,
      y: 0,
      duration: cardDuration,
      ease: "power2.out",
    }, isMobile ? stepDelay * 2 : stepDelay * 2.5 + 0.4);

    // Step 4: Draw third arrow and show fourth card (apenas desktop)
    if (!isMobile) {
      tl.to(paths[2], {
        strokeDashoffset: 0,
        duration: pathDuration,
        ease: "power2.inOut",
      }, stepDelay * 4);
    }
    
    tl.to(cards[3], {
      opacity: 1,
      y: 0,
      duration: cardDuration,
      ease: "power2.out",
    }, isMobile ? stepDelay * 3 : stepDelay * 4 + 0.4);
  };

  return (
    <section id="process" ref={sectionRef} className="relative bg-white py-16 sm:py-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-12 sm:mb-16 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Our Process
        </h2>

        {/* Layout Desktop - Grid horizontal com setas */}
        <div className={`relative ${isMobile ? 'hidden' : 'block'} min-h-[400px]`}>
          {/* SVG Arrows overlay - apenas desktop */}
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

          {/* Cards positioned horizontally with alternating heights - Desktop */}
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

        {/* Layout Mobile - Grid vertical sem setas */}
        <div className={`${isMobile ? 'block' : 'hidden'} space-y-6`}>
          {/* Step 01 - Mobile */}
          <div 
            ref={card1Ref} 
            className="w-full max-w-sm mx-auto rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
          >
            <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 01</div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Planning</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Requirements analysis and <strong>solution architecture</strong> to ensure scalability and performance.
            </p>
          </div>

          {/* Step 02 - Mobile */}
          <div 
            ref={card2Ref} 
            className="w-full max-w-sm mx-auto rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
          >
            <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 02</div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Development</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Coding with <strong>agile methodologies and clean code</strong> using industry best practices.
            </p>
          </div>

          {/* Step 03 - Mobile */}
          <div 
            ref={card3Ref} 
            className="w-full max-w-sm mx-auto rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
          >
            <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 03</div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Testing & QA</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <strong>Automated and manual testing</strong> ensures code quality and reliability.
            </p>
          </div>

          {/* Step 04 - Mobile */}
          <div 
            ref={card4Ref} 
            className="w-full max-w-sm mx-auto rounded-xl border border-amber-200/50 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-amber-800/30 dark:bg-zinc-900/90"
          >
            <div className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Step 04</div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Deploy & Monitoring</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <strong>CI/CD pipelines and continuous monitoring</strong> for safe and efficient deliveries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}