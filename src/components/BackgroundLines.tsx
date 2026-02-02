export default function BackgroundLines() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-purple-950/20 animate-gradient" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'grid-move 30s linear infinite'
        }}
      />

      {/* Diagonal animated lines */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute h-[200%] w-[200%] -left-1/2 -top-1/2"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(168, 85, 247, 0.15) 40px,
                rgba(168, 85, 247, 0.15) 42px
              )
            `,
            animation: 'diagonal-move 25s linear infinite'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-float-medium" />
      <div className="absolute top-1/2 right-1/3 h-72 w-72 rounded-full bg-pink-500/5 blur-2xl animate-float-slow" style={{ animationDelay: '3s' }} />

      {/* Moving geometric shapes */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-lg border border-cyan-500/20 animate-rotate-slow" />
      <div className="absolute bottom-40 left-40 h-24 w-24 rotate-45 border border-purple-500/20 animate-float-medium" style={{ animationDelay: '2s' }} />

      {/* Subtle particles */}
      <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-cyan-400/40 animate-pulse-slow" />
      <div className="absolute top-2/3 left-1/3 h-2 w-2 rounded-full bg-purple-400/40 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300/30 animate-pulse-slow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-1/3 right-2/3 h-1.5 w-1.5 rounded-full bg-purple-300/30 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, 80px);
          }
        }
        
        @keyframes diagonal-move {
          0% {
            transform: translate(0, 0) rotate(45deg);
          }
          100% {
            transform: translate(-80px, -80px) rotate(45deg);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -30px);
          }
          50% {
            transform: translate(-20px, 20px);
          }
          75% {
            transform: translate(20px, 30px);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-40px, 30px);
          }
          66% {
            transform: translate(30px, -20px);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-gradient {
          animation: gradient 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
