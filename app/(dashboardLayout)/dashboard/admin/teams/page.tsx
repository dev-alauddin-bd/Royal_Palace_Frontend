'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserCheck, Edit2, Trash2 } from 'lucide-react';
import {
  useGetAllTeamMembersQuery,
  useDeleteTeamMemberMutation,
} from '@/redux/features/team/teamApi';
import toast, { Toaster } from 'react-hot-toast';
import TeamFormModal from '@/components/modal/team-form-modal';

export default function TeamManagementPage() {
  const { data: teamData, isLoading } = useGetAllTeamMembersQuery(undefined);
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = teamData?.data || [];
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
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await deleteTeamMember(id).unwrap();
        toast.success('Team member removed successfully!');
      } catch (error) {
        toast.error('Failed to remove team member.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-royal-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-royal-gold font-serif font-bold tracking-widest uppercase animate-pulse">
            Summoning the Royal Team...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold royal-gradient-text tracking-tight">
            Team Management
          </h1>
          <p className="text-foreground/60 text-sm font-light mt-2 tracking-widest uppercase">
            Oversee your royal staff and professionals
          </p>
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className="royal-button !px-8 !py-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          ADD NEW MEMBER
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="glass-panel border-royal-gold/10">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold" />
            <Input
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold transition-all h-14 rounded-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMembers.map((member: any) => (
          <Card key={member._id} className="glass-panel group overflow-hidden border-royal-gold/10 hover:border-royal-gold/40 transition-all duration-500 rounded-none p-0">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={member.image || '/placeholder.svg'}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-obsidian via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-serif font-bold text-white mb-1">{member.name}</h3>
                <p className="text-royal-gold text-xs font-bold tracking-[0.2em] uppercase">{member.role}</p>
              </div>

              {/* Action Overlays */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  size="icon"
                  className="bg-white/10 backdrop-blur-md hover:bg-royal-gold hover:text-royal-obsidian rounded-full border border-white/20"
                  onClick={() => handleOpenEditModal(member)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  className="bg-white/10 backdrop-blur-md hover:bg-red-600 rounded-full border border-white/20"
                  onClick={() => handleDeleteMember(member._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredMembers.length === 0 && (
          <div className="col-span-full py-20 text-center glass-panel border-dashed border-royal-gold/20">
            <UserCheck className="w-16 h-16 text-royal-gold/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-foreground/40 italic">
              No Royal Members Found
            </h3>
          </div>
        )}
      </div>

      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />
    </div>
  );
}
