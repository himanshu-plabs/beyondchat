import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t bg-gradient-to-b from-background to-muted/20 py-8 md:py-0"
    >
      <div className="container flex flex-col items-center gap-6 md:h-28 md:flex-row md:justify-between mx-auto w-full">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0"
        >
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="/"
              className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4"
            >
              BeyondChat
            </Link>
            . All rights reserved.
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex flex-col md:flex-row items-center gap-6 px-8 md:gap-8 md:px-0"
        >
          <nav className="flex gap-6 md:gap-8">
            {["Privacy", "Terms", "Help"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="sm"
            className="group flex items-center gap-2 hover:bg-primary/10"
            asChild
          >
            <a href="mailto:support@beyondchat.com">
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm">support@beyondchat.com</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.footer>
  );
};
