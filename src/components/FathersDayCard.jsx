import { useState, useEffect, useRef } from "react";

const messages = [
  "Happy Father's Day to the men who showed up, worked hard, and never made it look easy. Here's to you. 🥃",
  "To the dads, granddads, stepdads, and every man who stepped up — today is yours. Happy Father's Day. 💪",
  "Behind every great family is a man who put in the work. Happy Father's Day, brother. 🔥",
  "Real strength isn't what you lift — it's what you carry for your family. Happy Father's Day. 🏔️",
  "No manual, no breaks, no quit. That's a dad. Happy Father's Day to the ones who never tapped out. ⚒️",
];

const EMBERS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 3,
  size: 2 + Math.random() * 4,
}));

export default function FathersDayCard() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [sparks, setSparks] = useState([]);
  const sparkId = useRef(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(messages[msgIdx]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCelebrate = () => {
    setCelebrating(true);
    const newSparks = Array.from({ length: 18 }, (_, i) => ({
      id: sparkId.current++,
      angle: (360 / 18) * i,
      color: ["#F97316", "#FBBF24", "#EF4444", "#FCD34D"][i % 4],
    }));
    setSparks(newSparks);
    setTimeout(() => {
      setCelebrating(false);
      setSparks([]);
    }, 900);
  };

  const nextMsg = () => setMsgIdx((p) => (p + 1) % messages.length);
  const prevMsg = () => setMsgIdx((p) => (p - 1 + messages.length) % messages.length);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f0c09 0%, #1a1208 50%, #0d0a06 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* Ember particles */}
      {EMBERS.map((e) => (
        <div
          key={e.id}
          style={{
            position: "absolute",
            left: `${e.left}%`,
            bottom: "-10px",
            width: e.size,
            height: e.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, #FBBF24, #F97316)`,
            animation: `rise ${e.duration}s ${e.delay}s infinite ease-in`,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Spark burst */}
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: s.color,
            transform: `rotate(${s.angle}deg) translateX(0px)`,
            animation: `burst 0.9s ease-out forwards`,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      ))}

      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes burst {
          0% { transform: rotate(var(--angle, 0deg)) translateX(0px) scale(1); opacity: 1; }
          100% { transform: rotate(var(--angle, 0deg)) translateX(120px) scale(0); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 40px #F97316, 0 0 80px #EF4444; }
          50% { opacity: 0.92; text-shadow: 0 0 60px #FBBF24, 0 0 100px #F97316; }
        }
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.3), inset 0 1px 0 rgba(251,191,36,0.15); }
          50% { box-shadow: 0 0 30px 4px rgba(249,115,22,0.15), inset 0 1px 0 rgba(251,191,36,0.15); }
        }
        button:hover { filter: brightness(1.15); transform: translateY(-1px); }
        button:active { transform: translateY(0px); filter: brightness(0.95); }
        button { transition: all 0.15s ease; }
      `}</style>

      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "linear-gradient(135deg, rgba(30,18,8,0.97) 0%, rgba(20,12,4,0.97) 100%)",
          border: "1px solid rgba(249,115,22,0.35)",
          borderRadius: 4,
          padding: "48px 40px",
          position: "relative",
          animation: "subtlePulse 3s ease-in-out infinite",
          zIndex: 10,
        }}
      >
        {/* Top rule with emblem */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6))" }} />
          <span style={{ fontSize: 24 }}>🔥</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(249,115,22,0.6), transparent)" }} />
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(13px, 3vw, 15px)",
              letterSpacing: "0.35em",
              color: "#F97316",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            June 21, 2026
          </div>
          <h1
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(42px, 10vw, 68px)",
              fontWeight: 900,
              color: "#FBBF24",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "0.02em",
              animation: "flicker 4s ease-in-out infinite",
            }}
          >
            FATHER'S
          </h1>
          <h1
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(42px, 10vw, 68px)",
              fontWeight: 900,
              color: "#FFF7ED",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            DAY
          </h1>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #F97316, #FBBF24)",
            margin: "24px auto",
            borderRadius: 2,
          }}
        />

        {/* Message */}
        <div
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: 2,
            padding: "20px 24px",
            minHeight: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#FEF3C7",
              fontSize: "clamp(14px, 3.5vw, 17px)",
              lineHeight: 1.65,
              margin: 0,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {messages[msgIdx]}
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16 }}>
          <button
            onClick={prevMsg}
            style={{
              background: "transparent",
              border: "1px solid rgba(249,115,22,0.4)",
              color: "#F97316",
              width: 36,
              height: 36,
              borderRadius: 2,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <span style={{ color: "rgba(254,243,199,0.4)", fontSize: 12, letterSpacing: "0.1em" }}>
            {msgIdx + 1} / {messages.length}
          </span>
          <button
            onClick={nextMsg}
            style={{
              background: "transparent",
              border: "1px solid rgba(249,115,22,0.4)",
              color: "#F97316",
              width: 36,
              height: 36,
              borderRadius: 2,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              padding: "14px 0",
              background: copied
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : "linear-gradient(135deg, #1a1208, #0d0a06)",
              border: "1px solid rgba(249,115,22,0.5)",
              color: copied ? "#fff" : "#FBBF24",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "0.15em",
              fontSize: 13,
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            {copied ? "✓ COPIED" : "COPY MESSAGE"}
          </button>
          <button
            onClick={handleCelebrate}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "linear-gradient(135deg, #F97316, #EA580C)",
              border: "none",
              color: "#fff",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "0.15em",
              fontSize: 13,
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            {celebrating ? "🔥🔥🔥" : "CELEBRATE"}
          </button>
        </div>

        {/* Watermark */}
        <div style={{ textAlign: "right", marginTop: 28 }}>
          <span style={{ color: "rgba(249,115,22,0.18)", fontSize: 9, letterSpacing: "0.12em", fontFamily: "sans-serif" }}>TD by GForUs</span>
        </div>

        {/* Bottom rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 36 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3))" }} />
          <span style={{ color: "rgba(249,115,22,0.5)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>For the ones who never quit</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(249,115,22,0.3), transparent)" }} />
        </div>
      </div>
    </div>
  );
}