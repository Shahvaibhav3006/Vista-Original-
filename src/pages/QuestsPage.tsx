import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Swords, CheckCircle2, Trophy, BookOpen, ArrowRight } from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { CATEGORY_STYLES } from "../components/QuestMapSvg";
import { playTap } from "../utils/audio";

export const QuestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, quests } = useGame();

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

  return (
    <div className="py-4 space-y-4">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-[var(--qt-ink)] leading-tight">
          Cultural Quests · {cityData.place}
        </h1>
        <p className="text-xs text-[var(--qt-ink-2)] mt-0.5">
          Complete multi-step heritage expeditions to unlock XP, achievements, and authentic
          passport stamps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {cityData.quests.map((quest) => {
          const progress = quests[quest.id];
          const isCompleted = Boolean(progress?.completedAt);
          const completedStepCount = progress?.steps?.filter(Boolean).length || 0;
          const totalSteps = quest.steps.length;
          const percent = Math.round((completedStepCount / totalSteps) * 100);
          const cat = CATEGORY_STYLES[quest.category] || CATEGORY_STYLES.Heritage;

          return (
            <button
              key={quest.id}
              onClick={() => {
                playTap();
                navigate(`/quest/${quest.id}`);
              }}
              className="qt-tap text-left qt-card p-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                    style={{ background: `${cat.color}18` }}
                  >
                    {cat.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${cat.color}18`, color: cat.color }}
                      >
                        {quest.category}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                          <CheckCircle2 size={10} /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base mt-1 text-[var(--qt-ink)] leading-snug">
                      {quest.title}
                    </h3>
                  </div>
                </div>

                {/* Reward Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span
                    className="font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "rgba(224, 90, 71, 0.12)", color: "var(--qt-accent)" }}
                  >
                    +{quest.xp} XP
                  </span>
                  <span className="text-[var(--qt-ink-2)] flex items-center gap-1 font-medium">
                    <Trophy size={12} className="text-amber-500" /> {quest.badge}
                  </span>
                  <span className="text-[var(--qt-ink-2)] flex items-center gap-1 font-medium">
                    <BookOpen size={12} className="text-blue-500" /> {quest.stamp}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-[var(--qt-border)]">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold text-[var(--qt-ink-2)]">
                  <span>
                    {isCompleted ? "All Steps Finished" : `${completedStepCount} of ${totalSteps} steps completed`}
                  </span>
                  <span className="font-bold text-[var(--state-accent)]">{percent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--qt-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${percent}%`, background: "var(--state-accent)" }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
