import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  className?: string;
  variant?: "default" | "success" | "info";
}

const variants = {
  default: "border-gray-200 hover:border-gray-300",
  success: "border-green-100 hover:border-green-200 bg-green-50/50",
  info: "border-blue-100 hover:border-blue-200 bg-blue-50/50",
};

export function ActionCard({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  className,
  variant = "default",
}: ActionCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        variants[variant],
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
          {description}
        </p>
        <Button
          variant="outline"
          className="w-full hover:bg-primary hover:text-primary-foreground"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
