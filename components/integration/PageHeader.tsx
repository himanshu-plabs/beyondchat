import { RocketIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-2 md:space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <RocketIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
        {description}
      </p>
    </div>
  );
};
