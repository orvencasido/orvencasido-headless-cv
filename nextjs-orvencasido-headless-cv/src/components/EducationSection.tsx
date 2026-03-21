import { ContentCard } from "./ui/ContentCard";

export const EducationSection = ({ education }: { education?: any[] }) => {
  if (!education?.length) return null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {education.map((edu: any, idx: number) => (
        <ContentCard
          key={idx}
          title={edu.degree}
          subtitle={edu.school}
          badge={`${edu.startDate ?? "N/A"} — ${edu.endDate ?? "N/A"}`}
          description={edu.description}
        />
      ))}
    </div>
  );
};
