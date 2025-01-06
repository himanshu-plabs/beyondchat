import { motion } from "framer-motion";

const benefits = [
  {
    title: "AI-powered Support",
    description: "Automate customer support with cutting-edge AI technology",
  },
  {
    title: "Easy Integration",
    description: "Set up in minutes with our simple integration process",
  },
  {
    title: "24/7 Support",
    description:
      "Never miss a customer inquiry with round-the-clock automation",
  },
];

export const BenefitsSection = () => {
  return (
    <div className="space-y-6 bg-muted p-8 rounded-2xl">
      <h2 className="text-3xl font-bold">Why choose BeyondChat?</h2>
      <ul className="space-y-6">
        {benefits.map((benefit, index) => (
          <motion.li
            key={benefit.title}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * (index + 1) }}
            className="flex items-center space-x-4 bg-background p-4 rounded-lg"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
