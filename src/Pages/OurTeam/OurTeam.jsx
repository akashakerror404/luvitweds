import React from 'react'
import { motion } from 'framer-motion'

// ASSET IMPORTS
import OUR_TEAM1 from '../../assets/OUR_TEAM/OUR_TEAM1.jpg';
import OUR_TEAM2 from '../../assets/OUR_TEAM/OUR_TEAM2.jpg';
import OUR_TEAM3 from '../../assets/OUR_TEAM/OUR_TEAM3.jpg';
import OUR_TEAM4 from '../../assets/OUR_TEAM/OUR_TEAM4.jpg';
import OUR_TEAM5 from '../../assets/OUR_TEAM/OUR_TEAM5.jpg';
import OUR_TEAM6 from '../../assets/OUR_TEAM/OUR_TEAM6.jpg';
import OUR_TEAM7 from '../../assets/OUR_TEAM/OUR_TEAM7.jpg';

function OurTeam() {
  const teamMembers = [
    {
      name: "Akash Ak",
      role: "Founder & Lead Photographer",
      image: OUR_TEAM4,
      description: "Founder of Luvit Weds and the creative force behind the lens, Akash has documented 150+ weddings with a sharp eye for detail and emotion. He focuses on capturing real moments and turning them into timeless visual stories.",
      specialties: ["Wedding", "Fashion", "Portraits"]
    },
    {
      name: "Dinoop",
      role: "Co-Founder & Lead Creative",
      image: OUR_TEAM2,
      description: "Co-Founder of Luvit Weds, Dinoop leads the creative vision with a strong focus on product narratives and ad shoots. His eye for lighting and detail brings brand stories to life with striking visual impact.",
      specialties: ["Product", "Ad Shoots", "Lighting"]
    },
    {
      name: "Harshan",
      role: "Cinematographer",
      image: OUR_TEAM5,
      description: "Harshan is a skilled cinematographer who brings stories to life through motion. With a strong sense of framing, movement, and emotion, he captures cinematic visuals that elevate every project.",
      specialties: ["Cinematography", "Storytelling", "Visual Direction"]
    },
    {
  name: "Anjana",
  role: "Manager",
  image: OUR_TEAM7,
  description: "Anjana ensures smooth coordination across all projects, managing client communications and production workflows with efficiency. Her organizational skills and attention to detail help deliver projects on time with consistent quality.",
  specialties: ["Project Management", "Client Coordination", "Operations"]
},
    {
      name: "Sreeraj",
      role: "Visual Editor",
      image: OUR_TEAM1,
      description: "Sreeraj bridges the gap between the raw lens and the final masterpiece, crafting cinematic stories through expert post-production.",
      specialties: ["Editing", "Cinema", "Post"]
    },
{
  name: "Ranjith",
  role: "Cinematographer",
  image: OUR_TEAM6,
  description: "Ranjith is a passionate cinematographer who captures moments with a cinematic perspective. His focus on composition and movement helps create visually engaging and emotionally rich films.",
  specialties: ["Cinematography", "Camera Work", "Visual Storytelling"]
},

    {
      name: "Asnayin",
      role: "Wedding Specialist",
      image: OUR_TEAM3,
      description: "Passionate about the silent language of emotions, Asnayin preserves the joy and elegance of every celebration she witnesses.",
      specialties: ["Candid", "Pre-Wedding", "Elegance"]
    },



  ]

  return (
    <div className="min-h-screen bg-[#f0e9e0] text-[#2d2d2d] pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* --- SECTION HEADER --- */}
        <header className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#8ba88e] font-montserrat font-bold block mb-4"
          >
            Behind the Lens
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-playfair italic leading-tight"
          >
            The Artists <span className="not-italic">&</span> Storytellers
          </motion.h1>
          <div className="w-16 h-[1px] bg-black/20 mx-auto mt-12" />
        </header>

        {/* --- TEAM GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#e5dfd5] mb-6 shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text Content */}
              <div className="space-y-3 px-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-playfair">{member.name}</h3>
                  <span className="text-[9px] tracking-widest text-gray-400 uppercase font-montserrat italic">0{index + 1}</span>
                </div>

                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8ba88e] font-bold">
                  {member.role}
                </p>

                <p className="text-xs text-gray-500 font-montserrat leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500 italic">
                  "{member.description}"
                </p>

                {/* Specialties Tags */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {member.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="text-[9px] tracking-widest uppercase border border-black/10 px-2 py-1 text-gray-400 group-hover:text-black group-hover:border-black/30 transition-colors"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <footer className="mt-40 text-center">
          <div className="h-[1px] bg-black/5 w-full mb-20" />
          <h2 className="text-3xl font-playfair italic mb-8">Want to collaborate with us?</h2>
          <button className="text-[10px] tracking-[0.5em] uppercase border border-black px-10 py-4 hover:bg-black hover:text-white transition-all duration-500">
            Work with our collective
          </button>
        </footer>
      </div>
    </div>
  )
}

export default OurTeam