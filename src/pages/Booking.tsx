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
  services,
  additionalServices,
  timeSlots,
  cityStateMap, vehicleTypes, calculatePrice,
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
          <Button onClick={onClose} className="w-full bg-black text-white">Close</Button>
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

  const [formData, setFormData] = useState({
    selectedServices: [] as { serviceType: string; package: string }[],
    additionalServices: [] as string[],
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
  });

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

  // Pricing
  const parsePrice = (price: string | number, length?: number) => {
    if (typeof price === "number") return price;
    if (price.includes("/ft") && length) {
      const match = price.match(/\d+/);
      return match ? Number(match[0]) * length : 0;
    }
    const match = price.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  // ------------------- Booking.tsx -------------------
  const calculateTotalPrice = () => {
    let total = 0;

    // Selected package
    if (formData.packageType) {
      total += calculatePrice(
        formData.vehicleType,
        formData.packageType,
        formData.serviceCategory,
        Number(formData.vehicleSize)
      );
    }

    // Additional services
    formData.additionalServices.forEach((id: string) => {
      const add = additionalServices.find((a) => a.id === id);
      if (add) total += add.price;
    });

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
              {["Vehicle Info", "Package", "Customer Info"].map((label, i) => (
                <div key={i} className="flex items-center flex-1">
                  {/* Step Box */}
                  <div
                    className={`flex-1 text-center px-6 py-2 rounded-md text-sm font-medium shadow-md
            ${step === i + 1
                        ? "bg-black text-white"
                        : step > i + 1
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {label}
                  </div>

                  {/* Connector Line (between steps only) */}
                  {i < 2 && (
                    <div
                      className={`h-0.5 flex-1 
              ${step > i + 1 ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              ))}
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

                    <div className="flex justify-end"><Button onClick={nextStep} className="bg-black text-white hover:bg-gray-600"    >Next</Button></div>
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

                    {/* Show vehicle type selected in Step 1 */}
                    <p className="text-gray-700 mb-2">
                      Vehicle Type: <span className="font-medium">{vehicleTypes.find(v => v.id === formData.vehicleType)?.name}</span>
                    </p>

                    {/* Boat/RV size input */}
                    {(formData.vehicleType === "boat" || formData.vehicleType === "rv") && (
                      <Input
                        type="number"
                        placeholder="Enter size in feet"
                        value={formData.vehicleSize || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, vehicleSize: e.target.value }))
                        }
                        className="bg-white text-black"
                      />
                    )}

                    {/* Service Packages */}
                    {formData.vehicleType && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(services[formData.vehicleType] || {}).map(
                          ([serviceCategory, packagesOrService]) => {

                            // Car/SUV/Truck/Van/Bike packages (nested)
                            if (["sedan", "suv", "truck", "van", "bike"].includes(formData.vehicleType)) {
                              return Object.entries(packagesOrService as any).map(
                                ([packageKey, pkg]) => {
                                  const packageId = `${serviceCategory}-${packageKey}`;
                                  const isSelected = formData.packageType === packageId;
                                  const price = calculatePrice(
                                    formData.vehicleType,
                                    packageId,
                                    serviceCategory,
                                    Number(formData.vehicleSize)
                                  );

                                  // Assert pkg as a proper type
                                  const typedPkg = pkg as { name: string; includes?: string[] };

                                  return (
                                    <div
                                      key={packageId}
                                      className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""
                                        }`}
                                      onClick={() =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          serviceCategory,
                                          packageType: packageId,
                                        }))
                                      }
                                    >
                                      <div className="flex justify-between font-medium">
                                        <span>{typedPkg.name}</span>
                                        <span>${price}</span>
                                      </div>
                                      <ul className="text-sm mt-2 list-disc pl-4 space-y-1">
                                        {typedPkg.includes?.map((i: string, idx: number) => (
                                          <li key={idx}>{i}</li>
                                        ))}
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

                            // Other vehicles (boat, rv, jetski)
                            const pkg = packagesOrService as any;
                            const isSelected = formData.packageType === serviceCategory;
                            const price = calculatePrice(
                              formData.vehicleType,
                              serviceCategory,
                              serviceCategory,
                              Number(formData.vehicleSize)
                            );

                            return (
                              <div
                                key={serviceCategory}
                                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition ${isSelected ? "bg-gray-100 border-black" : ""
                                  }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    serviceCategory,
                                    packageType: serviceCategory,
                                  }))
                                }
                              >
                                <div className="flex justify-between font-medium">
                                  <span>{pkg.name}</span>
                                  <span>${price}</span>
                                </div>
                                {pkg.includes && pkg.includes.length > 0 && (
                                  <ul className="text-sm mt-2 list-disc pl-4 space-y-1">
                                    {pkg.includes.map((i: string, idx: number) => (
                                      <li key={idx}>{i}</li>
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
                          }
                        )}
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
                      <Button onClick={prevStep}
                        className="bg-black text-white hover:bg-gray-600"
                      >Back</Button>
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
                      <Input name="phone" placeholder="Phone *" value={formData.phone} onChange={handleInputChange} required />
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
                            state: cityStateMap[city] || "" // auto-fill if exists
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
                        readOnly={!!formData.city && !!cityStateMap[formData.city]} // lock if city matches
                      />

                      {/* Zip */}
                      <Input
                        required
                        name="zip"
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, zip: e.target.value }))
                        }
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
          router.push("/"); // redirect after close
        }}
        formData={formData}
        total={discountedPrice}
      />
    </div>
  );
};

export default Booking;

