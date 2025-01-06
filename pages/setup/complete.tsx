import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  TwitterIcon,
  LinkedinIcon,
  MessageSquareIcon,
  SettingsIcon,
  RocketIcon,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ActionCard } from "@/components/setup/ActionCard";
import { celebrateCompletion } from "@/lib/utils/confetti";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const CompletePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    return celebrateCompletion();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <MainLayout showProgress currentStep={5} totalSteps={5}>
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

        <div className="container relative max-w-[1200px] px-4 md:px-6 py-12">
          <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Setup Complete
              </Badge>

              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="flex justify-center"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <RocketIcon className="h-16 w-16 text-primary animate-bounce" />
                  </div>
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                  Setup Complete!
                </h1>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                  Your chatbot is now ready to help your customers. Here are
                  your next steps:
                </p>
              </div>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <ActionCard
                  icon={MessageSquareIcon}
                  title="Live Chat"
                  description="Start chatting with your customers in real-time"
                  buttonText="Open Chat"
                  onClick={() => router.push("/dashboard/chat")}
                  variant="success"
                />
              </motion.div>

              <motion.div variants={item}>
                <ActionCard
                  icon={SettingsIcon}
                  title="Admin Panel"
                  description="Configure and customize your chatbot settings"
                  buttonText="Open Settings"
                  onClick={() => router.push("/dashboard/settings")}
                  variant="info"
                />
              </motion.div>

              <motion.div variants={item}>
                <ActionCard
                  icon={TwitterIcon}
                  title="Share on Twitter"
                  description="Tell others about your new AI-powered support"
                  buttonText="Share"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/intent/tweet?text=" +
                        encodeURIComponent(
                          "Just set up my AI customer support with @BeyondChats_ai! 🤖✨"
                        ),
                      "_blank"
                    )
                  }
                />
              </motion.div>

              <motion.div variants={item}>
                <ActionCard
                  icon={LinkedinIcon}
                  title="Share on LinkedIn"
                  description="Share your success with your professional network"
                  buttonText="Share"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/sharing/share-offsite/?url=" +
                        encodeURIComponent("https://beyondchat.com"),
                      "_blank"
                    )
                  }
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompletePage;
