
import React from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  options: Option[];
  control: Control<any>;
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  name, 
  options, 
  control, 
  title,
  columns = 2 
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 3: return "grid-cols-1 md:grid-cols-3";
      case 4: return "grid-cols-2 md:grid-cols-4";
      case 2:
      default: return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div className="space-y-3">
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <div className={`grid ${getGridCols()} gap-x-6 gap-y-3`}>
        {options.map((option) => (
          <FormField
            key={option.id}
            control={control}
            name={`${name}.${option.id}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-secondary transition-colors duration-200">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  {option.label}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
