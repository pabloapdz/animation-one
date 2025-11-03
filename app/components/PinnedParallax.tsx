"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PinnedParallax() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;

    // Criar timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: container,
        anticipatePin: 1,
      },
    });

    // Rotação contínua dos ícones
    gsap.to(".icon-rotate", {
      rotationY: 360,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Animações sequenciais das palavras
    // Linha 1
    tl.to("#control", {
      x: "-30%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.3,
    }, 0)
    
    // Ícone 1
    .to("#icon1", {
      x: "-120%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.25,
    }, 0.1)

    // Linha 1
    .to("#your1", {
      x: "-60%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.3,
    }, 0.13)
  
    
    // Linha 2
    .to("#mind", {
      x: "-120%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.3,
    }, 0.15)
    
    // Ícone 2 
    .to("#icon2", {
      x: "-120%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.25,
    }, 0.2)

    // Linha 2
    .to("#manifest", {
      x: "-120%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.38,
    }, 0.23)
    
    // Linha 3:
    .to("#your2", {
      x: "-120%",
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.38,
    }, 0.26)
    
    // Ícone 3 + Palavra SOBE
    .to("#icon3, #reality", {
      y: "-350%",
      duration: 0.46,
    }, 0.34);

    // Alinhar overlay verticalmente ao mesmo eixo Y de "Manifest"
    const alignOverlayY = () => {
      const manifestEl = document.getElementById("manifest");
      if (!manifestEl || !overlay) return;
      const cRect = container.getBoundingClientRect();
      const mRect = manifestEl.getBoundingClientRect();
      const topPos = mRect.top - cRect.top;
      gsap.set(overlay, { top: topPos });
    };
    alignOverlayY();
    ScrollTrigger.addEventListener("refresh", alignOverlayY);
    window.addEventListener("resize", alignOverlayY);


    const overlayStart = 0.34; // alinhado com subida
    const lineGap = 0; // todas as linhas iniciam juntas

    const lineEls = gsap.utils
      .toArray<HTMLElement>(".text-line")
      .slice(0, 5); // limitar a 5 linhas

    const [line1, line2, line3, line4, line5] = lineEls;
    const line1Words = line1 ? Array.from(line1.querySelectorAll<HTMLElement>(".word")) : [];
    const line2Words = line2 ? Array.from(line2.querySelectorAll<HTMLElement>(".word")) : [];
    const line3Words = line3 ? Array.from(line3.querySelectorAll<HTMLElement>(".word")) : [];
    const line4Words = line4 ? Array.from(line4.querySelectorAll<HTMLElement>(".word")) : [];
    const line5Words = line5 ? Array.from(line5.querySelectorAll<HTMLElement>(".word")) : [];

    // texto começa invisível: aplicar estado base imediatamente
    gsap.set([line1Words, line2Words, line3Words, line4Words, line5Words].flat(), {
      xPercent: 100,
      opacity: 0,
      filter: "blur(32px)",
    });

    function animateLine(words: HTMLElement[], index: number) {
      if (!words.length) return;
      const startPos = overlayStart; 
      // Etapas controladas pelo scroll
      tl.to(
        words,
        {
          keyframes: [
            { xPercent: 660, opacity: 0.2, filter: "blur(24px)", duration: 0.15, ease: "none" },
            { xPercent: 330, opacity: 0.5, filter: "blur(12px)", duration: 0.15, ease: "none" },
            { xPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.15, ease: "none" },
          ],
          stagger: { each: 0.02, from: "start" },
        },
        startPos
      );
    }

    animateLine(line1Words, 0);
    animateLine(line2Words, 1);
    animateLine(line3Words, 2);
    animateLine(line4Words, 3);
    animateLine(line5Words, 4);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.removeEventListener("refresh", alignOverlayY);
      window.removeEventListener("resize", alignOverlayY);
    };
  }, []);

  // Text block data
  const paraBlocks = [
    "We develop modern and responsive web solutions",
    "using the best development practices.",
    "Our expertise covers frontend, backend and DevOps",
    "creating exceptional digital experiences.",
    "We transform ideas into technological reality"
  ];

  // Utility classes
  const baseText = "text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight";
  const subtleText = "text-zinc-900 dark:text-zinc-50";
  const accentText = "bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent italic font-extrabold px-4";

  return (
    <section id="features" ref={sectionRef} className="relative h-[240vh] bg-white dark:bg-black">
      <div ref={containerRef} className="sticky top-0 relative flex h-screen items-center justify-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-12">
            {/* Linha 1: Code | Icon | Create */}
            <div className="flex items-center justify-center gap-6">
              <span id="control" className={`${baseText} ${subtleText}`}>
                Code
              </span>

              <div
                id="icon1"
                className="icon-rotate rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 p-[4px] shadow-lg shadow-purple-500/30"
                style={{ perspective: "800px" }}
              >
                <div className="rounded-xl bg-white/80 p-6 text-purple-700 backdrop-blur-sm dark:bg-zinc-900/80">
                  <svg className="h-20 w-20" viewBox="0 0 100 100" fill="none">
                    <path d="M25 35L15 50L25 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M75 35L85 50L75 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M45 25L35 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <span id="your1" className={`${baseText} ${subtleText}`}>
                Create
              </span>
            </div>

            {/* Linha 2: Build | Icon | Deploy */}
            <div className="flex items-center justify-center gap-6">
              <span id="mind" className={`${baseText} ${accentText} ml-80`}>
                Build
              </span>

              <div
                id="icon2"
                className="icon-rotate rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 p-[4px] shadow-lg shadow-purple-500/30"
                style={{ perspective: "800px" }}
              >
                <div className="rounded-xl bg-white/80 p-6 text-purple-700 backdrop-blur-sm dark:bg-zinc-900/80">
                  <svg className="h-20 w-20" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="6" fill="none" />
                    <circle cx="50" cy="35" r="4" fill="currentColor" />
                    <circle cx="35" cy="57" r="4" fill="currentColor" />
                    <circle cx="65" cy="57" r="4" fill="currentColor" />
                    <path d="M50 39L50 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M39 57L46 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M61 57L54 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <span id="manifest" className={`${baseText} ${accentText}`}>
                Deploy
              </span>
            </div>

            {/* Linha 3: Test | Icon | Scale */}
            <div className="flex items-center justify-center gap-6 mr-80">
              <span id="your2" className={`${baseText} ${subtleText}`}>
                Test
              </span>

              <div
                id="icon3"
                className="icon-rotate rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 p-[4px] shadow-lg shadow-purple-500/30"
                style={{ perspective: "800px" }}
              >
                <div className="rounded-xl bg-white/80 p-4 text-purple-700 backdrop-blur-sm dark:bg-zinc-900/80">
                  <svg className="h-12 w-12" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="6" fill="none" />
                    <path d="M35 50L45 60L70 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <span id="reality" className={`${baseText} ${accentText}`}>
                Scale
              </span>
            </div>

            {/* Overlay absoluto sem fundo, alinhado no eixo Y com Manifest */}
            <div id="overlay-text" ref={overlayRef} className="absolute left-[45%] -translate-x-1/2 pointer-events-none">
              <div className="max-w-6xl">
                {paraBlocks.map((text, i) => (
                  <p key={i} className="text-line text-5xl leading-14 text-zinc-700 dark:text-zinc-300">
                    {text.split(" ").flatMap((w, j, arr) => [
                      <span key={`w-${j}`} className="word inline-block will-change-[opacity,filter,transform]">{w}</span>,
                      j < arr.length - 1 ? " " : null,
                    ])}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}