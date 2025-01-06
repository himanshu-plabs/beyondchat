import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { AuthForms } from "@/components/auth/AuthForms";
import { BenefitsSection } from "@/components/auth/BenefitsSection";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Users } from "lucide-react";

const Register: NextPage = () => {
  return (
    <MainLayout showProgress currentStep={1} totalSteps={5}>
      <div className="relative min-h-screen bg-dot-pattern">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container relative max-w-[1200px] px-4 md:px-6 py-12"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <Badge
                  variant="outline"
                  className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Get Started in Minutes
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    Welcome to BeyondChat
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of businesses revolutionizing their customer
                  support
                </p>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/10 w-fit"
                >
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
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 backdrop-blur-md rounded-lg border border-primary/10 shadow-xl"
              >
                <AuthForms />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <BenefitsSection />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Register;
