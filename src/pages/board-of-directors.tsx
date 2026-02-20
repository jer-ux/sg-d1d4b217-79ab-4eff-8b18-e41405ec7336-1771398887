import { motion } from "framer-motion";
import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Shield, Users, Award, TrendingUp } from "lucide-react";

export default function BoardOfDirectors() {
  const boardMembers = [
    {
      name: "Jeremiah Shrack",
      title: "Founder & CEO",
      subtitle: "Healthcare Economics & Technology Innovation",
      image: "/jeremiah-shrack-professional.png",
      bio: "Serial entrepreneur and healthcare economics expert with deep expertise in health benefits optimization, data analytics, and AI-driven governance systems. Former actuary and benefits consultant with track record of delivering measurable ROI for clients.",
      linkedin: "https://www.linkedin.com/in/jeremiahshrack/"
    },
    {
      name: "Dr. Jackeline El-Sayed",
      title: "Distinguished Chief Scientist Officer",
      subtitle: "Engineering Leadership & Research Innovation",
      image: "/jackeline-el-sayed.png",
      bio: "Distinguished engineering leader and researcher who recently served as CEO for SAE International, Performance Review Institute, Industry Technologies Consortia & Fullsight Shared Services. Former CEO of the American Society for Engineering Education (ASEE) and Professor Emerita of Mechanical Engineering at Kettering University. Nationally recognized ACE Fellow, NLA Fellow, and ASEE Fellow & Hall of Famer. Led $60+ million in externally funded research projects including NSF's Engineering Workforce of the Future (FREE) and Engineering Postdoctoral Fellowship Program (eFellows).",
      linkedin: ""
    },
    {
      name: "Mike Hamann",
      title: "Board Member",
      subtitle: "Former County Commissioner & Auditor",
      image: "/mike-hamann.png",
      bio: "Experienced public sector leader with deep expertise in fiscal governance, auditing, and operational oversight from his tenure as County Commissioner and Auditor.",
      linkedin: ""
    },
    {
      name: "Dr. Michael Ochieng'",
      title: "Board Member",
      subtitle: "4G & 5G Telecommunications Expert",
      image: "/michael-ochieng.png",
      bio: "Distinguished technology leader with a doctorate specializing in 4G and 5G telecommunications infrastructure. Dr. Ochieng' brings deep technical expertise in next-generation connectivity and digital infrastructure strategy.",
      linkedin: ""
    }
  ];

  return (
    <>
      <Head>
        <title>Board of Directors | SiriusB iQ</title>
        <meta name="description" content="Meet the Board of Directors guiding SiriusB iQ's mission to revolutionize health economics and benefits intelligence." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-black to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="h-12 w-12 text-amber-400" />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  Board of Directors
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Strategic leadership guiding innovation in health economics and benefits intelligence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900/40 to-black/40 border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10">
                    {/* Member Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-500">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Member Info */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-amber-100 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-amber-400 font-semibold mb-4">
                        {member.title}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="py-20 bg-gradient-to-b from-black via-amber-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-100 mb-4">
                Our Guiding Principles
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The values that drive our mission and decision-making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Innovation",
                  description: "Pioneering AI-driven solutions for health economics",
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description: "Transparent governance and ethical data practices",
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "Building partnerships that drive industry transformation",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/40 to-black/40 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500"
                >
                  <value.icon className="h-12 w-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl font-bold text-amber-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}