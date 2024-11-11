"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  // State untuk form login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Fungsi hantar borang login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Sila isi semua medan");
      return;
    }

    try {
      // Cuba log masuk
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Semak keputusan login
      if (res.error) {
        setError("Email atau kata laluan tidak sah");
        return;
      }

      // Berjaya login, redirect ke dashboard
      router.replace("/dashboard");
    } catch (error) {
      console.log("Login error:", error);
      setError("Ralat login");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Kata Laluan"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log Masuk</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
