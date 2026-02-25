// Project data structure matching Strapi CMS model
export interface Project {
    id?: number
    title: string
    shortDescription: string
    image: {
        url: string
        alternativeText?: string
    }
    stackIcons: string
    category: string
    detailedDescription?: Array<{
        value: string
    }>
    longDescription?: Array<{
        type: string
        children: Array<{ type: string; text: string }>
    }>
    link?: {
        github?: string
        demo?: string
    }
    techStack?: Array<{
        value: string
    }>
    projectType?: string
    featured?: boolean
    visibility?: 'public' | 'private'
    dateCreated?: string
    metadata?: {
        year?: number
        role?: string
        organization?: string
    }
    slug?: string
}

// Certificate data structure matching Strapi CMS model
export interface Certificate {
    id?: number
    href?: string
    issuer: {
        name: string
        image: {
            url: string
            alternativeText?: string
        }
    }
    title: string
    dateIssued: string
    image: {
        url: string
        alternativeText?: string
    }
    category: string
}

// Blog data structure matching Strapi CMS model
export interface Blog {
    id?: number
    image: { url: string }
    title: string
    description: string
    link: string
    tags: Array<{ value: string }>
    publishedDate?: string
    readTime?: number
    isExternal?: boolean
}

// Testimonial data structure matching Strapi CMS model
export interface Testimonial {
    id?: number
    name: string
    position: string
    message: string
    avatar?: string
    company?: string
}

// Skill data structure for infinite scroll
export interface Skill {
    name: string
    stackIcon?: string
    category?: string
}

// Stats for hero section
export interface Stats {
    projects: number
    blogs: number
    certificates?: number
    experience?: string
}

