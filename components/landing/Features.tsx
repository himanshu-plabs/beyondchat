import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageSquare,
  BarChart,
  Globe,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    title: "Automate conversations",
    description:
      "Minimize support workload and improve customer happiness instantly with AI-driven chatbots",
    icon: <MessageSquare className="w-6 h-6" />,
    stats: "50% Less Support queries",
    gradient: "from-blue-500/10 to-purple-500/10",
    iconGradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Real-Time Communication",
    description:
      "Utilize live chat for instant, real-time communication with customers",
    icon: <Zap className="w-6 h-6" />,
    stats: "90% User Engagement",
    gradient: "from-amber-500/10 to-red-500/10",
    iconGradient: "from-amber-500 to-red-500",
  },
  {
    title: "Advanced Analytics",
    description:
      "Get detailed insights into customer interactions and support performance",
    icon: <BarChart className="w-6 h-6" />,
    stats: "99% Customer satisfaction",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconGradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Multi-language Support",
    description:
      "Support customers in their preferred language with 70+ language options",
    icon: <Globe className="w-6 h-6" />,
    stats: "70+ Languages",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconGradient: "from-purple-500 to-pink-500",
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

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Why BeyondChats?
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Top-notch AI-driven customer support solution that scales with your
            business
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 relative overflow-hidden">
                <CardContent className="p-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div
                      className={`rounded-full bg-gradient-to-br ${feature.iconGradient} p-3 w-12 h-12 flex items-center justify-center mb-4 text-white shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-xl mb-2 flex items-center group-hover:text-primary transition-colors">
                      {feature.title}
                      <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-muted-foreground mb-4 group-hover:text-gray-600 transition-colors">
                      {feature.description}
                    </p>
                    <p className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {feature.stats}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
          >
            Book call now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
