import { urlFor } from "@/sanity/utils";
import { ContentCard } from "./ui/ContentCard";


export const ProjectsSection = ({ projects }: { projects?: any[] }) => {
  if (!projects?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {projects.map((project: any, idx: number) => {
        // const projectSlug = project.slug?.current;

        return (
          <ContentCard
            key={idx}
            image={
              project.image
                ? urlFor(project.image)?.width(800).height(533).auto("format").url()
                : null
            }
            title={project.title}
            description={project.description}
            tags={project.technologies}
            imageAspectRatio="aspect-video"
          // titleHref={projectSlug ? `/${projectSlug}` : undefined}
          >
            <div className="flex gap-4 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-all z-10"
                >
                  GitHub
                </a>
              )}
            </div>
          </ContentCard>
        );

      })}
    </div>
  );
};



