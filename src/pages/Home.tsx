import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Navigation, ArrowRight, Sparkles, Map, Clock, Award, QrCode } from "lucide-react";
import { useGame } from "../context/GameContext";
import { POPULAR_CITIES, PRESET_CITIES, resolveDestination, detectState } from "../data/cities";
import { getStateTheme } from "../data/themes";
import { playTap } from "../utils/audio";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setDestination, destination, requestGps } = useGame();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleExplore = (targetCity?: string) => {
    const raw = (targetCity || query).trim();
    if (!raw) return;
    playTap();
    const resolved = resolveDestination(raw);
    setDestination(resolved.place, resolved.state);
    navigate("/welcome");
  };

  const handleGeolocation = async () => {
    playTap();
    await requestGps();
    handleExplore("Ahmedabad");
  };

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const all = [
      ...Object.values(PRESET_CITIES).map((c) => ({
        place: c.place,
        state: c.state
      })),
      ...POPULAR_CITIES.map((c) => ({
        place: c,
        state: detectState(c)
      }))
    ];

    const seen = new Set<string>();
    const results = [];
    for (const item of all) {
      const key = item.place.toLowerCase();
      const stateStr = (item.state || "").toLowerCase();
      if (!seen.has(key) && (key.includes(q) || stateStr.includes(q))) {
        seen.add(key);
        results.push({ place: item.place, state: item.state || "India" });
      }
    }
    return results.slice(0, 5);
  }, [query]);

  const featureCards = [
    {
      emoji: "🗺️",
      title: "QuestMap",
      desc: "An illustrated adventure map, not plain Google Maps."
    },
    {
      emoji: "⏰",
      title: "Time Unlocks",
      desc: "Monuments and street feasts unlock by time of day."
    },
    {
      emoji: "🛂",
      title: "Cultural Passport",
      desc: "Earn vintage postal ink stamps as you complete quests."
    },
    {
      emoji: "🎁",
      title: "QR Merchant Perks",
      desc: "Connect with authentic local pol cafes, stays & artisans."
    }
  ];

  return (
    <div className="pt-6 md:pt-10">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: "rgba(224, 90, 71, 0.12)", color: "var(--qt-accent)" }}
        >
          <Sparkles size={13} />
          <span>Gamified Cultural Tourism · India</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[var(--qt-ink)]">
          Don’t just visit a city.
          <br />
          <span style={{ color: "var(--qt-accent)" }}>Play it.</span>
        </h1>

        <p className="text-[var(--qt-ink-2)] mt-3 sm:mt-3.5 text-[14px] sm:text-[16px] max-w-lg mx-auto leading-relaxed px-1">
          Enter any place in India. We detect its state, dress it in that culture, and turn it into
          an unforgettable gamified quest.
        </p>
      </div>

      {/* Search & Geolocation Box */}
      <div className="max-w-xl mx-auto mt-6 sm:mt-8 qt-card p-2 sm:p-3 shadow-lg relative">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0 px-2 sm:px-3">
            <Search size={18} className="text-[var(--qt-ink-2)] shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 250)}
              onKeyDown={(e) => e.key === "Enter" && handleExplore()}
              placeholder="Where in India? (e.g. Ahmedabad)"
              className="w-full py-2.5 sm:py-3 text-[14px] sm:text-[16px] bg-transparent outline-none placeholder:text-[var(--qt-ink-2)] min-w-0"
            />
          </div>

          <button
            onClick={handleGeolocation}
            title="Use current GPS location"
            className="qt-tap w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center qt-pill shrink-0 hover:bg-neutral-50"
          >
            <Navigation size={17} style={{ color: "var(--qt-accent)" }} />
          </button>

          <button
            onClick={() => handleExplore()}
            className="qt-tap px-3.5 sm:px-5 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-md"
            style={{ background: "var(--qt-accent)" }}
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Autocomplete Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[var(--qt-border)] overflow-hidden z-20">
            <div className="p-1.5 space-y-1">
              {suggestions.map((item) => {
                const theme = getStateTheme(item.state);
                return (
                  <button
                    key={item.place}
                    onMouseDown={() => {
                      setQuery(item.place);
                      handleExplore(item.place);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 flex items-center justify-between text-sm transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{theme.emoji}</span>
                      <div>
                        <span className="font-bold text-[var(--qt-ink)] group-hover:text-[var(--qt-accent)]">
                          {item.place}
                        </span>
                        <span className="text-xs text-[var(--qt-ink-2)] ml-2">
                          · {item.state}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[var(--qt-ink-2)] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Popular Destination Pills */}
      <div className="max-w-xl mx-auto mt-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--qt-ink-2)] mb-2.5 text-center">
          Popular Destinations
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_CITIES.map((city) => {
            const detectedState = detectState(city);
            const stateTheme = getStateTheme(detectedState);
            return (
              <button
                key={city}
                onClick={() => handleExplore(city)}
                className="qt-tap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold qt-pill hover:border-[var(--qt-accent)] hover:shadow-sm"
              >
                <span>{stateTheme.emoji}</span>
                <span>{city}</span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-[11px] text-[var(--qt-ink-2)] mt-3">
          …or type any Indian town, hill station or heritage village — we support all 28 states & 8
          UTs.
        </p>
      </div>

      {/* 4 Feature Highlight Cards */}
      <div className="max-w-3xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {featureCards.map((feat) => (
          <div
            key={feat.title}
            className="qt-card p-4 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="text-2xl mb-2">{feat.emoji}</div>
              <div className="font-display font-bold text-sm text-[var(--qt-ink)]">{feat.title}</div>
            </div>
            <div className="text-[11px] text-[var(--qt-ink-2)] leading-relaxed mt-1">
              {feat.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Return to Current Adventure */}
      {destination && (
        <div className="max-w-xl mx-auto mt-8 text-center">
          <button
            onClick={() => {
              playTap();
              navigate("/dashboard");
            }}
            className="qt-tap text-sm font-bold inline-flex items-center gap-1 hover:underline"
            style={{ color: "var(--qt-accent)" }}
          >
            <span>Continue your quest in {destination}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
