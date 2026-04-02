'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// ===== 👥 Team Member Data =====
const teamMembers = [
  {
    name: 'Alexander Windsor',
    role: 'General Manager',
    image: '/images/gn-maneger.avif',
    description:
      'Leading our royal hospitality with 15 years of luxury hotel experience',
    specialty: 'Executive Leadership',
  },
  {
    name: 'Isabella Rosewood',
    role: 'Head Receptionist',
    image: '/images/hd-recep.jpg',
    description:
      'Your first point of contact, ensuring every guest feels like royalty',
    specialty: 'Guest Relations',
  },
  {
    name: 'Sophia Blackwood',
    role: 'Room Service Manager',
    image: '/images/rm-service.webp',
    description: 'Delivering exceptional in-room dining experiences 24/7',
    specialty: 'Premium Service',
  },
  {
    name: 'Victoria Ashford',
    role: 'Housekeeping Supervisor',
    image: '/images/housekeeping_supervisor.jpg',
    description: 'Maintaining the highest standards of cleanliness and comfort',
    specialty: 'Attention to Detail',
  },
];

export default function TeamSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* ===== Section Header with Motion ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 mr-6"></div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-[#bf9310] mr-3" />
              <h2 className="title text-sm font-medium tracking-[0.2em] uppercase">
                Meet Our Team
              </h2>
              <Users className="w-6 h-6 text-[#bf9310] ml-3" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 ml-6"></div>
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-snug text-center max-w-6xl mx-auto text-foreground">
            Dedicated Professionals Behind
            <br />
            Our Royal Experience
          </h1>
        </motion.div>

        {/* ===== Team Cards with Animation ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-main hover:-translate-y-2 p-0 rounded-none">
                <CardContent className="p-0">
                  {/* ==== Image & Badge ==== */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center text-[#bf9310]">
                        <Award className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* ==== Name & Role ==== */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="title font-semibold text-sm uppercase tracking-wide text-[#bf9310]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
