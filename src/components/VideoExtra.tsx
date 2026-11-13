import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { extraContent } from "../data/content";
import { SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Extra do fim do álbum: um vídeo em um painel de vidro.
 * Sem `videoSrc` em content.ts, o painel mostra o placeholder com instruções.
 * Montado em portal para o `fixed` não herdar o transform das páginas.
 */
export function VideoExtra({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-extra"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Fechar o extra"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-sapphire-900/55 backdrop-blur-md"
            tabIndex={-1}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-extra-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 210, damping: 26, mass: 0.7 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/85 bg-[linear-gradient(158deg,rgba(255,255,255,0.95),rgba(238,251,255,0.88)_45%,rgba(203,238,252,0.86))] p-4 shadow-[0_40px_90px_-40px_rgba(8,40,60,0.85)] backdrop-blur-xl sm:p-6"
          >
            <div
              aria-hidden="true"
              className="crystal-texture pointer-events-none absolute inset-0 opacity-[0.1]"
            />

            <div className="relative mb-4 flex items-start justify-between gap-3 px-1">
              <div>
                <p className="text-[8.5px] uppercase tracking-[0.42em] text-glacier-700 sm:text-[9px]">
                  {extraContent.ctaEyebrow}
                </p>
                <h2
                  id="video-extra-title"
                  className="mt-1.5 bg-[linear-gradient(180deg,#2f7fa6_0%,#185677_55%,#0b2740_100%)] bg-clip-text font-display text-[1.25rem] leading-tight font-semibold tracking-wide text-transparent sm:text-2xl"
                >
                  {extraContent.title}
                </h2>
                <p className="mt-2 max-w-md text-[12px] leading-relaxed text-sapphire-600/85 sm:text-[13px]">
                  {extraContent.description}
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar o extra"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/90 bg-white/70 text-sapphire-700 shadow-[0_8px_20px_-12px_rgba(21,84,120,0.8)] transition-colors hover:bg-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[20px] border border-white/85 bg-glacier-300/60 shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
              {extraContent.videoSrc ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={extraContent.poster || undefined}
                  className="aspect-video w-full bg-sapphire-900/90"
                >
                  <source src={extraContent.videoSrc} />
                  Seu navegador não reproduz este vídeo. Baixe o arquivo em{" "}
                  {extraContent.videoSrc}.
                </video>
              ) : (
                <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden px-6 text-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.95),rgba(224,247,250,0.45)_50%,transparent_78%)]"
                  />
                  <SnowflakeCrystal
                    size={420}
                    strokeWidth={0.7}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-glacier-600/[0.1]"
                  />

                  <div className="relative grid size-14 place-items-center rounded-full border border-dashed border-glacier-500/70 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
                    <Play className="size-5 translate-x-[1px] text-glacier-700" />
                    <Sparkle
                      size={12}
                      className="absolute -right-2 -top-1 text-white drop-shadow-[0_0_8px_rgba(129,212,250,0.95)]"
                    />
                  </div>

                  <p className="relative font-display text-sm tracking-wide text-sapphire-900 sm:text-base">
                    {extraContent.placeholderTitle}
                  </p>
                  <p className="relative max-w-sm text-[11px] leading-relaxed text-sapphire-600/85 sm:text-[12px]">
                    {extraContent.placeholderNote}
                  </p>
                  <span className="relative rounded-full border border-white/80 bg-white/55 px-3 py-1 text-[8px] uppercase tracking-[0.28em] text-glacier-700 sm:text-[9px]">
                    Espaço reservado para o vídeo
                  </span>
                </div>
              )}
            </div>

            <p className="relative mt-3 text-center text-[8px] uppercase tracking-[0.3em] text-glacier-700/60 sm:text-[9px]">
              Toque fora para voltar ao álbum
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
