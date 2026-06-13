import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On every change of route (pathname), jump to the top of the page. This keeps
// navigation from the nav bar landing partway down a page.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
