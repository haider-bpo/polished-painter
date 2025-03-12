
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RockstarFormValues } from "@/schemas/rockstarForm";
import { FORM_STEPS } from "@/constants/formOptions";
import FormStep from "../FormStep";

interface ReviewStepProps {
  isActive: boolean;
  onNavigateToStep: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ isActive, onNavigateToStep }) => {
  const { control, watch } = useFormContext<RockstarFormValues>();
  const formData = watch();

  // Helper functions to check if sections have data
  const hasInteriorServices = () => {
    const rooms = formData.interiorPainting?.rooms;
    return rooms && Object.values(rooms).some(value => value === true);
  };

  const hasExteriorServices = () => {
    const exteriorElements = formData.exteriorPainting?.exteriorElements;
    return exteriorElements && Object.values(exteriorElements).some(value => value === true);
  };

  const hasHandymanServices = () => {
    const services = formData.handymanServices?.services;
    return services && Object.values(services).some(value => value === true);
  };

  const renderSectionTitle = (index: number, title: string) => (
    <div className="flex justify-between items-center bg-secondary p-3 rounded-t-md">
      <h3 className="text-md font-medium">{title}</h3>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onNavigateToStep(index)}
        className="text-xs"
      >
        Edit
      </Button>
    </div>
  );

  return (
    <FormStep title="Review & Sign" isActive={isActive}>
      <div className="space-y-6">
        {/* Customer Details Summary */}
        <Card className="border shadow-sm overflow-hidden">
          {renderSectionTitle(0, "Customer Details")}
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Customer Name</p>
              <p>{formData.customerDetails?.customerName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{formData.customerDetails?.email || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p>{formData.customerDetails?.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p>
                {formData.customerDetails?.address}, {formData.customerDetails?.city},{" "}
                {formData.customerDetails?.state} {formData.customerDetails?.zip}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services Summary */}
        <Card className="border shadow-sm overflow-hidden">
          {renderSectionTitle(1, "Services Summary")}
          <CardContent className="pt-6 space-y-4">
            {hasInteriorServices() && (
              <div>
                <h4 className="text-sm font-medium text-primary">Interior Painting</h4>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(formData.interiorPainting?.rooms || {}).map(
                    ([key, value]) =>
                      value && (
                        <div key={key} className="flex items-center text-sm">
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      )
                  )}
                </div>
                {formData.interiorPainting?.interiorCommercialNotes && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm">{formData.interiorPainting.interiorCommercialNotes}</p>
                  </div>
                )}
              </div>
            )}

            {hasExteriorServices() && (
              <div>
                <h4 className="text-sm font-medium text-primary">Exterior Painting</h4>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(formData.exteriorPainting?.exteriorElements || {}).map(
                    ([key, value]) =>
                      value && (
                        <div key={key} className="flex items-center text-sm">
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      )
                  )}
                </div>
                {formData.exteriorPainting?.exteriorCommercialNotes && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm">{formData.exteriorPainting.exteriorCommercialNotes}</p>
                  </div>
                )}
              </div>
            )}

            {hasHandymanServices() && (
              <div>
                <h4 className="text-sm font-medium text-primary">Handyman Services</h4>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(formData.handymanServices?.services || {}).map(
                    ([key, value]) =>
                      value && (
                        <div key={key} className="flex items-center text-sm">
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      )
                  )}
                </div>
                {formData.handymanServices?.handymanNotes && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm">{formData.handymanServices.handymanNotes}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="border shadow-sm overflow-hidden">
          {renderSectionTitle(5, "Financial Summary")}
          <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Grand Total</p>
              <p className="text-xl font-bold">${formData.paymentDetails?.grandTotal || "0.00"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Down Payment</p>
              <p>${formData.paymentDetails?.totalDownPayment || "0.00"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Balance Due</p>
              <p>
                $
                {(
                  parseFloat(formData.paymentDetails?.grandTotal || "0") -
                  parseFloat(formData.paymentDetails?.totalDownPayment || "0")
                ).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Signature Fields */}
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Signature</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                control={control}
                name="signature.customerSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Signature</FormLabel>
                    <FormControl>
                      <Input placeholder="Type full name to sign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="signature.contractorSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contractor Signature</FormLabel>
                    <FormControl>
                      <Input placeholder="Type full name to sign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="signature.date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </FormStep>
  );
};

export default ReviewStep;
