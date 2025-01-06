import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, BarChart, Globe, Zap } from "lucide-react";

const features = [
  {
    title: "Automate conversations",
    description:
      "Minimize support workload and improve customer happiness instantly with AI-driven chatbots",
    icon: <MessageSquare className="w-6 h-6" />,
    stats: "50% Less Support queries",
  },
  {
    title: "Real-Time Communication",
    description:
      "Utilize live chat for instant, real-time communication with customers",
    icon: <Zap className="w-6 h-6" />,
    stats: "90% User Engagement",
  },
  {
    title: "Advanced Analytics",
    description:
      "Get detailed insights into customer interactions and support performance",
    icon: <BarChart className="w-6 h-6" />,
    stats: "99% Customer satisfaction",
  },
  {
    title: "Multi-language Support",
    description:
      "Support customers in their preferred language with 70+ language options",
    icon: <Globe className="w-6 h-6" />,
    stats: "70+ Languages",
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
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
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {feature.stats}
                  </p>
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
          <Button size="lg" className="group">
            Book call now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
