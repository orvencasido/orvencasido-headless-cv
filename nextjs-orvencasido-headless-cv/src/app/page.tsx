import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import HeroHeader from "@/components/HeroHeader"
import { type Resume, urlFor } from "@/sanity/utils"
import ResumeTabs from "@/components/ResumeTabs"
import TechStack from "@/components/TechStack"

const RESUMES_QUERY = `*[_type == "resume"][0]{
  ...,
  techStack
}`

const options = { next: { revalidate: 0 } }

const SummarySection = ({ summary }: { summary?: string }) => {
  if (!summary) return null

  return (
    <section className="space-y-4 pt-8 border-t border-border/40">
      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60">
        Profile
      </h2>
      <p className="text-justify text-l md:text-2l leading-relaxed text-foreground/90 tracking-tight">
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
    <main className="max-w-3xl mx-auto px-8 md:px-0 space-y-12 md:space-y-16 animate-in">
      {/* Hero Landing Section - Pure Identity & Stack */}
      <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center space-y-16 py-12 md:py-20">
        <HeroHeader resume={resume} profileImageUrl={profileImageUrl} />
        <TechStack techStack={resume.techStack} />
      </div>

      {/* Profile Summary - Revealed on Scroll */}
      <SummarySection summary={resume.summary} />

      {/* Interactive Tabs Section */}
      <div className="pb-24">
        <ResumeTabs resume={resume} />
      </div>
    </main>
  )
}