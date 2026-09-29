import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Trophy,
  Sparkles,
  CheckCircle2,
  Copy,
  PlusCircle,
  LogIn
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { api } from "../lib/api";
import { playTap, playSuccess } from "../utils/audio";

interface DemoTeam {
  name: string;
  code: string;
  xp: number;
}

const DEMO_TEAMS: DemoTeam[] = [
  { name: "Pol Pioneers", code: "POL123", xp: 540 },
  { name: "Desert Trailblazers", code: "DST456", xp: 410 },
  { name: "Backwater Explorers", code: "BCK789", xp: 320 }
];

export const FriendsPage: React.FC = () => {
  const navigate = useNavigate();
  const { team, setTeam, xp, user } = useGame();

  const [teamNameInput, setTeamNameInput] = useState("");
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCreateTeam = async () => {
    playTap();
    const rawName = teamNameInput.trim() || "Heritage Squad";
    
    if (!user.isGuest) {
      try {
        const newTeam = await api.createTeam(rawName);
        setTeam(JSON.stringify({ id: newTeam.id, name: newTeam.name, code: newTeam.join_code, members: [user.name] }));
        playSuccess();
      } catch (err) {
        console.error('Failed to create team', err);
      }
    } else {
      const randomCode =
        rawName.slice(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);
      setTeam(JSON.stringify({ name: rawName, code: randomCode, members: [user.name] }));
      playSuccess();
    }
  };

  const handleJoinTeam = async (codeToJoin: string) => {
    playTap();
    const clean = codeToJoin.trim().toUpperCase();
    
    if (!user.isGuest) {
      try {
        const joined = await api.joinTeam(clean);
        // We'd ideally fetch members here too, but just set basic for now
        setTeam(JSON.stringify({ id: joined.team_id, name: "Your Squad", code: clean, members: [user.name, "Squad Mate"] }));
        playSuccess();
      } catch (err) {
        console.error('Failed to join team', err);
      }
    } else {
      const demo = DEMO_TEAMS.find((t) => t.code.toUpperCase() === clean);
      if (demo) {
        setTeam(
          JSON.stringify({
            name: demo.name,
            code: demo.code,
            members: [user.name, "Aarav", "Meera"]
          })
        );
      } else {
        setTeam(
          JSON.stringify({
            name: "Explorer Squad",
            code: clean,
            members: [user.name, "Squad Mate"]
          })
        );
      }
      playSuccess();
    }
  };

  let activeTeamData: { name: string; code: string; members: string[] } | null = null;
  if (team) {
    try {
      activeTeamData = JSON.parse(team);
    } catch {
      // fallback
    }
  }

  const handleCopyCode = () => {
    if (activeTeamData?.code) {
      navigator.clipboard.writeText(activeTeamData.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Leaderboard ranking list
  const leaderboard = [
    { name: user.name, xp, you: true, avatar: user.avatar },
    ...(activeTeamData ? [{ name: "Aarav Sharma", xp: Math.max(0, xp - 60), avatar: "🦚" }] : []),
    { name: "Meera Patel", xp: 480, avatar: "🐪" },
    { name: "Kabir Sengupta", xp: 360, avatar: "🌾" },
    { name: "Ananya Nair", xp: 220, avatar: "🛶" }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
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
            <Users size={20} className="shrink-0" style={{ color: "var(--state-accent)" }} />
            <span className="truncate">Friend Squad & Leaderboard</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Form travel squads, compare cultural XP, and climb the all-India leaderboard.
          </p>
        </div>
      </div>

      {/* Active Squad Card or Creation Box */}
      {activeTeamData ? (
        <div className="qt-card p-5 border-2 border-emerald-500/20 bg-emerald-50/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Your Active Squad
              </div>
              <h2 className="font-display font-black text-2xl text-[var(--qt-ink)] mt-0.5">
                {activeTeamData.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[var(--qt-ink-2)]">Invite Code:</span>
                <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-[var(--qt-border)]">
                  {activeTeamData.code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="qt-tap text-xs text-[var(--qt-accent)] font-semibold flex items-center gap-1 hover:underline"
                >
                  <Copy size={12} />
                  <span>{copiedCode ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <button
              onClick={async () => {
                playTap();
                if (!user.isGuest && activeTeamData?.id) {
                  try {
                    await api.leaveTeam(activeTeamData.id);
                  } catch (err) {
                    console.error('Failed to leave team', err);
                  }
                }
                setTeam(null);
              }}
              className="qt-tap text-xs text-red-600 font-bold px-3 py-1.5 rounded-xl border border-red-200 bg-red-50"
            >
              Leave Squad
            </button>
          </div>
        </div>
      ) : (
        <div className="qt-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--qt-ink)]">Create a New Squad</h3>
            <p className="text-xs text-[var(--qt-ink-2)]">
              Explore cities together with friends and share quest milestone bonuses.
            </p>
            <div className="flex gap-2 mt-2">
              <input
                value={teamNameInput}
                onChange={(e) => setTeamNameInput(e.target.value)}
                placeholder="Squad name (e.g. Royal Wanderers)..."
                className="flex-1 px-3 py-2 rounded-xl text-xs border border-[var(--qt-border)] outline-none focus:border-[var(--qt-accent)]"
              />
              <button
                onClick={handleCreateTeam}
                className="qt-tap px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1"
                style={{ background: "var(--state-accent)" }}
              >
                <PlusCircle size={14} />
                <span>Create</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--qt-border)]">
            <h3 className="text-xs font-bold text-[var(--qt-ink)]">Join via Code</h3>
            <div className="flex gap-2 mt-1.5">
              <input
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value)}
                placeholder="Enter squad code..."
                className="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-wider border border-[var(--qt-border)] outline-none focus:border-[var(--qt-accent)]"
              />
              <button
                onClick={() => handleJoinTeam(joinCodeInput)}
                className="qt-tap px-4 py-2 rounded-xl text-xs font-bold qt-pill flex items-center gap-1 hover:bg-neutral-50"
              >
                <LogIn size={14} />
                <span>Join</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Teams */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--qt-ink-2)]">
              Or Quick Join Demo Squads:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {DEMO_TEAMS.map((dt) => (
                <button
                  key={dt.code}
                  onClick={() => handleJoinTeam(dt.code)}
                  className="qt-tap px-3 py-1 rounded-full text-xs font-semibold qt-pill hover:bg-neutral-50"
                >
                  {dt.name} ({dt.code})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="qt-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--qt-ink)]">
              National Cultural Leaderboard
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600">Season 1 Active</span>
        </div>

        <div className="space-y-2">
          {leaderboard.map((player, idx) => (
            <div
              key={player.name}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                player.you
                  ? "bg-amber-50/50 border-amber-300 font-bold"
                  : "bg-white border-[var(--qt-border)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0
                      ? "bg-amber-400 text-white"
                      : idx === 1
                      ? "bg-neutral-300 text-neutral-800"
                      : idx === 2
                      ? "bg-amber-700 text-white"
                      : "text-[var(--qt-ink-2)]"
                  }`}
                >
                  {idx + 1}
                </span>

                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-base">
                  {player.avatar || "🧭"}
                </div>

                <div>
                  <div className="text-xs font-bold text-[var(--qt-ink)] flex items-center gap-1.5">
                    <span>{player.name}</span>
                    {player.you && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[var(--qt-ink-2)]">Verified Explorer</div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-extrabold text-sm text-[var(--state-accent)]">
                  {player.xp}
                </span>
                <span className="text-[10px] text-[var(--qt-ink-2)] ml-1 font-semibold">XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
