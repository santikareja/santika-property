"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const schedulerSchema = z.object({
  keywords: z.string().min(1, "Keywords are required"),
  customPrompt: z.string().optional(),
  postsPerDay: z.number().min(1).max(10),
  minWords: z.number().min(500).max(2000),
  maxWords: z.number().min(500).max(2000),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export default function BlogScheduler() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schedulerSchema),
    defaultValues: {
      keywords: "",
      customPrompt: "",
      postsPerDay: 1,
      minWords: 800,
      maxWords: 1200,
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: z.infer<typeof schedulerSchema>) => {
    setLoading(true);
    try {
      // Split keywords into array
      const keywords = data.keywords
        .split("\n")
        .map((k) => k.trim())
        .filter(Boolean);

      // Calculate dates for scheduling
      const startDate = new Date(data.startDate);
      const endDate = data.endDate ? new Date(data.endDate) : null;

      // Schedule posts
      for (let i = 0; i < keywords.length; i++) {
        const postDate = new Date(startDate);
        postDate.setDate(startDate.getDate() + Math.floor(i / data.postsPerDay));

        if (endDate && postDate > endDate) break;

        await fetch("/api/blog/auto-generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keyword: keywords[i],
            customPrompt: data.customPrompt,
            schedule: postDate.toISOString(),
            minWords: data.minWords,
            maxWords: data.maxWords,
          }),
        });
      }

      toast.success("Articles scheduled successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to schedule articles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Auto Blog Generator</h2>
        <p className="text-muted-foreground">
          Schedule automatic blog post generation with AI assistance.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (one per line)</Label>
          <Textarea
            id="keywords"
            {...form.register("keywords")}
            rows={5}
            placeholder="Tips membeli rumah pertama&#10;Investasi properti 2024&#10;Desain interior minimalis"
          />
          {form.formState.errors.keywords && (
            <p className="text-sm text-destructive">
              {form.formState.errors.keywords.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customPrompt">Custom Prompt (optional)</Label>
          <Textarea
            id="customPrompt"
            {...form.register("customPrompt")}
            rows={3}
            placeholder="Add specific instructions for the AI writer..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postsPerDay">Posts per Day</Label>
            <Select
              value={form.watch("postsPerDay")?.toString()}
              onValueChange={(value) =>
                form.setValue("postsPerDay", parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select posts per day" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 5, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} post{num > 1 ? "s" : ""} per day
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Word Count Range</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                {...form.register("minWords", { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Max"
                {...form.register("maxWords", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              {...form.register("startDate")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date (optional)</Label>
            <Input
              type="date"
              id="endDate"
              {...form.register("endDate")}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Articles"}
        </Button>
      </form>
    </div>
  );
}