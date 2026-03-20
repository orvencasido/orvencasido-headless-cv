export const EducationSection = ({ education }: { education?: any[] }) => {
  if (!education?.length) return null

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {education.map((edu: any, idx: number) => (
        <div key={idx} className="group flex flex-col items-start gap-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-foreground">
              {edu.degree}
            </h3>
            <p className="text-xl font-bold text-muted-foreground">
              {edu.school}
            </p>
            <div className="inline-block px-3 py-1 bg-muted/60 text-foreground text-sm font-semibold tabular-nums rounded-full border border-border/50">
              {edu.startDate ?? "N/A"} — {edu.endDate ?? "N/A"}
            </div>
          </div>
          {edu.description && (
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
