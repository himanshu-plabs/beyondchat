import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: number;
  Icon?: LucideIcon;
  color?: string;
  showProgress?: boolean;
  total?: number;
}

export function StatsCard({
  title,
  value,
  Icon,
  color = "text-primary",
  showProgress,
  total,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/60 backdrop-blur-md border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
          </div>
          {Icon && (
            <div className="p-2 w-fit rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          {showProgress && total && (
            <div className="mt-3 space-y-1">
              <Progress
                value={(value / total) * 100}
                className="h-1.5 bg-primary/10"
                indicatorClassName="bg-gradient-to-r from-primary to-purple-600"
              />
              <div className="text-xs text-muted-foreground">
                {((value / total) * 100).toFixed(0)}% of total
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
