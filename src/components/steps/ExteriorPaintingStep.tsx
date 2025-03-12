
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
import { EXTERIOR_ELEMENTS } from "@/constants/formOptions";
import CheckboxGroup from "../CheckboxGroup";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface ExteriorPaintingStepProps {
  isActive: boolean;
}

const ExteriorPaintingStep: React.FC<ExteriorPaintingStepProps> = ({ isActive }) => {
  const { control } = useFormContext<RockstarFormValues>();

  return (
    <FormStep title="Exterior Painting Services" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Select Exterior Elements to Paint</h3>
            <CheckboxGroup
              name="exteriorPainting.exteriorElements"
              options={EXTERIOR_ELEMENTS}
              control={control}
              columns={3}
            />
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="exteriorPainting.exteriorCommercialNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exterior Commercial Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any specific details or requirements for exterior commercial painting..."
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

export default ExteriorPaintingStep;
