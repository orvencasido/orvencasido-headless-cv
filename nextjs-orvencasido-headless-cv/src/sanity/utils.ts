import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export const urlFor = (source: any) => (builder ? builder.image(source) : null);

export interface Resume {
    siteTitle?: string;
    favicon?: any;
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
    techStack?: any[];
}
