import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr Aniruddha Malpani",
    role: "Infertility Specialist",
    content:
      "We're thrilled with the chatbot from BeyondChats! It's smart, tailored, adaptable, precise, and evolves with our requirements. Call centers will soon become outdated.",
    rating: 5,
  },
  {
    name: "Joshua K",
    role: "Product Head @Selligion",
    content:
      "The dashboard is intuitive and the chatbot's responses are precise. We are planning to direct our existing customers to use the chatbot on our website for any queries / issues they have. Overall, pretty satisfied with the experience so far.",
    rating: 5,
  },
  {
    name: "Srividya MK",
    role: "B2B & B2C Sales at MultiBhashi",
    content:
      "BeyondChats is the perfect solution for diverse customer needs, supporting various languages. Opting for BeyondChats has significantly improved our sales efficiency.",
    rating: 5,
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

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What our customers have to say
          </h2>
          <div className="flex justify-center items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm font-medium">4.8 out of 5</span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">70%</div>
              <div className="text-sm text-muted-foreground">
                Resolution rate
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">
                Customer satisfaction
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">94%</div>
              <div className="text-sm text-muted-foreground">
                User Engagement
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">New Users</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
