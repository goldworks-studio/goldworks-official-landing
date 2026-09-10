"use client";

// @refresh reset

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { asset } from "@/lib/site";
import { advanceMotion, clamp, sampleChapters } from "@/lib/experience-motion";

const World = dynamic(() => import("@/components/immersive-world"), {
  ssr: false,
});
const steam = "https://store.steampowered.com/app/3070310/Tiny_Fishing_Club/";
export type ExperienceState = {
  progress: number;
  targetProgress: number;
  velocity: number;
  reducedMotion: boolean;
  renderFrame: ((time: number, delta: number) => boolean) | null;
  invalidate: () => void;
};

export function StudioExperience() {
  const journeyRef = useRef<HTMLElement>(null);
  const state = useRef<ExperienceState>({
    progress: 0,
    targetProgress: 0,
    velocity: 0,
    reducedMotion: true,
    renderFrame: null,
    invalidate: () => {},
  });
  const [enhanced, setEnhanced] = useState(false);
  const [worldReady, setWorldReady] = useState(false);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => {
      state.current.reducedMotion = media.matches;
      wake();
    };
    let frame = 0;
    let last = performance.now();
    let painted = -1;
    const panels = journey.querySelectorAll<HTMLElement>("[data-chapter]");
    function paint(progress: number) {
      if (Math.abs(progress - painted) < 0.000001) return;
      painted = progress;
      const { hero, studio, end, lines } = sampleChapters(progress);
      journey!.style.setProperty("--progress", String(progress));
      journey!.style.setProperty("--hero", String(hero));
      journey!.style.setProperty("--studio", String(studio));
      journey!.style.setProperty("--end", String(end));
      lines.forEach((value, i) =>
        journey!.style.setProperty(`--line-${i}`, String(value)),
      );
      [hero, studio, end].forEach((opacity, i) => {
        const hidden = opacity < 0.05;
        if (
          panels[i] &&
          panels[i].getAttribute("aria-hidden") !== String(hidden)
        ) {
          panels[i].setAttribute("aria-hidden", String(hidden));
          panels[i].inert = hidden;
        }
      });
    }
    // One clock publishes the type, camera, material and particles together.
    function tick(now: number) {
      frame = 0;
      if (document.hidden) return;
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      const current = state.current;
      Object.assign(
        current,
        advanceMotion(
          current,
          current.targetProgress,
          dt,
          current.reducedMotion,
        ),
      );
      paint(current.progress);
      const active = current.renderFrame?.(now, dt) ?? false;
      if (
        active ||
        current.progress !== current.targetProgress ||
        Math.abs(current.velocity) > 0.0001
      )
        frame = requestAnimationFrame(tick);
    }
    function wake() {
      if (frame || document.hidden) return;
      last = performance.now() - 16;
      frame = requestAnimationFrame(tick);
    }
    function measure() {
      const rect = journey!.getBoundingClientRect();
      state.current.targetProgress = clamp(
        -rect.top / Math.max(1, journey!.offsetHeight - window.innerHeight),
      );
      wake();
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    }
    state.current.invalidate = wake;
    setEnhanced(true);
    preference();
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(journey);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      state.current.invalidate = () => {};
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", preference);
    };
  }, []);

  return (
    <div
      className="cinematic-site"
      data-enhanced={enhanced}
      data-world={worldReady ? "ready" : "fallback"}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section
          className="journey"
          ref={journeyRef}
          aria-label="The world of GoldWorks"
        >
          <div id="studio" className="studio-anchor" />
          <div className="scene-sticky">
            <img
              className="world-backdrop"
              src={asset("/images/gold-atmosphere.webp")}
              alt=""
              width={1672}
              height={941}
              fetchPriority="high"
            />
            <div className="world-vignette" />
            <h1 className="hero-wordmark">GoldWorks</h1>
            <World
              state={state}
              onReady={() => setWorldReady(true)}
              onUnavailable={() => setWorldReady(false)}
            />
            <section
              className="chapter chapter-hero"
              data-chapter="hero"
              aria-label="GoldWorks independent game studio"
            >
              <div className="hero-caption">
                <p className="scene-label">INDEPENDENT GAME STUDIO</p>
                <p>
                  Crafting play.
                  <br />
                  Making it matter.
                </p>
              </div>
              <div className="hero-bottom">
                <a className="discover-link" href="#studio">
                  <span className="down-circle">
                    <ArrowDown size={17} aria-hidden="true" />
                  </span>
                  Scroll to discover
                </a>
                <a
                  className="game-link"
                  href={steam}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Tiny Fishing Club</span>
                  <span className="game-link-label">
                    ON STEAM <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </section>
            <section
              className="chapter chapter-studio"
              data-chapter="studio"
              aria-labelledby="studio-title"
            >
              <div className="studio-statement">
                <p className="scene-label">THE VALUE OF PLAY</p>
                <h2 id="studio-title">
                  <span className="statement-line">A little</span>
                  <span className="statement-line">spark.</span>
                  <em className="statement-line">Pure gold.</em>
                </h2>
                <p className="statement-copy">
                  We turn bright ideas into
                  <br />
                  experiences worth coming back to.
                  <br />
                  That’s the value of play.
                </p>
              </div>
            </section>
            <section
              className="chapter chapter-end"
              data-chapter="end"
              aria-labelledby="end-title"
            >
              <p className="scene-label">
                MADE TO BE PLAYED. MEANT TO BE KEPT.
              </p>
              <h2 id="end-title">Stay gold.</h2>
              <p>A spark of wonder. A reason to return.</p>
              <a href="#contact" className="end-link">
                Say hello <ArrowDown size={16} aria-hidden="true" />
              </a>
            </section>
            <div className="journey-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-top">
            <p className="scene-label">GOT A THOUGHT?</p>
            <p>Big ideas. Small hellos. All welcome.</p>
          </div>
          <a className="contact-headline" href="mailto:support@goldworks.net">
            <h2 id="contact-title">Let’s talk.</h2>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="contact-address" href="mailto:support@goldworks.net">
            support@goldworks.net
          </a>
        </section>
      </main>
      <footer className="cinematic-footer">
        <span>© {new Date().getFullYear()} GoldWorks</span>
        <div>
          <Link href="/privacy/">Privacy Policy</Link>
          <Link href="/account-deletion/">Data Deletion</Link>
        </div>
        <a href="#main">Back to top ↑</a>
      </footer>
    </div>
  );
}
