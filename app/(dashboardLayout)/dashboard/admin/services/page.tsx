// === Imports ===
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  DollarSign,
  Gift,
  ImageIcon,
  Save,
  X,
  Upload,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useFindAllServiceQuery,
  useUpdateServiceMutation,
} from '@/redux/features/service/serviceApi';
import toast, { Toaster } from 'react-hot-toast';
import { IService } from '@/types/service.interface';

// === Validation Schema ===
const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  pricePerDay: z.number().min(0, 'Price must be 0 or greater'),
  isServiceFree: z.boolean(),
  image: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServicesPage() {
  // === State Management ===
  const [createService] = useCreateServiceMutation();
  const [updateService, { isLoading: updateLoading }] =
    useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const { data: servicesData, isLoading } = useFindAllServiceQuery(undefined);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  // === React Hook Form Setup ===
  const addForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerDay: 0,
      isServiceFree: false,
      image: '',
    },
  });

  const editForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerDay: 0,
      isServiceFree: false,
      image: '',
    },
  });

  const watchAddServiceFree = addForm.watch('isServiceFree');
  const watchEditServiceFree = editForm.watch('isServiceFree');

  useEffect(() => {
    if (watchAddServiceFree) {
      addForm.setValue('pricePerDay', 0);
    }
  }, [watchAddServiceFree]);

  useEffect(() => {
    if (watchEditServiceFree) {
      editForm.setValue('pricePerDay', 0);
    }
  }, [watchEditServiceFree]);

  // === Image Handling ===
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        setImageFile(null);
        setImagePreview('');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  // === Form Submission Handlers ===
  const onAddSubmit = async (data: ServiceFormData) => {
    try {
      const formData = new FormData();
      if (imageFile) formData.append('image', imageFile);
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, String(value)),
      );
      const response = await createService(formData).unwrap();
      if (response.success) {
        setShowAddModal(false);
        addForm.reset();
        handleRemoveImage();
        toast.success('Service added successfully!');
      } else toast.error('Failed to add service');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service');
    }
  };

  const onEditSubmit = async (data: ServiceFormData) => {
    if (!selectedService?._id) return;
    try {
      const formData = new FormData();
      if (imageFile) formData.append('image', imageFile);
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, String(value)),
      );
      const response = await updateService({
        id: selectedService._id,
        formData,
      });
      if ('data' in response && response.data?.success) {
        setShowEditModal(false);
        editForm.reset();
        handleRemoveImage();
        setSelectedService(null);
        toast.success('Service updated successfully!');
      } else toast.error('Failed to update service');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const result = await deleteService(serviceId).unwrap();
      if (result?.success) {
        toast.success('Service deleted!');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    }
  };

  // === Modal Handlers ===
  const openEditModal = (service: IService) => {
    setSelectedService(service);
    editForm.reset({
      name: service.name,
      description: service.description || '',
      pricePerDay: service.pricePerDay,
      isServiceFree: service.isServiceFree,
      image: service.image || '',
    });
    if (service.image) setImagePreview(service.image);
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    addForm.reset();
    handleRemoveImage();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    editForm.reset();
    handleRemoveImage();
    setSelectedService(null);
  };

  // === Filters and Stats ===
  const filteredServices = servicesData?.data?.filter((service: IService) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === 'all' ||
      (filterType === 'free' && service.isServiceFree) ||
      (filterType === 'paid' && !service.isServiceFree);
    const matchesRoom = selectedRoom === 'all';
    return matchesSearch && matchesType && matchesRoom;
  });

  const totalServices = servicesData?.data?.length;
  const freeServices = servicesData?.data?.filter(
    (s: IService) => s.isServiceFree,
  ).length;
  const paidServices = servicesData?.data?.filter(
    (s: IService) => !s.isServiceFree,
  ).length;
  const totalRevenue = servicesData?.data?.reduce(
    (sum: number, s: IService) => sum + (s.isServiceFree ? 0 : s.pricePerDay),
    0,
  );

  return (
    <div className="min-h-screen ">
      {/*==== Background decorative elements===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative ">
        {/*==== Header =====*/}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Services Management
            </h1>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
        </div>

        {/*==== Stats Cards ====*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-main backdrop-blur-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm">Total Services</p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalServices}
                  </p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main backdrop-blur-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm">Free Services</p>
                  <p className="text-2xl font-bold text-foreground">
                    {freeServices}
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-full">
                  <Gift className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main backdrop-blur-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm">Paid Services</p>
                  <p className="text-2xl font-bold text-foreground">
                    {paidServices}
                  </p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main backdrop-blur-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm">Daily Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${totalRevenue}
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/*==== Filters==== */}
        <Card className="bg-main backdrop-blur-sm  mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-4 h-4" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-main/50  text-foreground placeholder:text-foreground focus:border-orange-500 focus:ring-orange-500/20"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 bg-main/50  text-foreground focus:border-orange-500 focus:ring-orange-500/20">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-main ">
                  <SelectItem
                    value="all"
                    className="text-foreground hover:bg-main"
                  >
                    All Services
                  </SelectItem>
                  <SelectItem
                    value="free"
                    className="text-foreground hover:bg-main"
                  >
                    Free Services
                  </SelectItem>
                  <SelectItem
                    value="paid"
                    className="text-foreground hover:bg-main"
                  >
                    Paid Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/*==== Services Table ====*/}
        <Card className="bg-main backdrop-blur-sm ">
          <CardHeader>
            <CardTitle className="text-foreground">Services List</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-foreground">Loading services...</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="">
                    <TableHead className="text-foreground">Service</TableHead>

                    <TableHead className="text-foreground">Price/Day</TableHead>
                    <TableHead className="text-foreground">Type</TableHead>
                    <TableHead className="text-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices?.map((service: IService) => (
                    <TableRow key={service._id} className="">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {service.image ? (
                            <img
                              src={service.image || '/placeholder.svg'}
                              alt={service.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-main rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="text-foreground font-medium">
                              {service.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-foreground font-semibold">
                          {service.isServiceFree
                            ? 'Free'
                            : `$${service.pricePerDay}`}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            service.isServiceFree
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                          }
                        >
                          {service.isServiceFree ? 'Free' : 'Paid'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground max-w-xs truncate">
                        {service.description || 'No description'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(service)}
                            className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => service._id && handleDeleteService(service._id)}
                            className="text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/*==== Add Service Modal==== */}
      <Dialog open={showAddModal} onOpenChange={closeAddModal}>
        <DialogContent className="bg-main  text-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-orange-400">
              Add New Service
            </DialogTitle>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Service Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-main/50  text-foreground"
                          placeholder="Enter service name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Single Image Upload */}
              <div className="space-y-2">
                <Label className="text-foreground">Service Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center gap-2 text-foreground hover:text-foreground transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Click to upload image
                </Label>
                {imagePreview && (
                  <div className="relative w-32 h-32">
                    <img
                      src={imagePreview || '/placeholder.svg'}
                      className="w-full h-full object-cover rounded-lg"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="h-3 w-3 text-foreground" />
                    </button>
                  </div>
                )}
              </div>

              <FormField
                control={addForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Description (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-main/50  text-foreground"
                        placeholder="Enter service description"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="pricePerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Price per Day ($)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="bg-main/50  text-foreground"
                          placeholder="0.00"
                          disabled={watchAddServiceFree}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="isServiceFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Service Type
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2 p-3 bg-main/30 rounded-lg">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label className="text-foreground">
                            {field.value ? 'Free Service' : 'Paid Service'}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={closeAddModal}
                  variant="outline"
                  className="flex-1 bg-main/30  text-foreground hover:bg-main/50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r cursor-pointer from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Add Service'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/*====Edit Service Modal==== */}
      <Dialog open={showEditModal} onOpenChange={closeEditModal}>
        <DialogContent className="bg-main  text-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Edit Service</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Service Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-main/50  text-foreground"
                          placeholder="Enter service name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Single Image Upload */}
              <div className="space-y-2">
                <Label className="text-foreground">Service Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="edit-image-upload"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="edit-image-upload"
                  className="cursor-pointer flex items-center gap-2 text-foreground hover:text-foreground transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Click to upload new image
                </Label>
                {imagePreview && (
                  <div className="relative w-32 h-32">
                    <img
                      src={imagePreview || '/placeholder.svg'}
                      className="w-full h-full object-cover rounded-lg"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="h-3 w-3 text-foreground" />
                    </button>
                  </div>
                )}
              </div>

              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Description (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-main/50  text-foreground"
                        placeholder="Enter service description"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="pricePerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Price per Day ($)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="bg-main/50  text-foreground"
                          placeholder="0.00"
                          disabled={watchEditServiceFree}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="isServiceFree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Service Type
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2 p-3 bg-main/30 rounded-lg">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label className="text-foreground">
                            {field.value ? 'Free Service' : 'Paid Service'}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={closeEditModal}
                  variant="outline"
                  className="flex-1 bg-main/30  text-foreground hover:bg-main/50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateLoading ? 'Uploading...' : 'Update Service'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* toaster */}
      <Toaster position="top-right" />
    </div>
  );
}
