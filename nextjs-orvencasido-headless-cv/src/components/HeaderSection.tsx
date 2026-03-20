export interface Resume {
    name: string;
    jobTitle?: string;
    phone?: string;

    email?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    profileImage?: any;
    summary?: string;
    skills?: any[];
    workExperience?: any[];
    projects?: any[];
    education?: any[];
    certifications?: string[];
}

interface HeaderSectionProps {
    resume: Resume;
    profileImageUrl?: string | null;
}

const HeaderSection = ({ resume, profileImageUrl }: HeaderSectionProps) => {
    return (
        <header className="space-y-8">
            <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {resume.name}
                        </h1>
                        {resume.jobTitle && (
                            <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                                {resume.jobTitle}
                            </p>
                        )}
                    </div>


                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                        {resume.phone && (
                            <div className="group/item relative flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer" title="Click to copy">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:scale-110 transition-transform duration-300"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>

                                {/* Phone Number Pop-up */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/item:opacity-100 pointer-events-none group-hover/item:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 z-[60]">
                                    <div className="relative px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border/50 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap text-foreground flex items-center gap-2">
                                        <span className="tabular-nums">{resume.phone}</span>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border/50 rotate-45 -mt-1"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {resume.email && (
                            <a href={`mailto:${resume.email}`} className="group/item relative flex items-center gap-2 hover:text-foreground transition-all duration-300" aria-label="Email">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:scale-110 transition-transform duration-300"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>

                                {/* Email Pop-up */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 z-[60]">
                                    <div className="relative px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border/50 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap text-foreground flex items-center gap-2">
                                        <span>{resume.email}</span>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border/50 rotate-45 -mt-1"></div>
                                    </div>
                                </div>
                            </a>
                        )}

                        {resume.website && (
                            <a href={resume.website} target="_blank" rel="noopener noreferrer" className="group/item flex items-center gap-2 hover:text-foreground transition-all hover:scale-110 duration-300" title="Portfolio" aria-label="Portfolio">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                            </a>
                        )}
                        {resume.linkedin && (
                            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="group/item flex items-center gap-2 hover:text-foreground transition-all hover:scale-110 duration-300" title="LinkedIn" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                        )}
                        {resume.github && (
                            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="group/item flex items-center gap-2 hover:text-foreground transition-all hover:scale-110 duration-300" title="GitHub" aria-label="GitHub">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </a>
                        )}
                    </div>

                </div>

                {profileImageUrl && (
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-foreground/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <img
                            src={profileImageUrl}
                            alt={resume.name}
                            className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover transition-all duration-700 bg-muted"
                        />

                    </div>
                )}

            </div>
        </header>
    )
}

export default HeaderSection;
