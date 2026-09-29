import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Clock,
  Sparkles,
  BookOpen,
  History,
  QrCode,
  MapPin,
  CheckCircle2,
  RotateCcw,
  X,
  Sliders,
  Navigation
} from "lucide-react";
import { useGame, getCurrentFormattedTime } from "../context/GameContext";
import { POPULAR_CITIES, resolveDestination } from "../data/cities";
import { getStateTheme } from "../data/themes";

interface DemoDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoDrawer: React.FC<DemoDrawerProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const {
    resetProgress,
    completeSampleQuest,
    setDestination,
    destination,
    state,
    simTime,
    setSimTime,
    location,
    simulateLocation,
    clearLocation
  } = useGame();
  const [customCity, setCustomCity] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  if (!open) return null;

  const currentTheme = getStateTheme(state || "Gujarat");

  const handleSelectCity = (city: string) => {
    const resolved = resolveDestination(city);
    setDestination(resolved.place, resolved.state);
    onOpenChange(false);
    navigate("/welcome");
  };

  const handleCustomSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customCity.trim()) return;
    handleSelectCity(customCity.trim());
    setCustomCity("");
  };

  const currentTime = getCurrentFormattedTime(simTime);

  const demoNavActions = [
    { label: "Show Passport", icon: BookOpen, to: "/passport" },
    { label: "Show Replay", icon: History, to: "/replay" },
    { label: "Scan QR Reward", icon: QrCode, to: "/qr" },
    { label: "Open QuestMap", icon: MapPin, to: "/map" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-[var(--qt-border)] flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <div>
              <h2 className="font-display text-base font-bold text-[var(--qt-ink)]">
                VISTA SIH & Demo Controls
              </h2>
              <p className="text-xs text-[var(--qt-ink-2)]">
                Instant interactive controls to preview complete journeys
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="qt-tap p-1.5 rounded-full hover:bg-neutral-100 text-[var(--qt-ink-2)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 flex-1">
          {/* Section 1: Choose Destination */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2 flex items-center gap-1.5">
              <MapPin size={13} style={{ color: currentTheme.accent }} /> Choose Destination
            </h3>
            <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-3">
              <input
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                placeholder="Any Indian place (e.g. Ahmedabad, Udaipur)..."
                className="flex-1 px-3 py-2 rounded-xl text-sm border border-[var(--qt-border)] bg-neutral-50 outline-none focus:border-[var(--qt-accent)]"
              />
              <button
                type="submit"
                className="qt-tap px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm"
                style={{ background: currentTheme.accent }}
              >
                Go
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleSelectCity(c)}
                  className={`qt-tap text-xs font-medium px-2.5 py-1 rounded-full border transition-all ${
                    destination?.toLowerCase() === c.toLowerCase()
                      ? "border-transparent text-white font-bold"
                      : "border-[var(--qt-border)] bg-neutral-50 hover:bg-neutral-100 text-[var(--qt-ink)]"
                  }`}
                  style={
                    destination?.toLowerCase() === c.toLowerCase()
                      ? { background: currentTheme.accent }
                      : undefined
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Simulate Location (GPS Testing) */}
          <section className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Navigation size={13} className="text-blue-600" /> GPS & Proximity Simulator
              </h3>
              {location && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                  {location.isSimulated ? "Demo Active" : "Device GPS"}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--qt-ink-2)] mb-3 leading-relaxed">
              Instantly jump to Ahmedabad checkpoints to test live distance calculations, walking routes, and arrival verification.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  simulateLocation(23.027, 72.5975, "Kalupur Swaminarayan Mandir");
                  onOpenChange(false);
                  navigate("/map");
                }}
                className="qt-tap p-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-left font-semibold text-[var(--qt-ink)]"
              >
                📍 Kalupur Mandir
              </button>
              <button
                onClick={() => {
                  simulateLocation(23.0245, 72.593, "Kavi Dalpatram Chowk");
                  onOpenChange(false);
                  navigate("/map");
                }}
                className="qt-tap p-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-left font-semibold text-[var(--qt-ink)]"
              >
                📍 Dalpatram Chowk
              </button>
              <button
                onClick={() => {
                  simulateLocation(23.0275, 72.5815, "Sidi Saiyyed Mosque");
                  onOpenChange(false);
                  navigate("/map");
                }}
                className="qt-tap p-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-left font-semibold text-[var(--qt-ink)]"
              >
                📍 Sidi Saiyyed
              </button>
              <button
                onClick={() => {
                  simulateLocation(23.0232, 72.5905, "Manek Chowk");
                  onOpenChange(false);
                  navigate("/map");
                }}
                className="qt-tap p-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-left font-semibold text-[var(--qt-ink)]"
              >
                📍 Manek Chowk
              </button>
            </div>

            {location && (
              <button
                onClick={() => clearLocation()}
                className="mt-2.5 text-xs text-blue-700 underline font-semibold block"
              >
                Reset Location
              </button>
            )}
          </section>

          {/* Section 3: Simulate Time */}
          <section className="bg-neutral-50 p-3.5 rounded-2xl border border-[var(--qt-border)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] flex items-center gap-1.5">
                <Clock size={13} style={{ color: currentTheme.accent }} /> Simulate Time of Day
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-[var(--qt-border)]">
                {currentTime}
              </span>
            </div>
            <p className="text-xs text-[var(--qt-ink-2)] mb-3 leading-relaxed">
              Slide to simulate hour changes. Observe monuments, markets, and street foods
              lock/unlock dynamically based on time of day!
            </p>
            <input
              type="range"
              min="0"
              max="23"
              value={parseInt(currentTime.split(":")[0], 10)}
              onChange={(e) => {
                const hour = String(e.target.value).padStart(2, "0");
                setSimTime(`${hour}:00`);
              }}
              className="w-full accent-[var(--qt-accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[var(--qt-ink-2)] mt-1">
              <span>06:00 (Morning)</span>
              <span>12:00 (Afternoon)</span>
              <span>19:30 (Night Market)</span>
            </div>
            {simTime && (
              <button
                onClick={() => setSimTime(null)}
                className="mt-2 text-xs text-amber-700 underline font-medium block"
              >
                Reset to Real Clock Time
              </button>
            )}
          </section>

          {/* Section 4: Quick Demo Actions */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2.5 flex items-center gap-1.5">
              <Sparkles size={13} style={{ color: currentTheme.accent }} /> Instant Demo Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {demoNavActions.map((act) => (
                <button
                  key={act.label}
                  onClick={() => {
                    onOpenChange(false);
                    navigate(act.to);
                  }}
                  className="qt-tap flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border border-[var(--qt-border)] bg-neutral-50 hover:bg-neutral-100 text-[var(--qt-ink)] text-left"
                >
                  <act.icon size={15} style={{ color: currentTheme.accent }} />
                  <span>{act.label}</span>
                </button>
              ))}

              {/* Complete Sample Quest shortcut */}
              <button
                onClick={() => {
                  completeSampleQuest();
                  onOpenChange(false);
                  navigate("/passport");
                }}
                className="qt-tap flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold text-white col-span-2 shadow-md transition-transform"
                style={{ background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent2})` }}
              >
                <CheckCircle2 size={16} />
                <span>Simulate Completed Quest (+120 XP, Stamp, Badge, Secret)</span>
              </button>

              {/* Reset Progress with clean inline confirmation without window.confirm */}
              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="qt-tap flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 col-span-2"
                >
                  <RotateCcw size={13} />
                  <span>Reset All Progress</span>
                </button>
              ) : (
                <div className="col-span-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                      onOpenChange(false);
                      navigate("/");
                    }}
                    className="qt-tap flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 shadow-sm"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="qt-tap px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 text-[var(--qt-ink-2)]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
