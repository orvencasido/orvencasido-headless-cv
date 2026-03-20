import { type SanityDocument } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"
import Link from "next/link"
import HeaderSection, { type Resume } from "@/components/HeaderSection"

const RESUMES_QUERY = `*[_type == "resume"][0]`

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

const options = { next: { revalidate: 30 } }

import ResumeTabs from "@/components/ResumeTabs"

const SummarySection = ({ summary }: { summary?: string }) => {
  if (!summary) return null

  return (
    <section className="space-y-4 pt-4 border-t border-border/40">
      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60">
        Profile
      </h2>
      <p className="text-justify text-xl leading-relaxed text-foreground/90 font-medium tracking-tight">
        {summary}
      </p>
    </section>
  )
}

// --- Main Page ---

export default async function IndexPage() {
  const resume = await client.fetch<Resume & SanityDocument>(RESUMES_QUERY, {}, options)

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans">
        <p className="text-muted-foreground animate-pulse">No resume found</p>
      </div>
    )
  }

  const profileImageUrl = resume.profileImage
    ? urlFor(resume.profileImage)?.width(800).height(800).quality(100).url()
    : null

  return (
    <main className="max-w-3xl mx-auto px-6 space-y-24 animate-in">
      {/* Hero Landing Section */}
      <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center space-y-16 py-16 md:py-24">
        <HeaderSection resume={resume} profileImageUrl={profileImageUrl} />
        <SummarySection summary={resume.summary} />
      </div>
      
      {/* Interactive Tabs Section */}
      <div className="pb-24">
        <ResumeTabs resume={resume} />
      </div>
    </main>
  )
}