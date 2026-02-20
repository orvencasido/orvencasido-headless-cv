import { PortableText, type SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/client"

const RESUMES_QUERY = `*[_type == "resume"][0]` // fetch first resume

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null
const urlFor = (source: any) => (builder ? builder.image(source) : null)

const options = { next: { revalidate: 30 } }

export default async function IndexPage() {
  const resume = await client.fetch<SanityDocument>(RESUMES_QUERY, {}, options)

  if (!resume) return <p>No resume found</p>

  const profileImageUrl = resume.profileImage
    ? urlFor(resume.profileImage)?.width(200).height(200).url()
    : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
      {/* Profile */}
      <div className="flex items-center gap-6">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt={resume.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{resume.name}</h1>
          <div className="text-sm text-gray-600">
            {resume.email && <p>Email: {resume.email}</p>}
            {resume.phone && <p>Phone: {resume.phone}</p>}
            {resume.website && (
              <p>
                Website: <a href={resume.website}>{resume.website}</a>
              </p>
            )}
            {resume.linkedin && (
              <p>
                LinkedIn: <a href={resume.linkedin}>{resume.linkedin}</a>
              </p>
            )}
            {resume.github && (
              <p>
                GitHub: <a href={resume.github}>{resume.github}</a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Summary</h2>
          <p>{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            {resume.skills.map((skill: string, idx: number) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          {resume.workExperience.map((job: any, idx: number) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold">{job.position} @ {job.company}</h3>
              <p className="text-sm text-gray-600">
                {job.startDate ?? "N/A"} - {job.endDate ?? "Present"}
              </p>
              {job.responsibilities?.length && (
                <ul className="list-disc list-inside">
                  {job.responsibilities.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Education</h2>
          {resume.education.map((edu: any, idx: number) => (
            <div key={idx}>
              <p>{edu.degree} - {edu.school}</p>
              <p className="text-sm text-gray-600">{edu.startDate ?? "N/A"} - {edu.endDate ?? "N/A"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Certifications</h2>
          <ul className="list-disc list-inside">
            {resume.certifications.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
          </ul>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {resume.projects.map((p: any, idx: number) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold">{p.title}</h3>
              {p.description && <p>{p.description}</p>}
              {p.link && <a href={p.link} className="text-blue-500 underline">{p.link}</a>}
              {p.technologies?.length && <p className="text-sm text-gray-600">Technologies: {p.technologies.join(", ")}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Languages</h2>
          <p>{resume.languages.join(", ")}</p>
        </div>
      )}

      {/* Interests */}
      {resume.interests?.length && (
        <div className="prose">
          <h2 className="text-2xl font-semibold">Hobbies / Interests</h2>
          <p>{resume.interests.join(", ")}</p>
        </div>
      )}
    </main>
  )
}