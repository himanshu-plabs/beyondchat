import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  className?: string;
  variant?: "default" | "success" | "info";
}

const variants = {
  default: {
    card: "bg-white/80 hover:bg-white/90 border-primary/10 hover:border-primary/20",
    icon: "from-primary/10 to-purple-500/10 text-primary",
    button: "from-primary to-purple-500",
  },
  success: {
    card: "bg-emerald-50/80 hover:bg-emerald-50/90 border-emerald-200/20 hover:border-emerald-200/40",
    icon: "from-emerald-500/10 to-teal-500/10 text-emerald-500",
    button: "from-emerald-500 to-teal-500",
  },
  info: {
    card: "bg-blue-50/80 hover:bg-blue-50/90 border-blue-200/20 hover:border-blue-200/40",
    icon: "from-blue-500/10 to-indigo-500/10 text-blue-500",
    button: "from-blue-500 to-indigo-500",
  },
};

export function ActionCard({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  className,
  variant = "default",
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden backdrop-blur-xl transition-all duration-300",
        variants[variant].card,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-10 from-transparent via-primary/5 to-transparent" />

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-xl bg-gradient-to-br border border-primary/10",
                variants[variant].icon
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground min-h-[40px]">
            {description}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "w-full bg-gradient-to-r hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300",
              variants[variant].button
            )}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </Card>
  );
}
