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

  // Criar estrelas/partículas
  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;

    // Criar 100 estrelas
    for (let i = 0; i < 100; i++) {
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
  }, []);

  // Efeito de movimento das estrelas com o mouse
  useEffect(() => {
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
  }, []);

  // Aplicar movimento às estrelas
  useEffect(() => {
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
  }, [mousePosition]);

  useEffect(() => {
    const section = sectionRef.current;
    const missionText = missionTextRef.current;
    const leadership = leadershipRef.current;
    const cards = cardsRef.current;

    if (!section || !missionText || !leadership) return;

    // Animação do texto da missão
    gsap.fromTo(
      missionText.children,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionText,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animação dos cards de liderança
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Efeito de hover baseado na velocidade do mouse
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
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

      <div className="relative z-20 container mx-auto px-6 py-20">
        {/* Seção de Missão */}
        <div
          ref={missionTextRef}
          className="relative mb-32 max-w-7xl mx-auto px-6"
        >
          {/* Gradiente de fundo sutil */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div 
              className="absolute -top-32 -left-32 w-[120%] h-[120%]"
              style={{
                background: `
                  radial-gradient(ellipse 1200px 800px at 30% 40%, 
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
          <div className="text-center mb-24 pt-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full border border-gray-500/50 flex items-center justify-center backdrop-blur-sm">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
              </div>
              <h1 className="text-6xl md:text-7xl font-light text-white tracking-wide">
                Vision
              </h1>
            </div>
            <p className="text-xl text-gray-300 font-light leading-2">Innovation through Technology</p>
          </div>

          {/* Texto principal */}
          <div className="text-center mb-28 ">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-16 leading-[1.1] max-w-5xl ">
              Our mission is{' '}
              <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                to transform ideas into innovative digital solutions
              </span>
              .
            </h2>
          </div>

          {/* Conteúdo em duas colunas */}
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto text-gray-300 ml-60">
            <div className="space-y-8">
              <p className="text-md leading-relaxed font-light">
                The digital world is constantly evolving, and with it come infinite opportunities to create solutions that positively impact people's lives. We believe that technology is a powerful tool for transforming challenges into opportunities.
              </p>
              <p className="text-md leading-relaxed font-light">
                Our approach combines creativity, technical innovation, and user focus to develop exceptional digital experiences. Each project is an opportunity to learn, grow, and contribute to a more connected and efficient future.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-md leading-relaxed font-light">
                We use the most modern technologies and agile methodologies to deliver robust, scalable, and user-centered solutions. From responsive web applications to complex backend systems, our expertise spans the entire spectrum of modern development.
              </p>
              <p className="text-md leading-relaxed font-light">
                With passion for technical excellence and commitment to innovation, we transform concepts into digital reality, creating value for both users and businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Leadership Team */}
        <div ref={leadershipRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-100">
              Our Team
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                      {member.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed whitespace-pre-line">
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