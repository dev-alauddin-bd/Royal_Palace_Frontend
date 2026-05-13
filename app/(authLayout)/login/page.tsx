"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFirebaseLoginMutation, useLoginUserMutation, } from "@/redux/features/auth/authApi"
import { setUser } from "@/redux/features/auth/authSlice"
import { useAppDispatch } from "@/redux/hooks"
import { Crown, Mail, Lock, ArrowRight, UserCog, UserCircle, ShieldCheck } from "lucide-react"
import Loader from "@/components/shared/Loader"
import { GoogleLogin } from "@react-oauth/google";

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"
  const [login, { isLoading }] = useLoginUserMutation()
  const [googleLogin, { isLoading: isGoogleLoading }] = useFirebaseLoginMutation()

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error("Google Login Failed")
      return
    }

    try {
      const response = await googleLogin(credentialResponse.credential).unwrap()
      const { user, accessToken } = response.data
      dispatch(setUser({ user, token: accessToken }))
      toast.success("Logged in with Google")
      router.replace(redirectTo)
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || "Google Authentication Failed"
      toast.error(errorMessage)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap()
      const { user, accessToken } = response.data
      dispatch(setUser({ user, token: accessToken }))
      reset()
      router.replace(redirectTo)
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || "An unexpected error occurred"
      toast.error(errorMessage)
    }
  }

  const handleRoleLogin = async (role: "guest" | "receptionist" | "admin") => {
    let email = ""
    let password = ""

    switch (role) {
      case "guest":
        email = process.env.NEXT_PUBLIC_GUEST_EMAIL || "guest@example.com"
        password = process.env.NEXT_PUBLIC_GUEST_PASSWORD || "guest123"
        break
      case "receptionist":
        email = process.env.NEXT_PUBLIC_RECEPTIONIST_EMAIL || "reception@royalpalace.com"
        password = process.env.NEXT_PUBLIC_RECEPTIONIST_PASSWORD || "reception123"
        break
      case "admin":
        email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@royalpalace.com"
        password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
        break
    }

    setValue("email", email)
    setValue("password", password)
    await handleSubmit(onSubmit)()
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-royal-obsidian">
      {isLoading && <Loader />}
      {/* Background with luxury pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img
          src="/images/Hero-Banner.webp"
          alt="Luxury background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="flex flex-col space-y-4">
            <div className="w-16 h-16 border border-royal-gold/30 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-royal-gold" />
            </div>
            <h1 className="text-5xl font-serif font-bold royal-gradient-text tracking-[0.2em] uppercase leading-tight">
              Sovereign <br /> Access
            </h1>
          </div>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
            Welcome to the Royal Palace. Please authenticate your credentials to enter your private sanctuary and manage your exquisite stay.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <div className="h-px w-12 bg-royal-gold/30"></div>
            <span className="text-[10px] text-royal-gold uppercase tracking-[0.4em] font-bold">Trusted by Royalty</span>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="glass-panel p-8 md:p-10 border-royal-gold/10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <div className="text-center mb-10 lg:hidden">
              <Crown className="h-8 w-8 text-royal-gold mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">Royal Login</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Email Sovereign</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                  <Input
                    {...register("email", { required: "Required" })}
                    placeholder="your@email.com"
                    className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Security Key</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/40" />
                  <Input
                    type="password"
                    {...register("password", { required: "Required" })}
                    placeholder="••••••••"
                    className="h-12 pl-12 bg-white/5 border-royal-gold/20 text-white focus:border-royal-gold rounded-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full royal-button h-12 text-xs tracking-[0.2em]"
              >
                {isLoading ? "AUTHENTICATING..." : "SIGN IN"}
              </Button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/10"></div>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Or Continue With</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google Login Failed")}
                    theme="filled_black"
                    shape="square"
                    size="large"
                    width="100%"
                    useOneTap
                  />
                </div>
                {/* 
                Keep the Facebook button or others as placeholders if needed, 
                but I'll simplify the grid for now to focus on Google.
                */}
              </div>
            </form>

            {/* Quick Test Credentials */}
            <div className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-royal-gold/10"></div>
                <span className="text-[9px] text-royal-gold/40 uppercase tracking-widest font-bold whitespace-nowrap">Testing Protocols</span>
                <div className="h-px flex-1 bg-royal-gold/10"></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleLogin("admin")}
                  className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-royal-gold/10 hover:border-royal-gold/40 hover:bg-royal-gold/5 transition-all group/role"
                >
                  <ShieldCheck className="w-5 h-5 text-royal-gold group-hover/role:scale-110 transition-transform" />
                  <span className="text-[8px] text-white/60 group-hover/role:text-royal-gold uppercase tracking-widest font-bold">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleLogin("receptionist")}
                  className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-royal-gold/10 hover:border-royal-gold/40 hover:bg-royal-gold/5 transition-all group/role"
                >
                  <UserCog className="w-5 h-5 text-royal-gold group-hover/role:scale-110 transition-transform" />
                  <span className="text-[8px] text-white/60 group-hover/role:text-royal-gold uppercase tracking-widest font-bold">Receptionist</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleLogin("guest")}
                  className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-royal-gold/10 hover:border-royal-gold/40 hover:bg-royal-gold/5 transition-all group/role"
                >
                  <UserCircle className="w-5 h-5 text-royal-gold group-hover/role:scale-110 transition-transform" />
                  <span className="text-[8px] text-white/60 group-hover/role:text-royal-gold uppercase tracking-widest font-bold">Guest</span>
                </button>
              </div>
            </div>

            <div className="text-center mt-10 pt-6 border-t border-royal-gold/10">
              <p className="text-white/40 text-[10px] tracking-wide uppercase">
                Don't have an account?{" "}
                <Link href="/signup" className="text-royal-gold hover:text-white font-bold ml-2 transition-colors inline-flex items-center group">
                  REGISTER NOW <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
