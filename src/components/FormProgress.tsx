
import React from "react";
import { FORM_STEPS } from "@/constants/formOptions";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

interface FormProgressProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: { [key: number]: boolean };
}

const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  setCurrentStep,
  completedSteps,
}) => {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex min-w-max">
        {FORM_STEPS.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = completedSteps[index];
          const isClickable = isCompleted || index === currentStep || (currentStep > index);
          
          return (
            <React.Fragment key={step.id}>
              <Button
                variant={isActive ? "default" : isCompleted ? "ghost" : "outline"}
                size="sm"
                className={`
                  rounded-full px-3 py-2 transition-all duration-200
                  ${isActive ? "bg-primary text-white" : ""}
                  ${isCompleted ? "text-primary" : ""}
                  ${isClickable ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}
                `}
                onClick={() => isClickable && setCurrentStep(index)}
                disabled={!isClickable}
              >
                <div className="flex items-center space-x-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                  ) : (
                    <Circle className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs sm:text-sm whitespace-nowrap">{step.label}</span>
                </div>
              </Button>
              {index < FORM_STEPS.length - 1 && (
                <div className="flex items-center mx-1">
                  <div className={`h-[2px] w-4 ${isCompleted ? "bg-primary" : "bg-gray-200"}`}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;
