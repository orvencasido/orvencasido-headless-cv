import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

export const ExperienceSection = ({ experience }: { experience?: any[] }) => {
  if (!experience?.length) return null

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {experience.map((job: any, idx: number) => {
        const jobImageUrl = job.image
          ? urlFor(job.image)?.width(800).height(800).quality(100).url()
          : null

        return (
          <article key={idx} className="group relative">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {job.position}
                  </h3>
                  <p className="text-lg font-bold text-foreground/70 uppercase tracking-widest text-sm mt-1">
                    {job.company}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                  {job.startDate ?? "N/A"} — {job.endDate ?? "Present"}
                </span>
              </div>

              {jobImageUrl && (
                <div className="aspect-[21/9] sm:aspect-[3/1] overflow-hidden rounded-2xl border border-border/50 relative">
                  <img
                    src={jobImageUrl}
                    alt={job.company}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              )}

              <div className="space-y-4 max-w-2xl">
                <p className="text-lg text-foreground/80 leading-relaxed font-normal">
                  {job.description}
                </p>
                
                {job.responsibilities?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.responsibilities.map((responsibility: string, i: number) => (
                      <span
                        key={i}
                        className="px-4 py-1 bg-muted/50 text-foreground text-xs font-bold rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-muted transition-all duration-300">
                        {responsibility}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
