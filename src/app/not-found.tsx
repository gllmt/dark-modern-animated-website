"use client";

import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".hero__heading, .hero__button", {
          opacity: 1,
        });
        return;
      }
      const tl = gsap.timeline({
        default: { ease: "power2.InOut" },
      });
      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 },
        "",
      );
      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8",
      );
    },
    { scope: container },
  );
  return (
    <Bounded className="text-center">
      <div className="relative w-full" ref={container}>
        <StarGrid />
        <h1 className="hero__heading text-balance text-5xl font-medium opacity-0 md:text-7xl">
          Not found
        </h1>
        <ButtonLink className="hero__button mt-8 opacity-0" href="/">
          Go back to the homepage
        </ButtonLink>
      </div>
    </Bounded>
  );
}
