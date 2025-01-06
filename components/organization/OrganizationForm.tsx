import { Building2, Globe, Users2, Briefcase, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const organizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select a company size"),
});

export type OrganizationForm = z.infer<typeof organizationSchema>;

const industries = [
  "Technology",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Other",
];

const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

interface OrganizationFormProps {
  onSubmit: (data: OrganizationForm) => Promise<void>;
  isSubmitting?: boolean;
}

export function OrganizationForm({
  onSubmit,
  isSubmitting,
}: OrganizationFormProps) {
  const form = useForm<OrganizationForm>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      website: "",
      industry: "",
      size: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  mx-auto"
      >
        <Card className="border-primary/10 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Building2 className="h-5 w-5 text-primary" />
                      Organization Name
                    </FormLabel>
                    <FormDescription className="text-muted-foreground/80">
                      Enter your company or organization name
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Acme Inc"
                        {...field}
                        className="h-12 text-base border-primary/20 focus:border-primary/30 bg-white/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Globe className="h-5 w-5 text-primary" />
                      Website URL
                    </FormLabel>
                    <FormDescription className="text-muted-foreground/80">
                      Your company website address
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="h-12 text-base border-primary/20 focus:border-primary/30 bg-white/50 backdrop-blur-sm"
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value && !value.startsWith("http")) {
                            value = `https://${value}`;
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Industry
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-primary/20 focus:border-primary/30 bg-white/50 backdrop-blur-sm">
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-primary/20">
                          {industries.map((industry) => (
                            <SelectItem
                              key={industry}
                              value={industry}
                              className="focus:bg-primary/5 focus:text-primary"
                            >
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <Users2 className="h-5 w-5 text-primary" />
                        Company Size
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-primary/20 focus:border-primary/30 bg-white/50 backdrop-blur-sm">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-primary/20">
                          {companySizes.map((size) => (
                            <SelectItem
                              key={size}
                              value={size}
                              className="focus:bg-primary/5 focus:text-primary"
                            >
                              {size} employees
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Setting up...
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          )}
        </Button>
      </form>
    </Form>
  );
}
