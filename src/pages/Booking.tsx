"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  service,
  additionalServices,
  timeSlots,
  cityStateMap,
  vehicleTypes,
  calculatePrice as baseCalculatePrice,
  extraServices,
} from "@/utils/services";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import OrderSummaryAccordion from "@/components/OrderSummary";

// ✅ Safe wrapper for calculatePrice
const calculatePrice = (
  vehicleType: string,
  packageId: string,
  serviceCategory: string,
  vehicleSize?: number,
  extraService?: string
) => {
  const price = baseCalculatePrice(
    vehicleType,
    packageId,
    serviceCategory,
    vehicleSize || 0,
    extraService
  );
  if (!price || isNaN(price)) {
    console.warn("Price not found → defaulting 0", { vehicleType, packageId, serviceCategory, vehicleSize, extraService });
    return 0;
  }
  return price;
};

// ---------------- CONFIRMATION MODAL ----------------
const ConfirmationModal = ({ open, onClose, formData, total }: any) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Booking Confirmed 🎉</DialogTitle>
          <DialogDescription>
            Thank you <span className="font-medium">{formData.firstName}</span>!
            <br />Your booking has been successfully scheduled.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 border rounded-lg bg-gray-50 p-4">
          <h3 className="text-lg font-semibold mb-3 text-center">Appointment Details</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="font-medium">Vehicle:</span>
            <span className="text-right">
              {formData.vehicleMake} {formData.vehicleModel} {formData.vehicleYear}
            </span>
            <span className="font-medium">Date:</span>
            <span className="text-right">
              {formData.date ? new Date(formData.date).toLocaleDateString() : "N/A"}
            </span>
            <span className="font-medium">Time Slot:</span>
            <span className="text-right">{formData.timeSlot || "N/A"}</span>
            <span className="font-medium">Total:</span>
            <span className="font-bold text-green-600 text-right">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={onClose} className="w-full bg-black text-white hover:bg-gray-700">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ---------------- MAIN BOOKING COMPONENT ----------------
const Booking = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    selectedServices: { serviceType: string; package: string }[];
    additionalServices: string[];
    vehicleType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehicleColor: string;
    vehicleWidth: string;
    vehicleLength: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    date: string;
    timeSlot: string;
    notes: string;
    packageType: string;
    serviceCategory: string;
    vehicleSize: string;
    extraService: string[];
    windowtintingPackages: string[];
    ceramiccoatingPackageType: string;
  }>({
    selectedServices: [],
    additionalServices: [],
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleWidth: "",
    vehicleLength: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    timeSlot: "",
    notes: "",
    packageType: "",
    serviceCategory: "",
    vehicleSize: "",
    extraService: [],
    windowtintingPackages: [],
    ceramiccoatingPackageType: "",
  });

  // Format phone number to Virginia state format with +1 prefix
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10); // Remove non-digits and limit to 10
    if (cleaned.length <= 3) return `+1 ${cleaned}`;
    if (cleaned.length <= 6) return `+1 ${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `+1 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city,
      state: cityStateMap[city] || ""
    }));
  };

  // Helpers
  const updateForm = (updates: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateForm({ [name]: value } as any);
  };

  const handleCheckboxChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(id)
        ? prev.additionalServices.filter((s) => s !== id)
        : [...prev.additionalServices, id],
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    updateForm({ date: date ? date.toISOString() : "" });
  };

  // ✅ COMPLETELY FIXED: Calculate total price - Only include selected services
  const calculateTotalPrice = () => {
    let total = 0;

    console.log("Calculating price for:", {
      packageType: formData.packageType,
      extraService: formData.extraService,
      vehicleType: formData.vehicleType,
      serviceCategory: formData.serviceCategory
    });

    // Main package (always include if selected)
    if (formData.packageType) {
      const price = calculatePrice(
        formData.vehicleType,
        formData.packageType,
        formData.serviceCategory,
        Number(formData.vehicleSize)
      );
      console.log("Main package price:", price);
      total += price;
    }

    // ✅ FIXED: Only include extra services that are actually selected and NOT detailing
    formData.extraService.forEach((extraService) => {
      if (extraService === "detailing") return; // Skip detailing as it's handled above

      if (extraService === "windowtinting") {
        // Sum up all selected window tinting packages
        formData.windowtintingPackages.forEach((pkgKey) => {
          const price = calculatePrice(
            formData.vehicleType,
            pkgKey,
            extraService,
            Number(formData.vehicleSize),
            extraService
          );
          console.log(`Window tinting ${pkgKey} price:`, price);
          total += price;
        });
      } else if (extraService === "ceramiccoating") {
        const pkgType = formData.ceramiccoatingPackageType;
        if (!pkgType) return;

        const price = calculatePrice(
          formData.vehicleType,
          pkgType,
          extraService,
          Number(formData.vehicleSize),
          extraService
        );

        console.log(`${extraService} price:`, price);
        total += price;
      }
    });

    // Add-ons
    formData.additionalServices.forEach((id: string) => {
      const add = additionalServices.find((a) => a.id === id);
      if (add) {
        console.log(`Add-on ${id} price:`, add.price);
        total += add.price;
      }
    });

    console.log("Final total:", total);
    return total;
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = isPromoValid ? totalPrice * 0.85 : totalPrice;

  // Steps validation
  const validateStep = () => {
    if (step === 1 && !formData.vehicleType) {
      toast({ title: "Missing Vehicle Info ❌", description: "Please select a vehicle type." });
      return false;
    }
    if (step === 2 && !formData.packageType) {
      toast({ title: "Missing Service ❌", description: "Please select a package." });
      return false;
    }
    if (step === 3 && (!formData.firstName || !formData.email)) {
      toast({ title: "Missing Info ❌", description: "Please enter required customer details." });
      return false;
    }
    return true;
  };

  const nextStep = () => validateStep() && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.email) {
      toast({ title: "Email Missing ❌", description: "Please provide a valid email." });
      setIsSubmitting(false);
      return;
    }

    if (formData.zip.length !== 5) {
      toast({ title: "Invalid Zip Code ❌", description: "Zip code must be exactly 5 digits." });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalPrice: discountedPrice }),
      });

      if (!response.ok) throw new Error("Booking failed");

      setShowConfirmation(true);
      toast({ title: "Booking Successful ✅", description: "Your booking is confirmed." });
    } catch {
      toast({
        title: "Submission Error ❌",
        description: "There was a problem submitting your booking.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animations
  const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-screen bg-lightwhite-900 text-gray-800">
      <Navbar />
      <div className="pt-32 pb-16 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between w-full">
              {["Vehicle Info", "Package", "Customer Info"].map((label, i) => {
                const isActive = step === i + 1;
                const isCompleted = step > i + 1;

                return (
                  <div key={i} className="flex-1">
                    <div
                      className={`px-6 py-2 text-sm font-medium rounded-md shadow-md text-center border-2
              ${isActive
                          ? "bg-black text-white border-black"
                          : isCompleted
                            ? "bg-green-500 text-white border-green-300"
                            : "bg-transparent text-gray-500 border-gray-300"
                        }`}
                    >
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* STEP 1 - Vehicle Info */}
                {step === 1 && (
                  <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                    <h2 className="text-xl font-semibold">Vehicle Information</h2>
                    <Select value={formData.vehicleType} onValueChange={(v) => updateForm({ vehicleType: v })}>
                      <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="boat">Boat</SelectItem>
                        <SelectItem value="rv">RV</SelectItem>
                        <SelectItem value="jetski">Jet Ski</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                      </SelectContent>
                    </Select>

                    {["car", "truck", "suv", "sedan", "van", "bike", "jetski"].includes(formData.vehicleType) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="vehicleMake" placeholder="Make *" value={formData.vehicleMake} onChange={handleInputChange} />
                        <Input name="vehicleModel" placeholder="Model *" value={formData.vehicleModel} onChange={handleInputChange} />
                        <Input name="vehicleYear" type="string" placeholder="Year *" value={formData.vehicleYear} onChange={handleInputChange} />
                        <Input name="vehicleColor" placeholder="Color *" value={formData.vehicleColor} onChange={handleInputChange} />
                      </div>
                    )}

                    {["boat", "rv"].includes(formData.vehicleType) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="vehicleModel" placeholder="Model Name *" value={formData.vehicleModel} onChange={handleInputChange} />
                        <Input name="vehicleColor" type="string" placeholder="Color *" value={formData.vehicleColor} onChange={handleInputChange} />
                      </div>
                    )}

                    {/* Boat/RV size input */}
                    {(formData.vehicleType === "boat" || formData.vehicleType === "rv") && (
                      <Input
                        type="number"
                        placeholder="Enter size in feet *"
                        value={formData.vehicleSize || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vehicleSize: e.target.value,
                          }))
                        }
                        className="bg-white text-black"
                      />
                    )}

                    <div className="flex justify-end">
                      <Button onClick={nextStep} className="bg-black text-white hover:bg-gray-600">
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 - Package & Services */}
                {step === 2 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold">Select Package</h2>

                    {/* Vehicle type display */}
                    <p className="text-gray-700 mb-2">
                      Vehicle Type:{" "}
                      <span className="font-medium">
                        {vehicleTypes.find((v) => v.id === formData.vehicleType)?.name}
                      </span>
                    </p>

                    {/* Extra Services Checkboxes */}
                    <div>
                      <Label>Select Extra Services</Label>
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.extraService.includes("windowtinting")}
                            onCheckedChange={() => {
                              setFormData((prev) => ({
                                ...prev,
                                extraService: prev.extraService.includes("windowtinting")
                                  ? prev.extraService.filter((s) => s !== "windowtinting")
                                  : [...prev.extraService, "windowtinting"],
                              }));
                            }}
                          />
                          Window Tinting
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.extraService.includes("ceramiccoating")}
                            onCheckedChange={() => {
                              setFormData((prev) => ({
                                ...prev,
                                extraService: prev.extraService.includes("ceramiccoating")
                                  ? prev.extraService.filter((s) => s !== "ceramiccoating")
                                  : [...prev.extraService, "ceramiccoating"],
                              }));
                            }}
                          />
                          Ceramic Coating
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.extraService.includes("detailing")}
                            onCheckedChange={() => {
                              setFormData((prev) => ({
                                ...prev,
                                extraService: prev.extraService.includes("detailing")
                                  ? prev.extraService.filter((s) => s !== "detailing")
                                  : [...prev.extraService, "detailing"],
                              }));
                            }}
                          />
                          Detailing
                        </label>
                      </div>
                    </div>

                    {/* Window Tinting Package Select */}
                    {formData.extraService.includes("windowtinting") && (
                      <div className="mt-2">
                        <Label>Window Tinting Packages (Select Multiple)</Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          {Object.entries(extraServices.windowtinting || {}).map(([packageKey, pkg]) => {
                            const packageData = pkg as { name: string; price: string | number; includes?: string[] };
                            const price = calculatePrice(
                              formData.vehicleType,
                              packageKey,
                              "windowtinting",
                              Number(formData.vehicleSize),
                              "windowtinting"
                            );
                            const isSelected = formData.windowtintingPackages.includes(packageKey);

                            return (
                              <div
                                key={packageKey}
                                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""
                                  }`}
                                onClick={() => {
                                  setFormData((prev) => {
                                    const alreadySelected = prev.windowtintingPackages.includes(packageKey);
                                    let newPackages;
                                    if (alreadySelected) {
                                      newPackages = prev.windowtintingPackages.filter((p) => p !== packageKey);
                                    } else {
                                      newPackages = [...prev.windowtintingPackages, packageKey];
                                    }
                                    return {
                                      ...prev,
                                      windowtintingPackages: newPackages,
                                    };
                                  });
                                }}
                              >
                                <div className="flex justify-between items-center font-medium">
                                  <span>{packageData.name}</span>
                                  <span className="text-green-600 font-bold">${price}</span>
                                </div>

                                {packageData.includes && packageData.includes.length > 0 && (
                                  <ul className="text-sm mt-2 list-disc pl-4 space-y-1 text-gray-600">
                                    {packageData.includes.map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                )}

                                {isSelected && (
                                  <p className="text-sm text-green-600 flex items-center mt-2">
                                    <Check size={14} className="mr-1" /> Selected
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Ceramic Coating Package Select */}
                    {formData.extraService.includes("ceramiccoating") && (
                      <div className="mt-2">
                        <Label>Ceramic Coating Package</Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          {Object.entries(extraServices.ceramiccoating || {}).map(([packageKey, pkg]) => {
                            const packageData = pkg as { name: string; price: string | number; includes?: string[] };
                            const price = calculatePrice(
                              formData.vehicleType,
                              packageKey,
                              "ceramiccoating",
                              Number(formData.vehicleSize),
                              "ceramiccoating"
                            );
                            const isSelected = formData.ceramiccoatingPackageType === packageKey;

                            return (
                              <div
                                key={packageKey}
                                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""
                                  }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    ceramiccoatingPackageType: packageKey
                                  }))
                                }
                              >
                                <div className="flex justify-between items-center font-medium">
                                  <span>{packageData.name}</span>
                                  <span className="text-green-600 font-bold">${price}</span>
                                </div>

                                {packageData.includes && packageData.includes.length > 0 && (
                                  <ul className="text-sm mt-2 list-disc pl-4 space-y-1 text-gray-600">
                                    {packageData.includes.map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                )}

                                {isSelected && (
                                  <p className="text-sm text-green-600 flex items-center mt-2">
                                    <Check size={14} className="mr-1" /> Selected
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Service Packages (Normal Detailing) */}
                    {(formData.extraService.includes("detailing") || formData.extraService.length === 0) && formData.vehicleType && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(service[formData.vehicleType] || {}).map(([serviceCategory, packagesOrService]) => {
                          if ((packagesOrService as any).name) {
                            // Single package (e.g., RV, boat, jetski)
                            const pkg = packagesOrService as { name: string; price?: number; pricePerFt?: number; includes: string[] };
                            const packageId = serviceCategory;
                            const isSelected = formData.packageType === packageId;
                            const price = calculatePrice(
                              formData.vehicleType,
                              packageId,
                              serviceCategory,
                              Number(formData.vehicleSize)
                            );

                            return (
                              <div
                                key={packageId}
                                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""}`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    serviceCategory,
                                    packageType: packageId,
                                  }))
                                }
                              >
                                <div className="flex justify-between font-medium">
                                  <span>{pkg.name}</span>
                                  <span>${price}</span>
                                </div>
                                <ul className="text-sm mt-2 list-disc pl-4 space-y-1">
                                  {pkg.includes.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                                </ul>
                                {isSelected && (
                                  <p className="text-sm text-green-600 flex items-center mt-2">
                                    <Check size={14} className="mr-1" /> Selected
                                  </p>
                                )}
                              </div>
                            );
                          } else {
                            // Multiple packages (e.g., cars)
                            return Object.entries(packagesOrService as Record<string, { name: string; price?: number; includes: string[] }>).map(
                              ([packageKey, pkg]) => {
                                const packageId = `${serviceCategory}-${packageKey}`;
                                const isSelected = formData.packageType === packageId;
                                const price = calculatePrice(
                                  formData.vehicleType,
                                  packageId,
                                  serviceCategory,
                                  Number(formData.vehicleSize)
                                );

                                return (
                                  <div
                                    key={packageId}
                                    className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""}`}
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        serviceCategory,
                                        packageType: packageId,
                                      }))
                                    }
                                  >
                                    <div className="flex justify-between font-medium">
                                      <span>{pkg.name}</span>
                                      <span>${price}</span>
                                    </div>
                                    <ul className="text-sm mt-2 list-disc pl-4 space-y-1">
                                      {pkg.includes.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                                    </ul>
                                    {isSelected && (
                                      <p className="text-sm text-green-600 flex items-center mt-2">
                                        <Check size={14} className="mr-1" /> Selected
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            );
                          }
                        })}
                      </div>
                    )}

                    {/* Add-ons */}
                    {formData.packageType && (
                      <div>
                        <h3 className="font-medium mt-4">Add-ons</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {additionalServices.map((svc) => (
                            <div key={svc.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={svc.id}
                                checked={formData.additionalServices.includes(svc.id)}
                                onCheckedChange={() => handleCheckboxChange(svc.id)}
                              />
                              <Label htmlFor={svc.id}>
                                {svc.name} – ${svc.price}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-6">
                      <Button
                        onClick={prevStep}
                        className="bg-black text-white hover:bg-gray-600"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!formData.packageType}
                        className="bg-black text-white hover:bg-gray-600"
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 - Customer Info */}
                {step === 3 && (
                  <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                    <h2 className="text-xl font-semibold">Customer Info</h2>

                    {/* Name */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} required />
                      <Input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required />
                      <Input name="phone" placeholder="Phone *" value={formData.phone} onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        updateForm({ phone: formatted });
                      }} required />
                    </div>

                    {/* Address */}
                    <Input name="address" placeholder="Address *" value={formData.address} onChange={handleInputChange} required />

                    {/* City + State + Zip */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* City */}
                      <Input
                        required
                        name="city"
                        value={formData.city}
                        onChange={(e) => {
                          const city = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            city,
                            state: cityStateMap[city] || ""
                          }));
                        }}
                        placeholder="City *"
                        className="bg-white text-black"
                      />

                      {/* State */}
                      <Input
                        required
                        name="state"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, state: e.target.value }))
                        }
                        placeholder="State *"
                        className="bg-white text-black"
                        readOnly={!!formData.city && !!cityStateMap[formData.city]}
                      />

                      {/* Zip */}
                      <Input
                        required
                        name="zip"
                        value={formData.zip}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                          setFormData((prev) => ({ ...prev, zip: value }));
                        }}
                        placeholder="Zip *"
                        className="bg-white text-black"
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                      {/* Calendar */}
                      <div className="flex-1">
                        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn("w-full justify-start bg-white text-black", !date && "text-muted-foreground")}
                              onClick={() => setOpenCalendar(true)}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date *"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(day) => {
                                handleDateChange(day);
                                setOpenCalendar(false);
                              }}
                              disabled={(day) => day < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Slots */}
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(val) => setFormData((prev) => ({ ...prev, timeSlot: val }))}
                      >
                        <SelectTrigger className="w-full bg-white text-black">
                          <SelectValue placeholder="Select time slot *" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <Textarea
                      name="notes"
                      placeholder="Any special instructions?"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="bg-white text-black"
                    />

                    {/* Promo Code */}
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter Promo Code (Optional)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-white text-black"
                      />
                      {promoCode.trim() !== "" && (
                        <Button
                          type="button"
                          onClick={() => {
                            if (promoCode.toLowerCase() === "discount15") {
                              setIsPromoValid(true);
                              toast({ title: "Promo Applied ✅", description: "15% discount applied." });
                            } else {
                              setIsPromoValid(false);
                              toast({ title: "Invalid Promo ❌", description: "Please try another code.", variant: "destructive" });
                            }
                          }}
                          className="bg-black text-white hover:bg-gray-600"
                        >
                          Apply
                        </Button>
                      )}
                    </div>

                    {/* Order Summary */}
                    <OrderSummaryAccordion
                      formData={formData}
                      totalPrice={totalPrice}
                      discountedPrice={discountedPrice}
                      isPromoValid={isPromoValid}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between">
                      <Button type="button" onClick={prevStep} className="bg-black text-white hover:bg-gray-600">
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="bg-black text-white hover:bg-gray-600">
                        {isSubmitting ? "Submitting..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          router.push("/");
        }}
        formData={formData}
        total={discountedPrice}
      />
    </div>
  );
};

export default Booking;