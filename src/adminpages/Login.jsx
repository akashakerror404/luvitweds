import { useState, useEffect } from "react";

const particleCount = 18;

function GearIcon({ size = 24, className = "" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor" strokeWidth="1.5"
            />
            <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                stroke="currentColor" strokeWidth="1.5"
            />
        </svg>
    );
}



export default function AutomotiveLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => setMounted(true), 80);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => setLoading(false), 2200);
    };

    // Particle positions (fixed, decorative)
    const particles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: `${(i * 67 + 13) % 100}%`,
        top: `${(i * 43 + 7) % 100}%`,
        size: 2 + (i % 3),
        delay: `${(i * 0.3) % 3}s`,
        dur: `${3 + (i % 4)}s`,
    }));

    return (
        <div
            style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0A0C0F]"
        >
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Bebas+Neue&family=Barlow:wght@300;400;500&display=swap');

        .auto-input {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(232,197,71,0.18);
          color: #f0ece0;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          letter-spacing: 0.02em;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          outline: none;
          width: 100%;
          padding: 14px 16px;
          border-radius: 6px;
        }
        .auto-input::placeholder { color: rgba(240,236,224,0.28); }
        .auto-input:focus {
          border-color: #E8C547;
          background: rgba(232,197,71,0.07);
          box-shadow: 0 0 0 3px rgba(232,197,71,0.10);
        }
        .login-btn {
          background: linear-gradient(135deg, #E8C547 0%, #C9973A 100%);
          color: #0A0C0F;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.12em;
          font-size: 18px;
          border: none;
          border-radius: 6px;
          width: 100%;
          padding: 15px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(232,197,71,0.22);
        }
        .login-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(232,197,71,0.32); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #E8C547;
          opacity: 0;
          animation: floatParticle var(--dur) var(--delay) ease-in-out infinite;
        }
        @keyframes floatParticle {
          0%   { opacity: 0; transform: translateY(0) scale(0.7); }
          20%  { opacity: 0.18; }
          50%  { opacity: 0.28; transform: translateY(-28px) scale(1); }
          80%  { opacity: 0.14; }
          100% { opacity: 0; transform: translateY(-54px) scale(0.6); }
        }
        .card-appear {
          opacity: 0; transform: translateY(32px) scale(0.97);
          transition: opacity 0.65s cubic-bezier(.2,.8,.4,1), transform 0.65s cubic-bezier(.2,.8,.4,1);
        }
        .card-appear.show { opacity: 1; transform: translateY(0) scale(1); }

        .gear-spin { animation: spin 18s linear infinite; }
        .gear-spin-rev { animation: spin-rev 22s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        .divider-line {
          flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(232,197,71,0.25), transparent);
        }
        .shake { animation: shake 0.4s ease; }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(10,12,15,0.3);
          border-top-color: #0A0C0F;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
        .track-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(232,197,71,0.15) 30%, rgba(232,197,71,0.4) 50%, rgba(232,197,71,0.15) 70%, transparent 100%);
        }
      `}</style>

            {/* Grid background */}
            <div className="grid-bg absolute inset-0" />

            {/* Track lines (horizontal stripes) */}
            <div className="track-line" style={{ top: "22%" }} />
            <div className="track-line" style={{ top: "78%" }} />

            {/* Decorative gears */}
            <div className="absolute -left-10 -top-10 opacity-[0.06] gear-spin" style={{ color: "#E8C547" }}>
                <GearIcon size={200} />
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-[0.07] gear-spin-rev" style={{ color: "#E8C547" }}>
                <GearIcon size={160} />
            </div>
            <div className="absolute left-[12%] bottom-[18%] opacity-[0.04] gear-spin" style={{ color: "#E8C547" }}>
                <GearIcon size={80} />
            </div>

            {/* Floating particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        "--dur": p.dur,
                        "--delay": p.delay,
                    }}
                />
            ))}

            {/* Glow blobs */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />

            {/* Login Card */}
            <div className={`card-appear ${mounted ? "show" : ""} relative z-10 w-full max-w-[420px] mx-4`}>

                {/* Top accent bar */}
                <div className="h-[3px] rounded-t-lg" style={{ background: "linear-gradient(90deg, #C9973A, #E8C547, #C9973A)" }} />

                <div
                    className="rounded-b-lg p-10"
                    style={{
                        background: "linear-gradient(160deg, rgba(22,25,31,0.97) 0%, rgba(14,16,20,0.99) 100%)",
                        border: "1.5px solid rgba(232,197,71,0.14)",
                        borderTop: "none",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset",
                    }}
                >
                    {/* Logo area */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-3">
                            <img src="/logo.png" alt="AutoAdmin Logo" className="h-14 w-auto object-contain" />
                        </div>
                        <h1 className="text-white text-3xl tracking-[0.2em] uppercase"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.22em" }}>
                            AutoAdmin
                        </h1>
                        <div className="flex items-center gap-2 mt-1 w-full">
                            <div className="divider-line" />
                            <span className="text-[10px] tracking-[0.35em] uppercase"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "rgba(232,197,71,0.5)", whiteSpace: "nowrap" }}>
                                Fleet Management Portal
                            </span>
                            <div className="divider-line" />
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-xs tracking-[0.18em] uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "rgba(232,197,71,0.7)", fontSize: "10px" }}>
                                    Admin Email
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === "email" ? "#E8C547" : "rgba(240,236,224,0.25)", transition: "color .25s" }}>
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" />
                                            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" />
                                        </svg>
                                    </span>
                                    <input
                                        className="auto-input"
                                        type="email"
                                        placeholder="admin@autodrive.com"
                                        style={{ paddingLeft: "42px" }}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setFocused("email")}
                                        onBlur={() => setFocused(null)}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-2 text-xs tracking-[0.18em] uppercase"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "rgba(232,197,71,0.7)", fontSize: "10px" }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === "pass" ? "#E8C547" : "rgba(240,236,224,0.25)", transition: "color .25s" }}>
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" />
                                        </svg>
                                    </span>
                                    <input
                                        className="auto-input"
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••••"
                                        style={{ paddingLeft: "42px", paddingRight: "44px" }}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setFocused("pass")}
                                        onBlur={() => setFocused(null)}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
                                        style={{ color: "rgba(232,197,71,0.5)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                        tabIndex={-1}
                                    >
                                        {showPass ? (
                                            <svg width="17" height="17" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.7" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.7" /></svg>
                                        ) : (
                                            <svg width="17" height="17" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" className="hidden" id="remember" />
                                    <span className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: "rgba(232,197,71,0.3)", background: "rgba(232,197,71,0.06)" }}>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#E8C547" strokeWidth="1.6" /></svg>
                                    </span>
                                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "12px", color: "rgba(240,236,224,0.45)" }}>Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => console.log("Forgot password clicked")}
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "12px",
                                        color: "#E8C547",
                                        letterSpacing: "0.04em",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        opacity: 0.8
                                    }}
                                    className="hover:opacity-100 transition-opacity"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="shake text-center py-2 px-3 rounded text-xs tracking-wide"
                                    style={{ background: "rgba(220,60,60,0.12)", border: "1px solid rgba(220,60,60,0.25)", color: "#f87171", fontFamily: "'Barlow', sans-serif" }}>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button type="submit" className="login-btn mt-2" disabled={loading}>
                                {loading ? (
                                    <><span className="spinner" />Authenticating...</>
                                ) : (
                                    "Access Dashboard"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(232,197,71,0.09)" }}>
                        <p className="text-center" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "11px", color: "rgba(240,236,224,0.25)", letterSpacing: "0.04em" }}>
                            Restricted access — authorized personnel only
                        </p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <GearIcon size={10} className="opacity-30" style={{ color: "#E8C547" }} />
                            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", color: "rgba(232,197,71,0.3)", letterSpacing: "0.15em" }}>
                                AUTOADMIN v3.1
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
