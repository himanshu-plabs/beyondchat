import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Link from "next/link";

const Home: NextPage = () => {
  const features = [
    {
      title: "AI-Powered Conversations",
      description: "Natural language processing for human-like interactions",
    },
    {
      title: "Easy Integration",
      description: "Simple setup process with just a few lines of code",
    },
    {
      title: "Customizable Responses",
      description: "Train your chatbot with your specific business knowledge",
    },
  ];

  const faqs = [
    {
      question: "How does the chatbot learn my business?",
      answer:
        "Our AI scans your website and documentation to understand your business context and provide accurate responses.",
    },
    {
      question: "Is technical knowledge required?",
      answer:
        "No, our platform is designed to be user-friendly with a simple setup process.",
    },
    {
      question: "What about data privacy?",
      answer:
        "We take data privacy seriously and comply with GDPR and other privacy regulations.",
    },
  ];

  return (
    <MainLayout>
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Transform Your Customer Support
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Intelligent chatbot solutions that understand your business and
                delight your customers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button asChild size="lg" className="mt-6">
                <Link href="/register">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-[700px] mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
