"use client";

import { useState, type MouseEvent } from "react";
import { Bookmark, Globe, Heart, type LucideIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Post } from "@/utils/constant/types";
import { cn } from "@/utils/lib/utils";

type CardPostProps = {
  post: Post;
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Largest unit first, value is the unit length in seconds.
const TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

function formatPostedAt(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  const diffInSeconds = Math.round((date.getTime() - Date.now()) / 1000);

  for (const [unit, seconds] of TIME_UNITS) {
    if (Math.abs(diffInSeconds) >= seconds) {
      return relativeTime.format(Math.round(diffInSeconds / seconds), unit);
    }
  }

  return "just now";
}

/* -------------------------------------------------------------------------- */
/*  Toggle button (shared by Like + Save)                                     */
/* -------------------------------------------------------------------------- */

// Tailwind needs full class names at build time, so keep these static.
const TONES = {
  like: {
    hover: "hover:bg-rose-50",
    on: "text-rose-500",
    off: "text-neutral-400 hover:text-rose-500",
  },
  save: {
    hover: "hover:bg-primary/10",
    on: "text-primary",
    off: "text-neutral-400 hover:text-primary",
  },
} as const;

type ToggleButtonProps = {
  icon: LucideIcon;
  label: string;
  pressed: boolean;
  onToggle: () => void;
  tone: keyof typeof TONES;
};

const ToggleButton = ({ icon: Icon, label, pressed, onToggle, tone }: ToggleButtonProps) => {
  const styles = TONES[tone];

  // The card sits inside a click-to-open-dialog wrapper in the feed —
  // stop the click here so it doesn't also open the dialog.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={pressed}
      aria-label={label}
      className={cn(
        "rounded-full p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        styles.hover,
        pressed ? styles.on : styles.off
      )}
    >
      <Icon size={18} className={pressed ? "fill-current" : undefined} />
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

const CardPost = ({ post }: CardPostProps) => {
  const { user, content, imageUrl, createdAt, updatedAt } = post;

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const isEdited = updatedAt !== createdAt;

  return (
    <Card className="w-full rounded-2xl border border-neutral-200 p-3 shadow-sm transition-colors hover:border-neutral-300">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="size-14">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-row justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-neutral-900">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>

            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              {/* Relative time depends on "now", so it can differ between server and client render. */}
              <time dateTime={createdAt} suppressHydrationWarning>
                Posted {formatPostedAt(createdAt)}
              </time>
              {isEdited && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Edited</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Public</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-row gap-1">
            <ToggleButton
              icon={Heart}
              label="Like post"
              tone="like"
              pressed={isLiked}
              onToggle={() => setIsLiked((v) => !v)}
            />
            <ToggleButton
              icon={Bookmark}
              label="Bookmark post"
              tone="save"
              pressed={isSaved}
              onToggle={() => setIsSaved((v) => !v)}
            />
          </div>
        </div>
      </CardHeader>

      {(content || imageUrl) && (
        <CardContent className="space-y-3 px-4 pb-4 pt-2">
          {content && (
            <p className="whitespace-pre-line text-sm text-neutral-700">{content}</p>
          )}

          {imageUrl && (
            // Swap for next/image once the image host is in next.config remotePatterns.
            <img
              src={imageUrl}
              alt={`Image posted by ${user.name}`}
              loading="lazy"
              className="max-h-96 w-full rounded-xl object-cover"
            />
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default CardPost;
