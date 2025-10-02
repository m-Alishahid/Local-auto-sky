"use client";

import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { service, additionalServices, calculatePrice } from "@/utils/services";

// Helper function to format package names
const formatPackageName = (name: string): string => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
};



interface OrderSummaryProps {
  formData: any;
  totalPrice: number;
  discountedPrice: number;
  isPromoValid: boolean;
}

const OrderSummaryAccordion: FC<OrderSummaryProps> = ({
  formData,
  totalPrice,
  discountedPrice,
  isPromoValid,
}) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);

  // Determine if there are any selected services or add-ons to show the summary
  const hasSelectedServices =
    (formData.packageType && formData.vehicleType) ||
    (formData.extraService && formData.extraService.length > 0) ||
    (formData.additionalServices && formData.additionalServices.length > 0);

  if (!hasSelectedServices) {
    // Hide order summary if no services selected
    return null;
  }

  return (
    <Card className="mt-6 border-0 shadow-lg bg-gray-50">
      <CardContent className="p-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleOpen}
        >
          <h2 className="text-lg font-semibold">Order Summary</h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              {/* Selected Services */}
              <div>
                <h3 className="font-medium mb-2">Selected Services</h3>
                <div className="space-y-2">
                  {/* Main package or Detailing */}
                  {formData.packageType && (
                    <div className="flex justify-between p-2 border rounded">
                      <span>
                        {formData.extraService?.includes("detailing")
                          ? `Detailing (${formatPackageName(formData.packageType)})`
                          : formData.serviceCategory
                          ? service[formData.vehicleType][formData.serviceCategory]?.name || formatPackageName(formData.packageType)
                          : formatPackageName(formData.packageType)}
                      </span>
                      <span>
                        $
                        {calculatePrice(
                          formData.vehicleType,
                          formData.packageType,
                          formData.serviceCategory,
                          Number(formData.vehicleSize)
                        )}
                      </span>
                    </div>
                  )}

                  {/* Extra services (excluding detailing) */}
                  {formData.extraService?.filter((extraService: string) => extraService !== "detailing").map((extraService: string) => {
                    // Handle window tinting packages (multiple selection)
                    if (extraService === "windowtinting") {
                      return formData.windowtintingPackages?.map((pkgKey: string) => {
                        const price = calculatePrice(
                          formData.vehicleType,
                          pkgKey,
                          extraService,
                          Number(formData.vehicleSize),
                          extraService
                        );

                        // Only show if price > 0
                        if (price <= 0) return null;

                        return (
                          <div key={pkgKey} className="flex justify-between p-2 border rounded">
                            <span>
                              Window Tinting ({formatPackageName(pkgKey)})
                            </span>
                            <span>${price}</span>
                          </div>
                        );
                      });
                    }

                    // Determine package type for other extra services
                    let pkgType = "";
                    if (extraService === "ceramiccoating") {
                      pkgType = formData.ceramiccoatingPackageType;
                    }

                    // If package type is not set, skip rendering this extra service
                    if (!pkgType) return null;

                    // Determine display name for extra service
                    let displayName = "";
                    if (extraService === "ceramiccoating") {
                      displayName = "Ceramic Coating";
                    } else {
                      displayName = extraService.charAt(0).toUpperCase() + extraService.slice(1);
                    }

                    const price = calculatePrice(
                      formData.vehicleType,
                      pkgType,
                      extraService,
                      Number(formData.vehicleSize),
                      extraService
                    );

                    // Only show if price > 0
                    if (price <= 0) return null;

                    return (
                      <div key={extraService} className="flex justify-between p-2 border rounded">
                        <span>
                          {displayName} ({formatPackageName(pkgType)})
                        </span>
                        <span>${price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Services */}
              {formData.additionalServices.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Add-ons</h3>
                  <div className="space-y-2">
                    {formData.additionalServices.map((id: string) => {
                      const add = additionalServices.find((a) => a.id === id);
                      if (!add) return null;
                      return (
                        <div
                          key={id}
                          className="flex justify-between p-2 border rounded"
                        >
                          <span>{add.name}</span>
                          <span>${add.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t pt-3 space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {isPromoValid && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Promo Applied (15% Discount)</span>
                    <span>-${(totalPrice - discountedPrice).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>${discountedPrice.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryAccordion;