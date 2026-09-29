import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Edit2,
  Check,
  Trophy,
  BookOpen,
  Leaf,
  RotateCcw,
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { isSoundEnabled, toggleSound, playTap } from "../utils/audio";

const AVATAR_OPTIONS = ["🧭", "🦚", "🐪", "🛶", "🌾", "🐯", "🛕", "🐘", "🕌", "🏔️", "🌴", "🦏"];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    updateProfile,
    level,
    xp,
    greenXp,
    badges,
    stamps,
    visited,
    quests,
    savedPlaces,
    destination,
    resetProgress
  } = useGame();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const [confirmReset, setConfirmReset] = useState(false);

  const cityData = useMemo(() => (destination ? resolveDestination(destination) : null), [
    destination
  ]);

  const completedQuestsCount = Object.values(quests).filter((q) => q.completedAt).length;
  const placesCount = Object.keys(visited).length;

  const handleSaveName = () => {
    playTap();
    if (nameInput.trim()) {
      updateProfile({ name: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  const handlePickAvatar = (avatar: string) => {
    playTap();
    updateProfile({ avatar });
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            playTap();
            navigate("/dashboard");
          }}
          className="qt-tap w-9 h-9 rounded-full qt-pill flex items-center justify-center hover:bg-neutral-50"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-[var(--qt-ink)] leading-none flex items-center gap-2">
            <User size={22} style={{ color: "var(--state-accent)" }} />
            <span>Explorer Profile</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-1">
            Manage your credentials, ranks, and collected souvenirs.
          </p>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="qt-card p-5">
        <div className="flex items-start gap-4">
          {/* Avatar Icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-neutral-100 shadow-sm border border-[var(--qt-border)]">
            {user.avatar}
          </div>

          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-sm border border-[var(--qt-border)] font-bold outline-none focus:border-[var(--qt-accent)]"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="qt-tap p-2 rounded-xl bg-emerald-600 text-white"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl text-[var(--qt-ink)] truncate">
                  {user.name}
                </h2>
                <button
                  onClick={() => {
                    playTap();
                    setIsEditingName(true);
                  }}
                  className="qt-tap text-[var(--qt-ink-2)] hover:text-[var(--qt-ink)] p-1"
                >
                  <Edit2 size={13} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                style={{ background: "var(--state-accent)" }}
              >
                Lv {level.level} {level.name}
              </span>
              <span className="text-xs font-bold text-[var(--qt-ink-2)]">{xp} Total XP</span>
            </div>

            {/* Level XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-[var(--qt-ink-2)] font-semibold mb-1">
                <span>Rank Progress</span>
                <span>
                  {level.next ? `${level.next.min - xp} XP to ${level.next.name}` : "Maximum Level!"}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--qt-border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.round(level.progress * 100)}%`,
                    background: "var(--state-accent)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Customization Choices */}
        <div className="mt-4 pt-4 border-t border-[var(--qt-border)]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2">
            Choose Explorer Icon
          </div>
          <div className="flex flex-wrap gap-2">
            {AVATAR_OPTIONS.map((av) => (
              <button
                key={av}
                onClick={() => handlePickAvatar(av)}
                className={`qt-tap w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                  user.avatar === av
                    ? "border-[var(--state-accent)] bg-neutral-100 shadow-sm scale-110"
                    : "border-[var(--qt-border)] bg-white hover:bg-neutral-50"
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explorer Career Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        <div className="qt-card p-3 text-center">
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)]">
            {placesCount}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--qt-ink-2)] uppercase font-bold mt-0.5">
            Places Discovered
          </div>
        </div>
        <div className="qt-card p-3 text-center">
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)]">
            {completedQuestsCount}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--qt-ink-2)] uppercase font-bold mt-0.5">
            Quests Completed
          </div>
        </div>
        <div className="qt-card p-3 text-center">
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)]">
            {stamps.length}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--qt-ink-2)] uppercase font-bold mt-0.5">
            Passport Stamps
          </div>
        </div>
        <div className="qt-card p-3 text-center">
          <div className="font-display font-extrabold text-xl sm:text-2xl text-emerald-600">
            {greenXp}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--qt-ink-2)] uppercase font-bold mt-0.5">
            Green XP
          </div>
        </div>
      </div>

      {/* Bookmarked Places */}
      <div className="qt-card p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2.5 flex items-center gap-1.5">
          <Bookmark size={14} /> Saved Landmarks ({savedPlaces.length})
        </h3>
        {savedPlaces.length === 0 ? (
          <p className="text-xs text-[var(--qt-ink-2)] py-2">
            No saved places yet. Tap the bookmark icon in any landmark drawer to save it.
          </p>
        ) : (
          <div className="space-y-2">
            {savedPlaces.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded-xl border border-[var(--qt-border)] bg-neutral-50 flex items-center justify-between text-xs min-w-0"
              >
                <span className="font-bold text-[var(--qt-ink)] truncate min-w-0">{p.name}</span>
                <span className="text-[10px] font-semibold text-[var(--qt-ink-2)] shrink-0 ml-2">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings & Reset */}
      <div className="qt-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="text-xs font-bold text-[var(--qt-ink)]">Sound Effects</span>
          </div>
          <button
            onClick={handleToggleSound}
            className={`qt-tap px-3 py-1 rounded-full text-xs font-bold ${
              soundOn ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-600"
            }`}
          >
            {soundOn ? "ENABLED" : "MUTED"}
          </button>
        </div>

        <div className="pt-3 border-t border-[var(--qt-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="text-xs font-bold text-red-600">Reset Explorer State</div>
            <div className="text-[10px] text-[var(--qt-ink-2)]">
              Clears all progress, badges, and passport stamps.
            </div>
          </div>
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="qt-tap px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 self-start sm:self-auto shrink-0"
            >
              Reset All
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
                className="qt-tap px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-red-600 shadow-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="qt-tap px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 text-[var(--qt-ink-2)]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
