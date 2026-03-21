"use client";

import { useState } from "react";
import { type Resume } from "@/sanity/utils";

import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { EducationSection } from "./EducationSection";
import { CertificationsSection } from "./CertificationsSection";

type Section = "expertise" | "experience" | "works" | "education" | "certifications";

export default function ResumeTabs({ resume }: { resume: Resume }) {
    const [activeSection, setActiveSection] = useState<Section>("expertise");

    const tabs: { id: Section; label: string }[] = [
        { id: "expertise", label: "Expertise" },
        { id: "experience", label: "Experience" },
        { id: "works", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "certifications", label: "Certifications" },
    ];


    const renderSection = () => {
        switch (activeSection) {
            case "expertise":
                return <SkillsSection skills={resume.skills} />;
            case "experience":
                return <ExperienceSection experience={resume.workExperience} />;
            case "works":
                return <ProjectsSection projects={resume.projects} />;
            case "education":
                return <EducationSection education={resume.education} />;
            case "certifications":
                return <CertificationsSection certifications={resume.certifications} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-12">
            {/* Navigation Tabs */}
            <div className="flex flex-nowrap justify-start sm:justify-center border-b border-border/40 gap-x-8 px-4 pb-0 items-center overflow-x-auto no-scrollbar scroll-smooth">

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`relative pb-4 text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${activeSection === tab.id
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground/70"
                            }`}
                    >

                        {tab.label}
                        {activeSection === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground rounded-full animate-in fade-in duration-500 blur-[0.5px]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {renderSection()}
            </div>
        </div>
    );
}
