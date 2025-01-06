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
} from "lucide-react";
import { ActionCard } from "@/components/setup/ActionCard";
import { celebrateCompletion } from "@/lib/utils/confetti";
import { motion } from "framer-motion";

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
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center"
            >
              <RocketIcon className="h-16 w-16 text-primary animate-bounce" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Setup Complete!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto">
              Your chatbot is now ready to help your customers. Here are your
              next steps:
            </p>
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
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="mx-auto hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CompletePage;
