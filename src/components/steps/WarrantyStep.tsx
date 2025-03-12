
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface WarrantyStepProps {
  isActive: boolean;
}

const WarrantyStep: React.FC<WarrantyStepProps> = ({ isActive }) => {
  const { control } = useFormContext<RockstarFormValues>();

  return (
    <FormStep title="Warranty Information" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Interior Warranty</h3>
            <div className="space-y-4">
              <FormField
                control={control}
                name="warranty.interiorWarrantyMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interior Warranty Period (Months)</FormLabel>
                    <FormControl>
                      <Input placeholder="24" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  A warranty of <span className="font-medium">[months]</span> months applies to the scope of work described in this contract. Rockstar Painting will repair blistering, chipping, or peeling paint when it is a direct result of poor workmanship.
                </p>
                <p className="mb-2">
                  Rockstar Painting's interior warranty does not apply to metal surfaces unless specified otherwise in the contract details. The warranty does not apply to cracks in drywall, mud, tape, or texture.
                </p>
                <p>
                  The standard warranty repairs only include prepping, priming (where necessary) and painting individual spots or sections where there is blister, chipping, or peeling paint. Therefore, Rockstar Painting does not guarantee that individual (touch-up) repairs will blend in with the original color due to fading, abrasion, and wear and tear.
                </p>
              </div>

              <FormField
                control={control}
                name="warranty.interiorWarrantyNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interior Warranty Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes for the interior warranty..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Exterior Warranty</h3>
            <div className="space-y-4">
              <FormField
                control={control}
                name="warranty.exteriorWarrantyMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exterior Warranty Period (Months)</FormLabel>
                    <FormControl>
                      <Input placeholder="24" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="warranty.exteriorWarrantyNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exterior Warranty Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes for the exterior warranty..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </FormStep>
  );
};

export default WarrantyStep;
