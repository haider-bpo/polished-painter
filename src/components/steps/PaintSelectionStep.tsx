
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { PAINT_BRANDS, PAINT_FINISHES } from "@/constants/formOptions";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface PaintSelectionStepProps {
  isActive: boolean;
}

const PaintSelectionStep: React.FC<PaintSelectionStepProps> = ({ isActive }) => {
  const { control } = useFormContext<RockstarFormValues>();

  return (
    <FormStep title="Paint Selection" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6 space-y-6">
            <FormField
              control={control}
              name="paintSelection.paintBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paint Brand</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paint brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAINT_BRANDS.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.label}
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
              name="paintSelection.paintFinish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paint Finish</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paint finish" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAINT_FINISHES.map((finish) => (
                        <SelectItem key={finish.id} value={finish.id}>
                          {finish.label}
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
              name="paintSelection.customColors"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Custom Colors</FormLabel>
                    <FormDescription>
                      Does the customer need custom paint colors?
                    </FormDescription>
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
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="paintSelection.paintNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paint Selection Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any specific details about paint colors, special finishes, or custom requirements..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormStep>
  );
};

export default PaintSelectionStep;
