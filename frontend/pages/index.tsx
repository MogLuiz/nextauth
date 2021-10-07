// Packages
import { FormEvent, useContext, useState } from "react";

// Context
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  // -------------------------------------------------
  // States
  // -------------------------------------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------

  const { signIn } = useContext(AuthContext);

  // -------------------------------------------------
  // Functions
  // -------------------------------------------------

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  // -------------------------------------------------
  // Render
  // -------------------------------------------------

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
