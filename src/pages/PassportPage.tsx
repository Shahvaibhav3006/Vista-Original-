import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Trophy, Sparkles, CheckCircle2, Share2, Award, Download, Copy, Check } from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { getThemePatternStyle } from "../data/themes";
import { playTap, playSuccess } from "../utils/audio";

export const PassportPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    destination,
    state,
    stamps,
    badges,
    xp,
    level,
    visited,
    secretUnlocked,
    user
  } = useGame();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

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
  const patternStyle = getThemePatternStyle(theme);

  const cityStamps = cityData.quests.map((q) => q.stamp);
  const collectedCityStamps = cityStamps.filter((s) => stamps.includes(s));
  const percentComplete = Math.round((collectedCityStamps.length / cityStamps.length) * 100);
  const isCityMaster = collectedCityStamps.length === cityStamps.length && cityStamps.length > 0;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleShare = () => {
    playTap();
    const shareText = `Collected ${stamps.length} cultural stamps & ${xp} XP in ${cityData.place} on VISTA! 🧭 “Don’t just visit a city. Play it.”`;
    if (navigator.share) {
      navigator.share({
        title: `VISTA Heritage Passport · ${cityData.place}`,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      showToast("Passport summary copied to clipboard! Ready to share.");
    }
  };

  const handleCopyStory = () => {
    playSuccess();
    const storyText = `🏛️ MY VISTA PASSPORT · ${cityData.place}\n✨ Explorer: ${user.name} (Lv ${level.level})\n📬 Stamps: ${collectedCityStamps.length}/${cityStamps.length} Collected\n⚡ XP: ${xp} XP\nDon't just visit a city. Play it.`;
    navigator.clipboard.writeText(storyText);
    showToast("Instagram Story text copied to clipboard!");
  };

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 size={15} className="text-emerald-400" />
          <span>{toastMessage}</span>
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
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)] leading-tight">
              Cultural Passport
            </h1>
            <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
              Your official postal stamp chronicle across India.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              playTap();
              setShowStoryModal(true);
            }}
            className="qt-tap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm"
            style={{ background: "var(--state-accent)" }}
          >
            <span>Story Card</span>
          </button>
          <button
            onClick={handleShare}
            className="qt-tap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-[var(--qt-border)] bg-white hover:bg-neutral-50 text-[var(--qt-ink)] shadow-sm"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Official Passport Cover Card */}
      <div className="qt-card overflow-hidden shadow-xl border-2 border-amber-900/10">
        <div
          className="p-4 sm:p-6 relative text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`
          }}
        >
          {/* Subtle cultural watermark */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={patternStyle}
          />

          <div className="relative flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                  Government of Culture · VISTA
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl mt-1 tracking-tight">
                  {cityData.place}
                </h2>
                <div className="text-xs text-white/90 mt-0.5 font-medium">
                  {cityData.state} · {theme.emoji} {theme.motif}
                </div>
              </div>

              {/* Passport Seal / Emblem */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/40 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm shadow-inner text-center shrink-0">
                <span className="text-base sm:text-lg">🧭</span>
                <span className="text-[7px] sm:text-[8px] font-bold tracking-tighter uppercase opacity-90">
                  VERIFIED
                </span>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/20 flex items-center justify-between text-xs gap-1">
              <div className="min-w-0">
                <span className="opacity-75 text-[9px] sm:text-[10px] block">EXPLORER</span>
                <span className="font-bold flex items-center gap-1 text-[11px] sm:text-xs truncate">
                  <span>{user.avatar}</span> <span className="truncate">{user.name}</span>
                </span>
              </div>
              <div className="min-w-0 text-center">
                <span className="opacity-75 text-[9px] sm:text-[10px] block">RANK</span>
                <span className="font-bold text-[11px] sm:text-xs truncate">
                  Lv {level.level} {level.name}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="opacity-75 text-[9px] sm:text-[10px] block">STAMPS</span>
                <span className="font-bold text-[11px] sm:text-xs">
                  {collectedCityStamps.length} / {cityStamps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City Master Badge Alert */}
      {isCityMaster && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 shadow-sm">
          <div className="text-3xl">🏅</div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-amber-950">
              City Master of {cityData.place}!
            </h3>
            <p className="text-xs text-amber-800 leading-snug">
              You have completed every quest in this city and unlocked all certified postal stamps.
            </p>
          </div>
        </div>
      )}

      {/* Postal Stamps Collection Grid */}
      <div className="qt-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--qt-ink)]">
              Passport Stamps ({stamps.length})
            </h3>
            <p className="text-xs text-[var(--qt-ink-2)]">
              Vintage postal stamps earned by finishing cultural quests
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
          {cityData.quests.map((quest, idx) => {
            const isStamped = stamps.includes(quest.stamp);
            const rotation = (idx % 2 === 0 ? -2 : 2);

            return (
              <div
                key={quest.id}
                className={`p-3 sm:p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  isStamped
                    ? "bg-[#FAF5EE] border-dashed shadow-md border-amber-800/40"
                    : "bg-neutral-50/50 border-dotted border-neutral-300 opacity-60"
                }`}
                style={isStamped ? { transform: `rotate(${rotation}deg)` } : undefined}
              >
                {isStamped ? (
                  <>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-900/50 flex items-center justify-center text-lg sm:text-xl text-amber-950 mb-1.5 sm:mb-2 bg-amber-100/40">
                      🏛️
                    </div>
                    <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-950 font-display">
                      {quest.stamp}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-amber-800/80 font-mono mt-0.5 sm:mt-1 font-bold">
                      VERIFIED · {cityData.place.toUpperCase()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 mb-1.5 sm:mb-2">
                      🔒
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[var(--qt-ink-2)] truncate max-w-full">{quest.stamp}</div>
                    <div className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5">Finish quest to stamp</div>
                  </>
                )}
              </div>
            );
          })}

          {/* Demo Stamp if unlocked */}
          {stamps.includes("Demo Stamp") && !cityStamps.includes("Demo Stamp") && (
            <div
              className="p-3 sm:p-4 rounded-2xl border-2 bg-[#FAF5EE] border-dashed shadow-md border-amber-800/40 flex flex-col items-center justify-center text-center"
              style={{ transform: "rotate(2deg)" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-900/50 flex items-center justify-center text-lg sm:text-xl text-amber-950 mb-1.5 sm:mb-2 bg-amber-100/40">
                🧪
              </div>
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-950 font-display">
                Demo Stamp
              </div>
              <div className="text-[8px] sm:text-[9px] text-amber-800/80 font-mono mt-0.5 sm:mt-1 font-bold">
                SIH JUDGE VERIFIED
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="qt-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--qt-ink)]">
            Achievements & Medals ({badges.length})
          </h3>
        </div>

        {badges.length === 0 ? (
          <p className="text-xs text-[var(--qt-ink-2)] text-center py-4">
            No badges collected yet. Complete your first quest or eco travel trip to earn medals!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
            {badges.map((b) => (
              <div
                key={b}
                className="qt-pill p-2 sm:p-2.5 flex items-center gap-2 bg-white shadow-sm border border-[var(--qt-border)] min-w-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs sm:text-sm shrink-0">
                  <Trophy size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[var(--qt-ink)] truncate">{b}</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">Unlocked</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instagram Story Share Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-neutral-900 text-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-neutral-700 flex flex-col items-center text-center max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Story Card Frame (9:16 aesthetic) */}
            <div
              className="w-full rounded-2xl p-4 sm:p-5 border-2 border-amber-400/40 relative overflow-hidden text-left shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${theme.accent}, #1a1a1a)`
              }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={patternStyle}
              />

              <div className="relative z-10 flex flex-col justify-between min-h-[300px] sm:h-[360px]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
                      VISTA PASSPORT
                    </span>
                    <span className="text-xl">🧭</span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl mt-1 tracking-tight text-white">
                    {cityData.place}
                  </h2>
                  <div className="text-xs text-white/90">
                    {cityData.state} · {theme.emoji} {theme.motif}
                  </div>
                </div>

                {/* Stamped Postal Badges Preview */}
                <div className="my-auto py-2 grid grid-cols-2 gap-2">
                  {collectedCityStamps.slice(0, 4).map((st) => (
                    <div
                      key={st}
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center"
                    >
                      <div className="text-base sm:text-lg">🏛️</div>
                      <div className="text-[9px] sm:text-[10px] font-bold truncate text-white">{st}</div>
                      <div className="text-[7px] sm:text-[8px] text-amber-300 font-mono">VERIFIED</div>
                    </div>
                  ))}
                  {collectedCityStamps.length === 0 && (
                    <div className="col-span-2 p-2.5 rounded-xl bg-white/10 text-center text-xs text-white/80 italic">
                      Start exploring to earn official postal stamps!
                    </div>
                  )}
                </div>

                {/* Bottom Explorer Footer */}
                <div className="pt-2.5 sm:pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/70">EXPLORER</div>
                    <div className="font-bold flex items-center gap-1 text-[11px] sm:text-xs">
                      <span>{user.avatar}</span>
                      <span className="truncate max-w-[120px]">{user.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/70">TOTAL XP</div>
                    <div className="font-black text-amber-300 text-xs sm:text-sm">+{xp} XP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="w-full mt-4 flex gap-2">
              <button
                onClick={handleCopyStory}
                className="qt-tap flex-1 py-2.5 rounded-xl text-xs font-bold text-neutral-900 bg-white hover:bg-neutral-100 flex items-center justify-center gap-1.5 shadow-md"
              >
                <Copy size={14} />
                <span>Copy Story Text</span>
              </button>
              <button
                onClick={() => {
                  playTap();
                  handleShare();
                }}
                className="qt-tap flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md"
                style={{ background: theme.accent }}
              >
                <Share2 size={14} />
                <span>Share Post</span>
              </button>
            </div>

            <button
              onClick={() => {
                playTap();
                setShowStoryModal(false);
              }}
              className="mt-3 text-xs text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
