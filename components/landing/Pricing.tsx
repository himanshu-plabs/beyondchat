import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap, Rocket, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Startup",
    icon: <Rocket className="w-6 h-6 text-blue-500" />,
    description:
      "Best for individuals and startups who are just getting started",
    price: "899",
    features: [
      "50 chats in a month",
      "Basic dashboard (Chats management)",
      "Train chatbot on 20 articles",
      "Restricted dashboard",
    ],
    popular: false,
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    buttonVariant: "outline" as const,
  },
  {
    name: "Standard",
    icon: <Zap className="w-6 h-6 text-primary" />,
    description:
      "Best for startups who are figuring out their go-to-market strategy",
    price: "4499",
    features: [
      "50 chats in a month",
      "Advanced Dashboard",
      "Train chatbot on 2,000 articles",
      "Emailers: Daily Stats + Monthly analysis",
    ],
    popular: true,
    gradient: "from-primary/20 via-purple-500/20 to-primary/20",
    buttonVariant: "default" as const,
  },
  {
    name: "Business",
    icon: <Building2 className="w-6 h-6 text-purple-500" />,
    description:
      "Best for businesses who want to convert large number of users into customers",
    price: "6999",
    features: [
      "50 chats in a month",
      "Advanced Dashboard",
      "Train chatbot on 20k articles",
      "AI Analysis",
      "Qualified Business leads",
    ],
    popular: false,
    gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
    buttonVariant: "outline" as const,
  },
  {
    name: "Enterprise",
    icon: <Building2 className="w-6 h-6 text-emerald-500" />,
    description:
      "Reach out to us to discuss your needs and generate leads with our Chatbot",
    price: "Custom",
    features: [
      "Need-based Pricing",
      "Custom features",
      "Dedicated account manager",
      "Priority support",
      "Custom API calls",
    ],
    popular: false,
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    buttonVariant: "outline" as const,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Pick the plan that&apos;s right for you
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
            Try AI chatbot free for 14 days. No credit card required. Pay once
            you are satisfied.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan, i) => (
            <motion.div key={i} variants={item}>
              <Card
                className={`group h-full relative overflow-visible transition-all duration-500 hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105 border-2 mt-4"
                    : "hover:scale-[1.02] hover:border-primary/50"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-40">
                    <span className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="relative space-y-2">
                  <div className="flex items-center gap-3 mb-4">
                    {plan.icon}
                    <CardTitle>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {plan.name}
                      </h3>
                    </CardTitle>
                  </div>
                  <div className="flex items-baseline gap-x-2">
                    {plan.price !== "Custom" ? (
                      <>
                        <span className="text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:text-primary transition-colors">
                          ₹{plan.price}
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Need-based Pricing
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-gray-600 transition-colors">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-x-3">
                        <Check
                          className={`h-5 w-5 flex-none ${
                            plan.popular ? "text-primary" : "text-gray-500/80"
                          } group-hover:text-primary transition-colors`}
                        />
                        <span className="text-sm leading-6 text-muted-foreground group-hover:text-gray-600 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      className={`w-full group relative overflow-hidden ${
                        plan.buttonVariant === "default"
                          ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
                          : "border-2 hover:border-primary hover:text-primary"
                      }`}
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.name === "Enterprise"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
