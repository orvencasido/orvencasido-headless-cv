import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"
import Link from "next/link"

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

export const ProjectsSection = ({ projects }: { projects?: any[] }) => {
  if (!projects?.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-1000">
      {projects.map((p: any, idx: number) => {
        const projectImageUrl = p.image
          ? urlFor(p.image)?.width(1200).height(800).quality(100).url()
          : null

        const ProjectContent = (
          <div className="group space-y-6 p-6 -m-6 rounded-3xl hover:bg-muted/30 transition-all duration-700">
            {projectImageUrl && (
              <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-border/50 relative">
                <img
                  src={projectImageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center justify-between group-hover:text-foreground transition-colors">
                {p.title}
                {p.link && !p.slug && (
                  <span className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                )}
              </h3>
              {p.description && <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>}
              {p.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {p.technologies.slice(0, 4).map((tech: string, i: number) => (
                    <span key={i} className="text-xs uppercase font-bold tracking-widest text-muted-foreground/70 bg-muted/60 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

        if (p.slug?.current) {
          return (
            <Link key={idx} href={`/${p.slug.current}`} className="w-full h-full block">
              {ProjectContent}
            </Link>
          )
        }

        return <div key={idx}>{ProjectContent}</div>
      })}
    </div>
  )
}
