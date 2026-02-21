import { type SanityDocument } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"
import Link from "next/link"

const RESUMES_QUERY = `*[_type == "resume"][0]`

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

const options = { next: { revalidate: 30 } }

export default async function IndexPage() {
  const resume = await client.fetch<SanityDocument>(RESUMES_QUERY, {}, options)

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans">
        <p className="text-muted-foreground animate-pulse">No resume found</p>
      </div>
    )
  }

  const profileImageUrl = resume.profileImage
    ? urlFor(resume.profileImage)?.width(400).height(400).quality(100).url()
    : null

  const schoolImageUrl = resume.schoolImage
    ? urlFor(resume.schoolImage)?.width(400).height(400).quality(100).url()
    : null

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-16 animate-in">

      {/* Header Section */}
      <header className="space-y-8">
        <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {resume.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground">
              {resume.email && (
                <a href={`mailto:${resume.email}`} className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5">
                  {resume.email}
                </a>
              )}
              {resume.phone && <span className="cursor-default">{resume.phone}</span>}
              {resume.website && (
                <a href={resume.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5">
                  Portfolio
                </a>
              )}
              {resume.linkedin && (
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5">
                  LinkedIn
                </a>
              )}
              {resume.github && (
                <a href={resume.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5">
                  GitHub
                </a>
              )}
            </div>
          </div>

          {profileImageUrl && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-foreground/10 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={profileImageUrl}
                alt={resume.name}
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 bg-muted"
              />
            </div>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {resume.summary && (
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Profile
          </h2>
          <p className="text-justify text-lg leading-relaxed text-foreground/90 font-medium">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {resume.workExperience?.length && (
        <section className="space-y-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 border-b border-border pb-2">
            Experience
          </h2>
          <div className="space-y-12">
            {resume.workExperience.map((job: any, idx: number) => (
              <article key={idx} className="group relative space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                    {job.position}
                  </h3>
                  <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                    {job.startDate ?? "N/A"} — {job.endDate ?? "Present"}
                  </span>
                </div>
                <p className="text-md font-bold text-foreground/70 uppercase tracking-wide">
                  {job.company}
                </p>
                <p className="text-justify mt-2 text-sm text-foreground/80 leading-relaxed font-medium">
                  {job.description}
                </p>
                {job.responsibilities?.length && (
                  <ul className="space-y-2 mt-4 ml-1">
                    {job.responsibilities.map((r: string, i: number) => (
                      <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border group-hover:bg-foreground/30 transition-colors" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {resume.skills?.length && (
        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 border-b border-border pb-2">
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-muted text-foreground text-sm font-semibold rounded-full border border-transparent hover:border-foreground/20 hover:bg-background transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {resume.projects?.length && (
        <section className="space-y-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 border-b border-border pb-2">
            Selected Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resume.projects.map((p: any, idx: number) => {
              const projectImageUrl = p.image
                ? urlFor(p.image)?.width(600).height(400).url()
                : null;

              const ProjectContent = (
                <div className="group space-y-3 p-4 -m-4 rounded-2xl hover:bg-muted/50 transition-all duration-500">
                  {projectImageUrl && (
                    <div className="aspect-[3/2] overflow-hidden rounded-xl border border-border/50">
                      <img
                        src={projectImageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold flex items-center justify-between">
                    {p.title}
                    {p.link && !p.slug && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </h3>
                  {p.description && <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>}
                  {p.technologies?.length && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.technologies.slice(0, 3).map((tech: string, i: number) => (
                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              );

              if (p.slug?.current) {
                return (
                  <Link key={idx} href={`/${p.slug.current}`}>
                    {ProjectContent}
                  </Link>
                );
              }

              return <div key={idx}>{ProjectContent}</div>;
            })}
          </div>
        </section>
      )}

      {resume.education?.length && (
        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 border-b border-border pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {resume.education.map((edu: any, idx: number) => {
              const currentImageUrl = edu.image
                ? urlFor(edu.image)?.width(400).height(400).quality(100).url()
                : schoolImageUrl;

              return (
                <div key={idx} className="flex gap-4 md:gap-6 items-start group">
                  {currentImageUrl && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-foreground/10 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <img
                        src={currentImageUrl}
                        alt={edu.school}
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 bg-muted"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5 flex-1 pt-1">
                    <div className="font-bold text-foreground text-lg leading-tight group-hover:text-foreground/80 transition-colors">{edu.degree}</div>
                    <div className="text-sm font-semibold text-muted-foreground">{edu.school}</div>
                    <div className="text-xs text-muted-foreground/60 font-medium tabular-nums">{edu.startDate ?? "N/A"} — {edu.endDate ?? "N/A"}</div>
                    {edu.description && (
                      <p className="text-justify mt-2 text-sm text-foreground/80 leading-relaxed font-medium">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Certs Footer */}
      <footer className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border">
        <div className="space-y-8">
          {resume.certifications?.length && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                Certifications
              </h2>
              <ul className="space-y-2">
                {resume.certifications.map((c: string, idx: number) => (
                  <li key={idx} className="text-sm font-semibold text-foreground/80">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </footer>

      <div className="h-1" />
    </main>
  )
}