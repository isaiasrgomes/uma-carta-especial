import { Volume2, VolumeX } from "lucide-react";

type Props = {
  on: boolean;
  onToggle: () => void;
};

/** Controle da trilha sonora exibido no cabeçalho do álbum. */
export function SoundToggle({ on, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? "Desativar a trilha sonora" : "Ativar a trilha sonora"}
      title={on ? "Desativar a trilha sonora" : "Ativar a trilha sonora"}
      className="group inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/45 px-2.5 py-1.5 text-sapphire-600 shadow-[0_8px_20px_-14px_rgba(21,84,120,0.8),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-md transition-colors duration-300 hover:bg-white/70 sm:px-3"
    >
      <span className="relative grid size-4 place-items-center">
        {on ? (
          <Volume2 className="size-4 text-glacier-700" />
        ) : (
          <VolumeX className="size-4 text-glacier-600/60" />
        )}
      </span>
      <span className="hidden text-[8px] font-semibold uppercase tracking-[0.24em] sm:text-[9px]">
        {on ? "Som ligado" : "Som desligado"}
      </span>
    </button>
  );
}
