// utils/email.ts
import { format } from "date-fns";
import { serviceTypes, additionalServices, vehicleTypes } from "@/utils/services";

export const getVehicleTypeName = (vehicleTypeId: string) => {
  const vehicleType = vehicleTypes.find((v) => v.id === vehicleTypeId);
  return vehicleType?.name || vehicleTypeId;
};

const site = process.env.NEXT_PUBLIC_SITE_URL || ""; // e.g. https://yourdomain.com

// ✅ Base template wrapper (Black/White/Gray theme)
const baseTemplate = (title: string, content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f3f3f3; margin:0; padding:0; color:#111; }
    .container { max-width:650px; margin:30px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08); }
    
    .header { background: linear-gradient(135deg, #000000, #333333); text-align:center; padding:50px 20px; color:#fff; position:relative; }
    .heading { color:#fff; font-size:26px; font-weight:800; margin:0; text-transform:uppercase; letter-spacing:1px; }
    
    .content { padding:35px; line-height:1.6; }
    .content h2 { color:#111; font-size:22px; margin-bottom:10px; }
    .content p { font-size:15px; margin-bottom:15px; }
    
    .card { background:#fafafa; border:1px solid #e5e5e5; border-radius:8px; padding:18px; margin-bottom:20px; }
    .card h3 { color:#000; margin-bottom:12px; font-size:16px; border-bottom:2px solid #333; display:inline-block; padding-bottom:4px; }
    .card p { margin:8px 0; font-size:14px; }
    
    .footer { background: linear-gradient(135deg, #111111, #333333); text-align:center; padding:22px; color:#f5f5f5; font-size:13px; }
    .footer a { color:#ddd; text-decoration:none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://localautospa.com/logo.png" 
           alt="Local Auto Spa Logo" 
           style="width: 150px; height: auto; margin-bottom:12px;" />
      <h1 class="heading">${title}</h1>
    </div>
    <div class="content">${content}</div>
    <div class="footer">
      <p>If you have any questions, contact us at 
      <a href="mailto:localautospa@gmail.com">localautospa@gmail.com</a>.</p>
      <p>&copy; ${new Date().getFullYear()} Local Auto Spa. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// ✅ Helper: format selected packages
const formatSelectedPackages = (selectedServices: any[]) =>
  (selectedServices || [])
    .map((service) => {
      const serviceInfo = serviceTypes.find((s) => s.id === service.serviceType);
      const packageInfo = serviceInfo?.packages.find((p: any) => p.id === service.package);
      return packageInfo ? `${serviceInfo?.name} - ${packageInfo.name} ($${packageInfo.price})` : "";
    })
    .filter(Boolean)
    .join("<br>");

// ✅ Helper: format add-ons
const formatAddons = (addons: string[]) =>
  (addons || [])
    .map((serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      return service ? `${service.name} ($${service.price})` : "";
    })
    .filter(Boolean)
    .join("<br>");

// ✅ Admin template
export const getAdminEmailTemplate = (formData: any) => {
  const selectedPackagesInfo = formatSelectedPackages(formData.selectedServices);
  const addonsList = formatAddons(formData.additionalServices);
  const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
  const vehicleDetails = `${formData.vehicleYear || ""} ${formData.vehicleMake || ""} ${formData.vehicleModel || ""} (${formData.vehicleColor || "N/A"})`;
  const formattedDate = formData.date ? format(new Date(formData.date), "MMMM d, yyyy") : "";

  const content = `
    <h2>New Booking Received</h2>

    <div class="card">
      <h3>👤 Customer Info</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>
    </div>

    <div class="card">
      <h3>🚗 Vehicle Info</h3>
      <p><strong>Type:</strong> ${vehicleTypeInfo}</p>
      <p><strong>Details:</strong> ${vehicleDetails}</p>
      ${formData.vehicleLength ? `<p><strong>Length:</strong> ${formData.vehicleLength} feet</p>` : ""}
    </div>

    ${selectedPackagesInfo ? `<div class="card"><h3>🛠 Selected Services</h3><p>${selectedPackagesInfo}</p></div>` : ""}
    ${addonsList ? `<div class="card"><h3>➕ Add-ons</h3><p>${addonsList}</p></div>` : ""}

    <div class="card">
      <h3>📅 Appointment</h3>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formData.timeSlot}</p>
    </div>

    ${formData.notes ? `<div class="card"><h3>📝 Notes</h3><p>${formData.notes}</p></div>` : ""}

    <div class="card">
      <h3>💲 Pricing</h3>
      <p><strong>Total:</strong> $${formData.totalPrice}</p>
      ${formData.promoCode ? `<p><strong>Promo Applied:</strong> ${formData.promoCode} ✅</p>` : ""}
    </div>
  `;

  return baseTemplate("New Booking Notification", content);
};

// ✅ User template
export const getUserEmailTemplate = (formData: any) => {
  const selectedPackagesInfo = formatSelectedPackages(formData.selectedServices);
  const addonsList = formatAddons(formData.additionalServices);
  const vehicleTypeInfo = getVehicleTypeName(formData.vehicleType);
  const vehicleDetails = `${formData.vehicleYear || ""} ${formData.vehicleMake || ""} ${formData.vehicleModel || ""} (${formData.vehicleColor || "N/A"})`;
  const formattedDate = formData.date ? format(new Date(formData.date), "MMMM d, yyyy") : "";

  const content = `
    <h2>Thank you for your booking!</h2>
    <p>Hi <strong>${formData.firstName}</strong>,</p>
    <p>We’ve <span style="color:#000; font-weight:bold;">successfully received</span> your booking. Here are your details:</p>

    <div class="card">
      <h3>🛠 Service Details</h3>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formData.timeSlot}</p>
      <p><strong>Vehicle Type:</strong> ${vehicleTypeInfo}</p>
      <p><strong>Vehicle:</strong> ${vehicleDetails}</p>
      ${formData.vehicleLength ? `<p><strong>Vehicle Length:</strong> ${formData.vehicleLength} feet</p>` : ""}
      ${selectedPackagesInfo ? `<p><strong>Services:</strong> ${selectedPackagesInfo}</p>` : ""}
      ${addonsList ? `<p><strong>Add-ons:</strong> ${addonsList}</p>` : ""}
      <p><strong>Total:</strong> $${formData.totalPrice}</p>
      ${formData.promoCode ? `<p><strong>Promo Applied:</strong> ${formData.promoCode} ✅</p>` : ""}
    </div>

    <div class="card">
      <h3>📍 Location</h3>
      <p>${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>
    </div>

    ${formData.notes ? `<div class="card"><h3>📝 Notes</h3><p>${formData.notes}</p></div>` : ""}

    <p>We look forward to serving you! If you need changes, contact us at <b style="color:#000;">localautospa@gmail.com</b>.</p>
  `;

  return baseTemplate("Booking Confirmation", content);
};
