import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Clock,
  Swords,
  Trophy,
  Moon,
  Sun,
  CheckCircle2,
  Lock,
  Layers,
  BookOpen,
  Camera,
  History,
  PartyPopper,
  User,
  ArrowRight,
  Gift
} from "lucide-react";
import {
  useGame,
  getCurrentFormattedTime,
  isPlaceUnlocked,
  isNightTime
} from "../context/GameContext";
import { resolveDestination, Place } from "../data/cities";
import { getThemePatternStyle } from "../data/themes";
import { CATEGORY_STYLES, QuestMapSvg } from "../components/QuestMapSvg";
import { LandmarkModal } from "../components/LandmarkModal";
import { TimeSlider } from "../components/TimeSlider";
import { playTap } from "../utils/audio";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    destination,
    state,
    level,
    xp,
    stamps,
    visited,
    simTime
  } = useGame();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const cityData = useMemo(() => (destination ? resolveDestination(destination) : null), [
    destination
  ]);

  if (!cityData) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--qt-ink-2)] mb-4">No destination selected yet.</p>
        <button
          onClick={() => {
            playTap();
            navigate("/");
          }}
          className="qt-tap px-5 py-2.5 rounded-xl font-semibold text-white shadow-sm"
          style={{ background: "var(--qt-accent)" }}
        >
          Choose a destination
        </button>
      </div>
    );
  }

  const theme = cityData.theme!;
  const patternStyle = getThemePatternStyle(theme);
  const currentTime = getCurrentFormattedTime(simTime);
  const night = isNightTime(currentTime);

  const places = cityData.places;
  const unlockedPlaces = places.filter((p) => isPlaceUnlocked(p.unlock, currentTime));
  const nextLockedPlace = places.find((p) => !isPlaceUnlocked(p.unlock, currentTime));
  const primaryQuest = cityData.quests[0];

  const visitedCount = places.filter((p) => visited[p.id]).length;
  const progressPercent = Math.round((visitedCount / places.length) * 100);

  const quickNavCards = [
    { label: "QuestMap", icon: MapPin, to: "/map" },
    { label: "Quests", icon: Swords, to: "/quests" },
    { label: "Mood Routes", icon: Layers, to: "/moods" },
    { label: "Passport", icon: BookOpen, to: "/passport" },
    { label: "Photo Challenge", icon: Camera, to: "/photos" },
    { label: "Replay", icon: History, to: "/replay" },
    { label: "Festivals", icon: PartyPopper, to: "/festivals" },
    { label: "Profile", icon: User, to: "/profile" }
  ];

  return (
    <div className="py-4 space-y-5">
      {/* City Hero Cultural Card */}
      <div className="qt-card overflow-hidden border border-[var(--qt-border)]">
        <div
          className="p-4 sm:p-6 relative"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}14, transparent)`
          }}
        >
          {/* Cultural Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={patternStyle}
          />

          <div className="relative">
            <div
              className="flex items-center gap-2 text-xs font-bold"
              style={{ color: theme.accent }}
            >
              <span>{theme.emoji}</span>
              <span>
                {cityData.state} · {theme.motif}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl mt-1 text-[var(--qt-ink)] leading-tight">
              {cityData.place}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--qt-ink-2)] mt-1 max-w-xl leading-relaxed">
              {cityData.blurb}
            </p>

            {/* Badges / Pill Bar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold qt-pill">
                <span>☀️</span>
                <span>Clear · 28°C</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold qt-pill">
                <span>{night ? "🌙" : "☀️"}</span>
                <span>
                  {currentTime} {night ? "· Night" : "· Day"}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-white shadow-sm"
                style={{ background: theme.accent }}
              >
                <Trophy size={12} />
                <span>
                  Lv {level.level} {level.name} · {xp} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Night Mode Notice */}
      {night && (
        <div
          className="qt-card p-4 flex items-center gap-3 shadow-md"
          style={{ background: "#1E242Bf2", borderColor: "#1E242B" }}
        >
          <Moon size={22} className="text-amber-300 shrink-0" />
          <div className="flex-1 text-white">
            <div className="text-sm font-bold">Night Mode Active</div>
            <div className="text-[11px] text-white/80 leading-relaxed">
              Night food bazaars, evening aarti, and illuminated monuments are now open.
            </div>
          </div>
          <button
            onClick={() => {
              playTap();
              navigate("/moods");
            }}
            className="qt-tap text-xs font-bold px-3 py-1.5 rounded-full bg-amber-300 text-[#1E242B] shrink-0"
          >
            Night Routes
          </button>
        </div>
      )}

      {/* 3-Column Responsive Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (lg:col-span-4): Today's Quest + Time Slider */}
        <div className="lg:col-span-4 space-y-4">
          {/* Today's Quest Card */}
          {primaryQuest && (
            <div className="qt-card p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)]">
                    Featured Quest
                  </span>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${theme.accent}18`, color: theme.accent }}
                  >
                    +{primaryQuest.xp} XP
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg leading-tight text-[var(--qt-ink)]">
                  {primaryQuest.title}
                </h3>
                <p className="text-xs text-[var(--qt-ink-2)] mt-1">
                  {primaryQuest.steps.length} interactive steps · {primaryQuest.category} challenge
                </p>
              </div>

              <button
                onClick={() => {
                  playTap();
                  navigate(`/quest/${primaryQuest.id}`);
                }}
                className="qt-tap mt-4 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm flex items-center justify-center gap-2"
                style={{ background: theme.accent }}
              >
                <Swords size={16} />
                <span>Start This Quest</span>
              </button>
            </div>
          )}

          {/* Time of Day Simulation Slider */}
          <TimeSlider />
        </div>

        {/* Center Column (lg:col-span-5): QuestMap Preview */}
        <div className="lg:col-span-5">
          <div className="qt-card p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[var(--qt-ink)] flex items-center gap-1.5">
                <MapPin size={16} style={{ color: theme.accent }} /> QuestMap Preview
              </span>
              <button
                onClick={() => {
                  playTap();
                  navigate("/map");
                }}
                className="qt-tap text-xs font-bold hover:underline"
                style={{ color: theme.accent }}
              >
                Open full map →
              </button>
            </div>
            <div className="flex-1">
              <QuestMapSvg places={places} onPick={setSelectedPlace} height={310} />
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-3): Level Ring & Passport Progress */}
        <div className="lg:col-span-3 space-y-4">
          {/* Level Circular Ring */}
          <div className="qt-card p-4 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2">
              Explorer Rank
            </div>
            <div className="relative w-28 h-28 mx-auto my-1">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--qt-border)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - level.progress)}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="font-display font-extrabold text-2xl leading-none"
                  style={{ color: theme.accent }}
                >
                  Lv {level.level}
                </span>
                <span className="text-[10px] text-[var(--qt-ink-2)] font-semibold mt-0.5">
                  {level.name}
                </span>
              </div>
            </div>
            <div className="text-xs text-[var(--qt-ink-2)] mt-2">
              {level.next ? `${level.next.min - xp} XP to ${level.next.name}` : "Highest rank achieved!"}
            </div>
          </div>

          {/* Passport Progress Card */}
          <div className="qt-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)]">
                Passport Stamps
              </span>
              <span className="text-xs font-bold" style={{ color: theme.accent }}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--qt-border)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%`, background: theme.accent }}
              />
            </div>
            <div className="flex items-center justify-between mt-2.5 text-xs text-[var(--qt-ink-2)]">
              <span>🛂 {stamps.length} stamps</span>
              <span>
                📍 {visitedCount}/{places.length} places
              </span>
            </div>
            <button
              onClick={() => {
                playTap();
                navigate("/passport");
              }}
              className="qt-tap mt-3 w-full px-3 py-2 rounded-xl text-xs font-bold qt-pill hover:bg-neutral-50"
            >
              Open Passport
            </button>
          </div>
        </div>
      </div>

      {/* Time-Based Experiences Grid */}
      <div className="qt-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-display font-bold text-[var(--qt-ink)]">
              Time-based Experiences
            </h2>
            <p className="text-xs text-[var(--qt-ink-2)]">
              {unlockedPlaces.length} unlocked at {currentTime}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
          {places.map((place) => {
            const unlocked = isPlaceUnlocked(place.unlock, currentTime);
            const isVisited = Boolean(visited[place.id]);
            const cat = CATEGORY_STYLES[place.category] || CATEGORY_STYLES.Heritage;

            return (
              <button
                key={place.id}
                onClick={() => {
                  playTap();
                  setSelectedPlace(place);
                }}
                className="qt-tap text-left p-3 rounded-xl qt-pill relative hover:shadow-sm min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{cat.emoji}</span>
                  <span className="text-xs font-bold flex-1 truncate text-[var(--qt-ink)] min-w-0">
                    {place.name}
                  </span>
                  {isVisited && (
                    <CheckCircle2 size={13} style={{ color: theme.accent }} className="shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-[var(--qt-ink-2)] mt-1.5 flex items-center gap-1 font-medium">
                  {unlocked ? (
                    <>
                      <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-700">Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock size={10} className="shrink-0" />
                      <span>Opens at {place.unlock}</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {nextLockedPlace && (
          <p className="text-[11px] text-[var(--qt-ink-2)] mt-3">
            Next unlock: <strong>{nextLockedPlace.name}</strong> at {nextLockedPlace.unlock}. Slide
            the time slider to unlock early!
          </p>
        )}
      </div>

      {/* Local Partner Perks Section */}
      {cityData.partners && cityData.partners.length > 0 && (
        <div className="qt-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift size={18} style={{ color: theme.accent }} />
              <div>
                <h2 className="text-base font-display font-bold text-[var(--qt-ink)]">
                  Local Merchant & Artisan Perks
                </h2>
                <p className="text-xs text-[var(--qt-ink-2)]">
                  Show your quest badge or scan QR to redeem rewards
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playTap();
                navigate("/qr");
              }}
              className="text-xs font-bold hover:underline"
              style={{ color: theme.accent }}
            >
              Scan QR →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cityData.partners.slice(0, 3).map((partner) => (
              <div
                key={partner.id}
                className="p-3.5 rounded-xl border border-[var(--qt-border)] bg-neutral-50/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[var(--qt-ink)]">{partner.name}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-[var(--qt-border)]">
                      {partner.code}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--qt-accent)] font-semibold mt-0.5">
                    {partner.reward}
                  </div>
                  <p className="text-[11px] text-[var(--qt-ink-2)] mt-1 leading-snug">
                    {partner.experience}
                  </p>
                </div>
                <button
                  onClick={() => {
                    playTap();
                    navigate("/qr");
                  }}
                  className="qt-tap mt-3 text-[11px] font-bold py-1.5 px-3 rounded-lg text-white text-center shadow-sm"
                  style={{ background: theme.accent }}
                >
                  Redeem with Code
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {quickNavCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.to}
              onClick={() => playTap()}
              className="qt-tap qt-card p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5 hover:shadow-md transition-shadow group min-w-0"
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: `${theme.accent}14`, color: theme.accent }}
              >
                <Icon size={15} />
              </div>
              <span className="text-xs font-bold text-[var(--qt-ink)] truncate min-w-0">{card.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Landmark Details Modal */}
      <LandmarkModal
        place={selectedPlace}
        open={Boolean(selectedPlace)}
        onOpenChange={(open) => !open && setSelectedPlace(null)}
      />
    </div>
  );
};
