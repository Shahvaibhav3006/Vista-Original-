import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Footprints,
  Bike,
  Bus,
  Sparkles,
  CheckCircle2,
  Navigation,
  Clock,
  Leaf
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination, Place } from "../data/cities";
import { CATEGORY_STYLES, QuestMapSvg } from "../components/QuestMapSvg";
import { LandmarkModal } from "../components/LandmarkModal";
import { playTap, playSuccess } from "../utils/audio";

const MOODS = [
  { id: "Foodie", label: "Foodie", emoji: "🍽️" },
  { id: "History", label: "History", emoji: "📜" },
  { id: "Aesthetic", label: "Aesthetic", emoji: "🎨" },
  { id: "Chill", label: "Chill", emoji: "😌" },
  { id: "Night", label: "Night", emoji: "🌙" },
  { id: "Date", label: "Date", emoji: "💑" },
  { id: "Family", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "Budget", label: "Budget", emoji: "💰" }
];

const GREEN_TRAVEL_MODES = [
  { id: "walk", label: "Walking", emoji: "🚶", greenXp: 20, badge: "Green Walker" },
  { id: "cycle", label: "Cycling", emoji: "🚲", greenXp: 15, badge: "Cycle Trailblazer" },
  { id: "transit", label: "Public Transport", emoji: "🚌", greenXp: 10, badge: "Eco Rider" }
];

export const MoodRoutesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    destination,
    mood,
    setMood,
    travelMode,
    setTravelMode,
    addGreenXp,
    addBadge,
    badges
  } = useGame();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loggedTrip, setLoggedTrip] = useState(false);

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

  const activeMood = mood || "Foodie";
  const activeTravelMode = travelMode || "walk";

  const matchedPlaces = useMemo(() => {
    return cityData.places.filter(
      (p) => p.moods?.some((m) => m.toLowerCase() === activeMood.toLowerCase())
    );
  }, [cityData, activeMood]);

  const selectedTravel =
    GREEN_TRAVEL_MODES.find((m) => m.id === activeTravelMode) || GREEN_TRAVEL_MODES[0];

  const handleLogEcoTrip = () => {
    playSuccess();
    addGreenXp(selectedTravel.greenXp);
    if (!badges.includes(selectedTravel.badge)) {
      addBadge(selectedTravel.badge);
    }
    setLoggedTrip(true);
    setTimeout(() => setLoggedTrip(false), 3000);
  };

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
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
            Mood Routes · {cityData.place}
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Pick your travel vibe to generate a customized sequential walking itinerary.
          </p>
        </div>
      </div>

      {/* Mood Selector Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto qt-no-scrollbar pb-1">
        {MOODS.map((m) => {
          const isSelected = activeMood.toLowerCase() === m.id.toLowerCase();
          return (
            <button
              key={m.id}
              onClick={() => {
                playTap();
                setMood(m.id);
              }}
              className="qt-tap shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
              style={{
                background: isSelected ? "var(--state-accent)" : "white",
                color: isSelected ? "#ffffff" : "var(--qt-ink)",
                border: `1px solid ${isSelected ? "var(--state-accent)" : "var(--qt-border)"}`
              }}
            >
              <span>{m.emoji}</span> <span className="ml-1">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Map Preview for this mood */}
      <QuestMapSvg
        places={matchedPlaces.length > 0 ? matchedPlaces : cityData.places}
        onPick={setSelectedPlace}
        height={320}
      />

      {/* Green Travel Mode Selector */}
      <div className="qt-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Leaf size={16} className="text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink)]">
              Green Travel XP Multiplier
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600">+{selectedTravel.greenXp} XP / Trip</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          {GREEN_TRAVEL_MODES.map((mode) => {
            const isChosen = activeTravelMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  playTap();
                  setTravelMode(mode.id);
                }}
                className={`qt-tap p-2.5 rounded-xl border text-center transition-all ${
                  isChosen
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm"
                    : "border-[var(--qt-border)] bg-white text-[var(--qt-ink-2)]"
                }`}
              >
                <div className="text-lg">{mode.emoji}</div>
                <div className="text-xs font-bold mt-0.5">{mode.label}</div>
                <div className="text-[10px] opacity-75">+{mode.greenXp} XP</div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleLogEcoTrip}
          disabled={loggedTrip}
          className="qt-tap mt-3 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          {loggedTrip ? (
            <>
              <CheckCircle2 size={15} />
              <span>Eco Travel Logged! (+{selectedTravel.greenXp} Green XP)</span>
            </>
          ) : (
            <>
              <Navigation size={14} />
              <span>Log Eco Journey via {selectedTravel.label}</span>
            </>
          )}
        </button>
      </div>

      {/* Itinerary Stops */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)]">
          Curated {activeMood} Stops ({matchedPlaces.length})
        </h3>

        {matchedPlaces.length === 0 ? (
          <div className="qt-card p-6 text-center text-xs text-[var(--qt-ink-2)]">
            No specific stops tagged #{activeMood} in {cityData.place}. Feel free to pick another
            mood or explore freely on the QuestMap!
          </div>
        ) : (
          matchedPlaces.map((place, idx) => {
            const cat = CATEGORY_STYLES[place.category] || CATEGORY_STYLES.Heritage;
            return (
              <button
                key={place.id}
                onClick={() => {
                  playTap();
                  setSelectedPlace(place);
                }}
                className="qt-tap text-left qt-card p-4 hover:shadow-sm transition-shadow flex items-start gap-3 w-full"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm"
                  style={{ background: `${cat.color}18`, color: cat.color }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.emoji}</span>
                    <span className="font-bold text-sm text-[var(--qt-ink)] truncate">
                      {place.name}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--qt-ink-2)] mt-1 line-clamp-1">{place.story}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[var(--qt-ink-2)] font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {place.duration}
                    </span>
                    <span className="text-[var(--state-accent)]">+{place.xp} XP</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <LandmarkModal
        place={selectedPlace}
        open={Boolean(selectedPlace)}
        onOpenChange={(open) => !open && setSelectedPlace(null)}
      />
    </div>
  );
};
