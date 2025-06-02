"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const host = typeof window !== "undefined" ? window.location.host : "";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "";

  const session = authClient.useSession();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "microsoft",
      callbackURL: `${protocol}//${host}/`,
    });
  };

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <div style={containerStyle}>
      {!session?.data ? (
        <button onClick={handleSignIn}>Continue with Microsoft</button>
      ) : (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "grid",
  minHeight: "100vh",
  width: "100vw",
  placeItems: "center",
};
