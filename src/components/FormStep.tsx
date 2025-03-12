
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FormStepProps {
  children: React.ReactNode;
  title: string;
  isActive: boolean;
  className?: string;
}

const FormStep: React.FC<FormStepProps> = ({ 
  children, 
  title, 
  isActive,
  className = "" 
}) => {
  if (!isActive) return null;

  return (
    <div className={`${className} form-step-active w-full max-w-4xl mx-auto`}>
      <Card className="border shadow-md">
        <div className="form-heading">{title}</div>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormStep;
