import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavigationHeaderProps {
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  showProgress = false,
  currentStep = 1,
  totalSteps = 5,
}) => {
  const { data: session } = useSession();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">BeyondChat</span>
          </Link>
        </div>

        {showProgress && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1 text-center">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end space-x-2">
          {session && (
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Save & Exit
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {session && (
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Save & Exit
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/help">Help & Support</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {showProgress && (
        <div className="md:hidden px-4 pb-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      )}
    </header>
  );
};
