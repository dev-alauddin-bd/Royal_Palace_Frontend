'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import {
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
} from '@/redux/features/team/teamApi';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: any;
}

export default function TeamFormModal({ isOpen, onClose, member }: TeamFormModalProps) {
  const [createTeamMember] = useCreateTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const isEditMode = !!member;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        role: member.role,
      });
      setImagePreview(member.image);
    } else {
      reset({ name: '', role: '' });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [member, reset, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('role', data.role);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditMode) {
        await updateTeamMember({ id: member._id, data: formData }).unwrap();
      } else {
        await createTeamMember(formData).unwrap();
      }

      toast.success(`Team member ${isEditMode ? 'updated' : 'created'} successfully!`);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-royal-gold/20 text-white max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold royal-gradient-text uppercase tracking-widest text-center">
            {isEditMode ? 'Edit Royal Member' : 'Add New Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
          {/* Image Upload */}
          <div className="space-y-3 flex flex-col items-center">
            <Label className="text-xs font-serif font-bold uppercase tracking-widest text-royal-gold">Member Portrait</Label>
            <div className="relative group">
              <div className="w-40 h-40 border-2 border-dashed border-royal-gold/20 rounded-none overflow-hidden relative bg-white/5">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-foreground/40">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-[10px] tracking-widest uppercase">Select Image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-600 p-1.5 rounded-none shadow-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-serif font-bold uppercase tracking-widest text-royal-gold">Full Name</Label>
              <Input
                {...register('name')}
                placeholder="Enter member name"
                className="bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
              />
              {errors.name && <p className="text-red-500 text-[10px] uppercase">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-serif font-bold uppercase tracking-widest text-royal-gold">Professional Role</Label>
              <Input
                {...register('role')}
                placeholder="e.g. General Manager"
                className="bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
              />
              {errors.role && <p className="text-red-500 text-[10px] uppercase">{errors.role.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 text-xs tracking-widest uppercase rounded-none border border-white/10 hover:bg-white/5">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 royal-button">
              {isSubmitting ? 'SAVING...' : isEditMode ? 'UPDATE MEMBER' : 'ADD MEMBER'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
