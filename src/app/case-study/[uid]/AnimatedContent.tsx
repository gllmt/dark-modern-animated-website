"use client";

import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { CaseStudyDocument } from "../../../../prismicio-types";

export default function AnimatedContent({
  slice,
}: {
  slice: CaseStudyDocument;
}) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".case-study__heading, .case-study__description, .case-study__image, .case-study__glow",
          {
            opacity: 1,
          },
        );
        return;
      }
      const tl = gsap.timeline({
        default: { ease: "power2.InOut" },
      });
      tl.fromTo(
        ".case-study__heading",
        { scale: 0.3 },
        { scale: 1, opacity: 1, duration: 1.4 },
        "",
      );
      tl.fromTo(
        ".case-study__description",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6",
      );
      tl.fromTo(
        ".case-study__image",
        { y: 50 },
        { y: 0, scale: 1, opacity: 1, duration: 1.3 },
        "-=0.4",
      );
      tl.fromTo(
        ".case-study__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1",
      );
    },
    { scope: container },
  );

  return (
    <div
      className="relative grid place-items-center text-center"
      ref={container}
    >
      <StarGrid />
      {isFilled.richText(slice.data.company) && (
        <h1 className="case-study__heading text-7xl font-medium opacity-0">
          <PrismicText field={slice.data.company} />
          <p className="text-lg text-yellow-500">Case Study</p>
        </h1>
      )}
      {isFilled.richText(slice.data.description) && (
        <p className="case-study__description mb-4 mt-8 max-w-xl text-lg text-slate-300 opacity-0">
          <PrismicText field={slice.data.description} />
        </p>
      )}
      {isFilled.image(slice.data.logo_image) && (
        <div className="case-study__image glass-container mt-10 w-fit opacity-0">
          <div className="case-study__glow absolute inset-0 -z-10 bg-blue-500/30 blur-2xl filter" />
          <PrismicNextImage
            field={slice.data.logo_image}
            className="rounded-lg"
            quality={90}
            priority={true}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
