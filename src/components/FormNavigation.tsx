
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { FORM_STEPS } from "@/constants/formOptions";

interface FormNavigationProps {
  currentStep: number;
  isLoading: boolean;
  isLastStep: boolean;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  isLoading,
  isLastStep,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevStep}
        disabled={currentStep === 0 || isLoading}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
      
      <Button
        type="button"
        onClick={handleNextStep}
        disabled={isLoading}
        className="flex items-center gap-1"
      >
        {isLoading ? (
          <div className="animate-pulse">Processing...</div>
        ) : (
          <>
            {isLastStep ? (
              <>
                <span>Generate Invoice</span>
                <Save className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </>
        )}
      </Button>
    </div>
  );
};

export default FormNavigation;
