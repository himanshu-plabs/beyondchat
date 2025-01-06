import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "documentation", label: "Documentation" },
  { value: "api", label: "API" },
  { value: "blog", label: "Blog" },
  { value: "tutorial", label: "Tutorial" },
  { value: "support", label: "Support" },
];

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6"
    >
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="relative">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] h-10 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select category" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white/80 backdrop-blur-sm border-primary/10">
            {categories.map((category) => (
              <SelectItem
                key={category.value}
                value={category.value}
                className="hover:bg-primary/5 focus:bg-primary/5 focus:text-foreground"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
