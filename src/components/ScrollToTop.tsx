import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 96;
const HASH_SCROLL_RETRY_MS = 120;
const HASH_SCROLL_MAX_ATTEMPTS = 12;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let attempts = 0;
    let timeoutId: number | undefined;

    const scrollToHash = () => {
      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);

      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "instant" });
        return;
      }

      if (attempts < HASH_SCROLL_MAX_ATTEMPTS) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToHash, HASH_SCROLL_RETRY_MS);
      }
    };

    scrollToHash();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
