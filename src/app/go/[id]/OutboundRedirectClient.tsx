'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface OutboundRedirectClientProps {
  destinationUrl: string;
  storeName: string;
}

export function OutboundRedirectClient({
  destinationUrl,
  storeName,
}: OutboundRedirectClientProps) {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (countdown <= 0) {
      // Perform redirect
      window.location.href = destinationUrl;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, destinationUrl]);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl text-xs text-teal-900 font-medium">
        Redirecting automatically in <span className="font-bold font-mono text-teal-800">{countdown}s</span>...
      </div>

      <a
        href={destinationUrl}
        rel="sponsored nofollow"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm shadow-md hover:shadow-teal-900/10 transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/50"
      >
        <span>Open {storeName} Immediately</span>
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}
