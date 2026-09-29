import React from "react";
import { Clock } from "lucide-react";
import { useGame, getCurrentFormattedTime } from "../context/GameContext";

interface TimeSliderProps {
  compact?: boolean;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ compact = false }) => {
  const { simTime, setSimTime } = useGame();
  const timeStr = getCurrentFormattedTime(simTime);

  const [hours, mins] = timeStr.split(":").map(Number);
  const totalMinutes = (hours || 0) * 60 + (mins || 0);
  const isLive = !simTime;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const h = String(Math.floor(val / 60)).padStart(2, "0");
    const m = String(val % 60).padStart(2, "0");
    setSimTime(`${h}:${m}`);
  };

  const toggleLiveOrSim = () => {
    if (isLive) {
      setSimTime(timeStr);
    } else {
      setSimTime(null);
    }
  };

  return (
    <div className="qt-card p-4 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: "var(--state-accent)" }} />
          <span className="text-sm font-semibold text-[var(--qt-ink)]">Time of Day</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-display font-bold text-lg tabular-nums tracking-tight"
            style={{ color: "var(--state-accent)" }}
          >
            {timeStr}
          </span>
          <button
            onClick={toggleLiveOrSim}
            className="qt-tap text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all"
            style={{
              background: isLive ? "transparent" : "var(--state-accent)",
              color: isLive ? "var(--state-accent)" : "#ffffff",
              borderColor: "var(--state-accent)"
            }}
          >
            {isLive ? "LIVE CLOCK" : "SIMULATION"}
          </button>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={1439}
        step={5}
        value={totalMinutes}
        onChange={handleSliderChange}
        className="w-full accent-[var(--state-accent)] cursor-pointer"
      />

      {!compact && (
        <div className="flex justify-between text-[10px] text-[var(--qt-ink-2)] mt-1.5 font-medium">
          <span>06:00 <span className="hidden sm:inline">(Dawn)</span></span>
          <span>12:00 <span className="hidden sm:inline">(Midday)</span></span>
          <span>18:00 <span className="hidden sm:inline">(Sunset)</span></span>
          <span>23:00 <span className="hidden sm:inline">(Night)</span></span>
        </div>
      )}

      {isLive && (
        <p className="text-[11px] text-[var(--qt-ink-2)] mt-2">
          Drag slider to simulate any hour of day and unlock night markets, morning temples, or
          sunset spots.
        </p>
      )}
    </div>
  );
};
