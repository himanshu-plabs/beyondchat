import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MagicLinkDialog } from "./MagicLinkDialog";

const emailSchema = z.object({
  email: z.string().email(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type RegisterForm = z.infer<typeof registerSchema>;
type EmailForm = z.infer<typeof emailSchema>;

export const AuthForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState<"credentials" | "email">(
    "credentials"
  );
  const [showMagicLinkDialog, setShowMagicLinkDialog] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState("");

  const credentialsForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      terms: false,
    },
  });

  const handleEmailSignIn = async (data: EmailForm) => {
    try {
      setIsLoading(true);
      const result = await signIn("email", {
        email: data.email,
        redirect: false,
        callbackUrl: "/setup/organization",
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      setMagicLinkEmail(data.email);
      setShowMagicLinkDialog(true);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send magic link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignUp = async (data: RegisterForm) => {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/setup/organization",
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Account created successfully!");
      window.location.href = result?.url || "/setup/organization";
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      <Tabs
        value={authType}
        onValueChange={(v) => setAuthType(v as "credentials" | "email")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-14 rounded-lg p-1 bg-white/50 backdrop-blur-sm border border-primary/10">
          <TabsTrigger
            value="credentials"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary data-[state=active]:text-primary-foreground rounded-md transition-all data-[state=active]:shadow-lg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Password
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary data-[state=active]:text-primary-foreground rounded-md transition-all data-[state=active]:shadow-lg"
          >
            <Mail className="w-4 h-4 mr-2" />
            Magic Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="mt-6">
          <Form {...credentialsForm}>
            <form
              onSubmit={credentialsForm.handleSubmit(handleCredentialsSignUp)}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={credentialsForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="h-12 text-base pl-11 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={credentialsForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="h-12 text-base pl-11 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FormField
                  control={credentialsForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="h-12 text-base pl-11 pr-11 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FormField
                  control={credentialsForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary/90 data-[state=checked]:to-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-muted-foreground">
                          I accept the{" "}
                          <a
                            href="/terms"
                            className="text-primary underline-offset-4 hover:underline font-medium"
                          >
                            terms and conditions
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 text-base font-medium transition-all bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 shadow-lg hover:shadow-primary/20",
                    isLoading && "animate-pulse"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Creating your account..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSignIn)}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="h-12 text-base pl-11 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FormField
                  control={emailForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary/90 data-[state=checked]:to-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-muted-foreground">
                          I accept the{" "}
                          <a
                            href="/terms"
                            className="text-primary underline-offset-4 hover:underline font-medium"
                          >
                            terms and conditions
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 text-base font-medium transition-all bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 shadow-lg hover:shadow-primary/20",
                    isLoading && "animate-pulse"
                  )}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {isLoading ? "Sending magic link..." : "Send magic link"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 text-muted-foreground bg-white/50 backdrop-blur-sm rounded-full border border-primary/10">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full h-12 text-base font-medium bg-white/50 backdrop-blur-sm border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all"
        onClick={() => signIn("google", { callbackUrl: "/setup/organization" })}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      <MagicLinkDialog
        isOpen={showMagicLinkDialog}
        onClose={() => setShowMagicLinkDialog(false)}
        email={magicLinkEmail}
      />
    </div>
  );
};
