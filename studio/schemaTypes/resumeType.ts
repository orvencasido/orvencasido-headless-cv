import { defineField, defineType } from 'sanity'

export const resumeType = defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        // defineField({
        //     name: 'slug',
        //     title: 'Slug',
        //     type: 'slug',
        //     options: { source: 'name' },
        //     validation: (rule) => rule.required(),
        // }),
        // Contact Info
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({ name: 'website', title: 'Website / Portfolio', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        // Profile Summary
        defineField({ name: 'summary', title: 'Summary / Objective', type: 'text' }),
        // Skills
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        // Work Experience
        defineField({
            name: 'workExperience',
            title: 'Work Experience',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'job',
                    title: 'Job',
                    fields: [
                        { name: 'company', title: 'Company', type: 'string' },
                        { name: 'position', title: 'Position', type: 'string' },
                        { name: 'startDate', title: 'Start Date', type: 'date' },
                        { name: 'endDate', title: 'End Date', type: 'date' },
                        {
                            name: 'responsibilities',
                            title: 'Responsibilities',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                    ],
                },
            ],
        }),
        // Education
        defineField({
            name: 'education',
            title: 'Education',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'degree',
                    title: 'Degree',
                    fields: [
                        { name: 'school', title: 'School', type: 'string' },
                        { name: 'degree', title: 'Degree', type: 'string' },
                        { name: 'startDate', title: 'Start Date', type: 'date' },
                        { name: 'endDate', title: 'End Date', type: 'date' },
                    ],
                },
            ],
        }),
        // Certifications
        defineField({
            name: 'certifications',
            title: 'Certifications',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        // Projects
        defineField({
            name: 'projects',
            title: 'Projects',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'project',
                    title: 'Project',
                    fields: [
                        { name: 'title', title: 'Project Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                        { name: 'link', title: 'Project Link', type: 'url' },
                        {
                            name: 'technologies',
                            title: 'Technologies Used',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                    ],
                },
            ],
        }),
        // Languages
        defineField({
            name: 'languages',
            title: 'Languages',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        // Hobbies / Interests
        defineField({
            name: 'interests',
            title: 'Hobbies / Interests',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        // Profile Image
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})