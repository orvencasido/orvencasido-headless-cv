import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

export const SkillsSection = ({ skills }: { skills?: any[] }) => {
  if (!skills?.length) return null

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-12">
        {skills.map((skillItem: any, idx: number) => {
          const skillName = typeof skillItem === 'string' ? skillItem : skillItem?.skill
          if (!skillName) return null

          const skillImageUrl = typeof skillItem === 'object' && skillItem?.image
            ? urlFor(skillItem.image)?.width(800).height(800).quality(100).url()
            : null

          const skillDescription = typeof skillItem === 'object' ? skillItem?.description : null

          return (
            <article key={idx} className="group relative flex flex-col md:flex-row gap-8 items-start">
              {skillImageUrl && (
                <div className="w-full md:w-48 aspect-square shrink-0 overflow-hidden rounded-2xl border border-border/50 relative">
                  <img
                    src={skillImageUrl}
                    alt={skillName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  {skillName}
                </h3>
                {skillDescription && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {skillDescription}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
