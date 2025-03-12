
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
import { HANDYMAN_SERVICES } from "@/constants/formOptions";
import CheckboxGroup from "../CheckboxGroup";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface HandymanServicesStepProps {
  isActive: boolean;
}

const HandymanServicesStep: React.FC<HandymanServicesStepProps> = ({ isActive }) => {
  const { control } = useFormContext<RockstarFormValues>();

  return (
    <FormStep title="Handyman Services" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Select Handyman Services</h3>
            <CheckboxGroup
              name="handymanServices.services"
              options={HANDYMAN_SERVICES}
              control={control}
              columns={3}
            />
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="handymanServices.handymanNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handyman Service Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any specific details or requirements for handyman services..."
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

export default HandymanServicesStep;
