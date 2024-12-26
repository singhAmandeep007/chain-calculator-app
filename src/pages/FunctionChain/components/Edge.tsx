import { useEffect, FC, useRef } from "react";

export type TEdgeProps = {
  outputElementId: string;
  inputElementId: string;
};

export const Edge: FC<TEdgeProps> = ({ outputElementId, inputElementId }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    function updatePath() {
      const fromEl = document.getElementById(outputElementId);
      const toEl = document.getElementById(inputElementId);

      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2;
      const y1 = fromRect.top + fromRect.height / 2;
      const x2 = toRect.left + toRect.width / 2;
      const y2 = toRect.top + toRect.height / 2;

      const dx = (x2 - x1) / 2;
      const p1 = `${x1 + dx * 0.5},${y1 * 1.025}`;
      const p2 = `${x2 - dx},${y2 * 1.125}`;

      const newPath = `M ${x1},${y1} C ${p1} ${p2} ${x2},${y2}`;

      if (svgRef.current) {
        svgRef.current.querySelector("path")!.setAttribute("d", newPath);
      }
    }

    updatePath();

    // Recompute path on resize or scroll
    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, [inputElementId, outputElementId]);

  return (
    <svg
      className="pointer-events-none fixed left-0 top-0 h-full w-full"
      style={{ zIndex: 1 }}
      ref={svgRef}
    >
      <path
        strokeWidth={4}
        stroke={"var(--p30)"}
        className="fill-none opacity-30"
      />
    </svg>
  );
};
