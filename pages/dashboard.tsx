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

// Mock data - replace with real data
const performanceData = [
  { name: "Jan", conversations: 400, responseTime: 240, successRate: 85 },
  { name: "Feb", conversations: 300, responseTime: 139, successRate: 88 },
  { name: "Mar", conversations: 200, responseTime: 980, successRate: 90 },
  { name: "Apr", conversations: 278, responseTime: 390, successRate: 87 },
  { name: "May", conversations: 189, responseTime: 480, successRate: 91 },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Active Conversations
            </h3>
            <div className="mt-2 flex items-center">
              <p className="text-2xl font-bold">2,345</p>
              <span className="ml-2 text-sm text-green-500">+14%</span>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Response Rate
            </h3>
            <div className="mt-2 flex items-center">
              <p className="text-2xl font-bold">94%</p>
              <span className="ml-2 text-sm text-green-500">+2.5%</span>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </h3>
            <div className="mt-2 flex items-center">
              <p className="text-2xl font-bold">1.2s</p>
              <span className="ml-2 text-sm text-green-500">-0.3s</span>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              User Satisfaction
            </h3>
            <div className="mt-2 flex items-center">
              <p className="text-2xl font-bold">4.8</p>
              <span className="ml-2 text-sm text-green-500">⭐</span>
            </div>
          </Card>
        </div>

        {/* Performance Chart */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="col-span-2 overflow-hidden p-6">
            <h3 className="mb-4 text-lg font-medium">Chatbot Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="successRate"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Key Insights</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Top Performing Responses</h4>
                <p className="text-sm text-muted-foreground">
                  Product inquiries: 92% success
                </p>
              </div>
              <div>
                <h4 className="font-medium">Common Queries</h4>
                <p className="text-sm text-muted-foreground">
                  Pricing, Features, Support
                </p>
              </div>
              <div>
                <h4 className="font-medium">Suggested Improvements</h4>
                <p className="text-sm text-muted-foreground">
                  Update FAQ responses
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <Tabs defaultValue="conversations" className="p-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="conversations">
                Latest Conversations
              </TabsTrigger>
              <TabsTrigger value="training">Training Updates</TabsTrigger>
              <TabsTrigger value="integration">Integration Status</TabsTrigger>
            </TabsList>
            <TabsContent value="conversations" className="mt-4 space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Product inquiry about pricing
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">2 min ago</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">
                      Support request for integration
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">5 min ago</p>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="training" className="mt-4 space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">New Content Added</p>
                <p className="text-sm text-muted-foreground">
                  Updated product documentation
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium">Training Complete</p>
                <p className="text-sm text-muted-foreground">
                  New responses for common queries
                </p>
              </div>
            </TabsContent>
            <TabsContent value="integration" className="mt-4 space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">Website Integration</p>
                <p className="text-sm text-muted-foreground">
                  All systems operational
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium">API Status</p>
                <p className="text-sm text-muted-foreground">
                  100% uptime in last 24h
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
}
