import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle2, Lock, Eye, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { playTap, playUnlock, playSuccess } from "../utils/audio";

export const HiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, addXp, addBadge, badges, unlockSecret, secretUnlocked } = useGame();
  const [clueStep, setClueStep] = useState(1);

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

  const hidden = cityData.hidden;
  const clues = hidden.clues;
  const totalClues = clues.length;
  const isAllRevealed = clueStep >= totalClues;

  const handleRevealNext = () => {
    playTap();
    if (clueStep < totalClues) {
      setClueStep((prev) => prev + 1);
    }
  };

  const handleClaimDiscovery = () => {
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {
      // ignore
    }
    unlockSecret();
    if (!badges.includes("Hidden Seeker")) {
      addBadge("Hidden Seeker");
    }
    addXp(hidden.xp);
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
          className="qt-tap w-9 h-9 rounded-full qt-pill flex items-center justify-center hover:bg-neutral-50 shrink-0"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="min-w-0">
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)] leading-tight flex items-center gap-2 truncate">
            <span className="text-lg sm:text-xl shrink-0">🔮</span>
            <span className="truncate">Hidden Place Hunt</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Solve mysterious clues to discover secret sanctuaries most tourists walk right past.
          </p>
        </div>
      </div>

      {/* Secret Card */}
      <div
        className="qt-card p-5"
        style={{
          background: "rgba(13, 138, 104, 0.06)",
          borderColor: "rgba(13, 138, 104, 0.2)"
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗝️</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Mystery Objective
              </div>
              <h2 className="font-display font-black text-xl text-[var(--qt-ink)]">
                {hidden.name}
              </h2>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            +{hidden.xp} XP
          </span>
        </div>

        <p className="text-xs text-[var(--qt-ink-2)] mt-2 leading-relaxed">
          Follow the trail of ancient whispers left by centuries of residents. Reveal each clue to
          zero in on the secret location.
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] font-semibold text-[var(--qt-ink-2)] mb-1">
            <span>Clue Progress</span>
            <span>
              {clueStep} of {totalClues} Clues
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-emerald-100 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${(clueStep / totalClues) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Clues Timeline */}
      <div className="space-y-3">
        {clues.map((clue, idx) => {
          const isRevealed = idx < clueStep;

          return (
            <div
              key={idx}
              className={`qt-card p-4 transition-all ${
                isRevealed ? "bg-white shadow-sm" : "bg-neutral-50/60 opacity-60"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isRevealed
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {isRevealed ? idx + 1 : <Lock size={12} />}
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold text-[var(--qt-ink)]">Clue #{idx + 1}</div>
                  {isRevealed ? (
                    <p className="text-sm text-[var(--qt-ink)] italic mt-1 leading-relaxed">
                      “{clue}”
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--qt-ink-2)] mt-1">
                      Locked. Reveal previous clues to decode this riddle.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      {!isAllRevealed && (
        <button
          onClick={handleRevealNext}
          className="qt-tap w-full py-3.5 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md hover:brightness-105"
          style={{ background: "var(--state-accent)" }}
        >
          <Eye size={15} />
          <span>Reveal Next Clue ({clueStep + 1}/{totalClues})</span>
        </button>
      )}

      {isAllRevealed && !secretUnlocked && (
        <button
          onClick={handleClaimDiscovery}
          className="qt-tap w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-lg"
        >
          <Sparkles size={16} />
          <span>Claim Secret Discovery (+{hidden.xp} XP & Hidden Seeker Badge)</span>
        </button>
      )}

      {secretUnlocked && (
        <div className="qt-card p-5 text-center bg-emerald-50 border-emerald-300">
          <div className="text-4xl mb-1.5">🌟</div>
          <h3 className="font-display font-extrabold text-lg text-emerald-950">
            Sanctuary Discovered!
          </h3>
          <p className="text-xs text-emerald-800 mt-1 max-w-sm mx-auto">
            You located <strong>{hidden.name}</strong> and joined the inner circle of secret
            explorers in {cityData.place}.
          </p>
          <button
            onClick={() => {
              playTap();
              navigate("/passport");
            }}
            className="qt-tap mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white shadow-sm"
          >
            Check Passport Status
          </button>
        </div>
      )}
    </div>
  );
};
