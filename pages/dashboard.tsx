"use client";

import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  MessageSquare,
  Users,
  Clock,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Gauge,
  BookOpen,
  Bot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const performanceData = [
  { name: "Jan", conversations: 400, responseTime: 240, successRate: 85 },
  { name: "Feb", conversations: 300, responseTime: 139, successRate: 88 },
  { name: "Mar", conversations: 200, responseTime: 980, successRate: 90 },
  { name: "Apr", conversations: 278, responseTime: 390, successRate: 87 },
  { name: "May", conversations: 189, responseTime: 480, successRate: 91 },
];

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    avatar: "/avatars/01.png",
    action: "Product inquiry about pricing",
    time: "2 min ago",
    status: "active",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "/avatars/02.png",
    action: "Support request for integration",
    time: "5 min ago",
    status: "pending",
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
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Dashboard() {
  return (
    <Layout>
      <div className="relative min-h-screen bg-dot-pattern">
        {/* Gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl space-y-4 sm:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center sm:text-left"
          >
            <Badge
              variant="outline"
              className="mb-4 inline-flex animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
            >
              <Bot className="mr-2 h-4 w-4 text-primary" />
              AI Dashboard
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Monitor your chatbot&apos;s performance and user interactions
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={item}>
              <MetricCard
                title="Active Users Today"
                value="2,345"
                change="+14%"
                trend="up"
                icon={Users}
              />
            </motion.div>
            <motion.div variants={item}>
              <MetricCard
                title="Response Rate"
                value="94%"
                change="+2.5%"
                trend="up"
                icon={MessageSquare}
              />
            </motion.div>
            <motion.div variants={item}>
              <MetricCard
                title="Avg Response Time"
                value="1.2s"
                change="-0.3s"
                trend="down"
                icon={Clock}
              />
            </motion.div>
            <motion.div variants={item}>
              <MetricCard
                title="User Satisfaction"
                value="4.8"
                change="+0.2"
                trend="up"
                icon={Brain}
              />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid gap-4 sm:gap-6 md:grid-cols-5 lg:grid-cols-3"
          >
            {/* Performance Charts */}
            <Card className="md:col-span-3 lg:col-span-2 overflow-hidden bg-white/50 backdrop-blur-sm border-primary/10">
              <Tabs defaultValue="conversations" className="p-4 sm:p-6">
                <TabsList className="grid w-full grid-cols-3 bg-primary/5">
                  <TabsTrigger
                    value="conversations"
                    className="data-[state=active]:bg-white"
                  >
                    <MessageSquare className="mr-2 h-4 w-4 hidden sm:block" />
                    <span className="truncate">Conversations</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="knowledge"
                    className="data-[state=active]:bg-white"
                  >
                    <BookOpen className="mr-2 h-4 w-4 hidden sm:block" />
                    <span className="truncate">Knowledge</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="training"
                    className="data-[state=active]:bg-white"
                  >
                    <Gauge className="mr-2 h-4 w-4 hidden sm:block" />
                    <span className="truncate">Training</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="conversations" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-white/50 p-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold">Performance Overview</h3>
                      <Badge
                        variant="outline"
                        className="bg-white whitespace-nowrap"
                      >
                        <Sparkles className="mr-2 h-4 w-4 text-primary" />
                        Real-time Data
                      </Badge>
                    </div>
                    <div className="h-[300px] sm:h-[400px] pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis dataKey="name" stroke="#888888" />
                          <YAxis stroke="#888888" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="conversations"
                            stroke="#8884d8"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="responseTime"
                            stroke="#82ca9d"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="successRate"
                            stroke="#ffc658"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="knowledge" className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-white/50 p-4">
                      <h3 className="font-semibold">Coverage Statistics</h3>
                      <p className="text-2xl font-bold text-primary">85%</p>
                      <p className="text-sm text-muted-foreground">
                        Knowledge base coverage
                      </p>
                    </Card>
                    <Card className="bg-white/50 p-4">
                      <h3 className="font-semibold">Quality Score</h3>
                      <p className="text-2xl font-bold text-primary">92%</p>
                      <p className="text-sm text-muted-foreground">
                        Response accuracy
                      </p>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="training" className="space-y-4 pt-4">
                  <Card className="bg-white/50 p-4">
                    <h3 className="font-semibold">Learning Progress</h3>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Product Knowledge</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
                            style={{ width: "95%" }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Customer Support</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
                            style={{ width: "88%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Recent Activity */}
            <Card className="md:col-span-2 lg:col-span-1 bg-white/50 backdrop-blur-sm border-primary/10">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold">Recent Activity</h3>
                  <Badge
                    variant="outline"
                    className="bg-white whitespace-nowrap"
                  >
                    Live Updates
                  </Badge>
                </div>
                <ScrollArea className="h-[300px] sm:h-[400px] pr-4 mt-4">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 rounded-lg border border-primary/10 bg-white/50 p-4 hover:bg-white/80 transition-colors"
                      >
                        <Avatar>
                          <AvatarImage src={activity.avatar} />
                          <AvatarFallback className="bg-primary/10">
                            {activity.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {activity.user}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {activity.action}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                          <Badge
                            variant={
                              activity.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className="mt-1 bg-gradient-to-r from-primary to-purple-500"
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <Card className="relative overflow-hidden bg-white/50 backdrop-blur-sm border-primary/10 p-6 hover:bg-white/80 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 p-2 border border-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {value}
          </p>
          <span
            className={`flex items-center text-sm ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {change}
          </span>
        </div>
      </div>
    </Card>
  );
}
