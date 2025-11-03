"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const leadershipData: LeadershipMember[] = [
  {
    id: 1,
    name: "Pablo Abreu",
    position: "Tech Lead\nFull Stack Developer",
    image: "/leadership/p1.jpg",
  },
  {
    id: 2,
    name: "Abreu Pablo",
    position: "UX/UI Designer\nCreative Director",
    image: "/leadership/p2.jpg",
  },
  {
    id: 3,
    name: "P. Abreu",
    position: "DevOps Engineer\nCloud Architect",
    image: "/leadership/p3.jpg",
  }
];

const MissionLeadershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const missionTextRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Criar estrelas/partículas - reduzir quantidade em mobile
  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;

    // Reduzir estrelas em mobile para melhor performance
    const starCount = isMobile ? 50 : 100;
    
    // Criar estrelas
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'absolute w-1 h-1 bg-white rounded-full opacity-30';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      starsContainer.appendChild(star);
    }

    return () => {
      starsContainer.innerHTML = '';
    };
  }, [isMobile]);

  // Efeito de movimento das estrelas com o mouse - desabilitar em mobile
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Aplicar movimento às estrelas - apenas desktop
  useEffect(() => {
    if (isMobile) return;

    const stars = starsRef.current?.children;
    if (!stars) return;

    Array.from(stars).forEach((star, index) => {
      const element = star as HTMLElement;
      const speed = (index % 3 + 1) * 0.5;
      gsap.to(element, {
        x: mousePosition.x * speed,
        y: mousePosition.y * speed,
        duration: 2,
        ease: "power2.out"
      });
    });
  }, [mousePosition, isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    const missionText = missionTextRef.current;
    const leadership = leadershipRef.current;
    const cards = cardsRef.current;

    if (!section || !missionText || !leadership) return;

    // Animações mais rápidas para mobile
    const animationDuration = isMobile ? 0.8 : 1.2;
    const staggerDelay = isMobile ? 0.15 : 0.3;

    // Animação do texto da missão
    gsap.fromTo(
      missionText.children,
      {
        opacity: 0,
        y: isMobile ? 50 : 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        stagger: staggerDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionText,
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animação dos cards de liderança - mais rápida em mobile
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: isMobile ? 40 : 80,
            scale: isMobile ? 0.9 : 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.6 : 1,
            delay: index * (isMobile ? 0.1 : 0.2),
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 90%" : "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Efeito de hover - simplificado para mobile
        if (!isMobile) {
          // Efeito de hover baseado na velocidade do mouse - apenas desktop
          let mouseSpeed = 0;
          let lastMouseTime = Date.now();
          let lastMouseX = 0;
          let lastMouseY = 0;

          const handleMouseEnter = (e: MouseEvent) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastMouseTime;
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            mouseSpeed = distance / deltaTime;
            
            // Intensidade baseada na velocidade
            const intensity = Math.min(mouseSpeed * 0.5, 1);
            
            gsap.to(card, {
              y: -15 * intensity,
              scale: 1 + (0.1 * intensity),
              rotationY: (e.clientX - card.offsetLeft - card.offsetWidth / 2) * 0.1 * intensity,
              rotationX: -(e.clientY - card.offsetTop - card.offsetHeight / 2) * 0.05 * intensity,
              duration: 0.6,
              ease: "power2.out",
            });

            const image = card.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1.1 + (0.1 * intensity),
                duration: 0.6,
                ease: "power2.out",
              });
            }

            lastMouseTime = currentTime;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            
            const image = card.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            }
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
          card.addEventListener("mousemove", handleMouseEnter);

          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
            card.removeEventListener("mousemove", handleMouseEnter);
          };
        } else {
          // Efeito de toque simples para mobile
          const handleTouchStart = () => {
            gsap.to(card, {
              scale: 0.95,
              duration: 0.2,
              ease: "power2.out",
            });
          };

          const handleTouchEnd = () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("touchstart", handleTouchStart);
          card.addEventListener("touchend", handleTouchEnd);

          return () => {
            card.removeEventListener("touchstart", handleTouchStart);
            card.removeEventListener("touchend", handleTouchEnd);
          };
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background com estrelas */}
      <div
        ref={starsRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.9) 70%)',
        }}
      />

      {/* Gradiente adicional */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Seção de Missão */}
        <div
          ref={missionTextRef}
          className="relative mb-20 sm:mb-32 max-w-7xl mx-auto px-4 sm:px-6"
        >
          {/* Gradiente de fundo sutil */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div 
              className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-[120%] h-[120%]"
              style={{
                background: `
                  radial-gradient(ellipse 800px 600px at 30% 40%, 
                    rgba(147, 51, 234, 0.08) 0%, 
                    rgba(79, 70, 229, 0.06) 30%, 
                    rgba(59, 130, 246, 0.04) 60%, 
                    transparent 100%
                  )
                `,
                transform: 'rotate(-15deg)',
              }}
            />
          </div>

          {/* Header da seção */}
          <div className="text-center mb-16 sm:mb-24 pt-8 sm:pt-16">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-gray-500/50 flex items-center justify-center backdrop-blur-sm">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-wide">
                Vision
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 font-light leading-2">Innovation through Technology</p>
          </div>

          {/* Texto principal */}
          <div className="text-center mb-20 sm:mb-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-12 sm:mb-16 leading-[1.1] max-w-5xl mx-auto px-4">
              Our mission is{' '}
              <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                to transform ideas into innovative digital solutions
              </span>
              .
            </h2>
          </div>

          {/* Conteúdo em duas colunas - responsivo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 max-w-6xl mx-auto text-gray-300 lg:ml-60">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-sm sm:text-md leading-relaxed font-light">
                The digital world is constantly evolving, and with it come infinite opportunities to create solutions that positively impact people's lives. We believe that technology is a powerful tool for transforming challenges into opportunities.
              </p>
              <p className="text-sm sm:text-md leading-relaxed font-light">
                Our approach combines creativity, technical innovation, and user focus to develop exceptional digital experiences. Each project is an opportunity to learn, grow, and contribute to a more connected and efficient future.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-md leading-relaxed font-light">
                We use the most modern technologies and agile methodologies to deliver robust, scalable, and user-centered solutions. From responsive web applications to complex backend systems, our expertise spans the entire spectrum of modern development.
              </p>
              <p className="text-sm sm:text-md leading-relaxed font-light">
                With passion for technical excellence and commitment to innovation, we transform concepts into digital reality, creating value for both users and businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Leadership Team */}
        <div ref={leadershipRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 text-gray-100">
              Our Team
            </h2>
            <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 px-4">
            {leadershipData.map((member, index) => (
              <div
                key={member.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group cursor-pointer perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800/50">
                  <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-2 sm:mb-3">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed whitespace-pre-line">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .absolute.w-1.h-1 {
          animation: twinkle 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default MissionLeadershipSection;