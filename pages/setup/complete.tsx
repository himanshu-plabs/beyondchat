import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  TwitterIcon,
  LinkedinIcon,
  MessageSquareIcon,
  SettingsIcon,
} from "lucide-react";

const CompletePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(confettiInterval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#00ff00", "#0000ff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#00ff00", "#0000ff"],
      });
    }, 150);

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <MainLayout showProgress currentStep={5} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              🎉 Setup Complete!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto">
              Your chatbot is now ready to help your customers. Here are your
              next steps:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <MessageSquareIcon className="h-5 w-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Start chatting with your customers in real-time
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/dashboard/chat")}
                >
                  Open Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure and customize your chatbot settings
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/dashboard/settings")}
                >
                  Open Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <TwitterIcon className="h-5 w-5" />
                  Share on Twitter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tell others about your new AI-powered support
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/intent/tweet?text=" +
                        encodeURIComponent(
                          "Just set up my AI customer support with @BeyondChat! 🤖✨"
                        ),
                      "_blank"
                    )
                  }
                >
                  Share
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <LinkedinIcon className="h-5 w-5" />
                  Share on LinkedIn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your success with your professional network
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/sharing/share-offsite/?url=" +
                        encodeURIComponent("https://beyondchat.ai"),
                      "_blank"
                    )
                  }
                >
                  Share
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="pt-8">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="mx-auto"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompletePage;
