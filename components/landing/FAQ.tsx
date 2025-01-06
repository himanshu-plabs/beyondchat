import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to integrate your chatbot?",
    answer:
      "Our chatbot can be integrated within minutes using our simple setup process. We provide comprehensive documentation and support to ensure a smooth integration.",
  },
  {
    question: "Do I need a credit card?",
    answer:
      "No, you don't need a credit card to start. You can try our chatbot free for 14 days and only pay once you're satisfied with the service.",
  },
  {
    question: "Can you integrate with our CRM?",
    answer:
      "Yes, we offer seamless integration with popular CRM platforms. Our API allows for custom integrations with your existing systems.",
  },
  {
    question: "How will I get the details of the leads?",
    answer:
      "All lead details are available in your dashboard in real-time. You can also set up email notifications and export leads to your preferred format.",
  },
  {
    question: "What if I want to cancel my subscription?",
    answer:
      "You can cancel your subscription at any time. We offer a hassle-free cancellation process with no hidden fees or long-term commitments.",
  },
  {
    question: "Is my user data secure?",
    answer:
      "Yes, we take data security seriously. We use industry-standard encryption and comply with GDPR and other privacy regulations to protect your data.",
  },
];

export const FAQ = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Find answers to common questions about our chatbot service
          </p>
        </motion.div>

        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AccordionItem value={`item-${i}`} className="border-b">
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
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            Ready to take BeyondChats for a spin?
          </h3>
          <p className="text-muted-foreground mb-8">
            Find out if a personalized AI support chatbot is a good fit for you
            in just a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="group">
              Start a free trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Book a demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
