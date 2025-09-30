// src/utils/services.ts

// ---------------- Vehicle Service Packages ----------------
export type ServicePackage = {
  name: string;
  price?: number;
  pricePerFt?: number;
  includes: string[];
};

export type VehicleService = {
  interior?: Record<string, ServicePackage> | ServicePackage;
  exterior?: Record<string, ServicePackage> | ServicePackage;
  full: Record<string, ServicePackage> | ServicePackage;
  [key: string]: any; // Allow string indexing
};

export const service: Record<string, VehicleService> = {
  suv: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 180,
        includes: [
          "Vacuum Carpets & Floor Mats",
          "Wipe Down Dashboard, Console & Cupholders",
          "Clean Windows (Inside)",
          "Clean Door Panels & Pockets",
          "Light Dusting",
          "Air Freshener",
        ],
      },
      premium: {
        name: "Premium Interior",
        price: 220,
        includes: [
          "Full Vacuum Carpets, Mats & Seats",
          "Shampoo & Deep Clean Upholstery + Carpets",
          "Leather/Vinyl Cleaning & Conditioning",
          "Dashboard, Console & Trim Detailed",
          "Interior Windows & Mirrors",
          "Door Panels & Cupholders Sanitized",
          "Odor Elimination",
        ],
      },
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 160,
        includes: [
          "Biodegradable Soap Wash",
          "Rinse & Pressure Clean",
          "Hand Dry with Microfiber Towels",
          "Clean Windows & Mirrors (Outside)",
          "Basic Tire Shine",
        ],
      },
      premium: {
        name: "Premium Exterior",
        price: 190,
        includes: [
          "Foam Cannon Wash",
          "Clay Bar Treatment",
          "Hand Wax/Sealant",
          "Windows & Mirrors Polished",
          "Wheel & Tire Deep Cleaning + Shine",
          "Bug & Tar Removal",
        ],
      },
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 220,
        includes: ["Basic Interior + Basic Exterior Packages"],
      },
      premium: {
        name: "Premium Full",
        price: 300,
        includes: ["Premium Interior + Premium Exterior Packages"],
      },
    },
  },

  sedan: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 190,
        includes: [
          "Vacuum Carpets & Floor Mats",
          "Wipe Down Dashboard, Console & Cupholders",
          "Clean Windows (Inside)",
          "Clean Door Panels & Pockets",
          "Light Dusting",
          "Air Freshener",
        ],
      },
      premium: {
        name: "Premium Interior",
        price: 230,
        includes: [
          "Full Vacuum Carpets, Mats & Seats",
          "Shampoo & Deep Clean Upholstery + Carpets",
          "Leather/Vinyl Cleaning & Conditioning",
          "Dashboard, Console & Trim Detailed",
          "Interior Windows & Mirrors",
          "Door Panels & Cupholders Sanitized",
          "Odor Elimination",
        ],
      },
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 170,
        includes: [
          "Biodegradable Soap Wash",
          "Rinse & Pressure Clean",
          "Hand Dry with Microfiber Towels",
          "Clean Windows & Mirrors (Outside)",
          "Basic Tire Shine",
        ],
      },
      premium: {
        name: "Premium Exterior",
        price: 200,
        includes: [
          "Foam Cannon Wash",
          "Clay Bar Treatment",
          "Hand Wax/Sealant",
          "Windows & Mirrors Polished",
          "Wheel & Tire Deep Cleaning + Shine",
          "Bug & Tar Removal",
        ],
      },
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 230,
        includes: ["Basic Interior + Basic Exterior Packages"],
      },
      premium: {
        name: "Premium Full",
        price: 310,
        includes: ["Premium Interior + Premium Exterior Packages"],
      },
    },
  },

  truck: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 180,
        includes: [
          "Vacuum Carpets & Floor Mats",
          "Wipe Down Dashboard, Console & Cupholders",
          "Clean Windows (Inside)",
          "Clean Door Panels & Pockets",
          "Light Dusting",
          "Air Freshener",
        ],
      },
      premium: {
        name: "Premium Interior",
        price: 220,
        includes: [
          "Full Vacuum Carpets, Mats & Seats",
          "Shampoo & Deep Clean Upholstery + Carpets",
          "Leather/Vinyl Cleaning & Conditioning",
          "Dashboard, Console & Trim Detailed",
          "Interior Windows & Mirrors",
          "Door Panels & Cupholders Sanitized",
          "Odor Elimination",
        ],
      },
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 190,
        includes: [
          "Biodegradable Soap Wash",
          "Rinse & Pressure Clean",
          "Hand Dry with Microfiber Towels",
          "Clean Windows & Mirrors (Outside)",
          "Basic Tire Shine",
        ],
      },
      premium: {
        name: "Premium Exterior",
        price: 210,
        includes: [
          "Foam Cannon Wash",
          "Clay Bar Treatment",
          "Hand Wax/Sealant",
          "Windows & Mirrors Polished",
          "Wheel & Tire Deep Cleaning + Shine",
          "Bug & Tar Removal",
        ],
      },
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 250,
        includes: ["Basic Interior + Basic Exterior Packages"],
      },
      premium: {
        name: "Premium Full",
        price: 320,
        includes: ["Premium Interior + Premium Exterior Packages"],
      },
    },
  },

  van: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 210,
        includes: [
          "Vacuum Carpets & Floor Mats",
          "Wipe Down Dashboard, Console & Cupholders",
          "Clean Windows (Inside)",
          "Clean Door Panels & Pockets",
          "Light Dusting",
          "Air Freshener",
        ],
      },
      premium: {
        name: "Premium Interior",
        price: 240,
        includes: [
          "Full Vacuum Carpets, Mats & Seats",
          "Shampoo & Deep Clean Upholstery + Carpets",
          "Leather/Vinyl Cleaning & Conditioning",
          "Dashboard, Console & Trim Detailed",
          "Interior Windows & Mirrors",
          "Door Panels & Cupholders Sanitized",
          "Odor Elimination",
        ],
      },
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 190,
        includes: [
          "Biodegradable Soap Wash",
          "Rinse & Pressure Clean",
          "Hand Dry with Microfiber Towels",
          "Clean Windows & Mirrors (Outside)",
          "Basic Tire Shine",
        ],
      },
      premium: {
        name: "Premium Exterior",
        price: 240,
        includes: [
          "Foam Cannon Wash",
          "Clay Bar Treatment",
          "Hand Wax/Sealant",
          "Windows & Mirrors Polished",
          "Wheel & Tire Deep Cleaning + Shine",
          "Bug & Tar Removal",
        ],
      },
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 220,
        includes: ["Basic Interior + Basic Exterior Packages"],
      },
      premium: {
        name: "Premium Full",
        price: 300,
        includes: ["Premium Interior + Premium Exterior Packages"],
      },
    },
  },

  bike: {
    full: {
      basic: {
        name: "Bike Full Detailing",
        price: 170,
        includes: [
          "Pressure Rinse Frame, Tank, Fenders",
          "Gentle Soap Wash + Hand Dry",
          "Wheels, Rims & Spokes Cleaning",
          "Degrease & Polish Exhaust & Chrome Parts",
          "Chain & Sprocket Cleaning + Lubrication",
          "Headlight & Mirrors Polish",
          "Tire Shine",
          "Seat Deep Clean & Condition",
          "Handlebar & Console Wipe Down",
          "Plastic Covers & Panels Protected",
          "UV Protectant on Exposed Surfaces",
        ],
      },
    },
  },

  boat: {
    interior: {
      name: "Boat Interior",
      pricePerFt: 19,
      includes: [
        "Vacuum Carpets, Seats & Storage",
        "Shampoo & Deep Clean Upholstery",
        "Mildew & Stain Removal",
        "Clean & Sanitize Cupholders, Dash & Panels",
        "Polish Interior Chrome/Metal Fixtures",
        "UV Protectant on Vinyl/Leather",
        "Interior Windows & Mirrors",
        "Air Freshener/Deodorizer",
      ],
    },
    exterior: {
      name: "Boat Exterior",
      pricePerFt: 23,
      includes: [
        "Pressure Rinse Hull & Deck",
        "Gentle Soapy Wash (Salt/Dirt Removal)",
        "Clean & Polish Windows/Windshield",
        "Scrub & Brighten Non-Skid Surfaces",
        "Polish Chrome & Metal Fixtures",
        "Wax/Sealant for UV & Water Protection",
        "Tire Shine (Trailer Tires)",
      ],
    },
    full: {
      name: "Boat Full",
      pricePerFt: 35,
      includes: ["Full Interior + Full Exterior Packages"],
    },
  },

  jetski: {
    full: {
      name: "Jet Ski Full Detailing",
      price: 220,
      includes: [
        "Pressure Rinse Hull & Body",
        "Gentle Soap Wash + Hand Dry",
        "Clean & Polish Mirrors/Lights/Windshield",
        "Scrub Non-Skid Mats",
        "Polish & Protect Chrome/Metal Fixtures",
        "Wax/Sealant Protection",
        "Deep Clean Seat Upholstery",
        "Mildew/Stain/Salt Removal",
        "Wipe Down Console & Handlebars",
        "UV Protectant on Surfaces",
        "Storage Compartments Cleaned",
      ],
    },
  },

  rv: {
    interior: {
      name: "RV Interior",
      pricePerFt: 25,
      includes: [
        "Vacuum Carpets, Upholstery & Floors",
        "Shampoo/Steam Clean Carpets & Upholstery",
        "Leather/Fabric Seats Deep Clean",
        "Kitchen Cleaning (Counters, Sink, Microwave, Fridge Exterior)",
        "Bathroom Cleaning (Shower, Toilet, Sink, Mirrors)",
        "Dust & Wipe Surfaces",
        "Interior Windows & Mirrors",
        "Clean Storage Compartments & Cabinets",
        "UV Protectant for Leather/Vinyl/Plastic",
        "Odor Elimination & Air Freshener",
      ],
    },
    exterior: {
      name: "RV Exterior",
      pricePerFt: 25,
      includes: [
        "Pressure Wash Roof, Sides & Awning",
        "Biodegradable Soap Wash",
        "Hand Dry with Microfiber Towels",
        "Clean Windows/Mirrors/Lights",
        "Roof Wash & Sealant",
        "Wheel & Tire Cleaning + Shine",
        "Polish Chrome & Metal Fixtures",
        "Wax or Ceramic Sealant",
        "Clean Door Jams & Storage Bay Seals",
      ],
    },
    full: {
      name: "RV Full",
      pricePerFt: 40,
      includes: ["Full Interior + Full Exterior Packages"],
    },
  },

};

// ---------------- Extra Main Services ----------------
// src/utils/services.ts

export const extraServices: Record<string, Record<string, ServicePackage>> = {
  windowtinting: {
    standard: {
      name: "Standard Window Tinting",
      price: 120,
      includes: [
        "Tint all windows with standard film",
        "UV protection",
        "3-year warranty",
      ],
    },
    premium: {
      name: "Premium Window Tinting",
      price: 180,
      includes: [
        "Tint all windows with premium film",
        "UV + Heat protection",
        "5-year warranty",
      ],
    },
  },
  ceramiccoating: {
    basic: {
      name: "Basic Ceramic Coating",
      price: 200,
      includes: [
        "Hand wash & clay bar",
        "Apply 1 layer ceramic coating",
        "Protection for 1 year",
      ],
    },
    advanced: {
      name: "Advanced Ceramic Coating",
      price: 350,
      includes: [
        "Hand wash & clay bar",
        "Apply 2 layers ceramic coating",
        "Protection for 3 years",
      ],
    },
  },
};



// ---------------- Vehicle Types ----------------
export const vehicleTypes = [
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "SUV" },
  { id: "truck", name: "Truck" },
  { id: "van", name: "Van" },
  { id: "boat", name: "Boat" },
  { id: "rv", name: "RV" },
  { id: "jetski", name: "JetSki" },
  { id: "bike", name: "Bike" },
];

// ---------------- Additional Services ----------------
export const additionalServices = [
  { id: "odor_removal", name: "Odor Removal", price: 50 },
  { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
  { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
  { id: "headlight_restore", name: "Headlight Restoration", price: 60 },
];

// ---------------- Time Slots ----------------
export const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];


// ---------------- City-State Map ----------------
export const cityStateMap: Record<string, string> = {
  "Alexandria": "Virginia",
  "Bristol": "Virginia",
  "Buena Vista": "Virginia",
  "Charlottesville": "Virginia",
  "Chesapeake": "Virginia",
  "Colonial Heights": "Virginia",
  "Covington": "Virginia",
  "Danville": "Virginia",
  "Emporia": "Virginia",
  "Fairfax": "Virginia",
  "Falls Church": "Virginia",
  "Franklin": "Virginia",
  "Fredericksburg": "Virginia",
  "Galax": "Virginia",
  "Hampton": "Virginia",
  "Harrisonburg": "Virginia",
  "Hopewell": "Virginia",
  "Lexington": "Virginia",
  "Lynchburg": "Virginia",
  "Manassas": "Virginia",
  "Manassas Park": "Virginia",
  "Martinsville": "Virginia",
  "Newport News": "Virginia",
  "Norfolk": "Virginia",
  "Norton": "Virginia",
  "Petersburg": "Virginia",
  "Poquoson": "Virginia",
  "Portsmouth": "Virginia",
  "Radford": "Virginia",
  "Richmond": "Virginia",
  "Roanoke": "Virginia",
  "Salem": "Virginia",
  "Staunton": "Virginia",
  "Suffolk": "Virginia",
  "Virginia Beach": "Virginia",
  "Waynesboro": "Virginia",
  "Williamsburg": "Virginia",
  "Winchester": "Virginia",
};


// ---------------- Service Types ----------------
export const serviceTypes = [
  {
    id: "interior",
    name: "Interior",
    packages: [
      { id: "basic", name: "Basic Interior", price: 180 },
      { id: "premium", name: "Premium Interior", price: 220 },
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    packages: [
      { id: "basic", name: "Basic Exterior", price: 160 },
      { id: "premium", name: "Premium Exterior", price: 190 },
    ],
  },
  {
    id: "full",
    name: "Full",
    packages: [
      { id: "basic", name: "Basic Full", price: 220 },
      { id: "premium", name: "Premium Full", price: 300 },
    ],
  },
];



// ---------------- Price Calculation ----------------
export const calculateTotalPrice = (formData: any) => {
  let total = 0;
  const { vehicleType, packageType, extraService, vehicleSize, additionalServices: addons } = formData;

  if (!vehicleType || (!packageType && (!extraService || extraService === "none"))) return 0;

  // If extra service is selected
  if (extraService && extraService !== "none") {
    const extraPkg = extraServices[extraService]?.[packageType];
    if (extraPkg) {
      if (extraPkg.pricePerFt && vehicleSize) {
        total += extraPkg.pricePerFt * Number(vehicleSize);
      } else {
        total += extraPkg.price ?? 0;
      }
    }
  } else {
    // Cars, Trucks, Vans (nested)
    if (["suv", "truck", "van", "sedan"].includes(vehicleType)) {
      if (packageType) {
        const [category, pkgKey] = packageType.split("-"); // e.g., "interior-basic"
        const pkgObj = service[vehicleType]?.[category] as Record<string, ServicePackage>;
        const pkg = pkgObj?.[pkgKey];
        if (pkg) total += pkg.price ?? 0;
      }
    }

    // Boats / RVs
    if (["boat", "rv"].includes(vehicleType)) {
      const pkg = service[vehicleType]?.[packageType as keyof VehicleService] as ServicePackage;
      if (pkg) {
        if (pkg.pricePerFt && vehicleSize) {
          total += pkg.pricePerFt * Number(vehicleSize);
        } else {
          total += pkg.price ?? 0;
        }
      }
    }

    // Jetski / Bike (flat)
    if (["jetski", "bike"].includes(vehicleType)) {
      const pkg = service[vehicleType]?.[packageType] as ServicePackage;
      if (pkg) total += pkg.price ?? 0;
    }
  }

  // Add-ons
  if (addons?.length) {
    addons.forEach((addId: string) => {
      const add = additionalServices.find((a) => a.id === addId);
      if (add) total += add.price;
    });
  }

  return total;
};


// ---------------- Single Package Price ----------------
export const calculatePrice = (
  vehicleType: string,
  packageId: string,
  serviceCategory: string,
  vehicleSize?: number,
  extraService?: string
): number => {
  // Extra Services (WT / CC)
  if (extraService && extraService !== "none") {
    const pkg = extraServices[extraService]?.[packageId];
    if (!pkg) return 0;
    return pkg.pricePerFt && vehicleSize ? pkg.pricePerFt * vehicleSize : pkg.price || 0;
  }

  // Boats / RVs
  if (["boat", "rv"].includes(vehicleType)) {
    const pkg = service[vehicleType]?.[serviceCategory] as ServicePackage;
    if (!pkg) return 0;
    return pkg.pricePerFt && vehicleSize ? pkg.pricePerFt * vehicleSize : pkg.price || 0;
  }

  // Cars/SUV/Truck/Van/Bike
  if (["sedan", "suv", "truck", "van", "bike"].includes(vehicleType)) {
    if (!packageId.includes("-")) return 0;
    const [, packageKey] = packageId.split("-"); // e.g., "interior-basic"
    const pkgObj = service[vehicleType]?.[serviceCategory] as Record<string, ServicePackage>;
    const pkg = pkgObj?.[packageKey];
    return pkg?.price || 0;
  }

  // Jetski
  if (vehicleType === "jetski") {
    const pkg = service[vehicleType]?.[serviceCategory] as ServicePackage;
    return pkg?.price || 0;
  }

  return 0;
};
