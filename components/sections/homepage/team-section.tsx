'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetAllTeamMembersQuery } from '@/redux/features/team/teamApi';

export default function TeamSection() {
  const { data: teamData, isLoading } = useGetAllTeamMembersQuery(undefined);
  const teamMembers = Array.isArray(teamData?.data?.data) ? teamData.data.data : [];

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-royal-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-background">
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
            <div className="h-px bg-royal-gold/20 w-12 md:w-32 mr-6"></div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-royal-gold mr-4" />
              <h2 className="royal-label">
                Meet Our Team
              </h2>
              <Users className="w-5 h-5 text-royal-gold ml-4" />
            </div>
            <div className="h-px bg-royal-gold/20 w-12 md:w-32 ml-6"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-center max-w-5xl mx-auto">
            Dedicated Professionals Behind <span className="text-royal-gold italic">Our Royal Experience</span>
          </h1>
        </motion.div>

        {/* ===== Team Cards with Animation ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member: any, index: number) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 bg-royal-gold/5 backdrop-blur-md hover:-translate-y-2 p-0 rounded-none border border-royal-gold/10 shadow-sm dark:shadow-none">
                <CardContent className="p-0">
                  {/* ==== Image & Badge ==== */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center text-royal-gold">
                        <Award className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* ==== Name & Role ==== */}
                  <div className="p-6 text-center">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="font-serif font-bold text-xs uppercase tracking-[0.2em] text-royal-gold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {teamMembers.length === 0 && !isLoading && (
          <div className="text-center text-foreground/40 font-serif italic py-12">
            Our royal team members will be introduced soon...
          </div>
        )}
      </div>
    </section>
  );
}
