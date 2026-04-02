'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import toast, { Toaster } from 'react-hot-toast';
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from '@/redux/features/room/room.api';
import { IRoom, RoomType } from '@/types/room.interface';

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;

  room?: IRoom;
}

// ==============Zod schema for validation========================
const roomSchema = z.object({
  roomNumber: z.string().min(1),
  floor: z.number().min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(RoomType),
  price: z.number().min(1),
  features: z.array(z.string()),
  images: z.any().optional(), // Will handle as FileList
  bed: z.object({
    type: z.string().min(1, 'Bed type is required'),
    count: z.number().min(1, 'At least 1 bed required'),
  }),

  // 👨‍👩‍👧 Add adults and children
  adults: z.number().min(1, 'At least 1 adult'),
  children: z.number().min(0),
});

type RoomFormData = z.infer<typeof roomSchema>;

export default function RoomFormModal({
  isOpen,
  onClose,
  room,
}: RoomFormModalProps) {
  const [updateRoom] = useUpdateRoomMutation();
  const [createRoom] = useCreateRoomMutation();
  const isEditMode = !!room;
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomNumber: '11',
      floor: 1,
      title: 'luxury Hotel',
      description:
        'Deluxe Rooms are Spacious 400 square foot Rooms cater to your comfort to the fullest. It include elegant imported parquet floors, King size bed or twin bed, wall mounted LCD screen television, in room bathtub and a bathroom with high quality fittings comprising of a luxurious walk in glass shower cubicle. Large elegant wooden wardrobes with Electronic Safe assures safety of client’s valuables. A sleek work desk with a chair and Task Lamp, well stocked mini bar, and uninterrupted High speed Wi-Fi internet',
      type: RoomType.Deluxe,
      price: 1,
      features: ['King/Queen bed', 'View balcony', 'Attached luxury bathroom'],
      bed: {
        type: 'king',
        count: 1,
      },
      adults: 2,
      children: 2,
    },
  });

  // ✅ Update form when editing
  useEffect(() => {
    if (room) {
      reset({
        roomNumber: room.roomNumber,
        floor: room.floor,
        title: room.title,
        description: room.description,
        type: room.type,
        price: room.price,
        features: room.features,
        bed: room.bed,
        adults: room.adults,
        children: room.children,
      });

      if (room.images) {
        setImagePreviews(room.images);
      }
    } else {
      reset();
      setImageFiles([]);
      setImagePreviews([]);
    }
  }, [room, reset]);

  // ✅ Feature Add/Remove
  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !getValues('features').includes(trimmed)) {
      setValue('features', [...getValues('features'), trimmed]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setValue(
      'features',
      getValues('features').filter((f) => f !== feature),
    );
  };

  // ✅ ============Image upload===========
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImageFiles((prev) => [...prev, ...fileList]);
      setImagePreviews((prev) => [
        ...prev,
        ...fileList.map((f) => URL.createObjectURL(f)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const previews = [...imagePreviews];
    previews.splice(index, 1);
    setImagePreviews(previews);

    if (index < imageFiles.length) {
      const files = [...imageFiles];
      files.splice(index, 1);
      setImageFiles(files);
    }
  };
  //======================== submit form====================

  const handleSubmitRoom = async (data: RoomFormData) => {
    try {
      const formData = new FormData();

      formData.append('roomNumber', data.roomNumber);
      formData.append('floor', String(data.floor));
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      formData.append('type', data.type);
      formData.append('price', data.price.toString());

      // ✅ Append nested bed object properly
      formData.append('bedType', data.bed.type);
      formData.append('bedCount', data.bed.count.toString());

      // ✅ Adults & Children
      formData.append('adults', data.adults.toString());
      formData.append('children', data.children.toString());

      // ✅ Append features
      data.features.forEach((feature) => formData.append('features', feature));

      // ✅ Append images
      imageFiles.forEach((file) => formData.append('images', file));

      console.log('FormData preview:');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      if (isEditMode) {
        await updateRoom({ id: room?._id, formData }).unwrap();
        toast.success('✅ Room updated successfully!');
      } else {
        await createRoom(formData).unwrap();
        toast.success('✅ Room created successfully!');
      }

      reset();
      onClose();
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err: any) {
      console.error('❌ Error submitting room:', err);
      toast.error(
        err?.data?.message || '🚨 Failed to submit room. Please try again.',
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Update Room' : 'Create New Room'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitRoom)}
          className="space-y-6 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ===================Room Number =========================*/}
            <div className="space-y-2">
              <Label>Room Number*</Label>
              <Input {...register('roomNumber')} className="bg-slate-700" />
              {errors.roomNumber && (
                <p className="text-red-500 text-sm">
                  {errors.roomNumber.message}
                </p>
              )}
            </div>

            {/*=============================== Floor=========================== */}
            <div className="space-y-2">
              <Label>Floor*</Label>
              <Input
                type="number"
                {...register('floor', { valueAsNumber: true })}
                className="bg-slate-700"
              />
              {errors.floor && (
                <p className="text-red-500 text-sm">{errors.floor.message}</p>
              )}
            </div>

            {/* ==================================Title =========================*/}
            <div className="space-y-2">
              <Label>Room Title</Label>
              <Input {...register('title')} className="bg-slate-700" />
            </div>

            {/* ====================================Type ===============================*/}
            <div className="space-y-2">
              <Label>Room Type*</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }: any) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-slate-700">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800">
                      {Object.values(RoomType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* ==================================Price ======================*/}
            <div className="space-y-2">
              <Label> Base Price ($)*</Label>
              <Input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="bg-slate-700"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* ==============================Description =======================*/}
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              {...register('description')}
              className="bg-slate-700 w-full min-h-[100px]"
            />
          </div>

          {/* =====================================Features=========================== */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), handleAddFeature())
                }
                placeholder="Add a feature"
                className="bg-slate-700"
              />
              <Button type="button" onClick={handleAddFeature}>
                Add
              </Button>
            </div>
            <div className="flex items-center gap-4">
              {/* ==============================Bed Type ==============================*/}
              <div className="w-1/2 space-y-2">
                <Label>Bed Type*</Label>
                <select
                  {...register('bed.type')}
                  className="bg-slate-700 text-white w-full rounded-md p-2"
                >
                  <option value="">Select</option>
                  <option value="king">King</option>
                  <option value="queen">Queen</option>
                  <option value="twin">Twin</option>
                  <option value="double">Double</option>
                  <option value="single">Single</option>
                </select>
                {errors.bed?.type && (
                  <p className="text-sm text-red-500">{errors.bed.message}</p>
                )}
              </div>

              {/* =========================Bed Count ==========================*/}
              <div className="w-1/2 space-y-2">
                <Label>Bed Count*</Label>
                <Input
                  type="number"
                  min={1}
                  {...register('bed.count', { valueAsNumber: true })}
                  className="bg-slate-700"
                />
                {errors.bed?.count && (
                  <p className="text-sm text-red-500">
                    {errors.bed.count.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {watch('features').map((f, i) => (
                <Badge key={i} className="flex items-center gap-1 bg-slate-600">
                  {f}
                  <button type="button" onClick={() => handleRemoveFeature(f)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          {/* ==========================================Adults ================================*/}
          <div className="w-1/2 space-y-2">
            <Label>Adults*</Label>
            <Input
              type="number"
              min={1}
              {...register('adults', { valueAsNumber: true })}
              className="bg-slate-700"
            />
            {errors.adults && (
              <p className="text-sm text-red-500">{errors.adults.message}</p>
            )}
          </div>

          {/* ==============================================Children============================== */}
          <div className="w-1/2 space-y-2">
            <Label>Children</Label>
            <Input
              type="number"
              min={0}
              {...register('children', { valueAsNumber: true })}
              className="bg-slate-700"
            />
            {errors.children && (
              <p className="text-sm text-red-500">{errors.children.message}</p>
            )}
          </div>

          {/* ==============================Images ==================================*/}
          <div className="space-y-2">
            <Label>Room Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="images"
              onChange={handleImageChange}
            />
            <Label
              htmlFor="images"
              className="cursor-pointer flex items-center gap-2 text-slate-400"
            >
              <Upload className="w-5 h-5" /> Click to upload images
            </Label>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt="roomImage"
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Submitting...'
                : isEditMode
                  ? 'Update Room'
                  : 'Create Room'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          //==================================== Define default options=====================
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // =======================Default options for specific types==================================
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </Dialog>
  );
}
