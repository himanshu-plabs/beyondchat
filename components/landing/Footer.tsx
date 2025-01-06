import Link from "next/link";
import { Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { name: "Why BeyondChats", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
  product: [
    { name: "Features", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  plans: [
    { name: "Startup", href: "#" },
    { name: "Standard", href: "#" },
    { name: "Business", href: "#" },
    { name: "Enterprise", href: "#" },
  ],
  resources: [
    { name: "Blogs", href: "#" },
    { name: "Case studies", href: "#" },
    { name: "Success stories", href: "#" },
    { name: "FAQs", href: "#" },
  ],
};

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

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />

      <div className="container px-4 md:px-6 py-12 md:py-16 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          <motion.div variants={item} className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                BeyondChats
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Intelligent chatbot solutions that understand your business and
              delight your customers.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold mb-4 text-primary">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold mb-4 text-primary">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © BeyondChats 2024. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                Data Security & Privacy Policy
                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                Terms and Conditions
                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                Refund Policy
                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
