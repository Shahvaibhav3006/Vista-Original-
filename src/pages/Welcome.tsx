import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Swords, MapPin, Navigation, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { getThemePatternStyle } from "../data/themes";
import { playTap } from "../utils/audio";
import { calculateDistanceMeters, formatDistance } from "../utils/geo";

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const {
    destination,
    location,
    locationPermission,
    requestGps,
    simulateLocation
  } = useGame();
  const [mounted, setMounted] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!destination) {
      navigate("/");
    }
  }, [destination, navigate]);

  if (!destination) return null;

  const cityData = resolveDestination(destination);
  const theme = cityData.theme!;
  const patternStyle = getThemePatternStyle(theme);

  const handleStart = (path: string) => {
    playTap();
    navigate(path);
  };

  const handleRequestLocation = async () => {
    playTap();
    setGpsLoading(true);
    await requestGps();
    setGpsLoading(false);
  };

  const handleSimulateAmd = () => {
    playTap();
    // Simulate at Kalupur Swaminarayan Mandir
    simulateLocation(23.027, 72.5975, "Simulated at Kalupur Mandir (Old City)");
  };

  // Find closest place if location is active
  const closestPlace = React.useMemo(() => {
    if (!location || !cityData?.places?.length) return null;
    let closest = null;
    let minDistance = Infinity;
    for (const place of cityData.places) {
      if (place.lat && place.lng) {
        const d = calculateDistanceMeters(location.lat, location.lng, place.lat, place.lng);
        if (d < minDistance) {
          minDistance = d;
          closest = { place, distance: d };
        }
      }
    }
    return closest;
  }, [location, cityData]);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] w-full py-6 sm:py-8 flex flex-col items-center justify-center text-center relative"
      style={{
        background: `linear-gradient(160deg, ${theme.accent}14 0%, var(--qt-canvas) 60%)`
      }}
    >
      {/* Decorative State Pattern Banner */}
      <div
        className="absolute inset-x-0 top-12 h-28 opacity-35 pointer-events-none overflow-hidden"
        style={patternStyle}
      />

      {/* Main Animated Arrival Box */}
      <div
        className={`transition-all duration-700 max-w-lg mx-auto w-full px-2 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Cultural Emoji & Motif */}
        <div className="text-5xl sm:text-6xl mb-3 filter drop-shadow-sm">{theme.emoji}</div>
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--qt-ink-2)] mb-3">
          {theme.motif}
        </div>

        {/* Local Native Script Greeting */}
        <h1
          className="font-display font-black leading-tight tracking-tight px-1"
          style={{
            fontSize: "clamp(1.7rem, 6vw, 2.8rem)",
            color: theme.accent
          }}
        >
          {theme.localGreeting}
        </h1>

        {/* English Greeting & Tagline */}
        <p className="font-display font-bold text-lg sm:text-xl mt-2 text-[var(--qt-ink)]">
          {theme.englishGreeting}
        </p>
        <p className="text-xs sm:text-sm text-[var(--qt-ink-2)] mt-1.5 max-w-sm mx-auto px-2">{theme.tagline}</p>
      </div>

      {/* City Identification Card */}
      <div
        className={`mt-6 sm:mt-7 transition-all duration-700 delay-150 w-full max-w-md px-2 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="text-xs font-semibold text-[var(--qt-ink-2)] uppercase tracking-wider">
          Destination Unlocked
        </div>
        <div className="font-display font-extrabold text-3xl sm:text-4xl my-1 text-[var(--qt-ink)]">
          {cityData.place}
        </div>
        <div
          className="text-xs font-bold px-3 py-1 rounded-full inline-block mt-1 shadow-sm"
          style={{ background: `${theme.accent}18`, color: theme.accent }}
        >
          {cityData.state}
        </div>
        <p className="text-xs text-[var(--qt-ink-2)] max-w-md mx-auto mt-2 leading-relaxed px-2">
          {cityData.blurb}
        </p>
      </div>

      {/* Location Status & Permission Prompt */}
      <div
        className={`mt-5 sm:mt-6 w-full max-w-md transition-all duration-700 delay-200 px-1 sm:px-0 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {location ? (
          <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-300 text-left shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Navigation size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--qt-ink)] flex items-center gap-1.5">
                  <span>GPS Active</span>
                  {location.isSimulated && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold shrink-0">
                      Demo Mode
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[var(--qt-ink-2)] truncate">
                  {closestPlace
                    ? `Closest: ${closestPlace.place.name} (${formatDistance(closestPlace.distance)})`
                    : `${location.lat.toFixed(4)}° N, ${location.lng.toFixed(4)}° E`}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleStart("/map")}
              className="qt-tap w-full sm:w-auto text-center px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0 shadow-sm"
              style={{ background: theme.accent }}
            >
              View on Map
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[var(--qt-border)] text-left shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${theme.accent}15`, color: theme.accent }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--qt-ink)]">
                    Location-Based Real-World Play
                  </div>
                  <div className="text-[11px] text-[var(--qt-ink-2)] mt-0.5 leading-relaxed">
                    Allow location to detect nearby heritage checkpoints, measure walking distances, and verify arrivals.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={handleRequestLocation}
                disabled={gpsLoading}
                className="qt-tap flex-1 py-2 sm:py-1.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm"
                style={{ background: theme.accent }}
              >
                <Navigation size={12} />
                <span>{gpsLoading ? "Detecting GPS…" : "Enable Device GPS"}</span>
              </button>
              <button
                onClick={handleSimulateAmd}
                className="qt-tap px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold border border-[var(--qt-border)] bg-neutral-50 hover:bg-neutral-100 text-[var(--qt-ink-2)]"
              >
                Demo GPS
              </button>
            </div>
            {locationPermission === "denied" && (
              <div className="mt-2 text-[10px] text-amber-700 flex items-center gap-1">
                <AlertCircle size={11} className="shrink-0" />
                <span>GPS permission was denied. Tap "Demo GPS" to test location-based checkpoints.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Choose How to Explore Actions */}
      <div
        className={`mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full max-w-md transition-all duration-700 delay-300 px-1 sm:px-0 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => handleStart("/dashboard")}
          className="qt-tap flex-1 px-5 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:brightness-105"
          style={{ background: theme.accent }}
        >
          <Swords size={18} />
          <span>Story Quest Hub</span>
        </button>

        <button
          onClick={() => handleStart("/map")}
          className="qt-tap flex-1 px-5 py-3.5 rounded-2xl font-bold qt-pill flex items-center justify-center gap-2 hover:bg-neutral-50"
        >
          <Compass size={18} style={{ color: theme.accent }} />
          <span>Explore Freely</span>
        </button>
      </div>

      {/* Switch City Link */}
      <button
        onClick={() => handleStart("/")}
        className="mt-6 text-xs text-[var(--qt-ink-2)] underline hover:text-[var(--qt-ink)] font-medium"
      >
        Choose a different destination
      </button>
    </div>
  );
};
