import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon-only' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-slate-900 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg py-1 px-1.5 transition-colors ${className}`}
      aria-label="Kifayro - Home"
    >
      {/* Original Kifayro Icon: Geometric Smart Compass & Value Spark */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-700/20 group-hover:shadow-md group-hover:shadow-teal-700/30 transition-all duration-200"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
          aria-hidden="true"
        >
          {/* Stylized 'K' forming a discovery compass & price spark */}
          <path
            d="M9 7V25M9 16L21 7M14 13L23 25"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="7" r="1.8" fill="#FDE047" />
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-black tracking-tight ${textSize} ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kifayro<span className="text-teal-600">.</span>
          </span>
          {size !== 'sm' && (
            <span
              className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
                variant === 'light' ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Smart Discovery
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
