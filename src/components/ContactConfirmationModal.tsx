"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  formData: {
    name?: string;
    email?: string;
    message?: string;
  };
  title?: string;
  description?: string;
}

const ContactConfirmationModal: React.FC<ContactConfirmationModalProps> = ({
  open,
  onClose,
  formData = {},
  title,
  description,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-green-600">
            {title || "Message Sent Successfully 🎉"}
          </DialogTitle>
          <DialogDescription>
            {description || (
              <>
                Thank you{" "}
                <span className="font-medium">{formData?.name || "Guest"}</span>!
                <br />
                We’ve received your message and will get back to you at{" "}
                <span className="font-medium">{formData?.email || "your email"}</span>.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Contact Message Preview */}
        {formData?.message && (
          <div className="mt-4 border rounded-lg bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Message:</h3>
            <p className="text-sm text-gray-800 italic">
              "{formData.message}"
            </p>
          </div>
        )}

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

export default ContactConfirmationModal;
