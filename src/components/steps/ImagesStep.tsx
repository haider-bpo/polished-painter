
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, X } from "lucide-react";
import FormStep from "../FormStep";
import { RockstarFormValues } from "@/schemas/rockstarForm";

interface ImagesStepProps {
  isActive: boolean;
}

const ImagesStep: React.FC<ImagesStepProps> = ({ isActive }) => {
  const { control, setValue, watch } = useFormContext<RockstarFormValues>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Create URL strings for form state
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
      const currentImages = watch("images.images") || [];
      setValue("images.images", [...currentImages, ...newImageUrls]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    
    const currentImages = watch("images.images") || [];
    setValue(
      "images.images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  return (
    <FormStep title="Project Images" isActive={isActive}>
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Upload Project Images</h3>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-primary/50">
              <ImagePlus className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag & drop project images here, or click to browse</p>
              <Button variant="outline" className="mt-2" type="button" onClick={() => document.getElementById("image-upload")?.click()}>
                Add Images
              </Button>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            
            {imageFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Uploaded Images ({imageFiles.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="images.imageComments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about the uploaded images..."
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

export default ImagesStep;
