"use client";
import { BsStars } from "react-icons/bs";
import { Fragment } from "react";
import { motion } from "framer-motion";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Interactive",
  "Scalable",
  "User Friendly",
  "Responsive",
  "Maintainable",
  "Search Optimized",
  "Usable",
  "Reliable",
];

export const TapeSection = ({ direction = 'left' }) => {
  return (
    <div className="py-16 lg:py-24 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`bg-white/5 backdrop-blur-md border-y border-white/10`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className={`flex ${direction === 'left' ? '[mask-image:linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]' : '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'}`}>
          <div className={`flex flex-none gap-4 pr-4 py-3 ${direction === 'left' ? 'animate-move-left' : 'animate-move-right'} [animation-duration:30s]`}>
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {words.map((word) => (
                  <div key={word} className="inline-flex items-center gap-4">
                    <span className="text-gray-200 uppercase font-extrabold text-sm tracking-widest">
                      {word}
                    </span>
                    <BsStars className="text-emerald-400" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
