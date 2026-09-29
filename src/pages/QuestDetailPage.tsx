import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Trophy,
  BookOpen,
  Lock,
  HelpCircle,
  PartyPopper,
  Navigation,
  MapPin,
  Compass,
  ArrowRight,
  QrCode,
  History,
  Check,
  Award,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext";
import { resolveDestination, QuestStep } from "../data/cities";
import { CATEGORY_STYLES } from "../components/QuestMapSvg";
import { getAudioLore } from "../data/lore";
import { playTap, playSuccess, playStamp, playChime } from "../utils/audio";
import {
  calculateDistanceMeters,
  formatDistance,
  getCompassBearing,
  ARRIVAL_RADIUS_METERS
} from "../utils/geo";

export const QuestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    destination,
    quests,
    completeQuestStep,
    completeQuest,
    location,
    requestGps,
    simulateLocation
  } = useGame();

  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [arrivedSteps, setArrivedSteps] = useState<Record<number, boolean>>({});
  const [challengeAnswers, setChallengeAnswers] = useState<
    Record<number, { selectedIndex: number; isCorrect: boolean }>
  >({});
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const cityData = useMemo(() => (destination ? resolveDestination(destination) : null), [
    destination
  ]);

  const quest = useMemo(() => cityData?.quests.find((q) => q.id === id), [cityData, id]);
  const lore = useMemo(() => (quest ? getAudioLore(quest.category) : ""), [quest]);

  if (!cityData || !quest) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--qt-ink-2)] mb-4">Quest not found.</p>
        <button
          onClick={() => {
            playTap();
            navigate("/quests");
          }}
          className="qt-tap px-5 py-2.5 rounded-xl font-semibold text-white"
          style={{ background: "var(--qt-accent)" }}
        >
          Back to Quests
        </button>
      </div>
    );
  }

  const catStyle = CATEGORY_STYLES[quest.category] || CATEGORY_STYLES.Heritage;
  const progress = quests[quest.id] || { steps: [], completedAt: undefined };
  const isCompleted = Boolean(progress.completedAt);
  const completedSteps = progress.steps.filter(Boolean).length;
  const allStepsFinished = completedSteps === quest.steps.length;

  // Find relevant partner perk for this quest
  const partnerPerk = cityData.partners?.[0];

  const handleArrival = (idx: number, step: QuestStep) => {
    playChime();
    setArrivedSteps((prev) => ({ ...prev, [idx]: true }));
    setRevealedHints((prev) => ({ ...prev, [idx]: true }));
  };

  const handleAnswerChallenge = (
    stepIdx: number,
    optionIdx: number,
    correctIdx: number,
    xpReward = 25
  ) => {
    playTap();
    const isCorrect = optionIdx === correctIdx;
    setChallengeAnswers((prev) => ({
      ...prev,
      [stepIdx]: { selectedIndex: optionIdx, isCorrect }
    }));

    if (isCorrect) {
      playSuccess();
      completeQuestStep(quest.id, stepIdx, xpReward);
      // Auto open next step index if available
      if (stepIdx + 1 < quest.steps.length) {
        setTimeout(() => {
          setActiveStepIdx(stepIdx + 1);
        }, 1200);
      }
    }
  };

  const handleFinishQuest = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    completeQuest(quest);
  };

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            playTap();
            navigate("/quests");
          }}
          className="qt-tap w-9 h-9 rounded-full qt-pill flex items-center justify-center hover:bg-neutral-50"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${catStyle.color}18`, color: catStyle.color }}
            >
              {quest.category}
            </span>
            {isCompleted && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                <CheckCircle2 size={10} /> Completed
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl mt-0.5 text-[var(--qt-ink)] leading-tight">
            {quest.title}
          </h1>
        </div>
      </div>

      {/* Rewards Pill Bar */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
        <div className="qt-pill px-2.5 sm:px-3 py-1.5 font-bold flex items-center gap-1.5 bg-neutral-50 text-[11px] sm:text-xs">
          <Sparkles size={13} style={{ color: "var(--state-accent)" }} />
          <span>+{quest.xp} Total XP</span>
        </div>
        <div className="qt-pill px-2.5 sm:px-3 py-1.5 font-bold flex items-center gap-1.5 bg-neutral-50 text-[11px] sm:text-xs">
          <Trophy size={13} className="text-amber-500" />
          <span>Badge: {quest.badge}</span>
        </div>
        <div className="qt-pill px-2.5 sm:px-3 py-1.5 font-bold flex items-center gap-1.5 bg-neutral-50 text-[11px] sm:text-xs">
          <BookOpen size={13} className="text-blue-500" />
          <span>Stamp: {quest.stamp}</span>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="qt-card p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[var(--qt-ink)]">Quest Journey Progress</span>
          <span className="text-[var(--qt-ink-2)] font-semibold">
            {completedSteps}/{quest.steps.length} checkpoints completed
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--qt-border)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(completedSteps / quest.steps.length) * 100}%`,
              background: "var(--state-accent)"
            }}
          />
        </div>
      </div>

      {/* Lore Whisper Quote */}
      <div
        className="p-3.5 rounded-xl border-l-4 italic text-xs leading-relaxed text-[var(--qt-ink)]"
        style={{
          borderColor: "var(--state-accent)",
          background: "rgba(224, 90, 71, 0.05)"
        }}
      >
        “{lore}”
      </div>

      {/* Checkpoints Sequence Flow */}
      <div className="space-y-4">
        {quest.steps.map((step, idx) => {
          const isStepDone = Boolean(progress.steps?.[idx]);
          const canDoStep = idx === 0 || Boolean(progress.steps?.[idx - 1]);
          const isArrived = arrivedSteps[idx] || isStepDone;
          const isHintRevealed = revealedHints[idx] || isArrived;
          const answerState = challengeAnswers[idx];

          // Compute distance and bearing if location and step coordinates exist
          let distanceStr = "";
          let bearingStr = "";
          let isNearby = false;

          if (location && step.lat && step.lng) {
            const dist = calculateDistanceMeters(location.lat, location.lng, step.lat, step.lng);
            distanceStr = formatDistance(dist);
            bearingStr = getCompassBearing(location.lat, location.lng, step.lat, step.lng);
            isNearby = dist <= ARRIVAL_RADIUS_METERS;
          }

          return (
            <div
              key={step.id}
              className={`qt-card p-4 sm:p-5 transition-all border ${
                isStepDone
                  ? "bg-emerald-50/30 border-emerald-300"
                  : canDoStep
                  ? "border-[var(--qt-accent)]/50 shadow-sm"
                  : "opacity-60 border-[var(--qt-border)]"
              }`}
            >
              {/* Step Title Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors shadow-sm"
                  style={{
                    background: isStepDone
                      ? "#10b981"
                      : canDoStep
                      ? "var(--state-accent)"
                      : "var(--qt-border)",
                    color: isStepDone || canDoStep ? "#ffffff" : "var(--qt-ink)"
                  }}
                >
                  {isStepDone ? <Check size={16} className="stroke-[3]" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                    <div className="font-bold text-sm sm:text-base text-[var(--qt-ink)] min-w-0 truncate">
                      {step.title}
                    </div>
                    {step.locationName && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-[var(--qt-ink-2)] truncate max-w-[110px] sm:max-w-[150px] shrink-0">
                        📍 {step.locationName}
                      </span>
                    )}
                  </div>

                  {/* Stage 1: CLUE */}
                  <div className="mt-2.5">
                    {isHintRevealed ? (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-[var(--qt-ink)] leading-relaxed">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] uppercase tracking-wider mb-1">
                          <Compass size={12} />
                          <span>The Clue</span>
                        </div>
                        <p className="italic">“{step.clue || step.hint}”</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          playTap();
                          setRevealedHints((prev) => ({ ...prev, [idx]: true }));
                        }}
                        disabled={!canDoStep}
                        className="qt-tap text-xs font-semibold py-1 flex items-center gap-1 hover:underline disabled:opacity-40"
                        style={{ color: "var(--state-accent)" }}
                      >
                        <HelpCircle size={13} />
                        <span>Decipher Clue</span>
                      </button>
                    )}
                  </div>

                  {/* Stage 2: NAVIGATE / ARRIVE */}
                  {canDoStep && isHintRevealed && !isArrived && (
                    <div className="mt-3 p-3 rounded-xl bg-neutral-50 border border-[var(--qt-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 text-xs text-[var(--qt-ink)] min-w-0">
                        <Navigation size={14} className="shrink-0" style={{ color: "var(--state-accent)" }} />
                        {distanceStr ? (
                          <span className="leading-snug">
                            <strong>{distanceStr}</strong> away ({bearingStr} direction)
                            {isNearby && (
                              <span className="ml-1.5 text-emerald-700 font-bold block sm:inline">
                                · Within Range!
                              </span>
                            )}
                          </span>
                        ) : (
                          <span>Navigate to {step.locationName || "Checkpoint"}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleArrival(idx, step)}
                          className="qt-tap flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:brightness-105"
                          style={{ background: "var(--state-accent)" }}
                        >
                          📍 I Have Arrived / Check In
                        </button>

                        {/* Quick demo location jump */}
                        {step.lat && step.lng && (
                          <button
                            onClick={() => {
                              playTap();
                              simulateLocation(
                                step.lat!,
                                step.lng!,
                                `At ${step.locationName || step.title}`
                              );
                              handleArrival(idx, step);
                            }}
                            title="Simulate GPS at this checkpoint for quick testing"
                            className="qt-tap px-2.5 py-2 rounded-xl text-[10px] font-bold border border-[var(--qt-border)] bg-white hover:bg-neutral-100 text-[var(--qt-ink-2)] shrink-0"
                          >
                            🧪 Test Here
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stage 3: STORY */}
                  {isArrived && step.story && (
                    <div className="mt-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-[var(--qt-ink)] leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900 text-[11px] uppercase tracking-wider mb-1">
                        <BookOpen size={12} />
                        <span>The Living Story</span>
                      </div>
                      <p>{step.story}</p>
                    </div>
                  )}

                  {/* Stage 4: CHALLENGE */}
                  {isArrived && step.challenge && !isStepDone && (
                    <div className="mt-3 p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-purple-900 text-[11px] uppercase tracking-wider">
                          <Sparkles size={12} />
                          <span>Checkpoint Challenge</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-700">
                          +{step.xpReward || 25} XP
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-[var(--qt-ink)]">
                        {step.challenge.question}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {step.challenge.options.map((opt, optIdx) => {
                          const isSelected = answerState?.selectedIndex === optIdx;
                          const isCorrect = step.challenge?.correctIndex === optIdx;

                          return (
                            <button
                              key={opt}
                              onClick={() =>
                                handleAnswerChallenge(
                                  idx,
                                  optIdx,
                                  step.challenge!.correctIndex,
                                  step.xpReward
                                )
                              }
                              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                                isSelected && isCorrect
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold"
                                  : isSelected && !isCorrect
                                  ? "bg-red-50 border-red-300 text-red-800"
                                  : "bg-white hover:bg-neutral-50 border-[var(--qt-border)] text-[var(--qt-ink)]"
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && isCorrect && (
                                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {answerState && !answerState.isCorrect && (
                        <p className="text-[11px] text-amber-700 font-medium">
                          Try again! Remember to review the living story clues.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Stage 5: STEP COMPLETED FEEDBACK */}
                  {isStepDone && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>Checkpoint Mastered!</span>
                      </div>
                      <span className="font-bold text-emerald-700">+{step.xpReward || 25} XP</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Quest Button */}
      {allStepsFinished && !isCompleted && (
        <button
          onClick={handleFinishQuest}
          className="qt-tap w-full px-5 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-xl hover:brightness-105"
          style={{ background: "var(--state-accent)" }}
        >
          <Sparkles size={18} />
          <span>
            Claim Full Quest Rewards (+{quest.xp} XP, {quest.badge}, {quest.stamp})
          </span>
        </button>
      )}

      {/* Completion Celebration & Reward Box */}
      {isCompleted && (
        <div
          className="qt-card p-6 text-center border-2 shadow-lg"
          style={{
            borderColor: "var(--state-accent)",
            background: "linear-gradient(180deg, rgba(224, 90, 71, 0.05), #ffffff)"
          }}
        >
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="font-display font-black text-2xl text-[var(--qt-ink)]">
            Quest Triumphant!
          </h3>
          <p className="text-xs text-[var(--qt-ink-2)] mt-1.5 max-w-sm mx-auto">
            You completed all checkpoints across <strong>{cityData.place}</strong>, earned{" "}
            <strong>+{quest.xp} XP</strong>, unlocked the <strong>{quest.badge}</strong> badge, and
            stamped the <strong>{quest.stamp}</strong>.
          </p>

          {/* Unlocked Partner Perk Voucher Card */}
          {partnerPerk && (
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-left max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                  🎁 Unlocked Merchant Perk
                </span>
                <span className="font-extrabold px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">
                  {partnerPerk.code}
                </span>
              </div>
              <div className="font-bold text-sm text-[var(--qt-ink)]">{partnerPerk.name}</div>
              <p className="text-xs text-[var(--qt-ink-2)] mt-0.5">{partnerPerk.reward}</p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-amber-200">
                <span className="text-[11px] text-[var(--qt-ink-2)]">
                  Show code at counter to redeem
                </span>
                <button
                  onClick={() => {
                    playTap();
                    navigate("/qr");
                  }}
                  className="font-bold text-amber-800 hover:underline flex items-center gap-1"
                >
                  <QrCode size={13} />
                  <span>Show QR Pass</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Hub Buttons: Replay, Passport & Quests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
            <button
              onClick={() => {
                playTap();
                navigate("/replay");
              }}
              className="qt-tap px-3 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5"
              style={{ background: "var(--state-accent)" }}
            >
              <History size={14} />
              <span>Watch Replay</span>
            </button>

            <button
              onClick={() => {
                playTap();
                navigate("/passport");
              }}
              className="qt-tap px-3 py-2.5 rounded-xl text-xs font-bold qt-pill flex items-center justify-center gap-1.5 hover:bg-neutral-50"
            >
              <BookOpen size={14} />
              <span>View Passport</span>
            </button>

            <button
              onClick={() => {
                playTap();
                navigate("/quests");
              }}
              className="qt-tap px-3 py-2.5 rounded-xl text-xs font-bold qt-pill flex items-center justify-center gap-1.5 hover:bg-neutral-50"
            >
              <Sparkles size={14} />
              <span>More Quests</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
