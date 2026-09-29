import React, { useMemo } from "react";
import {
  X,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
  Bookmark,
  Volume2,
  Navigation
} from "lucide-react";
import { Place } from "../data/cities";
import { useGame, getCurrentFormattedTime, isPlaceUnlocked } from "../context/GameContext";
import { CATEGORY_STYLES } from "./QuestMapSvg";
import { getAudioLore } from "../data/lore";
import { playTap } from "../utils/audio";
import { calculateDistanceMeters, formatDistance, getCompassBearing, ARRIVAL_RADIUS_METERS } from "../utils/geo";

interface LandmarkModalProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({ place, open, onOpenChange }) => {
  const { visited, visitPlace, simTime, savePlace, savedPlaces, location } = useGame();

  const lore = useMemo(() => (place ? getAudioLore(place.category) : ""), [place]);

  if (!open || !place) return null;

  const catStyle = CATEGORY_STYLES[place.category] || CATEGORY_STYLES.Heritage;
  const currentTime = getCurrentFormattedTime(simTime);
  const unlocked = isPlaceUnlocked(place.unlock, currentTime);
  const isVisited = Boolean(visited[place.id]);
  const isSaved = savedPlaces.some((p) => p.id === place.id);

  // Proximity info
  let distanceStr = "";
  let bearingStr = "";
  let isNearby = false;
  if (location && place.lat && place.lng) {
    const d = calculateDistanceMeters(location.lat, location.lng, place.lat, place.lng);
    distanceStr = formatDistance(d);
    bearingStr = getCompassBearing(location.lat, location.lng, place.lat, place.lng);
    isNearby = d <= ARRIVAL_RADIUS_METERS;
  }

  const handleMarkVisited = () => {
    visitPlace(place);
  };

  const handleSave = () => {
    savePlace({ id: place.id, name: place.name, category: place.category });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          playTap();
          onOpenChange(false);
        }}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Top drag bar on mobile */}
        <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 flex items-start justify-between border-b border-[var(--qt-border)] gap-2">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-sm"
              style={{ background: `${catStyle.color}18` }}
            >
              {catStyle.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${catStyle.color}18`, color: catStyle.color }}
                >
                  {place.category}
                </span>
                {isVisited && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--state-accent)] text-white flex items-center gap-1">
                    <CheckCircle2 size={11} /> Visited
                  </span>
                )}
              </div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl mt-1 text-[var(--qt-ink)] leading-tight truncate">
                {place.name}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playTap();
              onOpenChange(false);
            }}
            className="qt-tap p-1.5 rounded-full hover:bg-neutral-100 text-[var(--qt-ink-2)] shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Quick Stats Pill Bar */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="qt-pill py-2 bg-neutral-50">
              <Clock size={14} className="mx-auto mb-0.5 text-[var(--qt-ink-2)]" />
              <div className="text-[10px] text-[var(--qt-ink-2)]">Duration</div>
              <div className="text-xs font-bold">{place.duration}</div>
            </div>
            <div className="qt-pill py-2 bg-neutral-50">
              <Sparkles size={14} className="mx-auto mb-0.5 text-[var(--qt-accent)]" />
              <div className="text-[10px] text-[var(--qt-ink-2)]">XP Reward</div>
              <div className="text-xs font-bold text-[var(--qt-accent)]">+{place.xp} XP</div>
            </div>
            <div className="qt-pill py-2 bg-neutral-50">
              <MapPin size={14} className="mx-auto mb-0.5 text-[var(--qt-ink-2)]" />
              <div className="text-[10px] text-[var(--qt-ink-2)]">Unlocks</div>
              <div className="text-xs font-bold">
                {place.unlock === "00:00" ? "Anytime" : place.unlock}
              </div>
            </div>
          </div>

          {/* Distance & GPS Proximity Banner */}
          {distanceStr && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900">
              <div className="flex items-center gap-1.5 font-semibold">
                <Navigation size={13} className="text-blue-600 shrink-0" />
                <span>
                  <strong>{distanceStr}</strong> away ({bearingStr})
                </span>
              </div>
              {isNearby && (
                <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  📍 Within Range
                </span>
              )}
            </div>
          )}

          {/* Unlock Alert */}
          {!unlocked ? (
            <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold bg-amber-50 text-amber-900 border border-amber-200">
              <Lock size={16} className="text-amber-700 shrink-0" />
              <span>
                Locks until <strong>{place.unlock}</strong>. Slide time in dashboard or demo drawer
                to unlock early!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Now Unlocked for exploration</span>
            </div>
          )}

          {/* Story */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-1">
              The Living Story
            </div>
            <p className="text-sm text-[var(--qt-ink)] leading-relaxed">{place.story}</p>
          </div>

          {/* Why Visit */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-1">
              Why It Matters
            </div>
            <p className="text-sm text-[var(--qt-ink-2)] leading-relaxed">{place.why}</p>
          </div>

          {/* Audio Lore Whisper */}
          <div className="p-3.5 rounded-2xl border-l-4 border-[var(--state-accent)] bg-neutral-50">
            <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-[var(--state-accent)]">
              <Volume2 size={14} />
              <span>Whisper of the Past</span>
            </div>
            <p className="italic text-xs text-[var(--qt-ink)] leading-relaxed">“{lore}”</p>
          </div>

          {/* Mood Tags */}
          {place.moods && place.moods.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {place.moods.map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-[var(--qt-ink-2)]"
                >
                  #{m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--qt-border)] bg-neutral-50 flex gap-2">
          <button
            onClick={handleSave}
            className="qt-tap px-4 py-3 rounded-xl text-xs font-bold border border-[var(--qt-border)] bg-white hover:bg-neutral-100 flex items-center justify-center gap-1.5 text-[var(--qt-ink)]"
          >
            <Bookmark size={15} className={isSaved ? "fill-current text-amber-500" : ""} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleMarkVisited}
            disabled={isVisited}
            className="qt-tap flex-1 px-4 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md disabled:opacity-60 transition-transform"
            style={{
              background: isVisited
                ? "var(--qt-ink-2)"
                : "linear-gradient(135deg, var(--state-accent), var(--state-accent-2))"
            }}
          >
            {isVisited ? (
              <>
                <CheckCircle2 size={16} />
                <span>Marked as Visited</span>
              </>
            ) : (
              <>
                <Navigation size={16} />
                <span>Mark Visited (+{place.xp} XP)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
