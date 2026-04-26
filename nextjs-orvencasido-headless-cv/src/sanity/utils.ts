import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export interface SanityImage {
    asset: {
        _ref: string;
        _type: string;
    };
}

export interface Project {
    title: string;
    image?: SanityImage;
    description?: string;
    technologies?: string[];
    link?: string;
    github?: string;
}

export interface Skill {
    image?: SanityImage;
    skill: string;
    description?: string;
}

export interface Job {
    image?: SanityImage;
    company: string;
    position: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    responsibilities?: string[];
}

export interface Education {
    school: string;
    degree: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface Tech {
    name: string;
    image?: SanityImage;
}

export interface Resume {
    siteTitle?: string;
    favicon?: SanityImage;
    name: string;
    jobTitle?: string;
    phone?: string;
    email?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    profileImage?: SanityImage;
    summary?: string;
    skills?: Skill[];
    workExperience?: Job[];
    projects?: Project[];
    education?: Education[];
    certifications?: string[];
    techStack?: Tech[];
}

export const urlFor = (source: SanityImage | unknown) => (builder ? builder.image(source as Parameters<NonNullable<typeof builder>["image"]>[0]) : null);
