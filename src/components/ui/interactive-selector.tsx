"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Flame, Droplets, HeartHandshake, Landmark } from "lucide-react";

export interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

interface InteractiveSelectorProps {
  options?: SelectorOption[];
  onOptionClick?: (option: SelectorOption, index: number) => void;
}

const defaultOptions: SelectorOption[] = [
  {
    title: "Spiritualism",
    description: "Ceremony with spiritual leaders in saffron robes",
    image: "/images/gallery-1.png",
    icon: <Sparkles size={24} className="text-white" />,
  },
  {
    title: "Temple Restoration",
    description: "Traditional prayers & architectural renovation",
    image: "/images/gallery-2.png",
    icon: <Landmark size={24} className="text-white" />,
  },
  {
    title: "Community Welfare",
    description: "Festive temple processions & rural support",
    image: "/images/gallery-3.png",
    icon: <HeartHandshake size={24} className="text-white" />,
  },
  {
    title: "Sacred Heritage",
    description: "Sacred ash and rudraksha devotional offerings",
    image: "/images/about.png",
    icon: <Flame size={24} className="text-white" />,
  },
  {
    title: "Vedic Traditions",
    description: "Timeless rituals preserving ancient wisdom",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    icon: <Droplets size={24} className="text-white" />,
  },
];

const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({
  options = defaultOptions,
  onOptionClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOptionHover = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleOptionClick = (index: number) => {
    if (onOptionClick && options[index]) {
      onOptionClick(options[index], index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setAnimatedOptions([]);

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-transparent font-sans py-4 rounded-[36px] overflow-hidden">
      {/* Header Section */}
      <div className="w-full max-w-3xl px-4 sm:px-6 mb-8 text-center">
        <span className="font-label-lg text-primary dark:text-saffron-glow text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
          Visual Impact
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface dark:text-ethereal-white mb-3 tracking-tight drop-shadow-sm animate-fadeInTop delay-300">
          Interactive Photo Gallery
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-on-surface-variant dark:text-surface-variant font-medium max-w-xl mx-auto animate-fadeInTop delay-600">
          Hover over any picture to expand and reveal our divine heritage, or click to open full screen.
        </p>
      </div>

      {/* Options Container */}
      <div className="options flex flex-col md:flex-row w-full max-w-[1200px] px-4 min-h-[580px] md:min-h-[500px] items-stretch overflow-hidden relative gap-2.5 sm:gap-3">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className={`
                option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out rounded-3xl
                ${isActive ? "active" : ""}
              `}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backfaceVisibility: "hidden",
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index)
                  ? isMobile ? "translateY(0)" : "translateX(0)"
                  : isMobile ? "translateY(30px)" : "translateX(-60px)",
                minWidth: isMobile ? "100%" : isActive ? "260px" : "68px",
                minHeight: isMobile ? (isActive ? "220px" : "72px") : "auto",
                width: isMobile ? "100%" : "auto",
                cursor: "pointer",
                backgroundColor: "transparent",
                boxShadow: "none",
                flex: isActive ? (isMobile ? "4 1 0%" : "5 1 0%") : "1 1 0%",
                zIndex: isActive ? 10 : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                willChange: "flex-grow, box-shadow, background-size, background-position",
                border: isActive ? "2px solid #FFD27F" : "none",
              }}
              onMouseEnter={() => !isMobile && handleOptionHover(index)}
              onClick={() => {
                if (isMobile && !isActive) {
                  setActiveIndex(index);
                } else {
                  handleOptionClick(index);
                }
              }}
            >
              {/* Dark overlay for readability */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0, 50, 43, 0.95) 0%, rgba(0, 50, 43, 0.4) 50%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%)",
                }}
              />

              {/* Label with icon and info */}
              <div className="label relative z-10 flex items-center justify-start p-3.5 sm:p-6 gap-3 sm:gap-4 w-full">
                <div className="icon min-w-[40px] max-w-[40px] sm:min-w-[44px] sm:max-w-[44px] h-[40px] sm:h-[44px] flex items-center justify-center rounded-full bg-primary/90 dark:bg-saffron-glow text-ethereal-white dark:text-deep-forest backdrop-blur-md shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {option.icon || <Sparkles size={20} />}
                </div>
                <div className="info text-ethereal-white overflow-hidden relative flex flex-col justify-center">
                  <div
                    className="main font-bold text-base sm:text-xl transition-all duration-700 ease-in-out whitespace-nowrap truncate"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                      maxHeight: isActive ? "50px" : "0px",
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-xs sm:text-sm text-saffron-glow transition-all duration-700 ease-in-out line-clamp-2"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                      maxHeight: isActive ? "60px" : "0px",
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
