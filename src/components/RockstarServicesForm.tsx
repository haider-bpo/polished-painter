
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RockstarFormValues, rockstarFormSchema } from "@/schemas/rockstarForm";
import { useToast } from "@/hooks/use-toast";
import { FORM_STEPS } from "@/constants/formOptions";

// Form Steps
import CustomerDetailsStep from "./steps/CustomerDetailsStep";
import InteriorPaintingStep from "./steps/InteriorPaintingStep";
import ExteriorPaintingStep from "./steps/ExteriorPaintingStep";
import HandymanServicesStep from "./steps/HandymanServicesStep";
import PaintSelectionStep from "./steps/PaintSelectionStep";
import PaymentDetailsStep from "./steps/PaymentDetailsStep";
import WarrantyStep from "./steps/WarrantyStep";
import ImagesStep from "./steps/ImagesStep";
import ReviewStep from "./steps/ReviewStep";

// Components
import FormProgress from "./FormProgress";
import FormNavigation from "./FormNavigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Default form values
const defaultValues: RockstarFormValues = {
  customerDetails: {
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  interiorPainting: {
    rooms: {},
    options: {},
    interiorCommercialNotes: "",
  },
  exteriorPainting: {
    exteriorElements: {},
    exteriorCommercialNotes: "",
  },
  handymanServices: {
    services: {},
    handymanNotes: "",
  },
  paintSelection: {
    paintBrand: "sherwinWilliams",
    paintFinish: "eggshell",
    customColors: false,
    paintNotes: "",
  },
  paymentDetails: {
    paintingPayment: {
      totalCost: "0.00",
      downPayment: "0.00",
      balanceDue: "0.00",
    },
    handymanPayment: {
      totalCost: "0.00",
      downPayment: "0.00",
      balanceDue: "0.00",
    },
    grandTotal: "0.00",
    totalDownPayment: "0.00",
    paymentLink: "",
  },
  warranty: {
    interiorWarrantyMonths: "24",
    interiorWarrantyNotes: "",
    exteriorWarrantyMonths: "24",
    exteriorWarrantyNotes: "",
  },
  images: {
    images: [],
    imageComments: "",
  },
  signature: {
    customerSignature: "",
    contractorSignature: "Angel Verde",
    date: new Date(),
  },
};

const RockstarServicesForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();

  // Form methods
  const methods = useForm<RockstarFormValues>({
    resolver: zodResolver(rockstarFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, formState: { errors, isValid }, trigger } = methods;

  // Handle step navigation
  const handleNextStep = async () => {
    // For the final step, submit the form
    if (currentStep === FORM_STEPS.length - 1) {
      await handleFormSubmit();
      return;
    }

    // Get field names for the current step
    const currentStepId = FORM_STEPS[currentStep].id;
    
    // Validate the current step's fields
    const isStepValid = await trigger(currentStepId as any);

    if (isStepValid) {
      // Mark step as completed
      setCompletedSteps({ ...completedSteps, [currentStep]: true });
      // Move to next step
      setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Show error toast
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  // Form submission handler
  const handleFormSubmit = async () => {
    handleSubmit(
      async (data) => {
        setIsSubmitting(true);
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // Log form data
          console.log("Form submitted successfully:", data);
          
          // Show success message
          toast({
            title: "Invoice Generated Successfully",
            description: "Your invoice has been created and can now be shared with the customer.",
          });
          
          // Here you would typically redirect or show a success screen
          
        } catch (error) {
          console.error("Form submission error:", error);
          toast({
            title: "Submission Failed",
            description: "There was an error generating your invoice. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      },
      (errors) => {
        console.error("Validation errors:", errors);
        toast({
          title: "Validation Error",
          description: "Please fix the errors before submitting the form.",
          variant: "destructive",
        });
      }
    )();
  };

  // Show form completion screen
  const [isCompleted, setIsCompleted] = useState(false);

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="bg-green-100 text-green-800 p-4 rounded-full inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Invoice Generated Successfully!</h2>
          <p className="text-gray-500">
            Your invoice has been created and can now be shared with the customer.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => {
                methods.reset(defaultValues);
                setCurrentStep(0);
                setCompletedSteps({});
                setIsCompleted(false);
              }}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Create New Invoice</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form className="container px-4 py-8 mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Rockstar Painting Services</h1>
          <p className="text-muted-foreground">
            Complete the form below to create a detailed estimate and invoice for your customer.
          </p>
        </header>

        <FormProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          completedSteps={completedSteps}
        />

        <div className="mb-8">
          {/* Form Steps */}
          <CustomerDetailsStep isActive={currentStep === 0} />
          <InteriorPaintingStep isActive={currentStep === 1} />
          <ExteriorPaintingStep isActive={currentStep === 2} />
          <HandymanServicesStep isActive={currentStep === 3} />
          <PaintSelectionStep isActive={currentStep === 4} />
          <PaymentDetailsStep isActive={currentStep === 5} />
          <WarrantyStep isActive={currentStep === 6} />
          <ImagesStep isActive={currentStep === 7} />
          <ReviewStep 
            isActive={currentStep === 8} 
            onNavigateToStep={setCurrentStep} 
          />
        </div>

        <FormNavigation
          currentStep={currentStep}
          isLoading={isSubmitting}
          isLastStep={currentStep === FORM_STEPS.length - 1}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      </form>
    </FormProvider>
  );
};

export default RockstarServicesForm;
