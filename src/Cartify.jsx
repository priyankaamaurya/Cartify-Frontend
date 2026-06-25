// import { useState, useEffect, createContext, useContext, useCallback } from "react";

// // ─── CONFIG ────────────────────────────────────────────────────────────────
// const BASE_URL = import.meta.env.VITE_API_URL;

// // ─── AUTH CONTEXT ──────────────────────────────────────────────────────────
// const AuthContext = createContext(null);
// const useAuth = () => useContext(AuthContext);

// function AuthProvider({ children }) { 
//   const [token, setToken] = useState(() => localStorage.getItem("cartify_token"));
//   const [user, setUser] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("cartify_user")); } catch { return null; }
//   });

//   const login = (tok, userData) => {
//     localStorage.setItem("cartify_token", tok);
//     localStorage.setItem("cartify_user", JSON.stringify(userData));
//     setToken(tok);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("cartify_token");
//     localStorage.removeItem("cartify_user");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// } 

// // ─── API HELPER ────────────────────────────────────────────────────────────
// function useApi() {
//   const { token } = useAuth();

//   const request = useCallback(async (method, path, body) => {
//     const headers = { "Content-Type": "application/json" };
//     if (token) headers["Authorization"] = `Bearer ${token}`;
//     const res = await fetch(`${BASE_URL}${path}`, {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : undefined,
//     });
//     const text = await res.text();
//     let data;
//     try { data = JSON.parse(text); } catch { data = text; }
//     if (!res.ok) throw new Error(data?.message || data || `Error ${res.status}`);
//     return data;
//   }, [token]);

//   return {
//     get: (path) => request("GET", path),
//     post: (path, body) => request("POST", path, body),
//     put: (path, body) => request("PUT", path, body),
//     del: (path) => request("DELETE", path),
//   };
// }

// // ─── TOAST ─────────────────────────────────────────────────────────────────
// const ToastContext = createContext(null);
// const useToast = () => useContext(ToastContext);

// function ToastProvider({ children }) {
//   const [toasts, setToasts] = useState([]);

//   const addToast = (msg, type = "success") => {
//     const id = Date.now();
//     setToasts(t => [...t, { id, msg, type }]);
//     setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
//   };

//   return (
//     <ToastContext.Provider value={addToast}>
//       {children}
//       <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
//         {toasts.map(t => (
//           <div key={t.id} style={{
//             padding: "13px 22px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
//             fontSize: 14, color: "#fff", minWidth: 220, boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
//             background: t.type === "error" ? "#e55" : t.type === "info" ? "#4a90e2" : "#22a96e",
//             animation: "slideUp 0.3s ease",
//           }}>
//             {t.msg}
//           </div>
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// }

// // ─── ROUTER ────────────────────────────────────────────────────────────────
// const RouterContext = createContext(null);
// const useRouter = () => useContext(RouterContext);

// function Router({ children }) {
//   const [page, setPage] = useState("home");
//   const [params, setParams] = useState({});

//   const navigate = (p, prms = {}) => { setPage(p); setParams(prms); window.scrollTo(0,0); };

//   return (
//     <RouterContext.Provider value={{ page, params, navigate }}>
//       {children}
//     </RouterContext.Provider>
//   );
// }

// // ─── STYLES ────────────────────────────────────────────────────────────────
// const G = {
//   bg: "#0a0a0f",
//   surface: "#13131a",
//   surfaceAlt: "#1a1a24",
//   border: "#2a2a3a",
//   accent: "#ff6b35",
//   accentSoft: "rgba(255,107,53,0.12)",
//   accentGlow: "rgba(255,107,53,0.35)",
//   gold: "#f0c040",
//   text: "#f0eff5",
//   muted: "#8884a0",
//   success: "#22a96e",
//   danger: "#e55",
//   radius: 14,
//   radiusSm: 8,
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   body { background: ${G.bg}; color: ${G.text}; font-family: 'DM Sans', sans-serif; }
//   @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
//   @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
//   @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
//   input, textarea, select {
//     background: ${G.surfaceAlt}; border: 1.5px solid ${G.border};
//     color: ${G.text}; border-radius: ${G.radiusSm}px; padding: 11px 15px;
//     font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; width: 100%;
//     transition: border-color 0.2s;
//   }
//   input:focus, textarea:focus { border-color: ${G.accent}; }
//   label { display: block; font-size: 13px; color: ${G.muted}; margin-bottom: 5px; font-weight: 600; letter-spacing:.5px; }
//   ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${G.surface}; }
//   ::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 6px; 
//   }
//   .product-card {
//     transition: transform 0.15s ease, box-shadow 0.2s ease !important;
//   }
//   .product-card:hover {
//     transform: translateY(-4px) !important;
//     box-shadow: 0 0 20px ${G.accentGlow} !important;
//   }
//   // .product-card:active {
//   //   transform: scale(1.03) !important;
//   //   box-shadow: 0 0 28px ${G.accentGlow} !important;
//   // }
// `;

// // ─── COMPONENTS ────────────────────────────────────────────────────────────

// function Btn({ children, onClick, variant = "primary", size = "md", style: s = {}, disabled, type = "button" }) {
//   const base = {
//     border: "none", borderRadius: G.radiusSm, cursor: disabled ? "not-allowed" : "pointer",
//     fontFamily: "'DM Sans', sans-serif", fontWeight: 600, transition: "all 0.18s",
//     opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 7,
//   };
//   const sizes = { sm: { padding: "7px 14px", fontSize: 13 }, md: { padding: "11px 22px", fontSize: 15 }, lg: { padding: "14px 30px", fontSize: 16 } };
//   const variants = {
//     primary: { background: G.accent, color: "#fff", boxShadow: `0 0 0 0 ${G.accentGlow}` },
//     ghost: { background: "transparent", color: G.text, border: `1.5px solid ${G.border}` },
//     danger: { background: G.danger, color: "#fff" },
//     success: { background: G.success, color: "#fff" },
//   };
//   return (
//     <button type={type} onClick={onClick} disabled={disabled}
//       style={{ ...base, ...sizes[size], ...variants[variant], ...s }}
//       onMouseEnter={e => { 
//         if (!disabled) { 
//           e.currentTarget.style.filter = "brightness(1.15)"; 
//           e.currentTarget.style.boxShadow = `0 0 14px ${G.accentGlow}`;
//           e.currentTarget.style.transform = "translateY(-2px)";
//         }
//       }}
//       onMouseLeave={e => { 
//         e.currentTarget.style.filter = ""; 
//         e.currentTarget.style.boxShadow = "";
//         e.currentTarget.style.transform = "";
//       }}>
//       {children}
//     </button>
//   );
// }

// function Card({ children, style: s = {}, onClick }) {
//   return (
//     <div onClick={onClick} style={{
//       background: G.surface, border: `1.5px solid ${G.border}`, borderRadius: G.radius,
//       padding: 22, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
//       cursor: onClick ? "pointer" : "default", ...s
//     }}
//       onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent; e.currentTarget.style.boxShadow = `0 0 18px ${G.accentGlow}`; e.currentTarget.style.transform = "translateY(-4px)"; }}
//       onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}>
//       {children}
//     </div>
//   );
// }

// function Spinner() {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
//       <div style={{
//         width: 36, height: 36, border: `3px solid ${G.border}`, borderTopColor: G.accent,
//         borderRadius: "50%", animation: "spin 0.7s linear infinite"
//       }} />
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }

// function Badge({ children, color = G.accent }) {
//   return (
//     <span style={{
//       background: `${color}22`, color, border: `1px solid ${color}44`,
//       borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700,
//     }}>{children}</span>
//   );
// }

// // ─── NAVBAR ────────────────────────────────────────────────────────────────
// function Navbar({ cartCount }) {
//   const { navigate, page } = useRouter();
//   const { isLoggedIn, user, logout } = useAuth();

//   const links = [
//     { id: "home", label: "Home" },
//     { id: "products", label: "Products" },
//     ...(isLoggedIn ? [{ id: "cart", label: "Cart" }, { id: "orders", label: "Orders" }, { id: "profile", label: "Profile" }] : []),
//     ...(user?.role === "ADMIN" ? [{ id: "admin", label: "Admin" }] : []),
//   ];

//   return (
//     <nav style={{
//       position: "sticky", top: 0, zIndex: 100,
//       background: "rgba(10,10,15,0.88)", backdropFilter: "blur(18px)",
//       borderBottom: `1px solid ${G.border}`, padding: "0 32px",
//       display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
//     }}>
//       <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{ width: 32, height: 32, background: G.accent, borderRadius: 8, display: "grid", placeItems: "center", fontSize: 18 }}>🛒</div>
//         <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", color: G.text }}>
//           Cart<span style={{ color: G.accent }}>ify</span>
//         </span>
//       </div>

//       <div style={{ display: "flex", gap: 4 }}>
//         {links.map(l => (
//           <button key={l.id} onClick={() => navigate(l.id)} style={{
//             background: page === l.id ? G.accentSoft : "transparent",
//             color: page === l.id ? G.accent : G.muted,
//             border: "none", borderRadius: G.radiusSm, padding: "8px 16px",
//             fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
//             cursor: "pointer", transition: "all 0.18s", position: "relative",
//           }}>
//             {l.id === "cart" && cartCount > 0 && (
//               <span style={{
//                 position: "absolute", top: 2, right: 2, background: G.accent,
//                 color: "#fff", borderRadius: "50%", width: 17, height: 17,
//                 fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center",
//               }}>{cartCount}</span>
//             )}
//             {l.label}
//           </button>
//         ))}
//       </div>

//       <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//         {isLoggedIn ? (
//           <>
//             <span style={{ fontSize: 13, color: G.muted }}>Hi, <b style={{ color: G.text }}>{user?.username || user?.name}</b></span>
//             <Btn variant="ghost" size="sm" onClick={logout}>Logout</Btn>
//           </>
//         ) : (
//           <>
//             <Btn variant="ghost" size="sm" onClick={() => navigate("login")}>Login</Btn>
//             <Btn size="sm" onClick={() => navigate("register")}>Register</Btn>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// // ─── HOME PAGE ─────────────────────────────────────────────────────────────
// function HomePage() {
//   const { navigate } = useRouter();
//   const { isLoggedIn } = useAuth();

//   const features = [
//     { icon: "🔐", title: "JWT Security", desc: "Role-based access with encrypted sessions" },
//     { icon: "📦", title: "Product Catalog", desc: "Browse and manage thousands of products" },
//     { icon: "🛒", title: "Smart Cart", desc: "Auto price calculation and easy management" },
//     { icon: "📋", title: "Order Tracking", desc: "Place orders and track them in real-time" },
//   ];

//   return (
//     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
//       {/* Hero */}
//       <div style={{ textAlign: "center", marginBottom: 80, animation: "fadeIn 0.7s ease" }}>
//         <div style={{
//           display: "inline-block", background: G.accentSoft, border: `1px solid ${G.accent}44`,
//           borderRadius: 20, padding: "5px 18px", fontSize: 13, color: G.accent,
//           fontWeight: 700, marginBottom: 22, letterSpacing: 1,
//         }}>⚡ Full-Stack E-Commerce</div>

//         <h1 style={{
//           fontFamily: "'Syne', sans-serif", fontWeight: 800,
//           fontSize: "clamp(42px, 7vw, 80px)", lineHeight: 1.05,
//           letterSpacing: "-2px", marginBottom: 22,
//         }}>
//           Shop Smarter with<br />
//           <span style={{ color: G.accent, textShadow: `0 0 60px ${G.accentGlow}` }}>Cartify</span>
//         </h1>

//         <p style={{ color: G.muted, fontSize: 18, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
//           A secure, scalable e-commerce platform powered by Spring Boot & JWT authentication.
//         </p>

//         <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
//           <Btn size="lg" onClick={() => navigate("products")}>Browse Products →</Btn>
//           {!isLoggedIn && (
//             <Btn size="lg" variant="ghost" onClick={() => navigate("register")}>Create Account</Btn>
//           )}
//         </div>
//       </div>

//       {/* Features */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
//         {features.map((f, i) => (
//           <Card key={i} style={{ textAlign: "center", animation: `slideUp ${0.3 + i * 0.1}s ease both` }}>
//             <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
//             <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
//             <div style={{ color: G.muted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
//           </Card>
//         ))}
//       </div>

//       {/* Decorative divider */}
//       <div style={{
//         margin: "70px auto 0", height: 1, maxWidth: 400,
//         background: `linear-gradient(90deg, transparent, ${G.accent}, transparent)`
//       }} />
//     </div>
//   );
// }

// // ─── AUTH PAGES ────────────────────────────────────────────────────────────
// function AuthPage({ mode }) {
//   const { navigate } = useRouter();
//   const { login } = useAuth();
//   const toast = useToast();
//   const api = useApi();

// const [form, setForm] = useState({ username: "", email: "", password: "" });
// const [loading, setLoading] = useState(false);

//   const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

//   const submit = async () => {
//     setLoading(true);
//     try {
//       if (mode === "register") {
//         await api.post("/api/auth/register", { username: form.username, email: form.email, password: form.password });
//         toast("Registered successfully! Please login.", "success");
//         navigate("login");
//       } else {
//         const data = await api.post("/api/auth/login", { username: form.username, password: form.password });
//         // data may be { token, role, email } or { jwt, ... } – adapt as needed
//         const tok = data.token || data.jwt || data.accessToken || data;
//         login(tok, { username: form.username, email: form.email, role: data.role, name: form.username });
//         toast("Welcome back!", "success");
//         navigate("home");
//       }
//     } catch (err) {
//       toast(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: "85vh", display: "grid", placeItems: "center", padding: 24 }}>
//       <Card style={{ width: "100%", maxWidth: 420, animation: "slideUp 0.4s ease" }}>
//         <div style={{ textAlign: "center", marginBottom: 30 }}>
//           <div style={{ fontSize: 40, marginBottom: 10 }}>{mode === "login" ? "🔑" : "✨"}</div>
//           <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26 }}>
//             {mode === "login" ? "Welcome Back" : "Create Account"}
//           </h2>
//           <p style={{ color: G.muted, fontSize: 14, marginTop: 6 }}>
//             {mode === "login" ? "Sign in to your Cartify account" : "Join Cartify today"}
//           </p>
//         </div>

//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           {mode === "register" && (
//             <div><label>Username</label><input placeholder="johndoe" value={form.username} onChange={set("username")} /></div>
//           )}
//           {mode === "register" && (
//             <div><label>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} /></div>
//           )}
//           {mode === "login" && (
//             <div><label>Username</label><input placeholder="johndoe" value={form.username} onChange={set("username")} /></div>
//             )}          
//             <div><label>Password</label><input type="password" placeholder="••••••••" value={form.password} onChange={set("password")} /></div>

//           <Btn style={{ width: "100%", justifyContent: "center", marginTop: 6 }} disabled={loading} onClick={submit}>
//             {loading ? "Please wait…" : mode === "login" ? "Login" : "Register"}
//           </Btn>
//         </div>

//         <p style={{ textAlign: "center", marginTop: 22, color: G.muted, fontSize: 14 }}>
//           {mode === "login" ? "No account? " : "Already have one? "}
//           <span onClick={() => navigate(mode === "login" ? "register" : "login")}
//             style={{ color: G.accent, cursor: "pointer", fontWeight: 600 }}>
//             {mode === "login" ? "Register" : "Login"}
//           </span>
//         </p>
//       </Card>
//     </div>
//   );
// }

// // ─── PROFILE PAGE ─────────────────────────────────────────────────────────
// function ProfilePage() {
//   const { user } = useAuth();
//   const api = useApi();
//   const toast = useToast();
//   const [profile, setProfile] = useState(null);
//   const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.get("/api/users/profile");
//         setProfile(data);
//       } catch (err) { toast(err.message, "error"); }
//     })();
//   }, []);

//   const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

//   const changePassword = async () => {
//     if (form.newPassword !== form.confirmPassword) {
//       toast("New passwords don't match!", "error"); return;
//     }
//     if (form.newPassword.length < 6) {
//       toast("Password must be at least 6 characters!", "error"); return;
//     }
//     setLoading(true);
//     try {
//       await api.put("/api/users/change-password", {
//         currentPassword: form.currentPassword,
//         newPassword: form.newPassword,
//       });
//       toast("Password changed successfully! 🎉", "success");
//       setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) { toast(err.message, "error"); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
//       <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>👤 My Profile</h1>

//       {/* Profile Info */}
//       <Card style={{ marginBottom: 24 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
//           <div style={{
//             width: 70, height: 70, borderRadius: "50%", background: G.accent,
//             display: "grid", placeItems: "center", fontSize: 28, fontWeight: 800, color: "#fff",
//             fontFamily: "'Syne',sans-serif",
//           }}>
//             {(profile?.username || user?.username || "U")[0].toUpperCase()}
//           </div>
//           <div>
//             <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22 }}>
//               {profile?.username || user?.username}
//             </h2>
//             <Badge color={user?.role === "ADMIN" ? G.gold : G.success}>
//               {user?.role || "USER"}
//             </Badge>
//           </div>
//         </div>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//           <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
//             <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>USERNAME</div>
//             <div style={{ fontWeight: 600 }}>{profile?.username || user?.username || "—"}</div>
//           </div>
//           <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
//             <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>EMAIL</div>
//             <div style={{ fontWeight: 600 }}>{profile?.email || user?.email || "—"}</div>
//           </div>
//           <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
//             <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>ROLE</div>
//             <div style={{ fontWeight: 600 }}>{profile?.role || user?.role || "—"}</div>
//           </div>
//           <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
//             <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>MEMBER SINCE</div>
//             <div style={{ fontWeight: 600 }}>Cartify Member ✅</div>
//           </div>
//         </div>
//       </Card>

//       {/* Change Password */}
//       <Card>
//         <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🔒 Change Password</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           <div><label>Current Password</label>
//             <input type="password" placeholder="Enter current password" value={form.currentPassword} onChange={set("currentPassword")} />
//           </div>
//           <div><label>New Password</label>
//             <input type="password" placeholder="Enter new password" value={form.newPassword} onChange={set("newPassword")} />
//           </div>
//           <div><label>Confirm New Password</label>
//             <input type="password" placeholder="Confirm new password" value={form.confirmPassword} onChange={set("confirmPassword")} />
//           </div>
//           <Btn onClick={changePassword} disabled={loading} style={{ alignSelf: "flex-start" }}>
//             {loading ? "Updating…" : "Update Password 🔒"}
//           </Btn>
//         </div>
//       </Card>
//     </div>
//   );
// }

// // ─── PRODUCTS PAGE ─────────────────────────────────────────────────────────
// function ProductsPage() {
//   const api = useApi();
//   const toast = useToast();
//   const { isLoggedIn } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [addingId, setAddingId] = useState(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await api.get("/api/products");
//       setProducts(Array.isArray(data) ? data : data.content || []);
//     } catch (err) {
//       toast(err.message, "error");
//     } finally { setLoading(false); }
//   }, []);

//   useEffect(() => { load(); }, []);

//   const addToCart = async (productId) => {
//     if (!isLoggedIn) { toast("Login to add items to cart", "info"); return; }
//     setAddingId(productId);
//     try {
//       await api.post(`/api/cart/add?productId=${productId}&quantity=1`, null);
//       toast("Item added to cart!", "success");
//     } catch (err) { toast(err.message, "error"); }
//     finally { setAddingId(null); }
//   };

//   const filtered = products.filter(p =>
//     (p.name || p.productName || "").toLowerCase().includes(search.toLowerCase()) ||
//     (p.description || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 14 }}>
//         <div>
//           <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32 }}>Products</h1>
//           <p style={{ color: G.muted, fontSize: 14 }}>{filtered.length} items available</p>
//         </div>
//         <input placeholder="🔍 Search products…" value={search} onChange={e => setSearch(e.target.value)}
//           style={{ width: 240 }} />
//       </div>

//       {loading ? <Spinner /> : (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, alignItems: "stretch" }}>
//           {filtered.length === 0 && (
//             <p style={{ color: G.muted, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No products found.</p>
//           )}
//           {filtered.map((p, i) => (
//             <div
//               key={p.id || i}
//               className="product-card"
//               style={{ borderRadius: G.radius }}
//             >
//               <Card onClick={() => {}} style={{ 
//                 animation: `slideUp ${0.1 + i * 0.05}s ease both`, 
//                 display: "flex", 
//                 flexDirection: "column",
//                 height: "100%"
//               }}>
//                 {/* Image container - fixed height always */}
//                 <div style={{
//                   minHeight: 200, maxHeight: 220, background: G.surfaceAlt, 
//                   borderRadius: G.radiusSm, display: "flex", alignItems: "center",
//                   justifyContent: "center", fontSize: 52, marginBottom: 16, flexShrink: 0,
//                   padding: "8px",
//                 }}>
//                   {p.imageUrl
//                     ? <img src={p.imageUrl} style={{
//                         maxWidth: "100%",
//                         maxHeight: 200,
//                         objectFit: "contain",
//                         display: "block",
//                         borderRadius: G.radiusSm,
//                       }} alt="" />
//                     : "📦"
//                   }
//                 </div>

//                 {/* Name - fixed height */}
//                 <h3 style={{
//                   fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17,
//                   marginBottom: 6, height: 48, overflow: "hidden",
//                   display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
//                 }}>
//                   {p.name || p.productName || "Unnamed Product"}
//                 </h3>

//                 {/* Description - fixed height */}
//                 <p style={{
//                   color: G.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 14,
//                   height: 40, overflow: "hidden",
//                   display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
//                   flexGrow: 1  
//                 }}>
//                   {p.description || "No description."}
//                 </p>

//                 {/* Price + Button - always at bottom */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
//                   <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: G.accent }}>
//                     ₹{(p.price || 0).toLocaleString()}
//                   </span>
//                   <Btn size="sm" disabled={addingId === p.id} onClick={() => addToCart(p.id)}>
//                     {addingId === p.id ? "Adding…" : "Add to cart"}
//                   </Btn>
//                 </div>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── CART PAGE ─────────────────────────────────────────────────────────────
// function CartPage({ onCartChange }) {
//   const api = useApi();
//   const toast = useToast();
//   const { navigate } = useRouter();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await api.get("/api/cart");
//       const items = Array.isArray(data) ? data : data.cartItems || data.items || [];
//       setCart(items);
//       onCartChange && onCartChange(items.length);
//     } catch (err) { toast(err.message, "error"); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { load(); }, []);

//   const remove = async (id) => {
//     try {
//       await api.del(`/api/cart/${id}`);
//       toast("Removed from cart", "success");
//       load();
//     } catch (err) { toast(err.message, "error"); }
//   };

//   const updateQty = async (id, newQty) => {
//     if (newQty < 1) {
//       // If quantity goes to 0, remove the item
//       await remove(id);
//       return;
//     }
//     try {
//       await api.put(`/api/cart/update?itemId=${id}&quantity=${newQty}`);
//       load(); // reload cart
//     } catch (err) { toast(err.message, "error"); }
//   };

//   const placeOrder = async () => {
//     setPlacingOrder(true);
//     try {
//       const orderItems = cart.map(item => ({
//         productId: item.product?.id || item.productId || item.id,
//         quantity: item.quantity || 1
//       }));
//       await api.post("/api/orders/place", orderItems);
//       toast("Order placed successfully! 🎉", "success");
//       setCart([]);
//       onCartChange && onCartChange(0);
//       navigate("orders");
//     } catch (err) { toast(err.message, "error"); }
//     finally { setPlacingOrder(false); }
// };

//   const total = cart.reduce((s, item) => {
//     const price = item.price || item.product?.price || 0;
//     const qty = item.quantity || 1;
//     return s + price * qty;
//   }, 0);

//   return (
//     <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
//       <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>🛒 Your Cart</h1>

//       {loading ? <Spinner /> : cart.length === 0 ? (
//         <Card style={{ textAlign: "center", padding: 60 }}>
//           <div style={{ fontSize: 52, marginBottom: 16 }}>🛒</div>
//           <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 10 }}>Cart is empty</h3>
//           <p style={{ color: G.muted, marginBottom: 22 }}>Add some products to get started</p>
//           <Btn onClick={() => navigate("products")}>Browse Products</Btn>
//         </Card>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             {cart.map((item, i) => {
//               const name = item.productName || item.product?.name || item.name || "Product";
//               const price = item.price || item.product?.price || 0;
//               const qty = item.quantity || 1;
//               const id = item.id || item.cartItemId;
//               return (
//                 <Card key={id || i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
//                   <div style={{
//                     width: 70, height: 70, background: G.surfaceAlt, borderRadius: G.radiusSm,
//                     display: "grid", placeItems: "center", fontSize: 28, flexShrink: 0,
//                     overflow: "hidden",
//                     }}>
//                     {item.product?.imageUrl || item.imageUrl ? <img src={item.product?.imageUrl || item.imageUrl} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} alt="" /> : "📦" }
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
//                       <button onClick={() => updateQty(id, qty - 1)} style={{ 
//                         width: 26, height: 26, borderRadius: "50%", border: `1px solid ${G.border}`,
//                         background: G.surfaceAlt, color: G.text, cursor: "pointer", fontSize: 16,
//                         display: "grid", placeItems: "center"
//                       }}>−</button>
//                       <span style={{ color: G.text, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
//                       <button onClick={() => updateQty(id, qty + 1)} style={{
//                       width: 26, height: 26, borderRadius: "50%", border: `1px solid ${G.border}`,
//                       background: G.surfaceAlt, color: G.text, cursor: "pointer", fontSize: 16,
//                       display: "grid", placeItems: "center"
//                       }}>+</button>
//                   </div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: G.accent }}>
//                       ₹{(price * qty).toLocaleString()}
//                     </div>
//                     <Btn variant="danger" size="sm" style={{ marginTop: 6 }} onClick={() => remove(id)}>Remove</Btn>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>

//           <Card style={{ position: "sticky", top: 80 }}>
//             <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Order Summary</h3>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: G.muted, fontSize: 14 }}>
//               <span>Items ({cart.length})</span><span>₹{total.toLocaleString()}</span>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: G.muted, fontSize: 14 }}>
//               <span>Delivery</span><span style={{ color: G.success }}>Free</span>
//             </div>
//             <div style={{ height: 1, background: G.border, margin: "14px 0" }} />
//             <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 20 }}>
//               <span>Total</span><span style={{ color: G.accent }}>₹{total.toLocaleString()}</span>
//             </div>
//             <Btn style={{ width: "100%", justifyContent: "center" }} onClick={placeOrder} disabled={placingOrder}>
//               {placingOrder ? "Placing…" : "Place Order 🎉"}
//             </Btn>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── ORDERS PAGE ───────────────────────────────────────────────────────────
// function OrdersPage() {
//   const api = useApi();
//   const toast = useToast();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.get("/api/orders/my");
//         setOrders(Array.isArray(data) ? data : data.content || data.orders || []);
//       } catch (err) { toast(err.message, "error"); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const statusColor = (s = "") => {
//     const sl = s.toLowerCase();
//     if (sl.includes("deliver") || sl.includes("complet")) return G.success;
//     if (sl.includes("cancel")) return G.danger;
//     if (sl.includes("process")) return G.gold;
//     return G.accent;
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
//       <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>📋 My Orders</h1>

//       {loading ? <Spinner /> : orders.length === 0 ? (
//         <Card style={{ textAlign: "center", padding: 60 }}>
//           <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
//           <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 10 }}>No orders yet</h3>
//           <p style={{ color: G.muted }}>Place your first order from the cart</p>
//         </Card>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           {orders.map((order, i) => {
//             const items = order.items || order.orderItems || [];
//             const total = order.totalPrice || order.totalAmount || order.total || 0;  
//             const status = order.status || order.orderStatus || "Pending";
//             const date = order.createdAt || order.orderDate;
//             return (
//               <Card key={order.id || i} style={{ animation: `slideUp ${0.1 + i * 0.07}s ease both` }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                   <div>
//                     <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17 }}>
//                       Order #{order.id || i + 1}
//                     </div>
//                     {date && <div style={{ color: G.muted, fontSize: 13, marginTop: 3 }}>{new Date(date).toLocaleDateString()}</div>}
//                   </div>
//                   <Badge color={statusColor(status)}>{status}</Badge>
//                 </div>

//                 {items.length > 0 && (
//                   <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "10px 14px", marginBottom: 14 }}>
//                     {items.map((item, j) => (
//                       <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0", color: G.muted }}>
//                         <span>{item.productName || item.product?.name || "Item"} × {item.quantity || 1}</span>
//                         <span>₹{((item.price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
//                   <span style={{ color: G.muted, fontSize: 14 }}>Total:</span>
//                   <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: G.accent }}>
//                     ₹{Number(total).toLocaleString()}
//                   </span>
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── ADMIN PAGE ─────────────────────────────────────────────────────────────
// function AdminPage() {
//   const api = useApi();
//   const toast = useToast();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ name: "", description: "", price: "",  stock: "", imageUrl: "" });
//   const [editId, setEditId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await api.get("/api/products");
//       setProducts(Array.isArray(data) ? data : data.content || []);
//     } catch (err) { toast(err.message, "error"); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { load(); }, []);

//   const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

//   const save = async () => {
//     setSaving(true);
//     try {
//       const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
//       if (editId) {
//         await api.put(`/api/products/${editId}`, payload);
//         toast("Product updated!", "success");
//       } else {
//         await api.post("/api/products", payload);
//         toast("Product added!", "success");
//       }
//       setForm({ name: "", description: "", price: "", imageUrl: "" });
//       setEditId(null);
//       load();
//     } catch (err) { toast(err.message, "error"); }
//     finally { setSaving(false); }
//   };

//   const del = async (id) => {
//     if (!confirm("Delete this product?")) return;
//     try {
//       await api.del(`/api/products/${id}`);
//       toast("Product deleted", "success");
//       load();
//     } catch (err) { toast(err.message, "error"); }
//   };

//   const startEdit = (p) => {
//     setEditId(p.id);
//     setForm({ name: p.name || p.productName || "", description: p.description || "", price: String(p.price || ""), imageUrl: p.imageUrl || "" });
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
//       <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 8 }}>⚙️ Admin Panel</h1>
//       <p style={{ color: G.muted, marginBottom: 30 }}>Manage your product catalog</p>

//       {/* Form */}
//       <Card style={{ marginBottom: 32 }}>
//         <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>
//           {editId ? "✏️ Edit Product" : "➕ Add New Product"}
//         </h3>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//           <div><label>Product Name</label><input placeholder="e.g. Nike Air Max" value={form.name} onChange={set("name")} /></div>
//           <div><label>Price (₹)</label><input type="number" placeholder="e.g. 4999" value={form.price} onChange={set("price")} /></div>
//           <div><label>Stock Quantity</label><input type="number" placeholder="e.g. 50" value={form.stock} onChange={set("stock")} /></div>
//           <div style={{ gridColumn: "1/-1" }}><label>Description</label><input placeholder="Short product description" value={form.description} onChange={set("description")} /></div>
//           <div style={{ gridColumn: "1/-1" }}><label>Image URL (optional)</label><input placeholder="https://…" value={form.imageUrl} onChange={set("imageUrl")} /></div>
//         </div>
//         <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
//           <Btn onClick={save} disabled={saving}>{saving ? "Saving…" : editId ? "Update Product" : "Add Product"}</Btn>
//           {editId && <Btn variant="ghost" onClick={() => { setEditId(null); setForm({ name: "", description: "", price: "", imageUrl: "" }); }}>Cancel</Btn>}
//         </div>
//       </Card>

//       {/* Products Table */}
//       <Card style={{ padding: 0, overflow: "hidden" }}>
//         <div style={{ padding: "18px 22px", borderBottom: `1px solid ${G.border}` }}>
//           <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18 }}>All Products ({products.length})</h3>
//         </div>
//         {loading ? <Spinner /> : (
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ background: G.surfaceAlt }}>
//                   {["ID", "Name", "Description", "Price", "Actions"].map(h => (
//                     <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: G.muted, fontWeight: 700, letterSpacing: 0.5 }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((p, i) => (
//                   <tr key={p.id || i} style={{ borderTop: `1px solid ${G.border}` }}>
//                     <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13 }}>#{p.id}</td>
//                     <td style={{ padding: "14px 20px", fontWeight: 600 }}>{p.name || p.productName}</td>
//                     <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13, maxWidth: 200 }}>
//                       <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description || "—"}</span>
//                     </td>
//                     <td style={{ padding: "14px 20px", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: G.accent }}>₹{(p.price || 0).toLocaleString()}</td>
//                     <td style={{ padding: "14px 20px" }}>
//                       <div style={{ display: "flex", gap: 8 }}>
//                         <Btn size="sm" variant="ghost" onClick={() => startEdit(p)}>Edit</Btn>
//                         <Btn size="sm" variant="danger" onClick={() => del(p.id)}>Delete</Btn>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {products.length === 0 && (
//                   <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: G.muted }}>No products found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//       <AdminOrdersSection />
//     </div>
//   );
// }

// // ─── ORDER MANAGEMENT PAGE ─────────────────────────────────────────────────────────────

// function AdminOrdersSection() {
//   const api = useApi();
//   const toast = useToast();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await api.get("/api/orders/all");
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) { toast(err.message, "error"); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { load(); }, []);

//   const updateStatus = async (orderId, status) => {
//     try {
//       await api.put(`/api/orders/${orderId}/status`, { status });
//       toast(`Order #${orderId} updated to ${status}!`, "success");
//       load();
//     } catch (err) { toast(err.message, "error"); }
//   };

//   const statusColor = (s = "") => {
//     const sl = s.toLowerCase();
//     if (sl.includes("deliver")) return G.success;
//     if (sl.includes("cancel")) return G.danger;
//     if (sl.includes("ship")) return G.gold;
//     return G.accent;
//   };

//   return (
//     <Card style={{ padding: 0, overflow: "hidden", marginTop: 32 }}>
//       <div style={{ padding: "18px 22px", borderBottom: `1px solid ${G.border}` }}>
//         <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18 }}>
//           All Orders ({orders.length})
//         </h3>
//       </div>
//       {loading ? <Spinner /> : (
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ background: G.surfaceAlt }}>
//                 {["Order ID", "Username", "Total", "Date", "Status", "Update"].map(h => (
//                   <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: G.muted, fontWeight: 700 }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, i) => (
//                 <tr key={order.id || i} style={{ borderTop: `1px solid ${G.border}` }}>
//                   <td style={{ padding: "14px 20px", color: G.muted }}>#{order.id}</td>
//                   <td style={{ padding: "14px 20px", fontWeight: 600 }}>{order.username}</td>
//                   <td style={{ padding: "14px 20px", color: G.accent, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
//                     ₹{(order.totalPrice || 0).toLocaleString()}
//                   </td>
//                   <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13 }}>
//                     {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "—"}
//                   </td>
//                   <td style={{ padding: "14px 20px" }}>
//                     <Badge color={statusColor(order.status)}>{order.status}</Badge>
//                   </td>
//                   <td style={{ padding: "14px 20px" }}>
//                     <select
//                       value={order.status}
//                       onChange={e => updateStatus(order.id, e.target.value)}
//                       style={{ width: "auto", padding: "6px 10px", fontSize: 13 }}>
//                       <option value="PENDING">PENDING</option>
//                       <option value="SHIPPED">SHIPPED</option>
//                       <option value="DELIVERED">DELIVERED</option>
//                       <option value="CANCELLED">CANCELLED</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//               {orders.length === 0 && (
//                 <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: G.muted }}>No orders found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </Card>
//   );
// }

// // ─── PROTECTED WRAPPER ─────────────────────────────────────────────────────
// function Protected({ children }) {
//   const { isLoggedIn } = useAuth();
//   const { navigate } = useRouter();
//   const toast = useToast();

//   useEffect(() => {
//     if (!isLoggedIn) { toast("Please login to continue", "info"); navigate("login"); }
//   }, []);

//   if (!isLoggedIn) return null;
//   return children;
// }

// // ─── APP ROOT ──────────────────────────────────────────────────────────────
// export default function App() {
//   const [cartCount, setCartCount] = useState(0);

//   return (
//     <>
//       <style>{css}</style>
//       <AuthProvider>
//         <ToastProvider>
//           <Router>
//             <AppInner cartCount={cartCount} setCartCount={setCartCount} />
//           </Router>
//         </ToastProvider>
//       </AuthProvider>
//     </>
//   );
// }

// function AppInner({ cartCount, setCartCount }) {
//   const { page } = useRouter();
//   const { isLoggedIn, user } = useAuth();

//   const pages = {
//     home: <HomePage />,
//     products: <ProductsPage />,
//     login: <AuthPage mode="login" />,
//     register: <AuthPage mode="register" />,
//     profile: <Protected><ProfilePage /></Protected>,
//     cart: <Protected><CartPage onCartChange={setCartCount} /></Protected>,
//     orders: <Protected><OrdersPage /></Protected>,
//     admin: <Protected>{user?.role === "ADMIN" ? <AdminPage /> : <div style={{ padding: 40, textAlign: "center", color: G.danger }}>Access Denied</div>}</Protected>,
//   };

//   return (
//     <div>
//       <Navbar cartCount={cartCount} />
//       <main style={{ minHeight: "calc(100vh - 64px)" }}>
//         {pages[page] || <HomePage />}
//       </main>
//       <footer style={{ borderTop: `1px solid ${G.border}`, padding: "24px 32px", textAlign: "center", color: G.muted, fontSize: 13 }}>
//         <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: G.text }}>Cartify</span> — Built with ❤️ using Spring Boot + React
//       </footer>
//     </div>
//   );
// }








import { useState, useEffect, createContext, useContext, useCallback } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL;

// ─── AUTH CONTEXT ──────────────────────────────────────────────────────────
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) { 
  const [token, setToken] = useState(() => localStorage.getItem("cartify_token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cartify_user")); } catch { return null; }
  });

  const login = (tok, userData) => {
    localStorage.setItem("cartify_token", tok);
    localStorage.setItem("cartify_user", JSON.stringify(userData));
    setToken(tok);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("cartify_token");
    localStorage.removeItem("cartify_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
} 

// ─── API HELPER ────────────────────────────────────────────────────────────
function useApi() {
  const { token } = useAuth();

  const request = useCallback(async (method, path, body) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    if (!res.ok) throw new Error(data?.message || data || `Error ${res.status}`);
    return data;
  }, [token]);

  return {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    put: (path, body) => request("PUT", path, body),
    del: (path) => request("DELETE", path),
  };
}

// ─── TOAST ─────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);
const useToast = () => useContext(ToastContext);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: "13px 22px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: 14, color: "#fff", minWidth: 220, boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            background: t.type === "error" ? "#e55" : t.type === "info" ? "#4a90e2" : "#22a96e",
            animation: "slideUp 0.3s ease",
          }}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── ROUTER ────────────────────────────────────────────────────────────────
const RouterContext = createContext(null);
const useRouter = () => useContext(RouterContext);

function Router({ children }) {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState({});

  const navigate = (p, prms = {}) => { setPage(p); setParams(prms); window.scrollTo(0,0); };

  return (
    <RouterContext.Provider value={{ page, params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────────────
const G = {
  bg: "#0a0a0f",
  surface: "#13131a",
  surfaceAlt: "#1a1a24",
  border: "#2a2a3a",
  accent: "#ff6b35",
  accentSoft: "rgba(255,107,53,0.12)",
  accentGlow: "rgba(255,107,53,0.35)",
  gold: "#f0c040",
  text: "#f0eff5",
  muted: "#8884a0",
  success: "#22a96e",
  danger: "#e55",
  radius: 14,
  radiusSm: 8,
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${G.bg}; color: ${G.text}; font-family: 'DM Sans', sans-serif; }
  @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
  input, textarea, select {
    background: ${G.surfaceAlt}; border: 1.5px solid ${G.border};
    color: ${G.text}; border-radius: ${G.radiusSm}px; padding: 11px 15px;
    font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; width: 100%;
    transition: border-color 0.2s;
  }
  input:focus, textarea:focus { border-color: ${G.accent}; }
  label { display: block; font-size: 13px; color: ${G.muted}; margin-bottom: 5px; font-weight: 600; letter-spacing:.5px; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${G.surface}; }
  ::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 6px; }
  .product-card {
    transition: transform 0.15s ease, box-shadow 0.2s ease !important;
  }
  .product-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 0 20px ${G.accentGlow} !important;
  }

  /* ─── RESPONSIVE ─── */

  /* Hamburger hidden on desktop */
  .hamburger-btn { display: none; }
  /* Mobile menu hidden by default */
  .mobile-menu { display: none; }

  @media (max-width: 768px) {
    /* Hide desktop nav links and right section */
    .desktop-nav-links { display: none !important; }
    .desktop-nav-right { display: none !important; }

    /* Show hamburger */
    .hamburger-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1.5px solid ${G.border};
      color: ${G.text};
      border-radius: ${G.radiusSm}px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 20px;
      flex-shrink: 0;
    }

    /* Show mobile menu when open */
    .mobile-menu {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: rgba(10,10,15,0.98);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid ${G.border};
      padding: 10px 16px 18px;
      gap: 2px;
      z-index: 99;
      animation: slideUp 0.2s ease;
    }
    .mobile-menu.closed { display: none; }

    .mobile-menu-btn {
      background: transparent;
      color: ${G.muted};
      border: none;
      padding: 12px 14px;
      border-radius: ${G.radiusSm}px;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 15px;
      text-align: left;
      transition: all 0.15s;
    }
    .mobile-menu-btn:hover { background: ${G.accentSoft}; color: ${G.accent}; }
    .mobile-menu-btn.active { background: ${G.accentSoft}; color: ${G.accent}; }
    .mobile-menu-divider { height: 1px; background: ${G.border}; margin: 6px 0; }
    .mobile-menu-user { padding: 6px 14px; font-size: 13px; color: ${G.muted}; }

    /* Cart page: stack items + summary vertically */
    .cart-layout { grid-template-columns: 1fr !important; }
    .cart-summary { position: static !important; }

    /* Admin form: single column */
    .admin-form-grid { grid-template-columns: 1fr !important; }
    .admin-form-grid .span-2 { grid-column: 1 !important; }

    /* Profile grid: single column */
    .profile-info-grid { grid-template-columns: 1fr !important; }

    /* Products header: stack */
    .products-header { flex-direction: column !important; align-items: flex-start !important; }
    .products-header input { width: 100% !important; }

    /* Page padding */
    .page-wrap { padding-left: 16px !important; padding-right: 16px !important; }
  }

  @media (max-width: 480px) {
    /* Even smaller screens: 2-col product grid */
    .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function Btn({ children, onClick, variant = "primary", size = "md", style: s = {}, disabled, type = "button" }) {
  const base = {
    border: "none", borderRadius: G.radiusSm, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, transition: "all 0.18s",
    opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 7,
  };
  const sizes = { sm: { padding: "7px 14px", fontSize: 13 }, md: { padding: "11px 22px", fontSize: 15 }, lg: { padding: "14px 30px", fontSize: 16 } };
  const variants = {
    primary: { background: G.accent, color: "#fff", boxShadow: `0 0 0 0 ${G.accentGlow}` },
    ghost: { background: "transparent", color: G.text, border: `1.5px solid ${G.border}` },
    danger: { background: G.danger, color: "#fff" },
    success: { background: G.success, color: "#fff" },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...s }}
      onMouseEnter={e => { 
        if (!disabled) { 
          e.currentTarget.style.filter = "brightness(1.15)"; 
          e.currentTarget.style.boxShadow = `0 0 14px ${G.accentGlow}`;
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.filter = ""; 
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.transform = "";
      }}>
      {children}
    </button>
  );
}

function Card({ children, style: s = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: G.surface, border: `1.5px solid ${G.border}`, borderRadius: G.radius,
      padding: 22, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      cursor: onClick ? "pointer" : "default", ...s
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent; e.currentTarget.style.boxShadow = `0 0 18px ${G.accentGlow}`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <div style={{
        width: 36, height: 36, border: `3px solid ${G.border}`, borderTopColor: G.accent,
        borderRadius: "50%", animation: "spin 0.7s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Badge({ children, color = G.accent }) {
  return (
    <span style={{
      background: `${color}22`, color, border: `1px solid ${color}44`,
      borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700,
    }}>{children}</span>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────
function Navbar({ cartCount }) {
  const { navigate, page } = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    ...(isLoggedIn ? [{ id: "cart", label: "Cart" }, { id: "orders", label: "Orders" }, { id: "profile", label: "Profile" }] : []),
    ...(user?.role === "ADMIN" ? [{ id: "admin", label: "Admin" }] : []),
  ];

  const go = (id) => { navigate(id); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,15,0.88)", backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${G.border}`, padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        {/* Logo */}
        <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: G.accent, borderRadius: 8, display: "grid", placeItems: "center", fontSize: 18 }}>🛒</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", color: G.text }}>
            Cart<span style={{ color: G.accent }}>ify</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="desktop-nav-links" style={{ display: "flex", gap: 4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: page === l.id ? G.accentSoft : "transparent",
              color: page === l.id ? G.accent : G.muted,
              border: "none", borderRadius: G.radiusSm, padding: "8px 16px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "all 0.18s", position: "relative",
            }}>
              {l.id === "cart" && cartCount > 0 && (
                <span style={{
                  position: "absolute", top: 2, right: 2, background: G.accent,
                  color: "#fff", borderRadius: "50%", width: 17, height: 17,
                  fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center",
                }}>{cartCount}</span>
              )}
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="desktop-nav-right" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <span style={{ fontSize: 13, color: G.muted }}>Hi, <b style={{ color: G.text }}>{user?.username || user?.name}</b></span>
              <Btn variant="ghost" size="sm" onClick={logout}>Logout</Btn>
            </>
          ) : (
            <>
              <Btn variant="ghost" size="sm" onClick={() => go("login")}>Login</Btn>
              <Btn size="sm" onClick={() => go("register")}>Register</Btn>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? "" : " closed"}`}>
        {links.map(l => (
          <button key={l.id} className={`mobile-menu-btn${page === l.id ? " active" : ""}`} onClick={() => go(l.id)}>
            {l.id === "home" && "🏠 "}
            {l.id === "products" && "📦 "}
            {l.id === "cart" && `🛒 `}
            {l.id === "orders" && "📋 "}
            {l.id === "profile" && "👤 "}
            {l.id === "admin" && "⚙️ "}
            {l.label}{l.id === "cart" && cartCount > 0 ? ` (${cartCount})` : ""}
          </button>
        ))}
        <div className="mobile-menu-divider" />
        {isLoggedIn ? (
          <>
            <div className="mobile-menu-user">Signed in as <b style={{ color: G.text }}>{user?.username}</b></div>
            <button className="mobile-menu-btn" style={{ color: G.danger }} onClick={() => { logout(); setMenuOpen(false); }}>🚪 Logout</button>
          </>
        ) : (
          <>
            <button className="mobile-menu-btn" onClick={() => go("login")}>🔑 Login</button>
            <button className="mobile-menu-btn" style={{ color: G.accent }} onClick={() => go("register")}>✨ Register</button>
          </>
        )}
      </div>
    </>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────
function HomePage() {
  const { navigate } = useRouter();
  const { isLoggedIn } = useAuth();

  const features = [
    { icon: "🔐", title: "JWT Security", desc: "Role-based access with encrypted sessions" },
    { icon: "📦", title: "Product Catalog", desc: "Browse and manage thousands of products" },
    { icon: "🛒", title: "Smart Cart", desc: "Auto price calculation and easy management" },
    { icon: "📋", title: "Order Tracking", desc: "Place orders and track them in real-time" },
  ];

  return (
    <div className="page-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 80, animation: "fadeIn 0.7s ease" }}>
        <div style={{
          display: "inline-block", background: G.accentSoft, border: `1px solid ${G.accent}44`,
          borderRadius: 20, padding: "5px 18px", fontSize: 13, color: G.accent,
          fontWeight: 700, marginBottom: 22, letterSpacing: 1,
        }}>⚡ Full-Stack E-Commerce</div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(42px, 7vw, 80px)", lineHeight: 1.05,
          letterSpacing: "-2px", marginBottom: 22,
        }}>
          Shop Smarter with<br />
          <span style={{ color: G.accent, textShadow: `0 0 60px ${G.accentGlow}` }}>Cartify</span>
        </h1>

        <p style={{ color: G.muted, fontSize: 18, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
          A secure, scalable e-commerce platform powered by Spring Boot & JWT authentication.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn size="lg" onClick={() => navigate("products")}>Browse Products →</Btn>
          {!isLoggedIn && (
            <Btn size="lg" variant="ghost" onClick={() => navigate("register")}>Create Account</Btn>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
        {features.map((f, i) => (
          <Card key={i} style={{ textAlign: "center", animation: `slideUp ${0.3 + i * 0.1}s ease both` }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
            <div style={{ color: G.muted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
          </Card>
        ))}
      </div>

      {/* Decorative divider */}
      <div style={{
        margin: "70px auto 0", height: 1, maxWidth: 400,
        background: `linear-gradient(90deg, transparent, ${G.accent}, transparent)`
      }} />
    </div>
  );
}

// ─── AUTH PAGES ────────────────────────────────────────────────────────────
function AuthPage({ mode }) {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const toast = useToast();
  const api = useApi();

const [form, setForm] = useState({ username: "", email: "", password: "" });
const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "register") {
        await api.post("/api/auth/register", { username: form.username, email: form.email, password: form.password });
        toast("Registered successfully! Please login.", "success");
        navigate("login");
      } else {
        const data = await api.post("/api/auth/login", { username: form.username, password: form.password });
        // data may be { token, role, email } or { jwt, ... } – adapt as needed
        const tok = data.token || data.jwt || data.accessToken || data;
        login(tok, { username: form.username, email: form.email, role: data.role, name: form.username });
        toast("Welcome back!", "success");
        navigate("home");
      }
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "85vh", display: "grid", placeItems: "center", padding: 24 }}>
      <Card style={{ width: "100%", maxWidth: 420, animation: "slideUp 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>{mode === "login" ? "🔑" : "✨"}</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26 }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: G.muted, fontSize: 14, marginTop: 6 }}>
            {mode === "login" ? "Sign in to your Cartify account" : "Join Cartify today"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mode === "register" && (
            <div><label>Username</label><input placeholder="johndoe" value={form.username} onChange={set("username")} /></div>
          )}
          {mode === "register" && (
            <div><label>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} /></div>
          )}
          {mode === "login" && (
            <div><label>Username</label><input placeholder="johndoe" value={form.username} onChange={set("username")} /></div>
            )}          
            <div><label>Password</label><input type="password" placeholder="••••••••" value={form.password} onChange={set("password")} /></div>

          <Btn style={{ width: "100%", justifyContent: "center", marginTop: 6 }} disabled={loading} onClick={submit}>
            {loading ? "Please wait…" : mode === "login" ? "Login" : "Register"}
          </Btn>
        </div>

        <p style={{ textAlign: "center", marginTop: 22, color: G.muted, fontSize: 14 }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <span onClick={() => navigate(mode === "login" ? "register" : "login")}
            style={{ color: G.accent, cursor: "pointer", fontWeight: 600 }}>
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </Card>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────
function ProfilePage() {
  const { user } = useAuth();
  const api = useApi();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/users/profile");
        setProfile(data);
      } catch (err) { toast(err.message, "error"); }
    })();
  }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const changePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast("New passwords don't match!", "error"); return;
    }
    if (form.newPassword.length < 6) {
      toast("Password must be at least 6 characters!", "error"); return;
    }
    setLoading(true);
    try {
      await api.put("/api/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast("Password changed successfully! 🎉", "success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) { toast(err.message, "error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-wrap" style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>👤 My Profile</h1>

      {/* Profile Info */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%", background: G.accent,
            display: "grid", placeItems: "center", fontSize: 28, fontWeight: 800, color: "#fff",
            fontFamily: "'Syne',sans-serif",
          }}>
            {(profile?.username || user?.username || "U")[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22 }}>
              {profile?.username || user?.username}
            </h2>
            <Badge color={user?.role === "ADMIN" ? G.gold : G.success}>
              {user?.role || "USER"}
            </Badge>
          </div>
        </div>

        <div className="profile-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
            <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>USERNAME</div>
            <div style={{ fontWeight: 600 }}>{profile?.username || user?.username || "—"}</div>
          </div>
          <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
            <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>EMAIL</div>
            <div style={{ fontWeight: 600 }}>{profile?.email || user?.email || "—"}</div>
          </div>
          <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
            <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>ROLE</div>
            <div style={{ fontWeight: 600 }}>{profile?.role || user?.role || "—"}</div>
          </div>
          <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "14px 18px" }}>
            <div style={{ color: G.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>MEMBER SINCE</div>
            <div style={{ fontWeight: 600 }}>Cartify Member ✅</div>
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🔒 Change Password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label>Current Password</label>
            <input type="password" placeholder="Enter current password" value={form.currentPassword} onChange={set("currentPassword")} />
          </div>
          <div><label>New Password</label>
            <input type="password" placeholder="Enter new password" value={form.newPassword} onChange={set("newPassword")} />
          </div>
          <div><label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" value={form.confirmPassword} onChange={set("confirmPassword")} />
          </div>
          <Btn onClick={changePassword} disabled={loading} style={{ alignSelf: "flex-start" }}>
            {loading ? "Updating…" : "Update Password 🔒"}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── PRODUCTS PAGE ─────────────────────────────────────────────────────────
function ProductsPage() {
  const api = useApi();
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addingId, setAddingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/products");
      setProducts(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      toast(err.message, "error");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, []);

  const addToCart = async (productId) => {
    if (!isLoggedIn) { toast("Login to add items to cart", "info"); return; }
    setAddingId(productId);
    try {
      await api.post(`/api/cart/add?productId=${productId}&quantity=1`, null);
      toast("Item added to cart!", "success");
    } catch (err) { toast(err.message, "error"); }
    finally { setAddingId(null); }
  };

  const filtered = products.filter(p =>
    (p.name || p.productName || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div className="products-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32 }}>Products</h1>
          <p style={{ color: G.muted, fontSize: 14 }}>{filtered.length} items available</p>
        </div>
        <input placeholder="🔍 Search products…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: 240 }} />
      </div>

      {loading ? <Spinner /> : (
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, alignItems: "stretch" }}>
          {filtered.length === 0 && (
            <p style={{ color: G.muted, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No products found.</p>
          )}
          {filtered.map((p, i) => (
            <div
              key={p.id || i}
              className="product-card"
              style={{ borderRadius: G.radius }}
            >
              <Card onClick={() => {}} style={{ 
                animation: `slideUp ${0.1 + i * 0.05}s ease both`, 
                display: "flex", 
                flexDirection: "column",
                height: "100%"
              }}>
                {/* Image container - fixed height always */}
                <div style={{
                  minHeight: 200, maxHeight: 220, background: G.surfaceAlt, 
                  borderRadius: G.radiusSm, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 52, marginBottom: 16, flexShrink: 0,
                  padding: "8px",
                }}>
                  {p.imageUrl
                    ? <img src={p.imageUrl} style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        objectFit: "contain",
                        display: "block",
                        borderRadius: G.radiusSm,
                      }} alt="" />
                    : "📦"
                  }
                </div>

                {/* Name - fixed height */}
                <h3 style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17,
                  marginBottom: 6, height: 48, overflow: "hidden",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                }}>
                  {p.name || p.productName || "Unnamed Product"}
                </h3>

                {/* Description - fixed height */}
                <p style={{
                  color: G.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 14,
                  height: 40, overflow: "hidden",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  flexGrow: 1  
                }}>
                  {p.description || "No description."}
                </p>

                {/* Price + Button - always at bottom */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: G.accent }}>
                    ₹{(p.price || 0).toLocaleString()}
                  </span>
                  <Btn size="sm" disabled={addingId === p.id} onClick={() => addToCart(p.id)}>
                    {addingId === p.id ? "Adding…" : "Add to cart"}
                  </Btn>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ─────────────────────────────────────────────────────────────
function CartPage({ onCartChange }) {
  const api = useApi();
  const toast = useToast();
  const { navigate } = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/cart");
      const items = Array.isArray(data) ? data : data.cartItems || data.items || [];
      setCart(items);
      onCartChange && onCartChange(items.length);
    } catch (err) { toast(err.message, "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    try {
      await api.del(`/api/cart/${id}`);
      toast("Removed from cart", "success");
      load();
    } catch (err) { toast(err.message, "error"); }
  };

  const updateQty = async (id, newQty) => {
    if (newQty < 1) {
      // If quantity goes to 0, remove the item
      await remove(id);
      return;
    }
    try {
      await api.put(`/api/cart/update?itemId=${id}&quantity=${newQty}`);
      load(); // reload cart
    } catch (err) { toast(err.message, "error"); }
  };

  const placeOrder = async () => {
    setPlacingOrder(true);
    try {
      const orderItems = cart.map(item => ({
        productId: item.product?.id || item.productId || item.id,
        quantity: item.quantity || 1
      }));
      await api.post("/api/orders/place", orderItems);
      toast("Order placed successfully! 🎉", "success");
      setCart([]);
      onCartChange && onCartChange(0);
      navigate("orders");
    } catch (err) { toast(err.message, "error"); }
    finally { setPlacingOrder(false); }
};

  const total = cart.reduce((s, item) => {
    const price = item.price || item.product?.price || 0;
    const qty = item.quantity || 1;
    return s + price * qty;
  }, 0);

  return (
    <div className="page-wrap" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>🛒 Your Cart</h1>

      {loading ? <Spinner /> : cart.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🛒</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 10 }}>Cart is empty</h3>
          <p style={{ color: G.muted, marginBottom: 22 }}>Add some products to get started</p>
          <Btn onClick={() => navigate("products")}>Browse Products</Btn>
        </Card>
      ) : (
        <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {cart.map((item, i) => {
              const name = item.productName || item.product?.name || item.name || "Product";
              const price = item.price || item.product?.price || 0;
              const qty = item.quantity || 1;
              const id = item.id || item.cartItemId;
              return (
                <Card key={id || i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{
                    width: 70, height: 70, background: G.surfaceAlt, borderRadius: G.radiusSm,
                    display: "grid", placeItems: "center", fontSize: 28, flexShrink: 0,
                    overflow: "hidden",
                    }}>
                    {item.product?.imageUrl || item.imageUrl ? <img src={item.product?.imageUrl || item.imageUrl} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} alt="" /> : "📦" }
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <button onClick={() => updateQty(id, qty - 1)} style={{ 
                        width: 26, height: 26, borderRadius: "50%", border: `1px solid ${G.border}`,
                        background: G.surfaceAlt, color: G.text, cursor: "pointer", fontSize: 16,
                        display: "grid", placeItems: "center"
                      }}>−</button>
                      <span style={{ color: G.text, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
                      <button onClick={() => updateQty(id, qty + 1)} style={{
                      width: 26, height: 26, borderRadius: "50%", border: `1px solid ${G.border}`,
                      background: G.surfaceAlt, color: G.text, cursor: "pointer", fontSize: 16,
                      display: "grid", placeItems: "center"
                      }}>+</button>
                  </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: G.accent }}>
                      ₹{(price * qty).toLocaleString()}
                    </div>
                    <Btn variant="danger" size="sm" style={{ marginTop: 6 }} onClick={() => remove(id)}>Remove</Btn>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="cart-summary" style={{ position: "sticky", top: 80 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Order Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: G.muted, fontSize: 14 }}>
              <span>Items ({cart.length})</span><span>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: G.muted, fontSize: 14 }}>
              <span>Delivery</span><span style={{ color: G.success }}>Free</span>
            </div>
            <div style={{ height: 1, background: G.border, margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 20 }}>
              <span>Total</span><span style={{ color: G.accent }}>₹{total.toLocaleString()}</span>
            </div>
            <Btn style={{ width: "100%", justifyContent: "center" }} onClick={placeOrder} disabled={placingOrder}>
              {placingOrder ? "Placing…" : "Place Order 🎉"}
            </Btn>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── ORDERS PAGE ───────────────────────────────────────────────────────────
function OrdersPage() {
  const api = useApi();
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/orders/my");
        setOrders(Array.isArray(data) ? data : data.content || data.orders || []);
      } catch (err) { toast(err.message, "error"); }
      finally { setLoading(false); }
    })();
  }, []);

  const statusColor = (s = "") => {
    const sl = s.toLowerCase();
    if (sl.includes("deliver") || sl.includes("complet")) return G.success;
    if (sl.includes("cancel")) return G.danger;
    if (sl.includes("process")) return G.gold;
    return G.accent;
  };

  return (
    <div className="page-wrap" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>📋 My Orders</h1>

      {loading ? <Spinner /> : orders.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 10 }}>No orders yet</h3>
          <p style={{ color: G.muted }}>Place your first order from the cart</p>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map((order, i) => {
            const items = order.items || order.orderItems || [];
            const total = order.totalPrice || order.totalAmount || order.total || 0;  
            const status = order.status || order.orderStatus || "Pending";
            const date = order.createdAt || order.orderDate;
            return (
              <Card key={order.id || i} style={{ animation: `slideUp ${0.1 + i * 0.07}s ease both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17 }}>
                      Order #{order.id || i + 1}
                    </div>
                    {date && <div style={{ color: G.muted, fontSize: 13, marginTop: 3 }}>{new Date(date).toLocaleDateString()}</div>}
                  </div>
                  <Badge color={statusColor(status)}>{status}</Badge>
                </div>

                {items.length > 0 && (
                  <div style={{ background: G.surfaceAlt, borderRadius: G.radiusSm, padding: "10px 14px", marginBottom: 14 }}>
                    {items.map((item, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0", color: G.muted }}>
                        <span>{item.productName || item.product?.name || "Item"} × {item.quantity || 1}</span>
                        <span>₹{((item.price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
                  <span style={{ color: G.muted, fontSize: 14 }}>Total:</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: G.accent }}>
                    ₹{Number(total).toLocaleString()}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PAGE ─────────────────────────────────────────────────────────────
function AdminPage() {
  const api = useApi();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", price: "",  stock: "", imageUrl: "" });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/products");
      setProducts(Array.isArray(data) ? data : data.content || []);
    } catch (err) { toast(err.message, "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
      if (editId) {
        await api.put(`/api/products/${editId}`, payload);
        toast("Product updated!", "success");
      } else {
        await api.post("/api/products", payload);
        toast("Product added!", "success");
      }
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      setEditId(null);
      load();
    } catch (err) { toast(err.message, "error"); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.del(`/api/products/${id}`);
      toast("Product deleted", "success");
      load();
    } catch (err) { toast(err.message, "error"); }
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name || p.productName || "", description: p.description || "", price: String(p.price || ""), imageUrl: p.imageUrl || "" });
    window.scrollTo(0, 0);
  };

  return (
    <div className="page-wrap" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 8 }}>⚙️ Admin Panel</h1>
      <p style={{ color: G.muted, marginBottom: 30 }}>Manage your product catalog</p>

      {/* Form */}
      <Card style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>
          {editId ? "✏️ Edit Product" : "➕ Add New Product"}
        </h3>
        <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div><label>Product Name</label><input placeholder="e.g. Nike Air Max" value={form.name} onChange={set("name")} /></div>
          <div><label>Price (₹)</label><input type="number" placeholder="e.g. 4999" value={form.price} onChange={set("price")} /></div>
          <div><label>Stock Quantity</label><input type="number" placeholder="e.g. 50" value={form.stock} onChange={set("stock")} /></div>
          <div className="span-2" style={{ gridColumn: "1/-1" }}><label>Description</label><input placeholder="Short product description" value={form.description} onChange={set("description")} /></div>
          <div className="span-2" style={{ gridColumn: "1/-1" }}><label>Image URL (optional)</label><input placeholder="https://…" value={form.imageUrl} onChange={set("imageUrl")} /></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <Btn onClick={save} disabled={saving}>{saving ? "Saving…" : editId ? "Update Product" : "Add Product"}</Btn>
          {editId && <Btn variant="ghost" onClick={() => { setEditId(null); setForm({ name: "", description: "", price: "", imageUrl: "" }); }}>Cancel</Btn>}
        </div>
      </Card>

      {/* Products Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${G.border}` }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18 }}>All Products ({products.length})</h3>
        </div>
        {loading ? <Spinner /> : (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr style={{ background: G.surfaceAlt }}>
                  {["ID", "Name", "Description", "Price", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: G.muted, fontWeight: 700, letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id || i} style={{ borderTop: `1px solid ${G.border}` }}>
                    <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13 }}>#{p.id}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 600 }}>{p.name || p.productName}</td>
                    <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13, maxWidth: 200 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description || "—"}</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: G.accent }}>₹{(p.price || 0).toLocaleString()}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Btn size="sm" variant="ghost" onClick={() => startEdit(p)}>Edit</Btn>
                        <Btn size="sm" variant="danger" onClick={() => del(p.id)}>Delete</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: G.muted }}>No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <AdminOrdersSection />
    </div>
  );
}

// ─── ORDER MANAGEMENT PAGE ─────────────────────────────────────────────────────────────

function AdminOrdersSection() {
  const api = useApi();
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/orders/all");
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) { toast(err.message, "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/api/orders/${orderId}/status`, { status });
      toast(`Order #${orderId} updated to ${status}!`, "success");
      load();
    } catch (err) { toast(err.message, "error"); }
  };

  const statusColor = (s = "") => {
    const sl = s.toLowerCase();
    if (sl.includes("deliver")) return G.success;
    if (sl.includes("cancel")) return G.danger;
    if (sl.includes("ship")) return G.gold;
    return G.accent;
  };

  return (
    <Card style={{ padding: 0, overflow: "hidden", marginTop: 32 }}>
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${G.border}` }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18 }}>
          All Orders ({orders.length})
        </h3>
      </div>
      {loading ? <Spinner /> : (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
            <thead>
              <tr style={{ background: G.surfaceAlt }}>
                {["Order ID", "Username", "Total", "Date", "Status", "Update"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: G.muted, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id || i} style={{ borderTop: `1px solid ${G.border}` }}>
                  <td style={{ padding: "14px 20px", color: G.muted }}>#{order.id}</td>
                  <td style={{ padding: "14px 20px", fontWeight: 600 }}>{order.username}</td>
                  <td style={{ padding: "14px 20px", color: G.accent, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
                    ₹{(order.totalPrice || 0).toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 20px", color: G.muted, fontSize: 13 }}>
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <Badge color={statusColor(order.status)}>{order.status}</Badge>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      style={{ width: "auto", padding: "6px 10px", fontSize: 13 }}>
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: G.muted }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ─── PROTECTED WRAPPER ─────────────────────────────────────────────────────
function Protected({ children }) {
  const { isLoggedIn } = useAuth();
  const { navigate } = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) { toast("Please login to continue", "info"); navigate("login"); }
  }, []);

  if (!isLoggedIn) return null;
  return children;
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────
export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <style>{css}</style>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <AppInner cartCount={cartCount} setCartCount={setCartCount} />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

function AppInner({ cartCount, setCartCount }) {
  const { page } = useRouter();
  const { isLoggedIn, user } = useAuth();

  const pages = {
    home: <HomePage />,
    products: <ProductsPage />,
    login: <AuthPage mode="login" />,
    register: <AuthPage mode="register" />,
    profile: <Protected><ProfilePage /></Protected>,
    cart: <Protected><CartPage onCartChange={setCartCount} /></Protected>,
    orders: <Protected><OrdersPage /></Protected>,
    admin: <Protected>{user?.role === "ADMIN" ? <AdminPage /> : <div style={{ padding: 40, textAlign: "center", color: G.danger }}>Access Denied</div>}</Protected>,
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <main style={{ minHeight: "calc(100vh - 64px)" }}>
        {pages[page] || <HomePage />}
      </main>
      <footer style={{ borderTop: `1px solid ${G.border}`, padding: "24px 32px", textAlign: "center", color: G.muted, fontSize: 13 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: G.text }}>Cartify</span> — Built with ❤️ using Spring Boot + React
      </footer>
    </div>
  );
}

