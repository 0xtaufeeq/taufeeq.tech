'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Floating background circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-circle absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="floating-circle-delayed absolute right-[15%] top-[60%] h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />
        <div className="floating-circle-slow absolute bottom-[10%] left-[40%] h-80 w-80 rounded-full bg-accent-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8 space-y-4">
          <h1 className="glitch-text font-heading text-[clamp(5rem,20vw,12rem)] font-bold leading-none tracking-tight">
            404
          </h1>
          <div className="mx-auto h-1 w-32 rounded-full bg-primary-gradient" />
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Oops! Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-lg text-zinc-400">
            Looks like you&apos;ve ventured into uncharted territory. The page
            you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary group">
            <span>Take Me Home</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button onClick={() => history.back()} className="btn-secondary group">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-16">
          <p className="text-sm text-zinc-600">
            Error code:{' '}
            <span className="font-mono text-accent-500">ERR_NOT_FOUND</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          color: var(--accent-color-1);
          animation: glitch 3s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: '404';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-before 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          color: var(--accent-color-2);
        }

        .glitch-text::after {
          animation: glitch-after 3s infinite;
          clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%);
          color: #5ef0b4;
        }

        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-before {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(2px, -2px);
          }
          40% {
            transform: translate(-2px, 2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(-2px, -2px);
          }
        }

        @keyframes glitch-after {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(2px, 2px);
          }
        }

        .floating-circle {
          animation: float 20s ease-in-out infinite;
        }

        .floating-circle-delayed {
          animation: float 25s ease-in-out infinite reverse;
          animation-delay: 2s;
        }

        .floating-circle-slow {
          animation: float 30s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(30px, 10px) scale(1.05);
          }
        }
      `}</style>
    </main>
  )
}
