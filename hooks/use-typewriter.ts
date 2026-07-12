"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1800,
}: UseTypewriterOptions) {
  const reducedMotion = useReducedMotion();
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
          ),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, reducedMotion]);

  return reducedMotion ? words[0] : text;
}
