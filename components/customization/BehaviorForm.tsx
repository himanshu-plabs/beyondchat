import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { CustomizationForm } from "@/types/customization";
import { motion } from "framer-motion";
import { MessageSquare, Volume2, Clock, Bot } from "lucide-react";

const tones = [
  {
    label: "Professional",
    value: "professional",
    description: "Formal and business-like",
  },
  {
    label: "Friendly",
    value: "friendly",
    description: "Warm and approachable",
  },
  {
    label: "Technical",
    value: "technical",
    description: "Detailed and precise",
  },
  { label: "Casual", value: "casual", description: "Relaxed and informal" },
];

interface BehaviorFormProps {
  control: Control<CustomizationForm>;
}

export function BehaviorForm({ control }: BehaviorFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/60 backdrop-blur-md border-primary/10 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Behavior
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Configure how your chatbot interacts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="behavior.welcomeMessage"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Welcome Message
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter a welcome message"
                    className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="behavior.tone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Volume2 className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Response Tone
                  </FormLabel>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-sm border-primary/10">
                    {tones.map((tone) => (
                      <SelectItem
                        key={tone.value}
                        value={tone.value}
                        className="hover:bg-primary/5 focus:bg-primary/5 focus:text-foreground"
                      >
                        <div className="space-y-1">
                          <div>{tone.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {tone.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="behavior.fallbackMessage"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Fallback Message
                  </FormLabel>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Enter a fallback message"
                    className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="behavior.operatingHours.enabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border border-primary/10 bg-white/50 backdrop-blur-sm p-4 transition-all hover:border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Operating Hours
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Limit when your chatbot is available
                    </p>
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {control._formValues.behavior.operatingHours.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <FormField
                control={control}
                name="behavior.operatingHours.start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="behavior.operatingHours.end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      End Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
