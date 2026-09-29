import React from "react";
import { Check, Lock, Compass } from "lucide-react";
import { Place } from "../data/cities";
import { useGame, getCurrentFormattedTime, isPlaceUnlocked } from "../context/GameContext";

export const CATEGORY_STYLES: Record<string, { emoji: string; color: string }> = {
  Heritage: { emoji: "🏛️", color: "#B8341E" },
  Food: { emoji: "🍽️", color: "#D97706" },
  Shopping: { emoji: "🛍️", color: "#8B3A62" },
  Photo: { emoji: "📸", color: "#1B5E8C" },
  Hidden: { emoji: "🔮", color: "#0D8A68" },
  Hotel: { emoji: "🛏️", color: "#5A6578" }
};

interface QuestMapSvgProps {
  places: Place[];
  onPick?: (place: Place) => void;
  height?: number | string;
  showTrail?: boolean;
  highlightPlaceId?: string;
}

export const QuestMapSvg: React.FC<QuestMapSvgProps> = ({
  places,
  onPick,
  height = 360,
  showTrail = true,
  highlightPlaceId
}) => {
  const { visited, trail, simTime, location } = useGame();
  const currentTime = getCurrentFormattedTime(simTime);

  // Match trail points with place coordinates
  const trailPlaces = trail
    .map((t) => places.find((p) => p.id === t.id))
    .filter((p): p is Place => Boolean(p));

  // Compute map coordinates for user location
  const userPos = React.useMemo(() => {
    if (!location) return null;
    // Map lat/lng into 0-100 canvas percentages for Ahmedabad region
    const minLat = 22.97;
    const maxLat = 23.17;
    const minLng = 72.50;
    const maxLng = 72.62;

    if (
      location.lat >= minLat - 0.05 &&
      location.lat <= maxLat + 0.05 &&
      location.lng >= minLng - 0.05 &&
      location.lng <= maxLng + 0.05
    ) {
      const x = Math.min(90, Math.max(10, ((location.lng - minLng) / (maxLng - minLng)) * 100));
      const y = Math.min(90, Math.max(10, 100 - ((location.lat - minLat) / (maxLat - minLat)) * 100));
      return { x: Math.round(x), y: Math.round(y) };
    }
    // Fallback position
    return { x: 50, y: 50 };
  }, [location]);

  return (
    <div
      className="qt-map-canvas rounded-2xl relative overflow-hidden border border-[var(--qt-border)] select-none transition-all shadow-inner w-full touch-pan-y"
      style={{ height: typeof height === "number" ? `${height}px` : height, maxHeight: "65vh" }}
    >
      {/* Compass Watermark */}
      <div className="absolute top-3 right-3 text-[var(--qt-map-line)] opacity-80 pointer-events-none">
        <span className="text-2xl sm:text-3xl filter drop-shadow-sm">🧭</span>
      </div>

      {/* Map Tagline */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#8b7e6d] opacity-75 pointer-events-none uppercase">
        VISTA · Illustrated Adventure Map
      </div>

      {/* Polyline Trail of Visited Places */}
      {showTrail && trailPlaces.length > 1 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <polyline
            points={trailPlaces.map((p) => `${p.x}%,${p.y}%`).join(" ")}
            fill="none"
            stroke="var(--state-accent, #e05a47)"
            strokeWidth="3"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      )}

      {/* User Live GPS Marker */}
      {userPos && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20"
          style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
        >
          <span className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping absolute" />
          <span className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
          </span>
          <span className="mt-1 text-[9px] font-black tracking-tight px-1.5 py-0.5 rounded-full bg-blue-700 text-white shadow-md whitespace-nowrap">
            📍 YOU
          </span>
        </div>
      )}

      {/* Landmarks / Pins */}
      {places.map((place) => {
        const cat = CATEGORY_STYLES[place.category] || CATEGORY_STYLES.Heritage;
        const isVisited = Boolean(visited[place.id]);
        const unlocked = isPlaceUnlocked(place.unlock, currentTime);

        return (
          <button
            key={place.id}
            onClick={() => onPick && onPick(place)}
            className="qt-tap absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 focus:outline-none"
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
          >
            {/* Pulsing halo for interactive pins */}
            {unlocked && !isVisited && (
              <span
                className="absolute w-10 h-10 rounded-full animate-ping opacity-30"
                style={{ background: cat.color }}
              />
            )}

            {/* Pin Badge Circle */}
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full text-base shadow-lg border-2 border-white transition-transform group-hover:scale-110 ${
                isVisited ? "ring-2 ring-emerald-500" : ""
              }`}
              style={{
                background: isVisited ? "var(--state-accent, #0D8A68)" : "#ffffff",
                opacity: unlocked ? 1 : 0.65
              }}
            >
              {isVisited ? (
                <Check size={18} className="text-white stroke-[3]" />
              ) : (
                <span className="leading-none">{cat.emoji}</span>
              )}
            </span>

            {/* Locked Time pill */}
            {!unlocked && (
              <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--qt-ink)] text-white flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Lock size={9} />
                <span>{place.unlock}</span>
              </span>
            )}

            {/* Landmark Label */}
            {unlocked && (
              <span className="mt-1 text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full bg-white/95 text-[var(--qt-ink)] shadow-md border border-[var(--qt-border)] max-w-[70px] sm:max-w-[90px] truncate group-hover:max-w-none transition-all">
                {place.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
