"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";

import { FRAME10_PATHS, RX_ITEMS, startHeroPlantFlow } from "./heroPlantFlowEngine";

import "./HeroPlantFlow.css";

const RX_TRACK_ITEMS = [...RX_ITEMS, ...RX_ITEMS];
const MOBILE_STAGE_WIDTH = 1200;
const STAGE_ASPECT = 1274 / 2529;
const MOBILE_MQ = "(max-width: 1023px)";

export function HeroPlantFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const [plantFailed, setPlantFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const viewport = root.querySelector<HTMLElement>(".hpf-viewport");
    const stage = root.querySelector<HTMLElement>(".hpf-stage");
    if (!viewport || !stage) return;

    const fitStage = () => {
      const isMobile = window.matchMedia(MOBILE_MQ).matches;
      if (!isMobile) {
        stage.style.width = "";
        stage.style.minWidth = "";
        stage.style.transform = "";
        viewport.style.height = "";
        viewport.style.overflow = "";
        return;
      }

      const scale = root.clientWidth / MOBILE_STAGE_WIDTH;
      stage.style.width = `${MOBILE_STAGE_WIDTH}px`;
      stage.style.minWidth = `${MOBILE_STAGE_WIDTH}px`;
      stage.style.transformOrigin = "top left";
      stage.style.transform = `scale(${scale})`;
      viewport.style.height = `${MOBILE_STAGE_WIDTH * STAGE_ASPECT * scale}px`;
      viewport.style.overflow = "hidden";
    };

    fitStage();
    const resizeObserver = new ResizeObserver(fitStage);
    resizeObserver.observe(root);
    window.addEventListener("resize", fitStage);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", fitStage);
    };
  }, []);

  useEffect(() => {
    if (!isReady || !rootRef.current) {
      return;
    }

    const reduce =
      prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return startHeroPlantFlow(rootRef.current, { reduce });
  }, [isReady, prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className="hpf-root"
      role="img"
      aria-label="Stamped reads market data, plant telemetry, and application systems, then ranks plant actions with rupee impact."
    >
      <div className="hpf-viewport">
        <div className="hpf-stage">
          <div className="hpf-scene" id="hpf-scene">
            <div className="hpf-plant" id="hpf-plant">
              <div
                className="hpf-plant-fallback"
                id="hpf-plantFallback"
                style={{ display: plantFailed ? "grid" : "none" }}
              >
                Plant photo
                <br />
                placeholder
              </div>
              {!plantFailed ? (
                <Image
                  src="/hero-plant-flow/plant.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-contain object-left"
                  onError={() => setPlantFailed(true)}
                />
              ) : null}
            </div>

            <svg
              className="hpf-scene-svg"
              id="hpf-svg"
              viewBox="0 0 2529 1274"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path className="hpf-wire" id="hpf-wExt" d={FRAME10_PATHS.wExt} />
              <path className="hpf-wire" id="hpf-wTel" d={FRAME10_PATHS.wTel} />
              <path className="hpf-wire" id="hpf-wApp" d={FRAME10_PATHS.wApp} />
              <path className="hpf-wire hpf-wire-out" id="hpf-wOut" d={FRAME10_PATHS.wOut} />
            </svg>

            <span className="hpf-dock-dot" id="hpf-dockExt" aria-hidden="true" />
            <span className="hpf-dock-dot" id="hpf-dockTel" aria-hidden="true" />
            <span className="hpf-dock-dot" id="hpf-dockApp" aria-hidden="true" />

            <div className="hpf-src-label" id="hpf-srcExt">
              Market data
            </div>
            <div className="hpf-src-label" id="hpf-srcTel">
              Plant telemetry
            </div>
            <div className="hpf-src-label" id="hpf-srcApp">
              Application systems
            </div>

            <div className="hpf-signals" id="hpf-signals" aria-hidden="true" />

            <div className="hpf-logo-wrap" id="hpf-logoWrap">
              <Image
                src="/hero-plant-flow/logo.png"
                width={128}
                height={128}
                alt=""
                priority
              />
              <div className="hpf-logo-caption">
                Stamped
                <br />
                Energy
              </div>
            </div>

            <aside className="hpf-rx-panel" id="hpf-rxPanel" aria-label="Prescriptions">
              <div className="hpf-rx-head">
                <div className="hpf-rx-head-text">
                  <div className="hpf-rx-title">Prescriptions</div>
                  <p className="hpf-rx-sub">Ranked plant actions with rupee impact</p>
                </div>
                <div className="hpf-rx-live" id="hpf-rxLive">
                  Live
                </div>
              </div>
              <div className="hpf-rx-viewport" id="hpf-rxViewport">
                <div className="hpf-rx-track" id="hpf-rxTrack">
                  {RX_TRACK_ITEMS.map((item, index) => (
                    <article className="hpf-rx-item" key={`${item.label}-${index}`}>
                      <div className="hpf-rx-tags">
                        <span className="hpf-rx-tag is-money">{item.money}</span>
                        <span className="hpf-rx-tag">{item.label}</span>
                      </div>
                      <p className="hpf-rx-copy">{item.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
