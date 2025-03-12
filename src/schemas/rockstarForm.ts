
import * as z from "zod";

// Customer Details Schema
const customerDetailsSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Valid ZIP code required"),
});

// Interior Painting Schema
const interiorPaintingSchema = z.object({
  rooms: z.object({
    livingRoom: z.boolean().optional(),
    bedrooms: z.boolean().optional(),
    bathroom: z.boolean().optional(),
    kitchen: z.boolean().optional(),
    diningRoom: z.boolean().optional(),
    hallway: z.boolean().optional(),
    closet: z.boolean().optional(),
    laundryRoom: z.boolean().optional(),
    office: z.boolean().optional(),
    basement: z.boolean().optional(),
    garage: z.boolean().optional(),
    other: z.boolean().optional(),
  }),
  options: z.object({
    walls: z.boolean().optional(),
    ceilings: z.boolean().optional(),
    trim: z.boolean().optional(),
    doors: z.boolean().optional(),
    windows: z.boolean().optional(),
    cabinets: z.boolean().optional(),
    crownMolding: z.boolean().optional(),
    baseboards: z.boolean().optional(),
    wallpaper: z.boolean().optional(),
    stucco: z.boolean().optional(),
    popcornCeiling: z.boolean().optional(),
  }),
  interiorCommercialNotes: z.string().optional(),
});

// Exterior Painting Schema
const exteriorPaintingSchema = z.object({
  exteriorElements: z.object({
    walls: z.boolean().optional(),
    trim: z.boolean().optional(),
    doors: z.boolean().optional(),
    windows: z.boolean().optional(),
    garage: z.boolean().optional(),
    deck: z.boolean().optional(),
    fence: z.boolean().optional(),
    porch: z.boolean().optional(),
    railings: z.boolean().optional(),
    shutters: z.boolean().optional(),
    gutters: z.boolean().optional(),
    other: z.boolean().optional(),
  }),
  exteriorCommercialNotes: z.string().optional(),
});

// Handyman Services Schema
const handymanServicesSchema = z.object({
  services: z.object({
    drywall: z.boolean().optional(),
    flooring: z.boolean().optional(),
    tile: z.boolean().optional(),
    carpentry: z.boolean().optional(),
    plumbing: z.boolean().optional(),
    electrical: z.boolean().optional(),
    other: z.boolean().optional(),
  }),
  handymanNotes: z.string().optional(),
});

// Paint Selection Schema
const paintSelectionSchema = z.object({
  paintBrand: z.enum(["sherwinWilliams", "benjaminMoore", "other"]),
  paintFinish: z.enum(["flat", "eggshell", "satin", "semiGloss", "highGloss"]),
  customColors: z.boolean(),
  paintNotes: z.string().optional(),
});

// Payment Details Schema
const paymentDetailsSchema = z.object({
  paintingPayment: z.object({
    totalCost: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
    downPayment: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
    balanceDue: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  }),
  handymanPayment: z.object({
    totalCost: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount").optional(),
    downPayment: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount").optional(),
    balanceDue: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount").optional(),
  }).optional(),
  grandTotal: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  totalDownPayment: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
  paymentLink: z.string().url("Invalid URL").optional(),
});

// Warranty Schema
const warrantySchema = z.object({
  interiorWarrantyMonths: z.string().regex(/^\d+$/, "Enter a valid number"),
  interiorWarrantyNotes: z.string().optional(),
  exteriorWarrantyMonths: z.string().regex(/^\d+$/, "Enter a valid number").optional(),
  exteriorWarrantyNotes: z.string().optional(),
});

// Images Schema
const imagesSchema = z.object({
  images: z.array(z.string()).optional(),
  imageComments: z.string().optional(),
});

// Final Signature Schema
const signatureSchema = z.object({
  customerSignature: z.string().min(2, "Signature required"),
  contractorSignature: z.string().optional(),
  date: z.date(),
});

// Combine all schemas
export const rockstarFormSchema = z.object({
  customerDetails: customerDetailsSchema,
  interiorPainting: interiorPaintingSchema,
  exteriorPainting: exteriorPaintingSchema,
  handymanServices: handymanServicesSchema,
  paintSelection: paintSelectionSchema,
  paymentDetails: paymentDetailsSchema,
  warranty: warrantySchema,
  images: imagesSchema,
  signature: signatureSchema,
});

export type RockstarFormValues = z.infer<typeof rockstarFormSchema>;
