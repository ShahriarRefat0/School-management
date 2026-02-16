'use client';

import Herobackground from "@/components/heroSection/Herobackground";
import DefaultWeight from "@/components/shared/defaultWeight/DefaultWeight";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
{
  quote:
    "The quality of education at this school is outstanding. My child's confidence and results have both improved significantly.",
  name: "Md. Rashed Ali",
  role: "Parent",
  rating: 5,
  avatar: "https://i.pravatar.cc/150?img=12",
},
{
  quote:
    "The school's digital management system has made our lives much easier. Now all information is at our fingertips.",
  name: "Fatema Begum",
  role: "Parent",
  rating: 5,
  avatar: "https://i.pravatar.cc/150?img=32",
},
{
  quote:
    "I have learned a lot studying at this school. The teachers are very caring and always ready to help.",
  name: "Tanveer Hasan",
  role: "Student",
  rating: 4,
  avatar: "https://i.pravatar.cc/150?img=53",
},

];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

const TestimonialsSection = () => {
  return (
    <DefaultWeight>
      <section className="relative py-24 px-6 overflow-hidden">
        <Herobackground></Herobackground>
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.12), transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(var(--accent) / 0.1), transparent 50%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Parents and Students{" "}
            <span className="text-gradient">Feedback</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real Experiences of Parents and Students About Our School
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
             whileHover={{ scale: 1.05, y: -10, rotateX: 2 }}

              className="
relative rounded-3xl p-6 lg:p-8 flex flex-col gap-5
bg-background/60 backdrop-blur-xl
border border-white/10 dark:border-white/5
shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]
transition-all duration-500
before:absolute before:inset-0 before:rounded-3xl
before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-accent/20
before:opacity-0 before:transition-opacity before:duration-500
hover:before:opacity-100
hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.45)]
"

            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < t.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/90 leading-relaxed text-[15.5px] italic tracking-wide flex-1">

                “{t.quote}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-md">

                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </DefaultWeight>
  );
};

export default TestimonialsSection;
