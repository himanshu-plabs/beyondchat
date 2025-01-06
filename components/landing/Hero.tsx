import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 md:py-32 overflow-hidden bg-dot-pattern">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 max-w-[800px]"
          >
            <Badge
              variant="outline"
              className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              AI-Powered Customer Support
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Make AI your brand manager
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Don&apos;t let your brand lose customers. Qualify your leads to 3X
              your sales with our intelligent AI chatbot. It&apos;s like hiring
              a sales manager who knows your business in and out and works 24*7.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary/10 to-purple-500/10"
                  />
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>4.7</span>
                <span className="mx-2">•</span>
                <Users className="w-4 h-4 text-primary/60 mr-1" />
                <span>Trusted by 1000+ businesses</span>
              </div>
            </div>
          </motion.div>

          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
          >
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
              <Badge
                key={i}
                variant="secondary"
                className="px-4 py-2 text-sm bg-white/50 backdrop-blur-sm border-primary/10 hover:bg-primary/5 transition-colors"
              >
                {feature}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
