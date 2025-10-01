"use client";

import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { service, additionalServices, calculatePrice } from "@/utils/services";



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
                  {/* Main package */}
                  {formData.packageType && (
                    <div className="flex justify-between p-2 border rounded">
                      <span>
                        {formData.serviceCategory
                          ? service[formData.vehicleType][formData.serviceCategory]?.name || formData.packageType
                          : formData.packageType}
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

                  {/* Extra services */}
                  {formData.extraService?.map((extraService: string) => {
                    const pkgType =
                      extraService === "windowtinting"
                        ? formData.windowtintingPackageType || "standard"
                        : formData.ceramiccoatingPackageType || "basic";
                    return (
                      <div key={extraService} className="flex justify-between p-2 border rounded">
                        <span>
                          {extraService === "windowtinting" ? "Window Tinting" : "Ceramic Coating"} (
                          {pkgType.charAt(0).toUpperCase() + pkgType.slice(1)})
                        </span>
                        <span>
                          $
                          {calculatePrice(
                            formData.vehicleType,
                            pkgType,
                            extraService,
                            Number(formData.vehicleSize),
                            extraService
                          )}
                        </span>
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