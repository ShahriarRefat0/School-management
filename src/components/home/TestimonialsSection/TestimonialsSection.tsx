'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "The quality of education at this school is outstanding. My child's confidence and results have both improved significantly.",
    name: "Md. Rashed Ali",
    role: "Parent",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote: "The school's digital management system has made our lives much easier. Now all information is at our fingertips.",
    name: "Fatema Begum",
    role: "Parent",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    quote: "I have learned a lot studying at this school. The teachers are very caring and always ready to help.",
    name: "Tanveer Hasan",
    role: "Student",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=53",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-bg-page border-border-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section: Same style as all other sections */}
        <div className="mb-16 text-center">
          <p className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            What Parents & Students{" "}
            <span className="text-primary">Say About Us</span>
          </h2>
          <div className="w-12 h-1 bg-primary mt-4 rounded-full mx-auto" />
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-bg-card border border-border-light p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "text-border-light"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-muted text-sm leading-relaxed mb-6 italic">
                “{testimonial.quote}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border-light">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-text-muted font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - matching other sections */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10">
            Read More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;