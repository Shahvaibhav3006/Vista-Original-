import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  History,
  Play,
  Pause,
  RotateCcw,
  Share2,
  MapPin,
  Clock,
  Sparkles,
  Leaf
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination, Place } from "../data/cities";
import { QuestMapSvg, CATEGORY_STYLES } from "../components/QuestMapSvg";
import { generateTravelSummary, getRandomShareCaption } from "../data/lore";
import { playTap } from "../utils/audio";

export const ReplayPage: React.FC = () => {
  const navigate = useNavigate();
  const gameState = useGame();
  const {
    destination,
    visited,
    trail,
    quests,
    badges,
    xp,
    greenXp,
    photos
  } = gameState;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const cityData = useMemo(() => (destination ? resolveDestination(destination) : null), [
    destination
  ]);

  const visitedPlaces = useMemo(() => {
    if (!cityData) return [];
    return cityData.places.filter((p) => visited[p.id]);
  }, [cityData, visited]);

  // If no places visited, use first 3 as demo trail
  const activeTrailPlaces = useMemo(() => {
    if (visitedPlaces.length > 0) return visitedPlaces;
    return cityData ? cityData.places.slice(0, 3) : [];
  }, [visitedPlaces, cityData]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= activeTrailPlaces.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying, activeTrailPlaces.length]);

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

  const theme = cityData.theme!;
  const completedQuestCount = Object.values(quests).filter((q) => q.completedAt).length;
  const foodCount = visitedPlaces.filter((p) => p.category === "Food").length;
  const photoCount = Object.keys(photos).length;
  const kmEstimated = (activeTrailPlaces.length * 0.85).toFixed(1);

  const [copied, setCopied] = useState(false);

  const travelStory = `${generateTravelSummary(gameState)} ${getRandomShareCaption(cityData.place)}`;

  const currentReplayPlace = activeTrailPlaces[currentStepIdx] || activeTrailPlaces[0];

  const handleShare = () => {
    playTap();
    if (navigator.share) {
      navigator.share({
        title: `VISTA Quest Replay · ${cityData.place}`,
        text: travelStory,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(travelStory);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          ✓ Travel story copied to clipboard! Ready to share.
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)] leading-tight flex items-center gap-2">
              <History size={20} className="shrink-0" style={{ color: "var(--state-accent)" }} />
              <span className="truncate">Quest Replay · {cityData.place}</span>
            </h1>
            <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
              Interactive timeline replay tracing every landmark and quest completed.
            </p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="qt-tap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-[var(--qt-border)] bg-white hover:bg-neutral-50 shadow-sm self-start sm:self-auto shrink-0"
        >
          <Share2 size={13} />
          <span>Share</span>
        </button>
      </div>

      {/* Hero Stats Card */}
      <div className="qt-card overflow-hidden shadow-lg border border-[var(--qt-border)]">
        <div
          className="p-4 sm:p-5 relative text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`
          }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
            Journey Highlights
          </div>
          <h2 className="font-display font-extrabold text-2xl mt-0.5">{cityData.place}</h2>

          <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3 sm:mt-4 pt-3 border-t border-white/20 text-center">
            <div>
              <div className="font-display font-extrabold text-xl sm:text-2xl">{visitedPlaces.length}</div>
              <div className="text-[9px] sm:text-[10px] text-white/80 uppercase font-semibold">Stops Visited</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-xl sm:text-2xl">{completedQuestCount}</div>
              <div className="text-[9px] sm:text-[10px] text-white/80 uppercase font-semibold">Quests Done</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-xl sm:text-2xl">{kmEstimated} km</div>
              <div className="text-[9px] sm:text-[10px] text-white/80 uppercase font-semibold">Eco Distance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Replay Controls & Map */}
      <div className="qt-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)]">
            Step {currentStepIdx + 1} of {activeTrailPlaces.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTap();
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className="qt-tap p-1.5 rounded-full hover:bg-neutral-100 text-[var(--qt-ink-2)]"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => {
                playTap();
                setIsPlaying(!isPlaying);
              }}
              className="qt-tap px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-sm"
              style={{ background: "var(--state-accent)" }}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause" : "Play Replay"}</span>
            </button>
          </div>
        </div>

        {/* Trail Map */}
        <QuestMapSvg places={activeTrailPlaces.slice(0, currentStepIdx + 1)} height={280} />

        {/* Current Active Step Box */}
        {currentReplayPlace && (
          <div className="p-3.5 rounded-xl border border-[var(--qt-border)] bg-neutral-50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-white shadow-sm shrink-0">
              {CATEGORY_STYLES[currentReplayPlace.category]?.emoji || "🏛️"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-[var(--qt-ink)] truncate">
                {currentReplayPlace.name}
              </div>
              <div className="text-[10px] text-[var(--qt-ink-2)] mt-0.5">
                {currentReplayPlace.category} · {currentReplayPlace.duration} · +
                {currentReplayPlace.xp} XP
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generated Cultural Travel Chronicle */}
      <div className="qt-card p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2 flex items-center gap-1.5">
          <Sparkles size={14} style={{ color: "var(--state-accent)" }} />
          <span>Explorer’s Journal</span>
        </h3>
        <p className="text-sm text-[var(--qt-ink)] leading-relaxed italic border-l-4 border-[var(--state-accent)] pl-3.5 py-0.5 bg-neutral-50/60 rounded-r-xl">
          “{travelStory}”
        </p>
      </div>
    </div>
  );
};
