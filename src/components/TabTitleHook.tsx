"use client";

import { useEffect } from "react";

const AWAY_MESSAGE = "💜 A un clic de empezar a vender";

export default function TabTitleHook() {
  useEffect(() => {
    const original = document.title;

    const onVisibility = () => {
      document.title = document.hidden ? AWAY_MESSAGE : original;
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return null;
}
