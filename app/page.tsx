import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { BlogSection } from "@/components/sections/Blog";
import { Testimonials } from "@/components/sections/Testimonials";

import { fetchAPI } from "@/lib/fetch-api";
import { Contact } from "@/components/sections/Contact";
import { MiniGames } from "@/components/sections/MiniGames";

export default async function Home() {
  const baseQuery = {
    params: {
      populate: '*'
    }
  }

  const featuredProjectsQuery = {
    params: {
      populate: '*',
      sort: ['dateCreated:desc'],
      filters: {
        featured: {
          $eq: true,
        },
      },
    }
  }
  const allProjectsQuery = {
    params: {
      populate: "*"
    }
  }
  const certificateQuery = {
    params: {
      populate: {
        image: true,
        issuer: {
          populate: {
            image: true
          }
        }
      }
    }
  }
  const [featuredProjects, allProjects, certificates, skills, testimonials, blogs] = await Promise.all([
    fetchAPI('/projects', featuredProjectsQuery),
    fetchAPI('/projects', allProjectsQuery),
    fetchAPI('/certificates', certificateQuery),
    fetchAPI('/skills', baseQuery),
    fetchAPI('/testimonials', baseQuery),
    fetchAPI('/blogs', baseQuery)
  ])
  const statsProps = {
    projects: allProjects.data.length,
    blogs: blogs.data.length,
    certificates: certificates.data.length,
    experience: "3+ years",
  }
  return (
    <main className="min-h-screen">
      <Hero stats={statsProps} />
      {/* <About /> */}
      <Services skills={skills.data} />
      <Projects projects={featuredProjects.data} />
      <Certificates certificates={certificates.data} />
      <BlogSection blogs={blogs.data} />
      <Testimonials testimonials={testimonials.data} />
      <MiniGames />
      <Contact />
    </main>
  );
}
