import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

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
  color,
  showProgress,
  total,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color} flex items-center`}>
          {Icon && <Icon className="text-gray-400 h-8 w-8 mr-2" />}
          {value}
        </div>
        {showProgress && total && (
          <Progress value={(value / total) * 100} className="h-2" />
        )}
      </CardContent>
    </Card>
  );
}
