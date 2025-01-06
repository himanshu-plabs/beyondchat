import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { AuthForms } from "@/components/auth/AuthForms";
import { BenefitsSection } from "@/components/auth/BenefitsSection";

const Register: NextPage = () => {
  return (
    <MainLayout showProgress currentStep={1} totalSteps={5}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-[1200px] px-4 md:px-6 py-12"
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Welcome to BeyondChat
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Join thousands of businesses revolutionizing their customer
                support
              </p>
            </motion.div>

            <AuthForms />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden lg:block"
          >
            <BenefitsSection />
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Register;
