// src/components/CallbackContent.tsx
import { useEffect, useState } from "react";
import MeshGradientBackground from "./MeshGradientBackground";
import { MeshGradient } from "@paper-design/shaders-react";

export default function CallbackContent() {
  const [status, setStatus] = useState("Connecting to Spotify...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    exchangeCodeForToken();
  }, []);

  async function exchangeCodeForToken() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      setStatus(`Login failed: ${error}`);
      setTimeout(() => (window.location.href = "/login"), 2000);
      return;
    }

    if (!code) {
      setStatus("No authorization code received");
      setTimeout(() => (window.location.href = "/login"), 2000);
      return;
    }

    setStatus("Exchanging code for access token...");

    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || "Token exchange failed");
      }

      const data = await response.json();

      setStatus("Success! Redirecting to music player...");

      localStorage.setItem("spotify_access_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("spotify_refresh_token", data.refresh_token);
      }

      const expiryTime = Date.now() + data.expires_in * 1000;
      localStorage.setItem("spotify_token_expiry", expiryTime.toString());

      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error: any) {
      console.error("Token exchange error:", error);
      setStatus(`Token exchange failed: ${error.message}`);
      setTimeout(() => (window.location.href = "/login"), 3000);
    }
  }

  return (
    <div className="min-h-screen relative text-white flex items-center justify-center overflow-hidden">
      <MeshGradientBackground albumImageUrl={undefined} />
      <div className="text-center max-w-md px-6 relative z-10">
        {/* Spinning mesh gradient circle */}
        {mounted && (
          <div className="mx-auto mb-6 w-16 h-16 relative animate-spin">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <MeshGradient
                width={64}
                height={64}
                colors={["#78ebff", "#a855f7", "#22c55e", "#ec4899"]}
                distortion={0.6}
                swirl={0.4}
                grainMixer={0}
                grainOverlay={0}
                speed={1.2}
              />
            </div>
            {/* Optional: inner shadow for depth */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "inset 0 0 12px rgba(0,0,0,.35)",
              }}
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-2">Connecting to Spotify</h2>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  );
}
