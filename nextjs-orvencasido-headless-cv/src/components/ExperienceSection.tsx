import { urlFor } from "@/sanity/utils";
import { ContentCard } from "./ui/ContentCard";

export const ExperienceSection = ({ experience }: { experience?: any[] }) => {
  if (!experience?.length) return null;

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {experience.map((job: any, idx: number) => (
        <ContentCard
          key={idx}
          image={
            job.image
              ? urlFor(job.image)?.width(800).height(450).auto("format").url()
              : null
          }
          title={job.position}
          subtitle={job.company}
          badge={`${job.startDate ?? "N/A"} — ${job.endDate ?? "Present"}`}
          description={job.description}
          tags={job.responsibilities}
        />
      ))}
    </div>
  );
};

