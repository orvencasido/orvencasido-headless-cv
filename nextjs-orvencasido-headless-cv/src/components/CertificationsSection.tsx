export const CertificationsSection = ({ certifications }: { certifications?: string[] }) => {
  if (!certifications?.length) return null

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((c: string, idx: number) => (
          <li key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 hover:border-foreground/10 transition-all duration-300">
            <div className="p-2.5 rounded-xl bg-background border border-border/50 group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div className="flex-1 pt-1.5">
              <p className="text-lg font-bold text-foreground/80 group-hover:text-foreground transition-colors">{c}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
