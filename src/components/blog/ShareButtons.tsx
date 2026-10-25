"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://tariqleon.com/blog/${slug}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`"${title}" by Tariq Youhana Leon`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-muted flex items-center gap-1.5 mr-2">
        <Share2 className="w-3.5 h-3.5 text-signal" />
        <span>SHARE //</span>
      </span>

      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-mono text-muted hover:text-text hover:border-text transition-colors flex items-center gap-1.5"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={shareTwitter}
        className="px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-mono text-muted hover:text-text hover:border-text transition-colors"
        title="Share on X / Twitter"
      >
        X / Twitter
      </button>

      <button
        onClick={shareLinkedIn}
        className="px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-mono text-muted hover:text-text hover:border-text transition-colors"
        title="Share on LinkedIn"
      >
        LinkedIn
      </button>
    </div>
  );
}
