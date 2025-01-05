import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Home: NextPage = () => {
  const features = [
    {
      title: "AI-Powered Conversations",
      description: "Natural language processing for human-like interactions",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Easy Integration",
      description: "Simple setup process with just a few lines of code",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Customizable Responses",
      description: "Train your chatbot with your specific business knowledge",
      icon: <Settings className="w-5 h-5" />,
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
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-4"
            >
              <Badge variant="outline" className="animate-pulse">
                New Features Available
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Customer Support
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Intelligent chatbot solutions that understand your business and
                delight your customers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-4 mt-8"
            >
              <Button asChild size="lg" className="group">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <AnimatePresence>
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Card className="group h-full overflow-hidden transition-colors hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our service
            </p>
          </motion.div>
          <div className="max-w-[800px] mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b">
                  <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-4 py-4 rounded-lg transition-all">
                    <span className="text-left font-medium">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
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
