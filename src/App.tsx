import { useCallback, useEffect, useRef, useState } from "react";
import { AvalancheTransition } from "./components/AvalancheTransition";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { PhotoAlbum } from "./components/PhotoAlbum";
import { SnowfallBackground } from "./components/SnowfallBackground";

type Stage = "intro" | "avalanche" | "album";

/** Volume final da trilha — discreto, só para embalar a leitura. */
const MUSIC_VOLUME = 0.36;

export default function App() {
  const [stage, setStage] = useState<Stage>("intro");
  const [soundOn, setSoundOn] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrame = useRef<number | null>(null);

  /** Fade suave de volume via requestAnimationFrame. */
  const fadeTo = useCallback(
    (target: number, duration = 1500, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (fadeFrame.current !== null) {
        cancelAnimationFrame(fadeFrame.current);
        fadeFrame.current = null;
      }

      const from = audio.volume;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t * t * (3 - 2 * t);
        audio.volume = Math.max(0, Math.min(1, from + (target - from) * eased));
        if (t < 1) {
          fadeFrame.current = requestAnimationFrame(step);
        } else {
          fadeFrame.current = null;
          onDone?.();
        }
      };

      fadeFrame.current = requestAnimationFrame(step);
    },
    [],
  );

  /** Precisa ser chamado dentro do clique do usuário (política de autoplay). */
  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    void audio
      .play()
      .then(() => fadeTo(MUSIC_VOLUME))
      .catch(() => {
        /* autoplay bloqueado: o álbum segue sem som */
      });
  }, [fadeTo]);

  const startAdventure = useCallback(() => {
    window.scrollTo(0, 0);
    setStage("avalanche");
    if (soundOn) playMusic();
  }, [playMusic, soundOn]);

  const finishAvalanche = useCallback(() => setStage("album"), []);

  const restart = useCallback(() => {
    window.scrollTo(0, 0);
    setStage("intro");

    const audio = audioRef.current;
    if (!audio) return;
    if (fadeFrame.current !== null) {
      cancelAnimationFrame(fadeFrame.current);
      fadeFrame.current = null;
    }
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    const next = !soundOn;
    setSoundOn(next);

    if (!audio) return;

    if (next) {
      audio.volume = 0;
      void audio
        .play()
        .then(() => fadeTo(MUSIC_VOLUME, 800))
        .catch(() => {
          /* sem áudio disponível */
        });
    } else {
      fadeTo(0, 700, () => audio.pause());
    }
  }, [fadeTo, soundOn]);

  /** O extra tem áudio próprio: a trilha sai de cena enquanto ele está aberto. */
  const handleExtraOpenChange = useCallback(
    (open: boolean) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (open) {
        fadeTo(0, 400, () => audio.pause());
      } else if (soundOn) {
        audio.volume = 0;
        void audio
          .play()
          .then(() => fadeTo(MUSIC_VOLUME, 900))
          .catch(() => {
            /* sem áudio disponível */
          });
      }
    },
    [fadeTo, soundOn],
  );

  useEffect(() => {
    return () => {
      if (fadeFrame.current !== null) cancelAnimationFrame(fadeFrame.current);
    };
  }, []);

  return (
    <main className="relative min-h-svh">
      {/* 🎵 SUBSTITUA: troque o arquivo em public/audio/trilha-inverno.wav pela sua música */}
      <audio
        ref={audioRef}
        src="/audio/trilha-inverno.wav"
        loop
        preload="auto"
        aria-hidden="true"
      />

      <SnowfallBackground />

      {stage === "intro" && <EnvelopeIntro onAdventure={startAdventure} />}

      {stage !== "intro" && (
        <PhotoAlbum
          onRestart={restart}
          soundOn={soundOn}
          onToggleSound={toggleSound}
          onExtraOpenChange={handleExtraOpenChange}
        />
      )}

      {stage === "avalanche" && (
        <AvalancheTransition onComplete={finishAvalanche} />
      )}
    </main>
  );
}
