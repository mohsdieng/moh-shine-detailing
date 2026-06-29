/**
 * Ceramic Coating demo — a dark, glossy panel with hydrophobic water beads
 * sitting on the surface and a slow light sheen sweeping across it, evoking
 * the self-cleaning, water-repellent finish of a ceramic coat.
 *
 * Pure CSS (no JS, no photography). Animation is gated behind `motion-safe:`
 * so it renders as a static glossy panel under prefers-reduced-motion.
 */

// Hand-placed beads: [left%, top%, size px]. Varied sizes read as real beading.
const beads: Array<[number, number, number]> = [
  [12, 22, 26], [28, 58, 18], [44, 30, 34], [62, 64, 22], [76, 26, 16],
  [88, 52, 28], [20, 78, 20], [54, 84, 14], [70, 14, 20], [36, 70, 12],
  [82, 80, 16], [8, 48, 14], [50, 50, 16], [92, 18, 12], [30, 38, 12],
];

export function BeadingDemo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label="Ceramic coating: water beads up and rolls off the hydrophobic, glossy surface"
      style={{
        backgroundColor: "#05080c",
        backgroundImage:
          "radial-gradient(130% 100% at 70% 12%, #16222f 0%, #0a131c 48%, #04070b 100%)",
      }}
    >
      {/* Slow sheen sweep — the wet-look reflection moving across the coat */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 motion-safe:animate-sheen"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(120,190,255,0.10) 40%, rgba(255,255,255,0.22) 50%, rgba(120,190,255,0.10) 60%, transparent 100%)",
        }}
      />

      {/* Water beads */}
      {beads.map(([x, y, s], i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full motion-safe:animate-bead"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            animationDelay: `${(i % 5) * 0.4}s`,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9) 0%, rgba(150,200,240,0.35) 38%, rgba(10,20,30,0.15) 70%, transparent 100%)",
            boxShadow:
              "inset 0 0 4px rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.45)",
          }}
        />
      ))}

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-shine backdrop-blur">
        Hydrophobic
      </span>
    </div>
  );
}
