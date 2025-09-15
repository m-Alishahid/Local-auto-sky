"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  formData: any;
  total: number;
  title?: string;
  description?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  formData = {}, // ✅ default empty object
  total,
  title,
  description,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            {title || "Booking Confirmed 🎉"}
          </DialogTitle>
          <DialogDescription>
            {description || (
              <>
                Thank you{" "}
                <span className="font-medium">{formData?.firstName || "Guest"}</span>!
                <br />
                Your booking has been successfully scheduled.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Appointment Details */}
        <div className="mt-6 border rounded-lg bg-gray-50 p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">
            Appointment Details
          </h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="font-medium text-gray-600 text-left">Service(s):</span>
            <span className="text-gray-900 text-right">
              {formData?.selectedServices?.length
                ? formData.selectedServices.map((s: any) => s.package).join(", ")
                : "N/A"}
            </span>

            <span className="font-medium text-gray-600 text-left">Date:</span>
            <span className="text-gray-900 text-right">
              {formData?.date
                ? new Date(formData.date).toLocaleDateString()
                : "N/A"}
            </span>

            <span className="font-medium text-gray-600 text-left">Time Slot:</span>
            <span className="text-gray-900 text-right">
              {formData?.timeSlot || "N/A"}
            </span>

            <span className="font-medium text-gray-600 text-left">Vehicle:</span>
            <span className="text-gray-900 text-right">
              {[formData?.vehicleMake, formData?.vehicleModel, formData?.vehicleYear]
                .filter(Boolean)
                .join(" ") || "N/A"}
            </span>

            <span className="font-medium text-gray-600 text-left">Total Paid:</span>
            <span className="font-bold text-green-600 text-right">
              ${total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        {/* Close Button */}
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

export default ConfirmationModal;
