import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Calendar, PartyPopper } from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { playTap } from "../utils/audio";

export const FestivalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, state } = useGame();

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

  const theme = cityData.theme!;
  const festivals = cityData.festivals || [];

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
            <PartyPopper size={20} className="shrink-0" style={{ color: "var(--state-accent)" }} />
            <span className="truncate">Festivals · {cityData.state}</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Dynamic seasonal calendar celebrating cultural traditions and seasonal quests.
          </p>
        </div>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {festivals.map((fest) => (
          <div key={fest.name} className="qt-card overflow-hidden shadow-sm">
            <div
              className="p-5 relative"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}15, transparent)`
              }}
            >
              <div className="text-4xl mb-2">{fest.emoji}</div>
              <h3 className="font-display font-extrabold text-lg text-[var(--qt-ink)]">
                {fest.name}
              </h3>
              <p className="text-xs text-[var(--qt-ink-2)] mt-1 leading-relaxed">{fest.note}</p>

              <div className="mt-4 pt-3 border-t border-[var(--qt-border)] flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <Sparkles size={12} /> Live Event Quests
                </span>
                <button
                  onClick={() => {
                    playTap();
                    navigate("/quests");
                  }}
                  className="font-bold text-[var(--state-accent)] hover:underline"
                >
                  View Quests →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
