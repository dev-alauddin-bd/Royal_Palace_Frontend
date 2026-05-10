'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useSignUpUserMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { Crown, User, Mail, Lock, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import Loader from '@/components/shared/Loader';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [signup, { isLoading }] = useSignUpUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup(data).unwrap();
      const { user, accessToken } = response.data;

      dispatch(setUser({ user, token: accessToken }));
      reset();
      router.push('/');
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-royal-obsidian">
      {isLoading && <Loader />}
      {/* Background with luxury pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/85 z-10" />
        <img 
          src="/images/Hero-Banner.webp" 
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Branding & Info (Matching Login Vibe) */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="flex flex-col space-y-4">
            <div className="w-16 h-16 border border-royal-gold/30 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-royal-gold" />
            </div>
            <h1 className="text-5xl font-serif font-bold royal-gradient-text tracking-[0.2em] uppercase leading-tight">
              Royal <br /> Inheritance
            </h1>
          </div>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
            Your journey into the extraordinary begins here. Establish your digital presence within our royal registry to experience a standard of living that transcends the ordinary.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <div className="h-px w-12 bg-royal-gold/30"></div>
            <span className="text-[10px] text-royal-gold uppercase tracking-[0.4em] font-bold">Unparalleled Sophistication</span>
          </div>
        </div>

        {/* Right Side: Signup Card */}
        <div className="glass-panel p-8 md:p-10 border-royal-gold/10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <div className="text-center mb-10 lg:hidden">
              <Crown className="h-8 w-8 text-royal-gold mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">Registration</h2>
            </div>

            <div className="hidden lg:block mb-10">
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest mb-2">Create Account</h2>
              <div className="h-0.5 w-12 bg-royal-gold"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                    <Input
                      {...register('name', { required: 'Required' })}
                      placeholder="Your Full Name"
                      className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                    <Input
                      type="email"
                      {...register('email', { required: 'Required' })}
                      placeholder="sovereign@royal.com"
                      className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Secret Key</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                    <Input
                      type="password"
                      {...register('password', { required: 'Required', minLength: 6 })}
                      placeholder="••••••••"
                      className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                    <Input
                      type="tel"
                      {...register('phone')}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full royal-button h-12 text-xs tracking-[0.2em] mt-4"
              >
                {isLoading ? 'ESTABLISHING ACCESS...' : 'JOIN THE ROYAL CIRCLE'}
              </Button>
            </form>

            <div className="text-center mt-10 pt-6 border-t border-royal-gold/10">
              <p className="text-white/40 text-[10px] tracking-wide uppercase">
                Already have an account?{" "}
                <Link href="/login" className="text-royal-gold hover:text-white font-bold ml-2 transition-colors inline-flex items-center group">
                  LOGIN NOW <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <Link href="/" className="absolute bottom-8 left-8 hidden lg:flex items-center text-[10px] text-royal-gold/40 hover:text-royal-gold uppercase tracking-widest transition-colors font-bold group">
        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <Toaster position="top-right" />
    </div>
  );
}
