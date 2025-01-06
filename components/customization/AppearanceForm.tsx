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
import { Control } from "react-hook-form";
import { CustomizationForm } from "@/types/customization";
import { motion } from "framer-motion";
import { Palette, Type, Layout } from "lucide-react";

const colors = [
  { label: "Blue", value: "blue", class: "bg-blue-500" },
  { label: "Green", value: "green", class: "bg-emerald-500" },
  { label: "Purple", value: "purple", class: "bg-purple-500" },
  { label: "Red", value: "red", class: "bg-rose-500" },
  { label: "Orange", value: "orange", class: "bg-orange-500" },
];

const fonts = [
  { label: "System Default", value: "system" },
  { label: "Inter", value: "inter" },
  { label: "Roboto", value: "roboto" },
  { label: "Open Sans", value: "open-sans" },
];

const positions = [
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Top Left", value: "top-left" },
];

interface AppearanceFormProps {
  control: Control<CustomizationForm>;
}

export function AppearanceForm({ control }: AppearanceFormProps) {
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
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Appearance
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Customize how your chatbot looks
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="theme.primaryColor"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Palette className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Primary Color
                  </FormLabel>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-sm border-primary/10">
                    {colors.map((color) => (
                      <SelectItem
                        key={color.value}
                        value={color.value}
                        className="hover:bg-primary/5 focus:bg-primary/5 focus:text-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-4 w-4 rounded-full ${color.class}`}
                          />
                          {color.label}
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
            name="theme.font"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Type className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Font Family
                  </FormLabel>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-sm border-primary/10">
                    {fonts.map((font) => (
                      <SelectItem
                        key={font.value}
                        value={font.value}
                        className="hover:bg-primary/5 focus:bg-primary/5 focus:text-foreground"
                      >
                        {font.label}
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
            name="theme.position"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Layout className="h-4 w-4 text-primary" />
                  </div>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Widget Position
                  </FormLabel>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-sm border-primary/10">
                    {positions.map((position) => (
                      <SelectItem
                        key={position.value}
                        value={position.value}
                        className="hover:bg-primary/5 focus:bg-primary/5 focus:text-foreground"
                      >
                        {position.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
