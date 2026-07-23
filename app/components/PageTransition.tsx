"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Wraps page content so route changes animate out/in instead of hard-cutting.
// Keyed by pathname so AnimatePresence treats each route as a distinct element
// and can play an exit animation on the old one before the new one enters.
//
// Fix for bottom-nav "jump" on navigation: with mode="wait", the outgoing
// page stays mounted (mid-exit) at the same time the incoming page mounts.
// If the outgoing page is still in normal document flow while animating
// away, its height still occupies space in the scroll container — then the
// instant it's removed from the DOM, the container reflows and anything
// below it (like BottomNav) snaps into its new position. Taking the exiting
// element out of flow with `position: absolute` during its exit phase means
// it no longer affects the container's height while it animates out, so
// there's nothing to reflow and no visible jump.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12, position: "relative" }}
        animate={{ opacity: 1, y: 0, position: "relative" }}
        exit={{ opacity: 0, y: -8, position: "absolute", top: 0, left: 0, right: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}