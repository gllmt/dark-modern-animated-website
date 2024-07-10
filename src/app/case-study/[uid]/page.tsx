import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { PrismicDocumentWithUID, asText } from "@prismicio/client";
import AnimatedContent from "./AnimatedContent";
import { CaseStudyDocumentData, Simplify } from "../../../../prismicio-types";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page: PrismicDocumentWithUID<
    Simplify<CaseStudyDocumentData>,
    "case_study",
    string
  > = await client.getByUID("case_study", params.uid).catch(() => notFound());

  return (
    <Bounded as="article">
      <AnimatedContent slice={page} />
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("case_study", params.uid)
    .catch(() => notFound());

  return {
    title: `${page.data.meta_title || asText(page.data.company) + " Case Study"}`,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("case_study");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
