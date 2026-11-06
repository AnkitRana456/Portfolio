import React from 'react';

const NODE_W = 104;
const NODE_H = 40;
const GAP = 20;
const Y = 18;

// Five-node architecture strip. The 4s cycle and 0.8s node delay in index.css assume five nodes.
export default function FlowDiagram({ nodes }) {
  const width = nodes.length * NODE_W + (nodes.length - 1) * GAP;
  const mid = Y + NODE_H / 2;
  const path = `M${NODE_W / 2} ${mid} H${width - NODE_W / 2}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${NODE_H + Y * 2}`}
      role="img"
      aria-label={`Flow: ${nodes.join(', then ')}`}
      className="w-full min-w-[520px] h-auto"
    >
      <path d={path} stroke="#2a3036" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      {nodes.map((label, i) => (
        <g key={label}>
          <rect
            className="flow-node"
            style={{ '--i': i }}
            x={i * (NODE_W + GAP)}
            y={Y}
            width={NODE_W}
            height={NODE_H}
            rx="6"
            fill="#0b0d0f"
            stroke="#2a3036"
          />
          <text
            x={i * (NODE_W + GAP) + NODE_W / 2}
            y={mid + 4}
            textAnchor="middle"
            fontSize="11.5"
            fill="#d6dadd"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        </g>
      ))}
      <circle className="flow-packet" r="4" fill="#ffb454">
        <animateMotion dur="4s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}
