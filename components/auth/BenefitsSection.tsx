import { motion } from "framer-motion";
import { RocketIcon, Blocks, Clock, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "AI-powered Support",
    description: "Automate customer support with cutting-edge AI technology",
    icon: RocketIcon,
    gradient: "from-violet-500 to-indigo-500",
    delay: 0.2,
  },
  {
    title: "Easy Integration",
    description: "Set up in minutes with our simple integration process",
    icon: Blocks,
    gradient: "from-pink-500 to-rose-500",
    delay: 0.4,
  },
  {
    title: "24/7 Support",
    description:
      "Never miss a customer inquiry with round-the-clock automation",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    delay: 0.6,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const BenefitsSection = () => {
  return (
    <div className="relative p-8 rounded-2xl overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
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

      <div className="relative space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
            Why choose BeyondChat?
          </h2>
          <p className="text-muted-foreground">
            Experience the future of customer support with our AI-powered
            solutions
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="transform-gpu"
              >
                <Card className="group relative overflow-hidden border-primary/10 hover:border-primary/20 transition-colors">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className={cn(
                        "absolute inset-0 opacity-[0.08] bg-gradient-to-r",
                        benefit.gradient
                      )}
                    />
                  </div>

                  <div className="relative p-6 flex items-start space-x-4">
                    <div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br",
                        benefit.gradient,
                        "flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                      )}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-primary opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-gray-600 transition-colors">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4 pt-4"
        >
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Messages/Day", value: "1M+" },
            { label: "Response Rate", value: "99%" },
            { label: "Customer Satisfaction", value: "4.9/5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10 p-4 text-center hover:border-primary/20 transition-colors"
            >
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
