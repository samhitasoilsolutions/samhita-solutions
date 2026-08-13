import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Reset scroll before paint so the new page always renders from the top.
    // The page's own framer-motion entrance animations provide the smooth feel.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
