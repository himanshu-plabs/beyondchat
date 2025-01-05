import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";

const organizationSchema = z.object({
  name: z.string().min(2).max(50),
  website: z.string().url(),
  description: z.string().min(10).max(500).optional(),
});

type OrganizationForm = z.infer<typeof organizationSchema>;

interface ScanningStatus {
  pagesFound: number;
  pagesScanned: number;
  estimatedTimeRemaining: number;
  status: "idle" | "scanning" | "completed" | "error";
}

interface PageStatus {
  url: string;
  status: "pending" | "scanning" | "completed" | "error";
  error?: string;
}

const Organization: NextPage = () => {
  const [scanningStatus, setScanningStatus] = useState<ScanningStatus>({
    pagesFound: 0,
    pagesScanned: 0,
    estimatedTimeRemaining: 0,
    status: "idle",
  });
  const router = useRouter();
  const form = useForm<OrganizationForm>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
    },
  });

  const { data: pages = [], refetch: refetchPages } = useQuery<PageStatus[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await fetch("/api/pages");
      if (!response.ok) throw new Error("Failed to fetch pages");
      return response.json();
    },
    enabled: scanningStatus.status === "scanning",
    refetchInterval: scanningStatus.status === "scanning" ? 2000 : false,
  });

  const startScanMutation = useMutation({
    mutationFn: async (data: OrganizationForm) => {
      const response = await fetch("/api/organization/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to start scan");
      return response.json();
    },
    onSuccess: () => {
      setScanningStatus((prev) => ({ ...prev, status: "scanning" }));
      refetchPages();
    },
    onError: () => {
      toast.error("Failed to start website scan");
    },
  });

  const onSubmit = async (data: OrganizationForm) => {
    try {
      await startScanMutation.mutateAsync(data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const getStatusBadge = (status: PageStatus["status"]) => {
    const variants: Record<
      PageStatus["status"],
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      scanning: "outline",
      completed: "default",
      error: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const progress = scanningStatus.pagesFound
    ? (scanningStatus.pagesScanned / scanningStatus.pagesFound) * 100
    : 0;

  return (
    <MainLayout showProgress currentStep={2} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Organization Setup
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your organization details and let us scan your website
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  Fill in your organization information to get started
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
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your organization..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={startScanMutation.isPending}
                    >
                      {startScanMutation.isPending
                        ? "Starting scan..."
                        : "Start Website Scan"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Website Scanning Progress</CardTitle>
                <CardDescription>
                  Monitor the progress of your website scan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {scanningStatus.pagesScanned} /{" "}
                        {scanningStatus.pagesFound} pages scanned
                      </span>
                      {scanningStatus.estimatedTimeRemaining > 0 && (
                        <span>
                          ~
                          {Math.ceil(
                            scanningStatus.estimatedTimeRemaining / 60
                          )}{" "}
                          minutes remaining
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>URL</TableHead>
                          <TableHead className="w-[100px]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pages.map((page) => (
                          <TableRow key={page.url}>
                            <TableCell className="font-mono text-sm">
                              {page.url}
                            </TableCell>
                            <TableCell>{getStatusBadge(page.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {scanningStatus.status === "completed" && (
                    <Button
                      className="w-full"
                      onClick={() => router.push("/setup/test")}
                    >
                      Continue to Testing
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organization;
