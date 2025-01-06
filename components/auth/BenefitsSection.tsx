import { motion } from "framer-motion";
import { RocketIcon, Blocks, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "AI-powered Support",
    description: "Automate customer support with cutting-edge AI technology",
    icon: RocketIcon,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    title: "Easy Integration",
    description: "Set up in minutes with our simple integration process",
    icon: Blocks,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "24/7 Support",
    description:
      "Never miss a customer inquiry with round-the-clock automation",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
];

export const BenefitsSection = () => {
  return (
    <div className="space-y-8 bg-gradient-to-br from-muted/50 to-muted p-8 rounded-2xl border shadow-lg">
      <motion.h2
        className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why choose BeyondChat?
      </motion.h2>
      <ul className="space-y-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.li
              key={benefit.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2 * (index + 1),
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 flex items-start space-x-4"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br",
                      benefit.gradient,
                      "flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              </Card>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
