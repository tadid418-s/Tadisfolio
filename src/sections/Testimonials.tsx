"use client";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import jerry from "@/assets/images/jerry.avif";
import mauro from "@/assets/images/mauro.jpeg";
import samuel from "@/assets/images/samuel.avif";
import umar from "@/assets/images/umar.jpeg";
import Image from "next/image";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Jerry",
    position: "Product Designer @FinTech Innovations",
    text: "Tadiyos brought our figma designs to life flawlessly! His attention to detail in front-end architecture and UI/UX ensured that our users got the slick, responsive experience we envisioned.",
    avatar: jerry,
  },
  {
    name: "Mauro",
    position: "Founder @SaaS Connect",
    text: "Working with Tadiyos was incredible. He optimized our entire core front-end, making the web app lightning-fast and visually stunning. Highly recommend him for any serious UI development.",
    avatar: mauro,
  },
  {
    name: "Samuel",
    position: "Marketing Director @E-Comm Stars",
    text: "Tadiyos's ability to create engaging, dynamic front-end layouts is unmatched. He revamped our landing pages perfectly and helped increase our user engagement significantly. Top-tier work!",
    avatar: samuel,
  },
  {
    name: "Umar",
    position: "Lead Developer @Tech Pioneers",
    text: "Tadiyos is a highly skilled front-end developer. His React components are clean, scalable, and beautifully structured. It’s always a pleasure reviewing his robust, optimized code.",
    avatar: umar,
  },
];

export const TestimonialsSection = () => {
  return (
    <div>
      <div className="py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <SectionHeader
            eyebrow="Happy Clients"
            title="What Clients Say about Me"
            description="Don't just take my word for it. See what my Clients have to say about my work."
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="flex gap-4 max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300"
                  >
                    <div className="size-14 bg-gray-700 items-center justify-center inline-flex rounded-full flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="size-max rounded-full"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="mt-2 text-xs text-white/40">
                          {testimonial.position}
                        </div>
                        <p className="mt-4 md:mt-6 lg:mt-2 text-sm">
                          {testimonial.text.slice(0, 200)}...
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
