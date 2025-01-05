import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { PlayCircle } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const OnboardingStart: NextPage = () => {
  const router = useRouter();
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegistrationForm) => {
    try {
      // Handle registration logic here
      await router.push("/setup/organization");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <MainLayout showProgress currentStep={1} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to BeyondChat
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto">
              Set up your AI-powered customer support in just 10 minutes. Join
              thousands of businesses already using BeyondChat.
            </p>
            <Button variant="outline" className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Card>
              <CardHeader>
                <CardTitle>Register with Email</CardTitle>
                <CardDescription>
                  Create your account using your business email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              className="mt-1"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm leading-none">
                            I accept the terms and conditions
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Get Started
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Registration</CardTitle>
                <CardDescription>
                  Sign up instantly with your Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/setup/organization" })
                  }
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </Button>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>Benefits of quick registration:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>One-click setup</li>
                    <li>Auto-fill organization details</li>
                    <li>Secure authentication</li>
                    <li>No password to remember</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4">
              {["Acme Inc", "TechCorp", "StartupX", "Enterprise Co"].map(
                (company) => (
                  <div
                    key={company}
                    className="text-sm text-gray-500 dark:text-gray-400 font-medium"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by leading companies worldwide
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OnboardingStart;
