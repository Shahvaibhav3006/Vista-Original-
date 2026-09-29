import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Compass,
  MapPin,
  Trophy,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  User,
  Swords,
  Layers,
  Flag
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { getStateTheme, getThemePatternStyle } from "../data/themes";
import { isSoundEnabled, toggleSound, playTap } from "../utils/audio";
import { DemoDrawer } from "./DemoDrawer";

export const Layout: React.FC = () => {
  const { state, destination, level, xp } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  const [demoOpen, setDemoOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  const theme = getStateTheme(state || "Gujarat");

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  const navItems = [
    { to: "/dashboard", label: "Home", icon: Compass },
    { to: "/map", label: "QuestMap", icon: MapPin },
    { to: "/quests", label: "Quests", icon: Swords },
    { to: "/passport", label: "Passport", icon: BookOpen },
    { to: "/profile", label: "Profile", icon: User }
  ];

  return (
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-[var(--qt-accent)] selection:text-white"
      style={
        {
          "--state-accent": theme.accent,
          "--state-accent-2": theme.accent2,
          "--state-ink": "#1E242B"
        } as React.CSSProperties
      }
    >
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[var(--qt-border)] transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => playTap()}
            className="qt-tap flex items-center gap-1.5 sm:gap-2 shrink-0 group"
          >
            <span className="text-xl transform group-hover:rotate-12 transition-transform">🧭</span>
            <div className="flex flex-col -space-y-0.5">
              <span className="font-display font-black text-[17px] sm:text-[18px] tracking-tight text-[var(--qt-ink)]">
                VISTA
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--qt-accent)]">
                India Edition
              </span>
            </div>
          </Link>

          {/* Destination Badge */}
          {destination && (
            <button
              onClick={() => {
                playTap();
                navigate("/welcome");
              }}
              className="qt-tap hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold qt-pill hover:shadow-sm"
              style={{ color: theme.accent, borderColor: `${theme.accent}44` }}
            >
              <span>{theme.emoji}</span>
              <span className="font-bold">{destination}</span>
              <span className="text-[var(--qt-ink-2)] font-normal">· {state}</span>
            </button>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Level & XP Badge */}
            {destination && (
              <Link
                to="/profile"
                onClick={() => playTap()}
                className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-transform hover:scale-105"
                style={{ background: `${theme.accent}15`, color: theme.accent }}
              >
                <Trophy size={13} />
                <span>Lv {level.level}</span>
                <span className="opacity-40">|</span>
                <span>{xp} XP</span>
              </Link>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? "Mute audio" : "Enable sound effects"}
              className="qt-tap w-8 h-8 rounded-full flex items-center justify-center border border-[var(--qt-border)] bg-white text-[var(--qt-ink-2)] hover:text-[var(--qt-ink)] shrink-0"
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* SIH Demo Mode Trigger Button */}
            <button
              onClick={() => {
                playTap();
                setDemoOpen(true);
              }}
              className="qt-tap flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm hover:brightness-105 shrink-0"
              style={{ background: "var(--qt-accent)" }}
            >
              <Sparkles size={13} />
              <span>Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 pb-28 md:pb-12 pt-3">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden qt-safe-bottom pointer-events-none">
        <div className="mx-2 sm:mx-3 mb-2 sm:mb-3 qt-card flex items-center justify-around px-1 sm:px-2 py-1.5 sm:py-2 rounded-2xl shadow-xl pointer-events-auto bg-white/95 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/dashboard" && location.pathname === "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => playTap()}
                className={`qt-tap flex flex-col items-center justify-center flex-1 min-w-0 gap-0.5 px-1 sm:px-2 py-1 sm:py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-[var(--state-accent)] font-bold scale-105"
                    : "text-[var(--qt-ink-2)] font-medium hover:text-[var(--qt-ink)]"
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.6 : 2} className="shrink-0" />
                <span className="text-[10px] truncate max-w-full leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Demo Mode Drawer */}
      <DemoDrawer open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};
