// ====================================================
// 🧾 UserProfile Component - Editable Profile with Image Upload
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

const UserProfile = () => {
  // ===== 🔹 Select current user info from redux store =====
  const userInfo = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  // ===== 🔹 Local state for editing, image upload, and edited fields =====
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // RTK Query mutation for updating user info/image
  const [updateUser] = useUpdateUserMutation();

  // Edited user data state
  const [editedUser, setEditedUser] = useState({
    name: userInfo?.name || '',
    phone: userInfo?.phone || '',
  });

  // ===== 🔹 Clean up preview image URL on unmount or when changed =====
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // ===== 🔹 If no user info, show error =====
  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1f25] text-red-400 text-xl">
        User not found
      </div>
    );
  }

  // ===== 🔹 Handle profile info update =====
  const handleInfoUpdate = async () => {
    try {
      const result = await updateUser({
        id: userInfo._id,
        body: editedUser,
      }).unwrap();

      const { user, accessToken } = result.data;
      dispatch(setUser({ user, token: accessToken }));
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user info:', err);
    }
  };

  // ===== 🔹 Handle profile image upload =====
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
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // ===== 🔹 Cancel editing and reset form to original user data =====
  const handleCancel = () => {
    setEditedUser({
      name: userInfo.name || '',
      phone: userInfo.phone || '',
    });
    setIsEditing(false);
  };

  // ===== 🔹 Map user role to badge style =====
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'receptionist':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      default:
        return 'bg-main text-foreground border border-text-foreground';
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* ===== 🔹 Profile Title ===== */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== 🔹 Profile Image Section ===== */}
          <div>
            <Card className="bg-main border">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="w-32 h-32 border-4 border-orange-500/30">
                    <AvatarImage
                      src={
                        previewImage ||
                        userInfo.image ||
                        '/placeholder.svg?height=128&width=128'
                      }
                      alt={userInfo.name}
                    />
                    <AvatarFallback className="bg-main text-foreground text-2xl">
                      {userInfo.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <label htmlFor="image-upload">
                    <Button
                      asChild
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-9 h-9 bg-orange-500 hover:bg-orange-600"
                      aria-label="Upload profile image"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
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

                {/* Upload button only visible when an image is selected */}
                {profileImage && (
                  <Button
                    onClick={handleImageUpdate}
                    size="sm"
                    disabled={isUploading}
                    className="w-full bg-orange-500 hover:bg-orange-600 mb-2"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Uploading...
                      </span>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                )}

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {userInfo.name}
                </h2>

                <Badge className={`mb-4 ${getRoleBadgeColor(userInfo.role)}`}>
                  {userInfo.role.charAt(0).toUpperCase() +
                    userInfo.role.slice(1)}
                </Badge>

                <div className="space-y-2 text-foreground text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userInfo.email}
                  </div>
                  {userInfo.phone && (
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      {userInfo.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ===== 🔹 Profile Info Form Section ===== */}
          <div className="lg:col-span-2">
            <Card className="bg-main border">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-foreground">
                  Profile Information
                </CardTitle>

                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="bg-slate-700/50 border-slate-600 text-foreground hover:bg-slate-700"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleInfoUpdate}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="bg-slate-700/50 border-slate-600 text-foreground hover:bg-slate-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                      className="bg-slate-700/50 border-slate-600 text-foreground placeholder:text-foreground focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <User className="w-5 h-5 text-foreground" />
                      {userInfo.name}
                    </div>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editedUser.phone}
                      type="tel"
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                      className="bg-slate-700/50 border-slate-600 text-foreground placeholder:text-foreground focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <Phone className="w-5 h-5 text-foreground" />
                      {userInfo.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Role Display */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Role</Label>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <Shield className="w-5 h-5 text-foreground" />
                    <span className="capitalize text-foreground">
                      {userInfo.role}
                    </span>
                    <Badge
                      className={`ml-auto ${getRoleBadgeColor(userInfo.role)}`}
                    >
                      {userInfo.role === 'admin'
                        ? 'Administrator'
                        : userInfo.role === 'receptionist'
                          ? 'Receptionist'
                          : 'Guest'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
