"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { CalendarClock, CircleDollarSign, Clock8, Dumbbell, HelpCircle, PawPrint, Plane, Utensils, Wifi } from 'lucide-react';

const FaqPage = () => {

    return (

        <div className="min-h-screen container mx-auto px-4 py-8 md:py-12">
        
                {/* ===== Section Header ===== */}
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
                            <HelpCircle className="w-6 h-6 text-[#bf9310] mr-3" />
                            <h2 className="title text-base md:text-sm font-medium tracking-[0.2em] uppercase">
                                Frequently Asked Questions
                            </h2>
                            <HelpCircle className="w-6 h-6 text-[#bf9310] ml-3" />
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 ml-6"></div>
                    </div>

                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-snug text-center max-w-6xl mx-auto text-foreground">
                        Find answers to common questions about
                        <br />
                        <span className="block">our resort and services</span>
                    </h1>
                </motion.div>

                {/* ===== FAQ Accordion in Two Columns ===== */}
                <div className="mx-auto w-full max-w-6xl py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1 */}
                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem
                            value="item-1"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <CalendarClock className="w-5 h-5 text-[#bf9310]" />
                                What are the check-in and check-out times?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Check-in time is 3:00 PM, and check-out time is 12:00 PM. Early
                                check-in or late check-out may be available upon request and
                                subject to availability.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-2"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <Plane className="w-5 h-5 text-[#bf9310]" />
                                Do you offer airport transportation?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Yes, we offer airport transfer services. Please contact our
                                concierge desk in advance to arrange your transportation.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-3"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-[#bf9310]" />
                                Is there a fitness center or spa available?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Our resort features a state-of-the-art fitness center and a
                                luxurious spa offering a range of treatments.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                            value="item-3"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <Wifi className="w-5 h-5 text-[#bf9310]" />
                                Is Wi-Fi available throughout the resort?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Yes, complimentary high-speed Wi-Fi is available in all rooms and public areas of the resort to keep you connected throughout your stay
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Column 2 */}
                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem
                            value="item-4"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <PawPrint className="w-5 h-5 text-[#bf9310]" />
                                Are pets allowed at the resort?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                We have a limited number of pet-friendly rooms available. Please
                                inform us at the time of booking if you plan to bring a pet.
                                Additional fees may apply.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-5"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <Utensils className="w-5 h-5 text-[#bf9310]" />
                                What dining options are available?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Our resort boasts several dining options, including fine dining
                                restaurants, casual cafes, and a poolside bar. Room service is
                                also available 24/7.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-6"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <Clock8 className="w-5 h-5 text-[#bf9310]" />
                                Can I cancel my booking? What is the policy?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Yes, you can cancel your booking up to{" "}
                                <strong>12 hours before check-in</strong> without any charges.
                                Cancellations made after that time may be subject to a
                                cancellation fee.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-7"
                            className="border-b border-gray-700"
                        >
                            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-title flex items-center gap-2">
                                <CircleDollarSign className="w-5 h-5 text-[#bf9310]" />
                                What currencies and payment methods are accepted?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                We accept multiple currencies including USD, EUR, and BDT.
                                Payments can be made via credit/debit card, mobile banking
                                (e.g., bKash, Nagad), and bank transfer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            
        </div>
    );
}

export default FaqPage;