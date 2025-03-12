
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface PaymentDetailsStepProps {
  isActive: boolean;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({ isActive }) => {
  const { control, setValue } = useFormContext<RockstarFormValues>();

  // Watch for changes to calculate totals
  const paintingCost = useWatch({
    control,
    name: "paymentDetails.paintingPayment.totalCost",
  });
  
  const paintingDownPayment = useWatch({
    control,
    name: "paymentDetails.paintingPayment.downPayment",
  });
  
  const handymanCost = useWatch({
    control,
    name: "paymentDetails.handymanPayment.totalCost",
  });
  
  const handymanDownPayment = useWatch({
    control,
    name: "paymentDetails.handymanPayment.downPayment",
  });

  // Calculate painting balance due
  useEffect(() => {
    if (paintingCost && paintingDownPayment) {
      const paintingTotal = parseFloat(paintingCost);
      const paintingDown = parseFloat(paintingDownPayment);
      
      if (!isNaN(paintingTotal) && !isNaN(paintingDown)) {
        const balance = (paintingTotal - paintingDown).toFixed(2);
        setValue("paymentDetails.paintingPayment.balanceDue", balance);
      }
    }
  }, [paintingCost, paintingDownPayment, setValue]);

  // Calculate handyman balance due
  useEffect(() => {
    if (handymanCost && handymanDownPayment) {
      const handymanTotal = parseFloat(handymanCost);
      const handymanDown = parseFloat(handymanDownPayment);
      
      if (!isNaN(handymanTotal) && !isNaN(handymanDown)) {
        const balance = (handymanTotal - handymanDown).toFixed(2);
        setValue("paymentDetails.handymanPayment.balanceDue", balance);
      }
    }
  }, [handymanCost, handymanDownPayment, setValue]);

  // Calculate grand total and total down payment
  useEffect(() => {
    const pTotal = parseFloat(paintingCost || "0");
    const hTotal = parseFloat(handymanCost || "0");
    const pDown = parseFloat(paintingDownPayment || "0");
    const hDown = parseFloat(handymanDownPayment || "0");
    
    // Only calculate if at least one value exists
    if (!isNaN(pTotal) || !isNaN(hTotal)) {
      const grandTotal = (isNaN(pTotal) ? 0 : pTotal) + (isNaN(hTotal) ? 0 : hTotal);
      setValue("paymentDetails.grandTotal", grandTotal.toFixed(2));
    }
    
    if (!isNaN(pDown) || !isNaN(hDown)) {
      const totalDown = (isNaN(pDown) ? 0 : pDown) + (isNaN(hDown) ? 0 : hDown);
      setValue("paymentDetails.totalDownPayment", totalDown.toFixed(2));
    }
  }, [paintingCost, handymanCost, paintingDownPayment, handymanDownPayment, setValue]);

  return (
    <FormStep title="Payment Details" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Painting Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={control}
                name="paymentDetails.paintingPayment.totalCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Cost ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.paintingPayment.downPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Down Payment ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.paintingPayment.balanceDue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Due ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" readOnly {...field} />
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
            <h3 className="text-lg font-medium mb-4">Handyman Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={control}
                name="paymentDetails.handymanPayment.totalCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Cost ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.handymanPayment.downPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Down Payment ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.handymanPayment.balanceDue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Due ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" readOnly {...field} />
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
            <h3 className="text-lg font-medium mb-4">Total Cost</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={control}
                name="paymentDetails.grandTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grand Total ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.totalDownPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Down Payment ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paymentDetails.paymentLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
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

export default PaymentDetailsStep;
