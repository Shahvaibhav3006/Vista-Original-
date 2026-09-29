import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  QrCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Gift,
  Tag
} from "lucide-react";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext";
import { resolveDestination, Partner } from "../data/cities";
import { playTap, playSuccess } from "../utils/audio";

export const QrPage: React.FC = () => {
  const navigate = useNavigate();
  const { destination, addXp, addBadge, badges, unlockSecret, redeemQrCode } = useGame();
  const [inputCode, setInputCode] = useState("");
  const [redeemedPartner, setRedeemedPartner] = useState<Partner | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [scanning, setScanning] = useState(false);

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

  const partners = cityData.partners || [];

  const handleRedeem = (codeToTest: string) => {
    playTap();
    const clean = codeToTest.trim().toUpperCase();
    const match = partners.find((p) => p.code.toUpperCase() === clean);

    if (!match) {
      setErrorMessage("No merchant perk found for this code. Tap one of the demo codes below!");
      setRedeemedPartner(null);
      return;
    }

    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch {
      // ignore
    }

    playSuccess();
    setErrorMessage("");
    setRedeemedPartner(match);
    addXp(30);
    unlockSecret();
    if (!badges.includes("Quest Partner")) {
      addBadge("Quest Partner");
    }
    
    // Sync to backend
    redeemQrCode(clean);
  };

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      if (partners.length > 0) {
        handleRedeem(partners[0].code);
      }
    }, 1200);
  };

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
            <QrCode size={20} className="shrink-0" style={{ color: "var(--state-accent)" }} />
            <span className="truncate">QR Rewards · {cityData.place}</span>
          </h1>
          <p className="text-xs text-[var(--qt-ink-2)] mt-0.5 sm:mt-1">
            Scan at verified heritage cafes, stays, and artisan studios to unlock perks.
          </p>
        </div>
      </div>

      {/* QR Scanner Viewport Box */}
      <div className="qt-card p-6 text-center border-2 border-dashed border-[var(--qt-border)] relative overflow-hidden bg-neutral-900 text-white rounded-3xl">
        <div className="relative z-10 py-6">
          <div className="w-24 h-24 mx-auto mb-3 border-2 border-white/40 rounded-2xl flex items-center justify-center relative">
            <QrCode size={48} className="text-white/80" />
            {scanning && (
              <div className="absolute inset-x-0 h-1 bg-emerald-400 top-0 animate-bounce" />
            )}
          </div>
          <p className="text-xs text-white/80 max-w-xs mx-auto">
            {scanning ? "Scanning physical merchant QR code..." : "Point camera or test instant scan simulation"}
          </p>
          <button
            onClick={handleSimulateScan}
            disabled={scanning}
            className="qt-tap mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg bg-[var(--qt-accent)] hover:brightness-110"
          >
            {scanning ? "Detecting..." : "Simulate QR Camera Scan"}
          </button>
        </div>
      </div>

      {/* Manual Code Input */}
      <div className="qt-card p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2 flex items-center gap-1.5">
          <Tag size={13} /> Or Enter Merchant Perk Code
        </div>
        <div className="flex gap-2">
          <input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleRedeem(inputCode)}
            placeholder="e.g. QTCAFE"
            className="flex-1 px-3 py-2.5 rounded-xl text-sm border border-[var(--qt-border)] bg-neutral-50 font-mono font-bold tracking-wider outline-none focus:border-[var(--qt-accent)]"
          />
          <button
            onClick={() => handleRedeem(inputCode)}
            className="qt-tap px-5 py-2.5 rounded-xl text-xs font-bold text-white"
            style={{ background: "var(--state-accent)" }}
          >
            Redeem
          </button>
        </div>

        {errorMessage && (
          <div className="mt-2 text-xs text-red-600 flex items-center gap-1 font-medium">
            <AlertCircle size={13} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Success Banner if redeemed */}
      {redeemedPartner && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Gift size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Perk Unlocked
                </span>
                <span className="text-xs font-bold text-emerald-800">+30 XP & Badge</span>
              </div>
              <h3 className="font-display font-black text-lg text-emerald-950 mt-1">
                {redeemedPartner.name}
              </h3>
              <p className="text-xs text-emerald-900 font-bold mt-0.5">
                Reward: {redeemedPartner.reward}
              </p>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                {redeemedPartner.experience}
              </p>
              <div className="mt-3 text-[11px] font-mono text-emerald-900 font-bold bg-white/70 px-2 py-1 rounded inline-block border border-emerald-300">
                Verified Code: {redeemedPartner.code}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tap Demo Codes */}
      <div className="qt-card p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--qt-ink-2)] mb-2.5">
          Available Merchant Partners ({partners.length})
        </h3>
        <div className="space-y-2.5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-3 rounded-xl border border-[var(--qt-border)] bg-neutral-50 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[var(--qt-ink)]">{partner.name}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white border border-[var(--qt-border)]">
                    {partner.code}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--qt-accent)] font-semibold mt-0.5">
                  {partner.reward}
                </div>
              </div>

              <button
                onClick={() => handleRedeem(partner.code)}
                className="qt-tap px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                style={{ background: "var(--state-accent)" }}
              >
                Test Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
