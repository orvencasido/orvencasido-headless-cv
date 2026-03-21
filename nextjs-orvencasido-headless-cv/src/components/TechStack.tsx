import { urlFor } from "@/sanity/utils";
import { Tooltip } from "./ui/Tooltip";

export default function TechStack({ techStack }: { techStack?: any[] }) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 text-center">
        technologies
      </h2>
      <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-4 items-center justify-center">
        {techStack.map((tech: any, idx: number) => {
          const iconUrl = tech.image
            ? urlFor(tech.image)?.width(64).height(64).fit("max").auto("format").url()
            : null;

          if (!iconUrl) return null;

          return (
            <Tooltip key={idx} text={tech.name}>
              <img
                src={iconUrl}
                alt={tech.name || "Tech Icon"}
                className="w-5 h-5 md:w-6 md:h-6 object-contain transition-all duration-500 hover:scale-125 hover:opacity-100 opacity-40 cursor-pointer"
              />
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
}
