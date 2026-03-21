import { defineField, defineType } from 'sanity'

export const resumeType = defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Website Tab Title',
            type: 'string',
            description: 'The title that appears in the browser tab (e.g. "Orven Casido | DevOps Engineer")',
        }),
        defineField({
            name: 'favicon',
            title: 'Website Favicon / Icon',
            type: 'image',
            options: { hotspot: true },
            description: 'The icon that appears in the browser tab.',
        }),
        defineField({
            name: 'name',

            title: 'Full Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'jobTitle',
            title: 'Job Title',
            type: 'string',
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
        // Tech Stack
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tech',
                    title: 'Technology',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'image', title: 'Logo / Icon', type: 'image', options: { hotspot: true } },
                    ],
                }
            ],
        }),
        // Profile Summary
        defineField({ name: 'summary', title: 'Summary / Objective', type: 'text' }),

        // Skills
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'skill',
                    title: 'Skill',
                    fields: [
                        { name: 'image', title: 'Skill Image', type: 'image', options: { hotspot: true } },
                        { name: 'skill', title: 'Skill', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                    ],
                }
            ],
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
                        { name: 'image', title: 'Job Image', type: 'image', options: { hotspot: true } },
                        { name: 'company', title: 'Company', type: 'string' },
                        { name: 'position', title: 'Position', type: 'string' },
                        { name: 'startDate', title: 'Start Date', type: 'date' },
                        { name: 'endDate', title: 'End Date', type: 'date' },
                        { name: 'description', title: 'Quick Description', type: 'text' },
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
                        // {
                        //     name: 'image',
                        //     title: 'School Logo / Image',
                        //     type: 'image',
                        //     options: { hotspot: true },
                        // },
                        { name: 'startDate', title: 'Start Date', type: 'date' },
                        { name: 'endDate', title: 'End Date', type: 'date' },
                        { name: 'description', title: 'Description', type: 'text' },
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
                        {
                            name: 'slug',
                            title: 'Slug',
                            type: 'slug',
                            options: { source: (doc: any, options: any) => options.parent.title },
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'image',
                            title: 'Project Image',
                            type: 'image',
                            options: { hotspot: true },
                        },
                        { name: 'description', title: 'Description', type: 'text' },
                        {
                            name: 'content',
                            title: 'Detailed Content',
                            type: 'array',
                            of: [{ type: 'block' }],
                        },
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
        // // Interests
        // defineField({
        //     name: 'interests',
        //     title: 'Interests',
        //     type: 'array',
        //     of: [{ type: 'string' }],
        // }),
        // Profile Image
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
        // School Image
        // defineField({
        //     name: 'schoolImage',
        //     title: 'School Image',
        //     type: 'image',
        //     options: { hotspot: true },
        // }),
    ],
})