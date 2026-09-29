import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, CheckCircle2, Navigation, MapPin } from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination, Place } from "../data/cities";
import { CATEGORY_STYLES, QuestMapSvg } from "../components/QuestMapSvg";
import { LandmarkModal } from "../components/LandmarkModal";
import { TimeSlider } from "../components/TimeSlider";
import { playTap } from "../utils/audio";
import { calculateDistanceMeters, formatDistance } from "../utils/geo";

const CATEGORIES = ["All", "Heritage", "Food", "Shopping", "Photo", "Hidden", "Hotel"] as const;

export const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, visited, location, requestGps, simulateLocation } = useGame();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const cityData = useMemo(() => (destination ? resolveDestination(destination) : null), [
    destination
  ]);

  if (!cityData) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--qt-ink-2)] mb-4">Pick a destination first.</p>
        <button
          onClick={() => {
            playTap();
            navigate("/");
          }}
          className="qt-tap px-5 py-2.5 rounded-xl font-semibold text-white"
          style={{ background: "var(--qt-accent)" }}
        >
          Choose a destination
        </button>
      </div>
    );
  }

  const filteredPlaces =
    categoryFilter === "All"
      ? cityData.places
      : cityData.places.filter((p) => p.category === categoryFilter);

  return (
    <div className="py-4 space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              playTap();
              navigate("/dashboard");
            }}
            className="qt-tap w-9 h-9 rounded-full qt-pill flex items-center justify-center hover:bg-neutral-50 shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)] leading-tight truncate">
              QuestMap · {cityData.place}
            </h1>
            <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
              An illustrated adventure map — tap any marker to inspect & mark visited.
            </p>
          </div>
        </div>

        {/* GPS Active / Request Badge */}
        {location ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>GPS Active</span>
            {location.isSimulated && (
              <span className="text-[10px] px-1 rounded bg-amber-200 text-amber-900 font-semibold">
                Demo
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={async () => {
              playTap();
              await requestGps();
            }}
            className="qt-tap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[var(--qt-border)] bg-white hover:bg-neutral-50 text-[var(--qt-ink)] shrink-0 shadow-sm self-start sm:self-auto"
          >
            <Navigation size={13} style={{ color: "var(--state-accent)" }} />
            <span>Enable GPS</span>
          </button>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto qt-no-scrollbar pb-1 -mx-1 px-1">
        <Filter size={14} className="text-[var(--qt-ink-2)] shrink-0 ml-1 mr-0.5" />
        {CATEGORIES.map((cat) => {
          const isSelected = categoryFilter === cat;
          const style = cat !== "All" ? CATEGORY_STYLES[cat] : null;
          return (
            <button
              key={cat}
              onClick={() => {
                playTap();
                setCategoryFilter(cat);
              }}
              className="qt-tap shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: isSelected ? "var(--state-accent)" : "transparent",
                color: isSelected ? "#ffffff" : "var(--qt-ink)",
                border: `1px solid ${isSelected ? "var(--state-accent)" : "var(--qt-border)"}`
              }}
            >
              {cat === "All" ? "🗺️ All" : `${style?.emoji || ""} ${cat}`}
            </button>
          );
        })}
      </div>

      {/* Map Canvas */}
      <QuestMapSvg
        places={filteredPlaces}
        onPick={setSelectedPlace}
        height={380}
        highlightPlaceId={selectedPlace?.id}
      />

      {/* Places List Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {filteredPlaces.map((place) => {
          const cat = CATEGORY_STYLES[place.category] || CATEGORY_STYLES.Heritage;
          const isVisited = Boolean(visited[place.id]);

          let distStr = "";
          if (location && place.lat && place.lng) {
            const d = calculateDistanceMeters(location.lat, location.lng, place.lat, place.lng);
            distStr = formatDistance(d);
          }

          return (
            <button
              key={place.id}
              onClick={() => {
                playTap();
                setSelectedPlace(place);
              }}
              className="qt-tap text-left qt-card p-3 hover:shadow-sm transition-shadow relative"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg shrink-0">{cat.emoji}</span>
                <span className="text-xs font-bold flex-1 truncate text-[var(--qt-ink)]">
                  {place.name}
                </span>
                {isVisited && (
                  <CheckCircle2
                    size={14}
                    style={{ color: "var(--state-accent)" }}
                    className="shrink-0"
                  />
                )}
              </div>
              <div className="text-[10px] text-[var(--qt-ink-2)] mt-1.5 flex items-center justify-between">
                <span>
                  {distStr ? `📍 ${distStr}` : `${place.category} · ${place.duration}`}
                </span>
                <span className="font-bold text-[var(--state-accent)]">+{place.xp} XP</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Time Simulation Component */}
      <TimeSlider />

      {/* Landmark Modal Detail Drawer */}
      <LandmarkModal
        place={selectedPlace}
        open={Boolean(selectedPlace)}
        onOpenChange={(open) => !open && setSelectedPlace(null)}
      />
    </div>
  );
};
