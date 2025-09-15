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
  serviceTypes,
  additionalServices,
  vehicleTypes,
  timeSlots,
} from "@/utils/services";
import { usStates } from "@/utils/usStates";
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

/* ---------------------- ORDER SUMMARY COMPONENT ---------------------- */
const OrderSummary = ({
  formData,
  totalPrice,
  discountedPrice,
  isPromoValid,
}: any) => {
  const getServiceTypeDetails = (id: string) =>
    serviceTypes.find((s) => s.id === id);

  return (
    <Card className="mt-6 border-0 shadow-lg bg-gray-50">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Order Summary</h2>

        {/* Selected Services */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Services</h3>
          {formData.selectedServices.length > 0 ? (
            <ul className="space-y-2">
              {formData.selectedServices.map((sel: any, i: number) => {
                const service = getServiceTypeDetails(sel.serviceType);
                const pkg = service?.packages.find((p) => p.id === sel.package);
                return (
                  <li
                    key={i}
                    className="grid grid-cols-2 border-b pb-1 text-sm"
                  >
                    <span className="text-gray-700">
                      {service?.name} – {pkg?.name}
                    </span>
                    <span className="text-right font-bold">{pkg?.price}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No services selected</p>
          )}
        </div>

        {/* Add-on Services */}
        {formData.additionalServices.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Additional Services</h3>
            <ul className="space-y-2">
              {formData.additionalServices.map((addId: string, i: number) => {
                const addService = additionalServices.find(
                  (a) => a.id === addId
                );
                return (
                  <li
                    key={i}
                    className="grid grid-cols-2 border-b pb-1 text-sm"
                  >
                    <span className="text-gray-700">{addService?.name}</span>
                    <span className="text-right font-bold">
                      {addService?.price}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Pricing */}
        <div className="pt-4 border-t">
          {isPromoValid && (
            <div className="grid grid-cols-2 text-green-600 text-sm mb-2">
              <span>Discount Applied (20% Off)</span>
              <span className="text-right">
                - ${(totalPrice - discountedPrice).toFixed(2)}
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 text-lg font-bold">
            <span>Total</span>
            <span className="text-right">${discountedPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------------------- CONFIRMATION MODAL ---------------------- */
const ConfirmationModal = ({ open, onClose, formData, total }: any) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Booking Confirmed 🎉
          </DialogTitle>
          <DialogDescription>
            Thank you <span className="font-medium">{formData.firstName}</span>!{" "}
            <br />
            Your booking has been successfully scheduled.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 border rounded-lg bg-gray-50 p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">
            Appointment Details
          </h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="font-medium text-gray-600">Service(s):</span>
            <span className="text-gray-900 text-right">
              {formData.selectedServices.length > 0
                ? formData.selectedServices.map((s: any) => s.package).join(", ")
                : "N/A"}
            </span>

            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-900 text-right">
              {formData.date
                ? new Date(formData.date).toLocaleDateString()
                : "N/A"}
            </span>

            <span className="font-medium text-gray-600">Time Slot:</span>
            <span className="text-gray-900 text-right">
              {formData.timeSlot || "N/A"}
            </span>

            <span className="font-medium text-gray-600">Vehicle:</span>
            <span className="text-gray-900 text-right">
              {formData.vehicleMake} {formData.vehicleModel}{" "}
              {formData.vehicleYear}
            </span>

            <span className="font-medium text-gray-600">Total:</span>
            <span className="font-bold text-green-600 text-right">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onClose}
            className="bg-black text-white hover:bg-gray-700 w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ---------------------- MAIN BOOKING COMPONENT ---------------------- */
const Booking = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    selectedServices: [] as { serviceType: string; package: string }[],
    additionalServices: [] as string[],
    vehicleType: "",
    vehicleLength: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
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
  });

  //Pricing
  const parsePrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const match = price.match(/\d+/g);
    return match ? Number(match[0]) : 0;
  };

  const calculatetotalPrice = () => {
    let total = 0;
    formData.selectedServices.forEach((sel) => {
      const service = serviceTypes.find((s) => s.id === sel.serviceType);
      const pkg = service?.packages.find((p) => p.id === sel.package);
      if (pkg) total += parsePrice(pkg.price);
    });
    formData.additionalServices.forEach((addId) => {
      const addService = additionalServices.find((a) => a.id === addId);
      if (addService) total += parsePrice(addService.price);
    });
    return total;
  };

  const totalPrice = calculatetotalPrice();

  const discountedPrice =
    Number(isPromoValid ? totalPrice * 0.8 : totalPrice) || 0;

  //Helpers
  const updateForm = (updates: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => updateForm({ [e.target.name]: e.target.value } as any);

  const handleServicePackageSelect = (
    serviceType: string,
    packageId: string
  ) => {
    setFormData((prev) => {
      const updated = prev.selectedServices.filter(
        (s) => s.serviceType !== serviceType
      );
      return {
        ...prev,
        selectedServices: [...updated, { serviceType, package: packageId }],
      };
    });
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

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT20") {
      setIsPromoValid(true);
      toast({
        title: "Promo Applied ✅",
        description: "You received 20% off!",
      });
    } else {
      setIsPromoValid(false);
      toast({
        title: "Invalid Promo ❌",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.selectedServices.length === 0 ||
      !formData.vehicleType ||
      !formData.vehicleMake ||
      !formData.vehicleModel ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.date ||
      !formData.timeSlot
    ) {
      toast({
        title: "Missing Fields ❌",
        description: "Please fill all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalPrice: discountedPrice }),
      });

      if (!response.ok) throw new Error("Booking failed");

      setShowConfirmation(true);

      toast({
        title: "Booking Successful ✅",
        description: "Your booking has been confirmed.",
      });
    } catch {
      toast({
        title: "Submission Error ❌",
        description:
          "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  //Animations & Render

  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const getServiceTypeDetails = (id: string) =>
    serviceTypes.find((s) => s.id === id);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-lightwhite-900 text-gray-800">
      <Navbar />

      <div className="pt-32 pb-16 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <div className="text-center mb-12 text-black">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Service
            </h1>
            <div className="w-24 h-1 bg-black/100 mx-auto mb-6"></div>
            <p className="text-lg text-black/50 max-w-2xl mx-auto">
              Schedule your mobile detailing appointment in just a few simple
              steps
            </p>
          </div>

          <Card className="border-0 shadow-xl rounded-xl bg-white text-black">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* STEP 1 - Services */}
                {step === 1 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-6"
                  >
                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Service Type
                      </label>
                      <Select
                        value={selectedServiceType}
                        onValueChange={(val) => {
                          setSelectedServiceType(val);
                          updateForm({
                            selectedServices: [],
                            additionalServices: [],
                          });
                        }}
                      >
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {serviceTypes.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Packages */}
                    {selectedServiceType && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {getServiceTypeDetails(
                          selectedServiceType
                        )?.packages.map((pkg) => {
                          const isSelected = formData.selectedServices.some(
                            (s) =>
                              s.serviceType === selectedServiceType &&
                              s.package === pkg.id
                          );
                          return (
                            <div
                              key={pkg.id}
                              onClick={() =>
                                handleServicePackageSelect(
                                  selectedServiceType,
                                  pkg.id
                                )
                              }
                              className={`border rounded-lg p-4 cursor-pointer ${
                                isSelected
                                  ? "border-black bg-white shadow-md"
                                  : "border-gray-300 hover:border-black"
                              }`}
                            >
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{pkg.name}</span>
                                <span className="font-bold">{pkg.price}</span>
                              </div>
                              <p className="text-sm">{pkg.description}</p>
                              {isSelected && (
                                <div className="mt-2 text-gray-600 flex items-center text-sm">
                                  <Check size={16} className="mr-1" /> Selected
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add-on Services */}
                    {formData.selectedServices.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Add-on Services
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {additionalServices.map((svc) => (
                            <div
                              key={svc.id}
                              className="flex items-start space-x-2"
                            >
                              <Checkbox
                                id={svc.id}
                                checked={formData.additionalServices.includes(
                                  svc.id
                                )}
                                onCheckedChange={() =>
                                  handleCheckboxChange(svc.id)
                                }
                              />
                              <div>
                                <Label
                                  htmlFor={svc.id}
                                  className="text-sm font-medium"
                                >
                                  {svc.name}
                                </Label>
                                <p className="text-sm">{svc.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Step Button */}
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-black text-white hover:bg-gray-600"
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 - Vehicle Info */}
                {step === 2 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-6">
                      Vehicle Information
                    </h2>

                    <Select
                      value={formData.vehicleType}
                      onValueChange={(val) => updateForm({ vehicleType: val })}
                    >
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Select Vehicle Type *" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        {vehicleTypes.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        required
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        placeholder="Make *"
                      />
                      <Input
                        required
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        placeholder="Model *"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        placeholder="Year"
                      />
                      <Input
                        name="vehicleColor"
                        value={formData.vehicleColor}
                        onChange={handleInputChange}
                        placeholder="Color"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-black hover:bg-gray-600 text-white"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-black hover:bg-gray-600 text-white"
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 - Contact & Appointment */}
                {step === 3 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold mb-6">
                      Contact & Appointment
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name *"
                        className="bg-white text-black"
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name *"
                        className="bg-white text-black"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email *"
                        className="bg-white text-black"
                      />
                      <Input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone *"
                        className="bg-white text-black"
                      />
                    </div>

                    <Input
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address *"
                      className="bg-white text-black"
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City *"
                        className="bg-white text-black"
                      />
                      <Select
                        value={formData.state}
                        onValueChange={(val) => updateForm({ state: val })}
                      >
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="State *" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {usStates.map((st) => (
                            <SelectItem key={st.value} value={st.value}>
                              {st.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        required
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="Zip *"
                        className="bg-white text-black"
                      />
                    </div>

                    {/* Date & Time Picker (fixed: wrappers used) */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "w-full justify-start bg-white text-black",
                                !date && "text-gray-500"
                              )}
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

                      <div className="flex-1">
                        <Select
                          value={formData.timeSlot}
                          onValueChange={(val) => updateForm({ timeSlot: val })}
                        >
                          <SelectTrigger className="w-full bg-white text-black">
                            <SelectValue placeholder="Select time slot *" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black">
                            {timeSlots.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions?"
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
                      <Button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-black text-white hover:bg-gray-600"
                      >
                        Apply
                      </Button>
                    </div>
                    {isPromoValid && (
                      <p className="text-green-600 text-sm mt-1">
                        Promo applied: 20% off!
                      </p>
                    )}
                    <OrderSummary
                      formData={formData}
                      totalPrice={totalPrice}
                      discountedPrice={discountedPrice}
                      isPromoValid={isPromoValid}
                    />

                    {/* Buttons */}
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-black hover:bg-gray-600 text-white"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black hover:bg-gray-600 text-white"
                      >
                        {isSubmitting ? "Submitting..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
          {/* Confirmation Modal */}
          <ConfirmationModal
            open={showConfirmation}
            onClose={() => {
              setShowConfirmation(false);
              router.push("/"); // go to the homepage (Index.tsx)
            }}
            formData={formData}
            total={discountedPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
