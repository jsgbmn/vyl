// src/components/LoginPage.tsx
import MeshGradientBackground from "./MeshGradientBackground";
import MeshSphere from "./MeshSphere";

interface LoginPageProps {
  authUrl: string;
}

export default function LoginPage({ authUrl }: LoginPageProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center justify-center overflow-hidden">
      <MeshGradientBackground albumImageUrl={undefined} />

      <div className="text-center relative z-10 max-w-md px-6 flex-1 flex flex-col justify-center">
        {/* Logo */}

        <div className="mb-10 flex justify-center">
          <MeshSphere size={100} />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Vyl
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Your Premium Music Experience
        </p>
        <a
          href={authUrl}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/50"
        >
          {/* svg … */}
          Connect with Spotify
        </a>
        <div className="relative mt-10 z-10 pb-6 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Vyl. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
