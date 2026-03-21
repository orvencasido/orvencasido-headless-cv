import { urlFor } from "@/sanity/utils";
import { ContentCard } from "./ui/ContentCard";

export const SkillsSection = ({ skills }: { skills?: any[] }) => {
  if (!skills?.length) return null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-12">
        {skills.map((skillItem: any, idx: number) => {
          const isString = typeof skillItem === "string";
          const skillName = isString ? skillItem : skillItem?.skill;
          const skillDescription = isString ? null : skillItem?.description;
          const skillImage = isString ? null : skillItem?.image;

          if (!skillName) return null;

          return (
            <ContentCard
              key={idx}
              image={
                skillImage
                  ? urlFor(skillImage)?.width(800).height(450).auto("format").url()
                  : null
              }
              title={skillName}
              description={skillDescription}
            />
          );
        })}
      </div>
    </div>
  );
};

