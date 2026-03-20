import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const certifications = [
  { title: 'Oracle Cloud Infrastructure Certified Multicloud Architect Professional Certificate', date: 'August 2025', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9338705C4B55818863D08A53711B175A957EEEBDFC5D47EDEB8CEC2D38E1FF00' },
  { title: 'Oracle Cloud Infrastructure Certified Data Science Professional Certificate', date: 'July 2025', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9BB47D7D40E94AC039DBF2B4560EEE623880F1948D56C2C8698C353974513501' },
  { title: 'Oracle APEX Cloud Developer Professional Certificate', date: 'April 2025', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9432738797EFEF586914135925985DF1CA616BF7AE0E498F3752F0AE92D1D799' },
  { title: 'Google UX Design Professional Certificate', date: 'March 2025', href: 'https://www.coursera.org/account/accomplishments/professional-cert/0ZQ9Q6DO1W3D?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof' },
  { title: 'Oracle AI Vector Search Professional Certificate', date: 'February 2025', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=755AB5D36F87B1B0892F6DC4D8D245AA12FE2648ACC6B65634AF45AAE17A85D5' },
  { title: 'Google Certified Associate Cloud Engineer Certificate', date: 'December 2024', href: 'https://www.credly.com/badges/324357f7-ee0c-4d9d-8d82-03b1de458034/public_url' },
  { title: 'Java Programming Online Course Certificate', date: 'December 2024', href: 'https://www.credly.com/badges/324357f7-ee0c-4d9d-8d82-03b1de458034/public_url' },
  { title: 'Salesforce Certified AI Associate Certificate', date: 'November 2024', href: 'https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=dbmbn/2AmDRixD/4+nJekvtmeClJ18ZrUJrzaW2yHGI6euzmSy7r79Q19Y4uDmZv' },
  { title: 'Git/GitHub Foundations Certificate', date: 'November 2024', href: 'https://www.credly.com/badges/6252e987-76f5-4de9-939b-7d6707cf10aa/public_url' },
  { title: 'Object-Oriented Programming in Java Certificate', date: 'November 2024', href: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/e1b935db35561389ed3b4c92c5389371cad3e5c2' },
  { title: 'Oracle Generative AI Professional Certificate', date: 'July 2024', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9338705C4B55818863D08A53711B175A3C3CFAC77DC256CE57D901155B24FB45' },
  { title: 'Oracle Cloud Infrastructure AI Associate Certificate', date: 'May 2024', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=138D676BA7BDCBFF3B1AD6661ADBC47FF5C9D1111AAE869A4113160289E3C3B9' },
  { title: 'Oracle Cloud Infrastructure Foundations Associate Certificate', date: 'May 2024', href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=1D807CF52A9ECD422BDD9125B48099704C8A7C0BFA30A5CB43437FD86BB7B910' },
  { title: 'Google Introduction to Generative AI Learning Path Public Profile', date: 'June 2024', href: 'https://www.skills.google/public_profiles/f601c49f-698b-4685-944c-03a5eb7ef722' },
  { title: 'Amazon Web Services Cloud Computing Public Profile', date: 'November 2023', href: 'https://www.credly.com/users/venkata-manikanta-sai-bugga/badges#credly' },
  { title: 'CompTIA Security+ Certificates', date: 'July 2023', href: 'https://www.dropbox.com/scl/fo/n9dosn7i0hzouckq1zywp/AES5MHZyPrV7_DzRwjrKogE?rlkey=gki85t9n9uyj6ska0wso8duf6&e=1&st=3otgvx9a&dl=0' },
  { title: 'Intermediate SQL Queries, Joining Data In SQL, NoSQL Concepts Certificates', date: 'May 2023', href: 'https://www.dropbox.com/scl/fo/3ihi12gm4rfhfc26m849r/ABqYPf2K89E7feICMMbz86I?rlkey=i1qbf77rlruioz5783fdow8ve&e=1&st=rl08fee3&dl=0' },
  { title: 'Python Certificate', date: 'April 2023', href: 'https://www.hackerrank.com/certificates/5af73454b3dd?utm_medium=email&utm_source=mail_template_1393&utm_campaign=hrc_skills_certificate' },
]

export default function AboutPage() {
  return (
    <>
      <main className="bg-transparent pt-32 pb-24">
        <div className="container-main space-y-8">
          <section className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr] md:items-start">
              <div className="flex flex-col items-start">
                <div className="relative h-28 w-28 overflow-hidden rounded-[28px] bg-[var(--bg2)] shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <Image src="/bac1.png" alt="VB logo" fill className="object-cover" />
                </div>
                <a
                  href="/Venkata_Manikanta_Sai_Bugga_Resume.pdf"
                  download
                  className="mt-5 inline-flex items-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-700 text-white transition-opacity duration-200 hover:opacity-90"
                >
                  Download Resume
                </a>
              </div>

              <div>
                <div className="mb-3 text-[0.72rem] font-700 uppercase tracking-[0.18em] text-[var(--gold)]">
                  Professional Summary
                </div>
                <p className="max-w-[980px] text-[1.02rem] leading-[1.95] text-[var(--text2)]">
                  Motivated and technically skilled IT professional with a Master&apos;s degree in Information Technology and a strong grounding in software development, cloud computing, and data analysis. Exposed to Java, Python, and SQL and with hands-on experience in machine learning, blockchain, and artificial intelligence. Holding certifications in Oracle Cloud, Google Cloud, and Salesforce AI. Demonstrated record of delivering useful solutions through technical effort in data visualization, automation, and optimization of systems. Interested in applying analytical thinking and advanced technical expertise to innovative and visionary technology groups.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <h2
                className="mb-8 text-[2.2rem] font-800 tracking-[-0.04em] text-[var(--text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Experience
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-[1.22rem] font-700 text-[var(--text)]">University of North Texas</div>
                  <div className="text-[0.98rem] text-[var(--text3)]">Denton, TX</div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[1.08rem] font-700 text-[var(--gold)]">Event Setup Student Assistant</div>
                  <div className="text-sm text-[var(--text3)]">Aug 2023 - May 2024</div>
                </div>

                <div className="space-y-3 text-[0.98rem] leading-[1.9] text-[var(--text2)]">
                  <p>
                    Demonstrated outstanding problem-solving and organizational skills to handle event configurations, workflow optimization, and timely delivery of output.
                  </p>
                  <p>
                    Applied technical problem solving skills to install and maintain audiovisual equipment, identifying and repairing problems to provide seamless operation.
                  </p>
                  <p>
                    Improved attention to detail through organizing layouts that promoted maximum efficiency and comfort of use, demonstrating skill in planning and implementing projects successfully.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <h2
                className="mb-8 text-[2.2rem] font-800 tracking-[-0.04em] text-[var(--text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Education
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[1.18rem] font-700 text-[var(--gold)]">Master of Science in Information Technology</div>
                    <div className="text-sm text-[var(--text3)]">Grade: 3.7</div>
                  </div>
                  <div className="mt-1 text-[1rem] text-[var(--text)]">University of North Texas</div>
                  <div className="mt-1 text-[0.96rem] text-[var(--text3)]">Denton, TX</div>
                  <p className="mt-3 text-[0.96rem] leading-[1.85] text-[var(--text2)]">
                    Relevant Coursework: Information System Development, Information Technology Security, Networking and Telecommunications, Database Management Systems, Programming for Business Analytics, and Data Visualization.
                  </p>
                </div>

                <div className="border-t border-[var(--border)] pt-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[1.18rem] font-700 text-[var(--gold)]">Bachelor Of Science</div>
                    <div className="text-sm text-[var(--text3)]">Grade: 3.3</div>
                  </div>
                  <div className="mt-1 text-[1rem] text-[var(--text)]">Vignan University</div>
                  <div className="mt-1 text-[0.96rem] text-[var(--text3)]">India</div>
                  <p className="mt-3 text-[0.96rem] leading-[1.85] text-[var(--text2)]">
                    Relevant Coursework: Computer Science, Statistics, and Mathematics.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-3 text-[0.72rem] font-700 uppercase tracking-[0.18em] text-[var(--gold)]">
                  Certifications
                </div>
                <h2
                  className="text-[2.2rem] font-800 tracking-[-0.04em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Credentials and certificates
                </h2>
              </div>
              <div className="text-sm text-[var(--text3)]">Add your real certificate links by replacing each `#`.</div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {certifications.map((item) => (
                <div
                  key={`${item.title}-${item.date}`}
                  className="rounded-[24px] border border-[var(--border)] bg-[var(--bg2)] p-5 transition-all duration-200 hover:border-[var(--gold-glow)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[1rem] font-700 leading-[1.6] text-[var(--text)]">{item.title}</div>
                      <div className="mt-2 text-sm text-[var(--text3)]">{item.date}</div>
                    </div>
                    <Link
                      href={item.href}
                      target="_blank"
                      className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors duration-200 hover:text-[var(--gold)]"
                    >
                      <span aria-hidden>{'>'}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
