import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Place, Quest } from "../data/cities";
import { playLevelUp, playStamp, playSuccess, playTap, playUnlock } from "../utils/audio";

export interface LevelInfo {
  name: string;
  level: number;
  progress: number;
  next?: { name: string; min: number };
  current: { name: string; min: number };
}

export const LEVELS = [
  { name: "Explorer", min: 0 },
  { name: "Adventurer", min: 120 },
  { name: "Pathfinder", min: 320 },
  { name: "Trailblazer", min: 620 },
  { name: "Master Explorer", min: 1000 }
];

export function calculateLevel(xp: number): LevelInfo {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.min) current = lvl;
  }
  const idx = LEVELS.indexOf(current);
  const next = LEVELS[idx + 1];
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1;
  return {
    name: current.name,
    level: idx + 1,
    progress: Math.min(1, Math.max(0, progress)),
    next,
    current
  };
}

export interface UserProfile {
  name: string;
  avatar: string;
  isGuest: boolean;
  city?: string;
  bio?: string;
}

export interface TrailPoint {
  id: string;
  name: string;
  time: string;
  category: string;
  xp: number;
  x?: number;
  y?: number;
}

export interface QuestProgress {
  steps: boolean[];
  completedAt?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  isSimulated?: boolean;
  label?: string;
}

export interface GameState {
  user: UserProfile;
  xp: number;
  greenXp: number;
  visited: Record<string, { timestamp: string }>;
  quests: Record<string, QuestProgress>;
  badges: string[];
  stamps: string[];
  photos: Record<string, string>;
  trail: TrailPoint[];
  destination: string | null;
  state: string | null;
  simTime: string | null;
  mood: string | null;
  travelMode: string | null;
  team: string | null;
  savedPlaces: Array<{ id: string; name: string; category: string }>;
  secretUnlocked: boolean;
  location: UserLocation | null;
  locationPermission: "prompt" | "granted" | "denied" | "unavailable";
}

export interface GameContextType extends GameState {
  level: LevelInfo;
  setDestination: (place: string, stateName: string) => void;
  visitPlace: (place: Place) => void;
  addXp: (amount: number) => void;
  addGreenXp: (amount: number) => void;
  completeQuestStep: (questId: string, stepIndex: number, xpReward?: number) => void;
  completeQuest: (quest: Quest) => void;
  submitPhoto: (placeId: string, photoUrl: string, xp?: number) => void;
  unlockSecret: () => void;
  setSimTime: (time: string | null) => void;
  setMood: (mood: string | null) => void;
  setTravelMode: (mode: string | null) => void;
  setTeam: (team: string | null) => void;
  savePlace: (place: { id: string; name: string; category: string }) => void;
  addBadge: (badge: string) => void;
  addStamp: (stamp: string) => void;
  resetProgress: () => void;
  completeSampleQuest: () => void;
  updateProfile: (user: Partial<UserProfile>) => void;
  requestGps: () => Promise<boolean>;
  simulateLocation: (lat: number, lng: number, label?: string) => void;
  clearLocation: () => void;
}

const STORAGE_KEY = "vista_quest_state_v1";
const LEGACY_STORAGE_KEY = "questtrail_state_v1";

const INITIAL_STATE: GameState = {
  user: { name: "Guest Explorer", avatar: "🧭", isGuest: true },
  xp: 0,
  greenXp: 0,
  visited: {},
  quests: {},
  badges: [],
  stamps: [],
  photos: {},
  trail: [],
  destination: "Ahmedabad",
  state: "Gujarat",
  simTime: null,
  mood: null,
  travelMode: null,
  team: null,
  savedPlaces: [],
  secretUnlocked: false,
  location: null,
  locationPermission: "prompt"
};

function getInitialState(): GameState {
  if (typeof window === "undefined") return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_STATE, ...parsed };
    }
  } catch {
    // fallback
  }
  return INITIAL_STATE;
}

export function getCurrentFormattedTime(simTime?: string | null): string {
  if (simTime) return simTime;
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export function isPlaceUnlocked(unlockTime: string, currentTime: string): boolean {
  if (!unlockTime || unlockTime === "00:00") return true;
  return currentTime >= unlockTime;
}

export function isNightTime(timeString: string): boolean {
  const hr = parseInt(timeString.split(":")[0], 10);
  return hr >= 19 || hr < 6;
}

export function getNowTimeString(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage error ignored
    }
  }, [state]);

  const update = useCallback((updater: (prev: GameState) => Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updater(prev) }));
  }, []);

  const addXp = useCallback(
    (amount: number) => {
      update((prev) => {
        const nextXp = prev.xp + amount;
        const currentLvl = calculateLevel(prev.xp);
        const nextLvl = calculateLevel(nextXp);
        if (nextLvl.level > currentLvl.level) {
          playLevelUp();
        } else {
          playSuccess();
        }
        return { xp: nextXp };
      });
    },
    [update]
  );

  const addGreenXp = useCallback(
    (amount: number) => {
      playSuccess();
      update((prev) => ({ greenXp: prev.greenXp + amount, xp: prev.xp + amount }));
    },
    [update]
  );

  const setDestination = useCallback(
    (place: string, stateName: string) => {
      playTap();
      update(() => ({
        destination: place,
        state: stateName
      }));
    },
    [update]
  );

  const visitPlace = useCallback(
    (place: Place) => {
      update((prev) => {
        if (prev.visited[place.id]) return {};
        playSuccess();
        const timeNow = getNowTimeString();
        const newTrailPoint: TrailPoint = {
          id: place.id,
          name: place.name,
          time: timeNow,
          category: place.category,
          xp: place.xp,
          x: place.x,
          y: place.y
        };
        const nextXp = prev.xp + (place.xp || 50);
        return {
          visited: { ...prev.visited, [place.id]: { timestamp: timeNow } },
          trail: [...prev.trail, newTrailPoint],
          xp: nextXp
        };
      });
    },
    [update]
  );

  const completeQuestStep = useCallback(
    (questId: string, stepIndex: number, xpReward = 25) => {
      playTap();
      update((prev) => {
        const quest = prev.quests[questId] || { steps: [] };
        const newSteps = [...quest.steps];
        newSteps[stepIndex] = true;
        return {
          quests: {
            ...prev.quests,
            [questId]: { ...quest, steps: newSteps }
          },
          xp: prev.xp + xpReward
        };
      });
    },
    [update]
  );

  const requestGps = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      update(() => ({ locationPermission: "unavailable" }));
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          update(() => ({
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              isSimulated: false,
              label: "Live Device GPS"
            },
            locationPermission: "granted"
          }));
          resolve(true);
        },
        (err) => {
          if (err.code === 1) {
            update(() => ({
              locationPermission: "denied",
              location: null
            }));
          } else {
            update(() => ({
              locationPermission: "unavailable",
              location: null
            }));
          }
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }, [update]);

  const simulateLocation = useCallback(
    (lat: number, lng: number, label = "Simulated Location") => {
      playTap();
      update(() => ({
        location: {
          lat,
          lng,
          accuracy: 10,
          isSimulated: true,
          label
        },
        locationPermission: "granted"
      }));
    },
    [update]
  );

  const clearLocation = useCallback(() => {
    update(() => ({
      location: null,
      locationPermission: "prompt"
    }));
  }, [update]);

  const completeQuest = useCallback(
    (quest: Quest) => {
      playStamp();
      update((prev) => {
        const badges = prev.badges.includes(quest.badge) ? prev.badges : [...prev.badges, quest.badge];
        const stamps = prev.stamps.includes(quest.stamp) ? prev.stamps : [...prev.stamps, quest.stamp];
        const completedSteps = quest.steps.map(() => true);
        return {
          quests: {
            ...prev.quests,
            [quest.id]: { steps: completedSteps, completedAt: getNowTimeString() }
          },
          xp: prev.xp + (quest.xp || 100),
          badges,
          stamps
        };
      });
    },
    [update]
  );

  const submitPhoto = useCallback(
    (placeId: string, photoUrl: string, xpGain = 40) => {
      playSuccess();
      update((prev) => ({
        photos: { ...prev.photos, [placeId]: photoUrl },
        xp: prev.xp + xpGain
      }));
    },
    [update]
  );

  const unlockSecret = useCallback(() => {
    playUnlock();
    update((prev) => ({
      secretUnlocked: true,
      xp: prev.xp + 80
    }));
  }, [update]);

  const setSimTime = useCallback(
    (time: string | null) => {
      playTap();
      update(() => ({ simTime: time }));
    },
    [update]
  );

  const setMood = useCallback(
    (mood: string | null) => {
      playTap();
      update(() => ({ mood }));
    },
    [update]
  );

  const setTravelMode = useCallback(
    (mode: string | null) => {
      playTap();
      update(() => ({ travelMode: mode }));
    },
    [update]
  );

  const setTeam = useCallback(
    (team: string | null) => {
      playTap();
      update(() => ({ team }));
    },
    [update]
  );

  const savePlace = useCallback(
    (place: { id: string; name: string; category: string }) => {
      playTap();
      update((prev) => {
        if (prev.savedPlaces.some((p) => p.id === place.id)) {
          return {
            savedPlaces: prev.savedPlaces.filter((p) => p.id !== place.id)
          };
        }
        return {
          savedPlaces: [...prev.savedPlaces, place]
        };
      });
    },
    [update]
  );

  const addBadge = useCallback(
    (badge: string) => {
      playSuccess();
      update((prev) => ({
        badges: prev.badges.includes(badge) ? prev.badges : [...prev.badges, badge]
      }));
    },
    [update]
  );

  const addStamp = useCallback(
    (stamp: string) => {
      playStamp();
      update((prev) => ({
        stamps: prev.stamps.includes(stamp) ? prev.stamps : [...prev.stamps, stamp]
      }));
    },
    [update]
  );

  const resetProgress = useCallback(() => {
    playTap();
    setState((prev) => ({
      ...INITIAL_STATE,
      destination: prev.destination,
      state: prev.state,
      user: prev.user
    }));
  }, []);

  const completeSampleQuest = useCallback(() => {
    playStamp();
    update((prev) => {
      const demoBadge = "Demo Pathfinder";
      const demoStamp = "Demo Stamp";
      return {
        xp: prev.xp + 120,
        greenXp: prev.greenXp + 20,
        badges: prev.badges.includes(demoBadge) ? prev.badges : [...prev.badges, demoBadge],
        stamps: prev.stamps.includes(demoStamp) ? prev.stamps : [...prev.stamps, demoStamp],
        secretUnlocked: true
      };
    });
  }, [update]);

  const updateProfile = useCallback(
    (patch: Partial<UserProfile>) => {
      playTap();
      update((prev) => ({
        user: { ...prev.user, ...patch }
      }));
    },
    [update]
  );

  const level = useMemo(() => calculateLevel(state.xp), [state.xp]);

  const contextValue: GameContextType = useMemo(
    () => ({
      ...state,
      level,
      setDestination,
      visitPlace,
      addXp,
      addGreenXp,
      completeQuestStep,
      completeQuest,
      submitPhoto,
      unlockSecret,
      setSimTime,
      setMood,
      setTravelMode,
      setTeam,
      savePlace,
      addBadge,
      addStamp,
      resetProgress,
      completeSampleQuest,
      updateProfile,
      requestGps,
      simulateLocation,
      clearLocation
    }),
    [
      state,
      level,
      setDestination,
      visitPlace,
      addXp,
      addGreenXp,
      completeQuestStep,
      completeQuest,
      submitPhoto,
      unlockSecret,
      setSimTime,
      setMood,
      setTravelMode,
      setTeam,
      savePlace,
      addBadge,
      addStamp,
      resetProgress,
      completeSampleQuest,
      updateProfile,
      requestGps,
      simulateLocation,
      clearLocation
    ]
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}
