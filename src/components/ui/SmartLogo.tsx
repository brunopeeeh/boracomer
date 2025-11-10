import React from "react";

type SmartLogoProps = {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  title?: string;
  fontScale?: number; // proporção do diâmetro para o tamanho da fonte
};

function getInitials(name: string) {
  const words = name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "");
  const initials = (words[0] ?? "").concat(words[1] ?? "").slice(0, 2);
  if (initials.trim().length === 0) {
    return name.slice(0, 2).toUpperCase();
  }
  return initials;
}

function getGradient(name: string) {
  const hash = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hash * 3) % 360;
  const c1 = `hsl(${hue1}, 70%, 55%)`;
  const c2 = `hsl(${hue2}, 70%, 45%)`;
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

const SmartLogo: React.FC<SmartLogoProps> = ({ name, width = 56, height = 56, className = "", title, fontScale = 0.36 }) => {
  const initials = getInitials(name);
  const background = getGradient(name);
  const fontSize = Math.floor(Math.min(width, height) * fontScale);
  return (
    <div
      role="img"
      aria-label={title || `Logo de ${name}`}
      style={{ width, height, borderRadius: 9999, background }}
      className={`flex items-center justify-center font-bold text-white shadow-sm ${className}`}
    >
      <span style={{ letterSpacing: 0.5, fontSize }}>{initials}</span>
    </div>
  );
};

export default SmartLogo;