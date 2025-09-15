"use client";

import { Card, CardContent } from "@/components/ui/card";
import { serviceTypes, additionalServices } from "@/utils/services";

interface OrderSummaryProps {
  formData: {
    selectedServices: { serviceType: string; package: string }[];
    additionalServices: string[];
  };
  totalPrice: number;
  discountedPrice: number;
  isPromoValid: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  totalPrice,
  discountedPrice,
  isPromoValid,
}) => {
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
              {formData.selectedServices.map((sel, i) => {
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
              {formData.additionalServices.map((addId, i) => {
                const addService = additionalServices.find((a) => a.id === addId);
                return (
                  <li
                    key={i}
                    className="grid grid-cols-2 border-b pb-1 text-sm"
                  >
                    <span className="text-gray-700">{addService?.name}</span>
                    <span className="text-right font-bold">{addService?.price}</span>
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

export default OrderSummary;
