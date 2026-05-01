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
            <div className="flex gap-6 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-foreground/60 hover:text-foreground hover:underline transition-all z-10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-foreground/60 hover:text-foreground hover:underline transition-all z-10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Repository Link
                </a>
              )}
            </div>
          </ContentCard>
        );

      })}
    </div>
  );
};



