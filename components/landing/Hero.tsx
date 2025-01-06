import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" />
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 max-w-[800px]"
          >
            <Badge variant="outline" className="animate-pulse">
              AI-Powered Customer Support
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Make AI your brand manager
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Don't let your brand lose customers. Qualify your leads to 3X your
              sales with our intelligent AI chatbot. It's like hiring a sales
              manager who knows your business in and out and works 24*7.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.7 (Trusted by 1000+ businesses)
              </span>
            </div>
          </motion.div>
          <Button asChild size="lg" className="group">
            <Link href="/register">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {[
              "Advanced Reporting",
              "Intelligent Analytics",
              "Business actions",
              "70+ Languages",
            ].map((feature, i) => (
              <Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
                {feature}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
