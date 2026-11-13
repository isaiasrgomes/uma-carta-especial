import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { BirthdayLetter } from "./BirthdayLetter";
import { Character } from "./Characters";
import { Sparkle, SnowflakeCrystal } from "./SnowflakeCrystal";

type Phase = "closed" | "opening" | "letter";

type Props = {
  onAdventure: () => void;
};

const SHARDS = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2;
  return {
    id: index,
    x: Math.cos(angle) * (86 + (index % 3) * 22),
    y: Math.sin(angle) * (86 + ((index + 1) % 3) * 22),
    size: 8 + (index % 4) * 3,
  };
});

export function EnvelopeIntro({ onAdventure }: Props) {
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<number[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    return () => timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const openLetter = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    timers.current.push(
      window.setTimeout(() => setPhase("letter"), reduceMotion ? 350 : 1350),
    );
  };

  const sealGone = phase !== "closed";

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-36 sm:px-6 sm:pt-20 sm:pb-44">
      {/* luz central que banha a cena */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[80vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(224,247,250,0.55)_40%,transparent_72%)] blur-2xl"
      />

      {/* Elsa e Olaf guardam a entrada do reino */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-2 z-0 mx-auto flex w-full max-w-4xl items-end justify-between px-1 sm:bottom-4 sm:px-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: phase === "letter" ? 0 : 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
          className="pb-2 sm:pb-3"
        >
          <Character name="olaf" className="w-[52px] drop-shadow-[0_10px_18px_rgba(21,84,120,0.22)] sm:w-[78px]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: phase === "letter" ? 0 : 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.2, ease: "easeOut" }}
        >
          <Character name="elsa-flocos" className="w-[190px] drop-shadow-[0_14px_28px_rgba(21,84,120,0.25)] sm:w-[300px]" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {phase !== "letter" ? (
          <motion.div
            key="envelope-scene"
            className="relative flex w-full flex-col items-center"
            exit={{ opacity: 0, y: -26, scale: 0.94 }}
            transition={{ duration: 0.42, ease: "easeIn" }}
          >
            {/* Cabeçalho editorial */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/45 px-4 py-1.5 shadow-[0_8px_24px_-12px_rgba(23,86,120,0.55)] backdrop-blur-md">
                <SnowflakeCrystal size={13} className="text-glacier-600" />
                <span className="text-[9px] uppercase tracking-[0.34em] text-glacier-700 sm:text-[10px]">
                  Um convite de Arendelle
                </span>
              </span>

              <h1 className="mt-5 font-display text-[1.45rem] leading-tight font-semibold tracking-wide text-sapphire-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] sm:text-4xl">
                Uma carta atravessou a neve
                <span className="mt-1 block bg-[linear-gradient(180deg,#2f7fa6,#123a5c)] bg-clip-text text-transparent">
                  para chegar até você
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-[12.5px] leading-relaxed text-sapphire-600/80 sm:max-w-sm sm:text-sm">
                Toque no selo de cristal e deixe o inverno contar esta história.
              </p>
            </motion.div>

            {/* ── ENVELOPE 3D ────────────────────────────────────────── */}
            <div
              className="relative mt-10 w-[min(90vw,430px)] sm:mt-12"
              style={{ perspective: 1600 }}
            >
              {/* aura e sombra no chão */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-12 -inset-y-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85),rgba(129,212,250,0.32)_45%,transparent_72%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 -bottom-10 h-10 rounded-[50%] bg-sapphire-800/20 blur-2xl"
              />

              {/* brilhos flutuantes ao redor */}
              {!reduceMotion && (
                <>
                  <motion.span
                    className="absolute -left-6 top-6 text-white drop-shadow-[0_0_10px_rgba(129,212,250,0.9)]"
                    animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4], rotate: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkle size={18} />
                  </motion.span>
                  <motion.span
                    className="absolute -right-4 top-1/3 text-glacier-400"
                    animate={{ y: [0, 14, 0], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  >
                    <Sparkle size={12} />
                  </motion.span>
                  <motion.span
                    className="absolute -left-2 bottom-4 text-glacier-500/80"
                    animate={{ y: [0, -10, 0], rotate: [0, -25, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                  >
                    <SnowflakeCrystal size={16} />
                  </motion.span>
                  <motion.span
                    className="absolute -right-5 bottom-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  >
                    <Sparkle size={15} />
                  </motion.span>
                </>
              )}

              <motion.div
                className="relative aspect-[1.52/1] w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  phase === "closed" && !reduceMotion
                    ? { y: [0, -7, 0] }
                    : { y: -8 }
                }
                transition={
                  phase === "closed"
                    ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    : { type: "spring", stiffness: 80, damping: 16 }
                }
              >
                {/* costas do envelope */}
                <div className="absolute inset-0 overflow-hidden rounded-[18px] border border-white/90 bg-[linear-gradient(150deg,#f4fdff,#cdeefb_48%,#96d1e9)] shadow-[0_50px_110px_-36px_rgba(17,72,104,0.75)]">
                  <div
                    aria-hidden="true"
                    className="crystal-texture absolute inset-0 opacity-[0.18]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent_35%,rgba(21,84,120,0.12))]"
                  />
                  <SnowflakeCrystal
                    size={84}
                    className="absolute -bottom-6 -right-6 text-white/30"
                  />
                </div>

                {/* feixe de luz que escapa quando o selo se rompe */}
                <AnimatePresence>
                  {sealGone && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.2 }}
                      animate={{ opacity: [0, 0.95, 0], scaleY: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.3, ease: "easeOut" }}
                      style={{ originY: 1 }}
                      className="absolute inset-x-[16%] bottom-[38%] top-0 z-[15] rounded-t-[40%] bg-[linear-gradient(0deg,rgba(255,255,255,0.98),rgba(224,247,250,0.8)_45%,transparent)] blur-md"
                    />
                  )}
                </AnimatePresence>

                {/* dobras frontais — três triângulos de papel gelado */}
                <div className="absolute inset-0 z-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0, 50% 62%, 0 100%)",
                      background:
                        "linear-gradient(125deg,#eafaff 0%,#c6ebf9 52%,#a3d8ee 100%)",
                      boxShadow: "inset -18px 0 30px -22px rgba(17,72,104,0.55)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 50% 62%)",
                      background:
                        "linear-gradient(235deg,#f6feff 0%,#d3f0fc 52%,#a8dbef 100%)",
                      boxShadow: "inset 18px 0 30px -22px rgba(17,72,104,0.45)",
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-[38%]"
                    style={{
                      clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                      background:
                        "linear-gradient(0deg,#9ed3ea 0%,#c9edfa 58%,#eafaff 100%)",
                      boxShadow: "inset 0 20px 34px -24px rgba(255,255,255,0.95)",
                    }}
                  />
                </div>

                {/* vinco central e bordas costuradas -- REMOVIDO --
                
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 z-[22] h-full w-full"
                >
                  <path
                    d="M0 0 L50 62 L100 0 M0 100 L50 62 L100 100 M0 0 L0 100 M100 0 L100 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="0.5"
                  />
                </svg>

                */}
                

                {/* aba superior que gira em 3D */}
                <motion.div
                  className="absolute inset-x-0 top-0 z-30 h-[62%] origin-top"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateX: sealGone ? -166 : 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : {
                          type: "spring",
                          stiffness: 96,
                          damping: 19,
                          mass: 0.9,
                          delay: 0.06,
                        }
                  }
                >
                  <div
                    className="relative h-full w-full overflow-hidden border border-white/80"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(178deg,#f8feff 0%,#dff7ff 42%,#b3e2f4 78%,#8fcbe4 100%)",
                      borderRadius: "18px 18px 4px 4px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="crystal-texture absolute inset-0 opacity-[0.2]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.7),transparent_45%,rgba(17,72,104,0.12))]"
                    />
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 0 L50 100 L100 0"
                        fill="none"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="0.6"
                      />
                    </svg>
                    <SnowflakeCrystal
                      size={46}
                      className="absolute right-5 top-4 text-white/45"
                    />
                  </div>
                </motion.div>

                {/* ── SELO DE CRISTAL ─────────────────────────────────── */}
                <AnimatePresence>
                  {!sealGone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.3, rotate: 30 }}
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                      className="absolute left-1/2 top-[62%] z-40 -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        type="button"
                        onClick={openLetter}
                        aria-label="Abrir a carta mágica"
                        className="group relative grid size-[74px] place-items-center rounded-full sm:size-[88px]"
                      >
                        <span
                          aria-hidden="true"
                          className="halo-breathe absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(129,212,250,0.55),transparent_72%)] blur-lg"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-[linear-gradient(150deg,#f6feff_0%,#b9e6f8_38%,#6cb9d8_72%,#3c8db4_100%)] shadow-[0_16px_36px_-10px_rgba(17,72,104,0.75),inset_0_2px_6px_rgba(255,255,255,0.95)] ring-1 ring-white/90 transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-[7px] rounded-full border border-white/70 shadow-[inset_0_1px_6px_rgba(255,255,255,0.9)]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-[13px] rounded-full border border-white/40 border-dashed"
                        />
                        <SnowflakeCrystal
                          size={42}
                          strokeWidth={2}
                          withHexagon
                          className="relative text-white drop-shadow-[0_2px_4px_rgba(11,39,64,0.55)] transition-transform duration-700 group-hover:rotate-45"
                        />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* estilhaços mágicos ao romper o selo */}
                {sealGone && !reduceMotion && (
                  <div className="pointer-events-none absolute left-1/2 top-[62%] z-40">
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0.95 }}
                      animate={{ scale: 2.6, opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80"
                    />
                    {SHARDS.map((shard) => (
                      <motion.span
                        key={shard.id}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                        animate={{
                          x: shard.x,
                          y: shard.y,
                          opacity: 0,
                          scale: 0.2,
                          rotate: 180,
                        }}
                        transition={{ duration: 0.95, ease: "easeOut" }}
                        className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
                      >
                        <Sparkle size={shard.size} />
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* dica de interação */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: sealGone ? 0 : 1 }}
              transition={{ duration: 0.5, delay: sealGone ? 0 : 0.6 }}
              className="mt-10 flex flex-col items-center gap-2 text-glacier-700/80"
            >
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MousePointerClick className="size-4" />
              </motion.span>
              <span className="text-[9px] uppercase tracking-[0.36em] sm:text-[10px]">
                Toque no selo para abrir
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <BirthdayLetter key="letter" onStart={onAdventure} />
        )}
      </AnimatePresence>
    </section>
  );
}
