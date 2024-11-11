"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  // State untuk form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Fungsi untuk semak sama ada pengguna sudah wujud
  const checkUserExists = async (email) => {
    try {
      const res = await fetch("/api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await res.json();
      return user;
    } catch (error) {
      console.log("Error checking user", error);
    }
  };

  // Fungsi hantar borang pendaftaran
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password) {
      setError("Sila isi semua medan");
      return;
    }

    try {
      // Semak pengguna sudah wujud
      const userExists = await checkUserExists(email);

      if (userExists) {
        setError("Pengguna sudah wujud");
        return;
      }

      // Hantar data pendaftaran
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // Semak respon
      if (res.ok) {
        // Reset form
        setName("");
        setEmail("");
        setPassword("");

        // Redirect ke login
        router.push("/");
      } else {
        // Papar mesej ralat
        const errorData = await res.json();
        setError(errorData.error || "Pendaftaran gagal");
      }
    } catch (error) {
      console.log("Ralat pendaftaran:", error);
      setError("Ralat pendaftaran");
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Penuh"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Daftar</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
