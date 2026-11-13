import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

type Props = {
  onComplete: () => void;
};

type Particle = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  opacity: number;
  kind: "flake" | "spark";
};

export function AvalancheTransition({ onComplete }: Props) {
  const reduceMotion = useReducedMotion();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 44 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: 8 + Math.random() * 30,
        delay: Math.random() * 0.85,
        duration: 0.85 + Math.random() * 0.85,
        drift: (Math.random() - 0.5) * 180,
        rotate: (Math.random() - 0.5) * 320,
        opacity: 0.5 + Math.random() * 0.5,
        kind: index % 5 === 0 ? "spark" : "flake",
      })),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduceMotion ? 1000 : 2950);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  if (reduceMotion) {
    return (
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[80] bg-[linear-gradient(180deg,#f8feff,#d5f1fb)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, times: [0, 0.3, 0.7, 1] }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[80] overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* clarão de gelo */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0.35, 0] }}
        transition={{ duration: 2.85, times: [0, 0.14, 0.55, 1] }}
      />

      {/* a parede de neve desce, cobre tudo e escorre para fora */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: "-102%" }}
        animate={{ y: ["-102%", "0%", "0%", "104%"] }}
        transition={{
          duration: 2.65,
          times: [0, 0.3, 0.68, 1],
          ease: ["easeIn", "linear", "easeIn"],
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f2fcff_22%,#dff6fe_48%,#bfe7f8_76%,#9fd6ef_100%)]">
          {/* veios diagonais de cristal */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(112deg, transparent 0 54px, rgba(255,255,255,0.85) 54px 57px, transparent 57px 118px)",
            }}
          />
          <div className="crystal-texture absolute inset-0 opacity-20" />
          {/* brilho central */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.95),transparent_62%)]" />
          {/* cristais gigantes embutidos */}
          <SnowflakeCrystal
            size={420}
            strokeWidth={1}
            className="absolute -left-24 top-1/4 text-white/60"
          />
          <SnowflakeCrystal
            size={300}
            strokeWidth={1}
            className="absolute -right-16 bottom-1/4 text-glacier-400/45"
          />
        </div>

        {/* onda de neve na borda inferior */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -bottom-[9vh] h-[18vh] w-full"
        >
          <path
            d="M0 62 C 170 150 302 6 486 74 C 670 142 820 22 1006 82 C 1188 140 1306 46 1440 104 L1440 220 L0 220 Z"
            fill="#c7ecfa"
          />
          <path
            d="M0 118 C 196 186 344 62 528 128 C 712 194 866 92 1052 138 C 1236 184 1332 118 1440 156 L1440 220 L0 220 Z"
            fill="#e8faff"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* enxurrada de flocos e faíscas */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute top-0 text-white"
            style={{ left: `${particle.left}%`, willChange: "transform, opacity" }}
            initial={{ y: "-24vh", opacity: 0, x: 0, rotate: 0 }}
            animate={{
              y: "118vh",
              x: [0, particle.drift * 0.5, particle.drift],
              opacity: [0, particle.opacity, particle.opacity, 0],
              rotate: particle.rotate,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeIn",
              times: [0, 0.18, 0.75, 1],
            }}
          >
            {particle.kind === "flake" ? (
              <SnowflakeCrystal size={particle.size} strokeWidth={1.7} />
            ) : (
              <Sparkle size={particle.size * 0.8} className="text-white" />
            )}
          </motion.span>
        ))}
      </div>

      {/* mandala de gelo que gira e se expande */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
        animate={{
          opacity: [0, 0.75, 0.45, 0],
          scale: [0.45, 1.05, 1.35, 1.6],
          rotate: [-30, 10, 30, 50],
        }}
        transition={{ duration: 2.5, times: [0, 0.4, 0.72, 1], ease: "easeOut" }}
      >
        <SnowflakeCrystal
          size={560}
          strokeWidth={0.9}
          className="text-white/80 drop-shadow-[0_0_60px_rgba(129,212,250,0.9)]"
        />
      </motion.div>

      {/* raios de luz cruzando a tela */}
      {[0, 1, 2].map((ray) => (
        <motion.div
          key={ray}
          className="absolute left-1/2 top-0 h-[160vh] w-[16vw] -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.75),transparent)] blur-xl will-change-transform"
          style={{ rotate: `${-18 + ray * 18}deg`, originY: 0 }}
          initial={{ opacity: 0, scaleY: 0.2 }}
          animate={{ opacity: [0, 0.65, 0], scaleY: [0.2, 1, 1] }}
          transition={{
            duration: 2.2,
            delay: 0.25 + ray * 0.12,
            times: [0, 0.35, 1],
            ease: "easeOut",
          }}
        />
      ))}

      {/* mensagem central durante a cobertura */}
      <motion.div
        className="absolute inset-0 grid place-items-center px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -18] }}
        transition={{ duration: 2.4, times: [0, 0.3, 0.62, 1], ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            className="text-glacier-600"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <SnowflakeCrystal size={34} withHexagon strokeWidth={1.8} />
          </motion.span>
          <p className="font-display text-lg leading-snug tracking-[0.18em] text-sapphire-800 sm:text-3xl">
            A magia está sendo revelada…
          </p>
          <p className="text-[9px] uppercase tracking-[0.4em] text-glacier-700/80 sm:text-[10px]">
            Arendelle · memórias congeladas
          </p>
        </div>
      </motion.div>
    </div>
  );
}
