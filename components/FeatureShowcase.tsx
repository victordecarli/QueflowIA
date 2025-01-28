"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const features = [
  {
    title: "Adicionar imagens atrás da foto",
    beforeImage: "/personbefore.jpg",
    afterImage: "/personafter.jpg",
    beforeAlt: "Foto original sem logos",
    afterAlt: "Foto com logos atrás",
  },
  {
    title: "Adicionar texto atrás da foto",
    beforeImage: "/povbefore.jpg",
    afterImage: "/povafter.jpg",
    beforeAlt: "Foto original sem texto",
    afterAlt: "Foto com texto atrás",
  },
  {
    title: "Remover e personalizar o fundo",
    beforeImage: "/shirtbefore.jpg",
    afterImage: "/shirtafter.jpg",
    beforeAlt: "Foto original com fundo",
    afterAlt: "Foto com fundo personalizado",
  },
  {
    title: "Adicionar elementos atrás da foto",
    beforeImage: "/socialbefore.jpg",
    afterImage: "/socialafter.jpg",
    beforeAlt: "Foto original sem logos",
    afterAlt: "Foto com logos atrás",
  },
  {
    title: "Clonar objetos na imagem",
    beforeImage: "/applebefore.jpg",
    afterImage: "/appleafter.jpeg",
    beforeAlt: "Foto original sem clonar objetos",
    afterAlt: "Foto com objetos clonados",
  },
  {
    title: "Desenhar por trás das imagens em suas fotos",
    beforeImage: "/drawbefore.jpg",
    afterImage: "/drawafter.jpeg",
    beforeAlt: "Foto principal original",
    afterAlt: "Foto principal com desenhos de fundo",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-8 px-4" aria-label="Feature examples">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ComparisonSlider
              key={index}
              beforeImage={feature.beforeImage}
              afterImage={feature.afterImage}
              beforeAlt={feature.beforeAlt}
              afterAlt={feature.afterAlt}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  title,
}) {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    requestAnimationFrame(() => {
      setPosition(Math.min(Math.max(position, 0), 100));
    });
  };

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMove, { passive: false });
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden cursor-col-resize select-none"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
      >
        <div className="absolute inset-0 will-change-transform">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0 will-change-transform"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            draggable={false}
          />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="absolute inset-y-0 -ml-px w-1 bg-white/80" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="text-gray-600 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-white/70 text-sm">{title}</p>
    </div>
  );
}
