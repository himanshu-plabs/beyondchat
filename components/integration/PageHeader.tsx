import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
          <RocketIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
        {description}
      </p>
    </motion.div>
  );
};
