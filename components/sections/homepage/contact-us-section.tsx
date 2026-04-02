"use client"

import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

  const onSubmit = async (data: FormValues) => {
    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service configuration is missing.")
      return
    }

    const templateParams = {
      from_name: data.name,
      reply_to: data.email,
      subject: data.subject,
      message: data.message,
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )
     
        toast.success("Message sent successfully!")
        reset()
      
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast.error("An error occurred while sending the message.")
    }
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 mr-6"></div>
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-[#bf9310] mr-3" />
              <h2 className="text-base md:text-sm font-medium tracking-[0.2em] uppercase">
                Contact Us
              </h2>
              <MessageSquare className="w-6 h-6 text-[#bf9310] ml-3" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 ml-6"></div>
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-snug text-center max-w-6xl mx-auto text-foreground">
            We'd love to hear from you!
            <br />
            <span className="block">
              Reach out with any questions or requests
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row">
          {/* Left - Image */}
          <div className="relative flex-1 min-h-[400px] lg:min-h-[600px] bg-gray-200">
            <Image
              src="/images/contact.jpg"
              alt="Contact"
              unoptimized
              fill
              className="absolute inset-0 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Card className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-auto lg:w-[400px] bg-main/70 backdrop-blur-sm border rounded-none p-0 hidden lg:block z-20">
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>info@example.com</p>
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>+99 021 324 258</p>
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>340 Main St, USA</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-main">
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Let's talk about your problem.
                </h2>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter subject"
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Enter your message"
                    className="resize-none"
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#bf9310] hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
        <Toaster position="top-center" />
    </section>
  )
}
