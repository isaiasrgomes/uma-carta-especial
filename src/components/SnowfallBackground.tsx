import { useMemo } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

type Flake = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  depth: 0 | 1 | 2;
  tone: string;
};

/** Camadas de profundidade da neve (parallax). */
const DEPTHS = [
  { size: [5, 9], duration: [24, 36], opacity: [0.28, 0.45], blur: "blur-[0.6px]" },
  { size: [8, 14], duration: [16, 25], opacity: [0.45, 0.7], blur: "" },
  { size: [13, 22], duration: [11, 17], opacity: [0.7, 0.95], blur: "" },
] as const;

const TONES = [
  "text-[#8fd0e8]",
  "text-[#b6e6f7]",
  "text-white",
  "text-[#7ec4e0]",
];

export function SnowfallBackground() {
  const reduceMotion = useReducedMotion();

  const flakes = useMemo<Flake[]>(() => {
    return Array.from({ length: 26 }, (_, index) => {
      const depth = (index % 3) as 0 | 1 | 2;
      const layer = DEPTHS[depth];
      const size =
        layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);
      return {
        id: index,
        left: Math.random() * 100,
        size,
        duration:
          layer.duration[0] +
          Math.random() * (layer.duration[1] - layer.duration[0]),
        delay: Math.random() * 30,
        drift: (Math.random() - 0.5) * (depth === 2 ? 90 : 50),
        opacity:
          layer.opacity[0] +
          Math.random() * (layer.opacity[1] - layer.opacity[0]),
        depth,
        tone: TONES[Math.floor(Math.random() * TONES.length)],
      };
    });
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: 3 + Math.random() * 94,
        top: Math.random() * 78,
        size: 3 + Math.random() * 7,
        delay: Math.random() * 5,
        duration: 3.5 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#f8feff_0%,#eaf9fe_34%,#d5f1fb_68%,#b9e5f6_100%)]"
    >
      {/* Auras boreais — manchas de luz em movimento lento */}
      <motion.div
        className="absolute -top-[22%] -left-[18%] h-[62vh] w-[62vw] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(213,245,255,0.95),rgba(129,212,250,0.38)_45%,transparent_72%)] blur-2xl will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, 46, 0], y: [0, 28, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[4%] right-[-14%] h-[54vh] w-[52vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(196,235,255,0.9),rgba(158,201,255,0.32)_48%,transparent_74%)] blur-2xl will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, -36, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-16%] left-[18%] h-[46vh] w-[60vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,255,255,0.85),rgba(129,212,250,0.22)_52%,transparent_76%)] blur-2xl will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, 34, 0], y: [0, -22, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Estrelas de gelo cintilantes */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star-twinkle absolute text-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          >
            <Sparkle size={star.size} />
          </span>
        ))}
      </div>

      {/* Raios de luz vindos do alto, como no palácio de gelo */}
      <div className="absolute inset-x-0 top-0 h-[65vh] opacity-50 [background:conic-gradient(from_180deg_at_50%_-10%,transparent_0deg,rgba(255,255,255,0.65)_18deg,transparent_36deg,transparent_74deg,rgba(255,255,255,0.5)_92deg,transparent_112deg)] blur-2xl" />

      {/* Neve geométrica em três profundidades */}
      {!reduceMotion &&
        flakes.map((flake) => {
          const layer = DEPTHS[flake.depth];
          return (
            <span
              key={flake.id}
              className={`snowfall-flake ${flake.tone} ${layer.blur}`}
              style={
                {
                  left: `${flake.left}%`,
                  width: flake.size,
                  height: flake.size,
                  opacity: flake.opacity,
                  animationDuration: `${flake.duration}s`,
                  animationDelay: `-${flake.delay}s`,
                  "--drift": `${flake.drift}px`,
                } as CSSProperties
              }
            >
              <SnowflakeCrystal
                size={flake.size}
                strokeWidth={flake.depth === 2 ? 1.8 : 2.4}
              />
            </span>
          );
        })}

      {/* Névoa de neve no chão */}
      <div className="absolute inset-x-0 bottom-0 h-[26vh] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.55)_62%,rgba(255,255,255,0.85))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(44,116,155,0.14)_100%)]" />
    </div>
  );
}
