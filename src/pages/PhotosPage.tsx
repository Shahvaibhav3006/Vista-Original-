import React, { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { resolveDestination } from "../data/cities";
import { playTap } from "../utils/audio";

interface Challenge {
  id: string;
  title: string;
  instr: string;
  xp: number;
}

const PHOTO_CHALLENGES: Challenge[] = [
  {
    id: "pose",
    title: "Recreate a Historical Pose",
    instr: "Find a statue, mural, or stone carving and mirror its pose. Frame it like a postcard from the past.",
    xp: 40
  },
  {
    id: "carving",
    title: "Find a Traditional Carving",
    instr: "Photograph a carved wooden doorway, jali lattice screen, or pillar detail up close.",
    xp: 40
  },
  {
    id: "reflection",
    title: "Take a Reflection Shot",
    instr: "Use water, glass, or a polished marble surface to capture a shimmering reflection of the place.",
    xp: 40
  },
  {
    id: "architecture",
    title: "Capture Local Architecture",
    instr: "Shoot a monument that tells the story of this city — symmetry, vibrant colour, and timeless geometry.",
    xp: 40
  }
];

export const PhotosPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, photos, submitPhoto } = useGame();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChallenge) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      submitPhoto(selectedChallenge.id, dataUrl, selectedChallenge.xp);
      setSelectedChallenge(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSimulateCapture = (challenge: Challenge) => {
    // Generate an artistic SVG placeholder as photo
    const svgData = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4ece1"/><circle cx="200" cy="150" r="80" fill="%23e05a47" opacity="0.2"/><text x="50%" y="45%" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231e242b">${challenge.title}</text><text x="50%" y="60%" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%235a6578">${cityData.place}, India</text></svg>`;
    submitPhoto(challenge.id, svgData, challenge.xp);
  };

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex items-center gap-3">
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
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--qt-ink)] leading-tight flex items-center gap-2 truncate">
            <Camera size={20} className="shrink-0" style={{ color: "var(--state-accent)" }} />
            <span className="truncate">Photo Challenges · {cityData.place}</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Capture the city your way. Snap an artifact, upload photos, or verify frames for XP.
          </p>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3.5">
        {PHOTO_CHALLENGES.map((ch) => {
          const photoUrl = photos[ch.id];
          const isDone = Boolean(photoUrl);

          return (
            <div key={ch.id} className="qt-card p-4 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-[var(--qt-ink)]">
                      {ch.title}
                    </span>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(224, 90, 71, 0.12)", color: "var(--qt-accent)" }}
                    >
                      +{ch.xp} XP
                    </span>
                  </div>
                  <p className="text-xs text-[var(--qt-ink-2)] mt-1 leading-relaxed">{ch.instr}</p>
                </div>

                {isDone && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 shrink-0 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 size={13} /> Completed
                  </span>
                )}
              </div>

              {/* Photo Display / Action */}
              {isDone ? (
                <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-[var(--qt-border)] flex items-center gap-3">
                  <img
                    src={photoUrl}
                    alt={ch.title}
                    className="w-16 h-16 rounded-lg object-cover border border-[var(--qt-border)]"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-[var(--qt-ink)]">Photo Verified</div>
                    <div className="text-[10px] text-[var(--qt-ink-2)] mt-0.5">
                      Stamped in your explorer album with +{ch.xp} XP award.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      playTap();
                      setSelectedChallenge(ch);
                      fileInputRef.current?.click();
                    }}
                    className="qt-tap flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm"
                    style={{ background: "var(--state-accent)" }}
                  >
                    <Upload size={14} />
                    <span>Upload Picture</span>
                  </button>

                  <button
                    onClick={() => {
                      playTap();
                      handleSimulateCapture(ch);
                    }}
                    className="qt-tap py-2 px-3 rounded-xl text-xs font-bold qt-pill hover:bg-neutral-50 flex items-center gap-1"
                  >
                    <Sparkles size={13} />
                    <span>Quick Simulate</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
