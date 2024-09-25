"use client";

import { Typography } from "../ui";
import { AnimatePresence, motion } from "framer-motion";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { navigation } from "@/lib/constants";
import { useState } from "react";
import { Searchbar } from "./Searchbar";

export function MobileTopBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <section className="page-width transition-all fixed w-full flex items-center justify-between lg:hidden bg-orange-50 top-0 py-5 z-10">
      <div>
        <Typography
          variant="xlarge"
          as="span"
          color="black"
          className="font-antic font-normal flex items-center"
        >
          <Link href={"/"}>The Mindful Network</Link>
        </Typography>
      </div>

      <div onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="w-10 h-10" />
        ) : (
          <Bars2Icon className="w-10 h-10" />
        )}
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-14 left-0 w-full bg-orange-50 page-width py-5 shadow-lg flex flex-col gap-2"
          >
            <Searchbar />

            {navigation.map((link) => (
              <Link key={link.key} href={link.path}>
                <Typography variant="large" as="span" color="black">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
