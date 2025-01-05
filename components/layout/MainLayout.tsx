import { FC, ReactNode } from "react";
import { NavigationHeader } from "./NavigationHeader";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  showProgress = false,
  currentStep = 1,
  totalSteps = 5,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader
        showProgress={showProgress}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      <main className="flex-grow container mx-auto px-4 md:px-6 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};
