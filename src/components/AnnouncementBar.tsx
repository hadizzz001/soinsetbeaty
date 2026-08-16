"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  Scissors,
  Wand2,
  Pen,
  Palette,
  Gem,
  Flame,
  Eraser,
  Droplets,
} from "lucide-react";

const messages = [
  { text: "EMS Sculpting + RF", Icon: Zap },
  { text: "HIFU Lifting Therapy", Icon: Sparkles },
  { text: "Diode Laser Hair Removal", Icon: Scissors },
  { text: "Microblading Brow Art", Icon: Wand2 },
  { text: "Lip Blush & Eyeliner", Icon: Pen },
  { text: "Nails & Makeup Studio", Icon: Palette },
  { text: "Slimming Body Therapy", Icon: Gem },
  { text: "Tattoo Removal Sessions", Icon: Flame },
  { text: "Signature Facial Glow", Icon: Droplets },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 700);
      return () => clearTimeout(timeout);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const { text, Icon } = messages[index];

  return (
    <div
      className="w-full overflow-hidden py-1.5"
      style={{
        backgroundColor: "#d69a38",
      }}
    >
      <div className="container-site flex items-center justify-center gap-2">
        <Icon
          key={`icon-${index}`}
          className={`shrink-0 text-white/90 transition-opacity duration-700 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          size={13}
          strokeWidth={2}
        />
        <p
          key={index}
          className={`text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white transition-opacity duration-700 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
