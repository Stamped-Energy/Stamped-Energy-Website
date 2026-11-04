import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RouteMotionSync } from "@/components/motion/RouteMotionSync";

type SiteChromeProps = {
  children: React.ReactNode;
};

/** Server shell: footer + main are static; nav/motion sync are client islands. */
export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <RouteMotionSync />
      <Navbar />
      <main className="min-w-0 overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
