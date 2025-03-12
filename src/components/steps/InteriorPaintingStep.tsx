
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { INTERIOR_ROOMS, INTERIOR_OPTIONS } from "@/constants/formOptions";
import CheckboxGroup from "../CheckboxGroup";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface InteriorPaintingStepProps {
  isActive: boolean;
}

const InteriorPaintingStep: React.FC<InteriorPaintingStepProps> = ({ isActive }) => {
  const { control } = useFormContext<RockstarFormValues>();

  return (
    <FormStep title="Interior Painting Services" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Select Rooms to Paint</h3>
            <CheckboxGroup
              name="interiorPainting.rooms"
              options={INTERIOR_ROOMS}
              control={control}
              columns={3}
            />
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Select Painting Options</h3>
            <CheckboxGroup
              name="interiorPainting.options"
              options={INTERIOR_OPTIONS}
              control={control}
              columns={3}
            />
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="interiorPainting.interiorCommercialNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interior Commercial Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any specific details or requirements for interior commercial painting..."
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

export default InteriorPaintingStep;
