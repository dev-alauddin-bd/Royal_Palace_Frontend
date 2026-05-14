// ====================================================
// 🧾 UserProfile Component - Imperial Guest Identity
// ====================================================
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Pencil,
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  Save,
  X,
  MapPin,
  Calendar,
  Lock,
} from 'lucide-react';

import { selectCurrentUser, setUser } from '@/redux/features/auth/authSlice';
import { useUpdateUserMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const UserProfile = () => {
  const userInfo = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const [editedUser, setEditedUser] = useState({
    name: userInfo?.name || '',
    phone: userInfo?.phone || '',
  });

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-royal-gold text-xl font-[var(--font-cinzel)]">
        Imperial credentials not found.
      </div>
    );
  }

  const handleInfoUpdate = async () => {
    try {
      const result = await updateUser({
        id: userInfo._id,
        body: editedUser,
      }).unwrap();

      const { user, accessToken } = result.data;
      dispatch(setUser({ user, token: accessToken }));
      setIsEditing(false);
      toast.success('Imperial identity updated successfully.');
    } catch (err) {
      toast.error('Failed to update credentials.');
    }
  };

  const handleImageUpdate = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append('image', profileImage);

    try {
      setIsUploading(true);
      const result = await updateUser({
        id: userInfo._id,
        body: formData,
      }).unwrap();

      const { user, accessToken } = result.data;
      dispatch(setUser({ user, token: accessToken }));
      setProfileImage(null);
      setPreviewImage(null);
      toast.success('Royal portrait updated.');
    } catch (err) {
      toast.error('Failed to update portrait.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser({
      name: userInfo.name || '',
      phone: userInfo.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      <Toaster position="top-right" />
      
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Guest Identity"
        subtitle="Manage your personal credentials and royal preferences within the palace."
        icon={User}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Left: Profile Card ===== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none p-0">
            {/* Cover Banner Effect */}
            <div className="h-24 bg-gradient-to-r from-royal-gold/20 via-royal-gold/5 to-royal-gold/20" />
            
            <CardContent className="p-8 -mt-12 flex flex-col items-center">
              {/* Avatar Area */}
              <div className="relative mb-6">
                <Avatar className="w-32 h-32 border-4 border-royal-gold/20 shadow-2xl rounded-none">
                  <AvatarImage
                    src={previewImage || userInfo.image || '/images/user-placeholder.png'}
                    alt={userInfo.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-royal-gold/10 text-royal-gold text-3xl font-[var(--font-cinzel)] rounded-none">
                    {userInfo.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <label htmlFor="image-upload" className="absolute bottom-1 right-1 cursor-pointer">
                  <div className="w-10 h-10 bg-royal-gold text-royal-blue flex items-center justify-center hover:bg-royal-gold-dark transition-all shadow-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProfileImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>

              {profileImage && (
                <button
                  onClick={handleImageUpdate}
                  disabled={isUploading}
                  className="royal-button w-full mb-6 !h-10 text-[10px]"
                >
                  {isUploading ? 'UPLOADING...' : 'SAVE ROYAL PORTRAIT'}
                </button>
              )}

              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-foreground">
                  {userInfo.name}
                </h2>
                <Badge className="bg-royal-gold/10 text-royal-gold border-royal-gold/20 font-bold uppercase tracking-widest text-[9px] rounded-none px-4 py-1">
                  {userInfo.role}
                </Badge>
              </div>

              <div className="w-full space-y-4 pt-6 border-t border-royal-gold/5">
                <div className="flex items-center gap-4 text-muted-foreground group">
                  <div className="w-8 h-8 flex items-center justify-center bg-royal-gold/5 border border-royal-gold/10 group-hover:border-royal-gold/30 transition-all">
                    <Mail className="w-3.5 h-3.5 text-royal-gold" />
                  </div>
                  <span className="text-xs font-medium truncate">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground group">
                  <div className="w-8 h-8 flex items-center justify-center bg-royal-gold/5 border border-royal-gold/10 group-hover:border-royal-gold/30 transition-all">
                    <Phone className="w-3.5 h-3.5 text-royal-gold" />
                  </div>
                  <span className="text-xs font-medium">{userInfo.phone || 'Registry incomplete'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== Right: Detailed Information ===== */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Identity Form Card */}
          <Card className="glass-panel border-royal-gold/10 shadow-sm dark:shadow-none p-0">
            <CardHeader className="p-8 border-b border-royal-gold/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-[var(--font-cinzel)] font-bold text-foreground">
                  Identity Details
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Verified credentials in the royal registry.</p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 h-10 px-6 border border-royal-gold/20 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-royal-gold/10 transition-all"
                >
                  <Pencil className="w-3 h-3 text-royal-gold" /> Edit Info
                </button>
              ) : (
                <div className="flex gap-3">
                   <button
                    onClick={handleInfoUpdate}
                    className="royal-button !h-10 px-6 text-[10px]"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    onClick={handleCancel}
                    className="h-10 px-6 border border-rose-500/20 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/5 transition-all"
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </CardHeader>

            <CardContent className="p-8 grid gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Full Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:border-royal-gold/50 transition-all ring-0 focus-visible:ring-0"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-4 bg-royal-gold/5 border border-royal-gold/5 text-foreground font-medium text-sm">
                      {userInfo.name}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Contact Number</Label>
                  {isEditing ? (
                    <Input
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      className="h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:border-royal-gold/50 transition-all ring-0 focus-visible:ring-0"
                      placeholder="Add phone to registry..."
                    />
                  ) : (
                    <div className="h-12 flex items-center px-4 bg-royal-gold/5 border border-royal-gold/5 text-foreground font-medium text-sm">
                      {userInfo.phone || 'No phone registered'}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Email Address</Label>
                  <div className="h-12 flex items-center px-4 bg-transparent border border-dashed border-royal-gold/20 text-muted-foreground text-sm cursor-not-allowed">
                    {userInfo.email}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Access Role</Label>
                  <div className="h-12 flex items-center px-4 bg-transparent border border-dashed border-royal-gold/20 text-muted-foreground text-sm cursor-not-allowed capitalize">
                    {userInfo.role} Registry
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security Card */}
          <Card className="glass-panel border-royal-gold/10 shadow-sm dark:shadow-none p-0 overflow-hidden">
             <div className="p-8 flex items-center justify-between bg-royal-gold/5">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 flex items-center justify-center bg-royal-gold/10 border border-royal-gold/20">
                      <Shield className="w-5 h-5 text-royal-gold" />
                   </div>
                   <div>
                      <h4 className="font-[var(--font-cinzel)] font-bold text-foreground">Imperial Security</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Enhanced protection active</p>
                   </div>
                </div>
                <button className="h-10 px-6 border border-royal-gold/20 text-[10px] font-bold uppercase tracking-widest text-royal-gold hover:bg-royal-gold/10 transition-all flex items-center gap-2">
                   <Lock className="w-3 h-3" /> UPDATE PASSWORD
                </button>
             </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
