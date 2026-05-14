'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserCheck, Edit2, Trash2, Building } from 'lucide-react';
import {
  useGetAllTeamMembersQuery,
  useDeleteTeamMemberMutation,
} from '@/redux/features/team/teamApi';
import toast, { Toaster } from 'react-hot-toast';
import TeamFormModal from '@/components/modal/team-form-modal';
import Loader from '@/components/shared/Loader';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import { motion } from 'framer-motion';

export default function TeamManagementPage() {
  const { data: teamData, isLoading } = useGetAllTeamMembersQuery(undefined);
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = teamData?.data?.data || [];
  const filteredMembers = teamMembers.filter((member: any) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setSelectedMember(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member from the royal roster?')) {
      try {
        await deleteTeamMember(id).unwrap();
        toast.success('Member removed from roster');
      } catch (error) {
        toast.error('Failed to remove member.');
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Manage Team"
        subtitle="Manage the staff members and professionals of the palace."
        icon={Building}
        rightElement={
          <button
            onClick={handleOpenCreateModal}
            className="royal-button !h-12 flex items-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            ADD NEW MEMBER
          </button>
        }
      />

      {/* ===== Search & Filters ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 shadow-sm dark:shadow-none">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
          <Input
            placeholder="Search by name or professional role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white/5 border-royal-gold/10 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* ===== Team Roster Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMembers.map((member: any, idx: number) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="glass-panel group overflow-hidden border-royal-gold/10 hover:border-royal-gold/40 transition-all duration-500 rounded-none p-0 h-full flex flex-col shadow-sm dark:shadow-none">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image || '/images/team-placeholder.webp'}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-[var(--font-cinzel)] font-bold text-white mb-1 group-hover:text-royal-gold transition-colors">{member.name}</h3>
                  <p className="text-royal-gold/80 text-[10px] font-bold tracking-[0.25em] uppercase">{member.role}</p>
                </div>

                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <button
                    className="w-10 h-10 bg-black/60 backdrop-blur-md hover:bg-royal-gold text-white hover:text-black flex items-center justify-center border border-white/10 transition-all"
                    onClick={() => handleOpenEditModal(member)}
                    title="Edit Details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 bg-black/60 backdrop-blur-md hover:bg-rose-600 text-white flex items-center justify-center border border-white/10 transition-all"
                    onClick={() => handleDeleteMember(member._id)}
                    title="Remove Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="col-span-full py-24 text-center glass-panel border-dashed border-royal-gold/20 flex flex-col items-center justify-center">
            <UserCheck className="w-16 h-16 text-royal-gold/20 mb-6" />
            <h3 className="text-xl font-[var(--font-cinzel)] font-bold text-muted-foreground/40 italic">
              No Royal Staff Recorded
            </h3>
          </div>
        )}
      </div>

      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />
      <Toaster position="top-right" />
    </div>
  );
}
