import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Startup",
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
  },
  {
    name: "Standard",
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
  },
  {
    name: "Business",
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
  },
  {
    name: "Enterprise",
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
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Pick the plan that&apos;s right for you
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Try AI chatbot free for 14 days. No credit card required. Pay once
            you are satisfied.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan, i) => (
            <motion.div key={i} variants={item}>
              <Card
                className={`h-full relative ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      {plan.price !== "Custom" ? (
                        <>
                          <span className="text-5xl font-bold tracking-tight">
                            ₹{plan.price}
                          </span>
                          <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                            /month
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-semibold">
                          Need-based Pricing
                        </span>
                      )}
                    </div>
                  </CardTitle>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-x-3">
                        <Check className="h-6 w-5 flex-none text-primary" />
                        <span className="text-sm leading-6 text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      className="w-full"
                      variant={
                        plan.name === "Enterprise" ? "outline" : "default"
                      }
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
