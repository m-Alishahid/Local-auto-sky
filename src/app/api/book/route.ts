// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminEmailTemplate, getUserEmailTemplate } from "@/utils/email";

const resend = new Resend(process.env.RESEND_EMAIL_SECRET_KEY ?? "");

interface BookingBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  date: string;
  timeSlot?: string;
  vehicleType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  vehicleLength?: string;
  selectedServices?: any[];
  additionalServices?: string[];
  notes?: string;
  totalPrice?: number;
  promoCode?: string;
}

export async function POST(req: Request) {
  try {
    const body: BookingBody = await req.json();

    // ✅ Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.date) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details." },
        { status: 400 }
      );
    }

    // ✅ Ensure consistent date format
    const bookingDate = new Date(body.date);
    if (isNaN(bookingDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid booking date format." },
        { status: 400 }
      );
    }
    body.date = bookingDate.toISOString();

    // ✅ Load env vars safely
    const from = (process.env.FROM_EMAIL ?? "onboarding@resend.dev").trim();
    const admin = (process.env.ADMIN_EMAIL ?? "nomanirshad0324@gmail.com").trim();

    // ✅ Send user confirmation email
    const userPromise = resend.emails.send({
      from,
      to: body.email.trim(),
      subject: "✅ Booking Confirmation - Local Auto Spa",
      html: getUserEmailTemplate(body),
    });

    // ✅ Send admin notification email
    const adminPromise = resend.emails.send({
      from,
      to: admin,
      subject: `📩 New Booking - ${body.firstName} ${body.lastName}`,
      html: getAdminEmailTemplate(body),
    });

    const [userResult, adminResult] = await Promise.all([userPromise, adminPromise]);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully.",
      results: { user: userResult, admin: adminResult },
    });
  } catch (error: any) {
    console.error("❌ Resend send error:", error);
    return NextResponse.json(
      { success: false, error: error.message ?? "Failed to send email." },
      { status: 500 }
    );
  }
}
