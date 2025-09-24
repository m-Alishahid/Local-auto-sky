// src/utils/services.ts

// ---------------- Types ----------------
export type ServicePackage = {
  name: string;
  price?: number;        // absolute price (for fixed-price packages)
  pricePerFt?: number;   // price-per-foot (for boats / rvs)
  includes: string[];
};

export type serviceType = {
  id: string;
  name: string;
  packages: ServicePackage[];
};

export type VehicleService = {
  interior?: Record<string, ServicePackage>;
  exterior?: Record<string, ServicePackage>;
  full?: Record<string, ServicePackage>;
};

// ---------------- Vehicle Services (detailed) ----------------
export const services: Record<string, VehicleService> = {
  sedan: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 150,
        includes: [
          "Vacuum carpets & floor mats",
          "Wipe dashboard, console & cupholders",
          "Clean interior windows & mirrors",
          "Light dusting",
          "Air freshener"
        ]
      },
      premium: {
        name: "Premium Interior",
        price: 230,
        includes: [
          "Full vacuum of seats, carpets & mats",
          "Shampoo upholstery & carpets",
          "Leather/vinyl cleaning & conditioning",
          "Deep clean door panels & pockets",
          "Odor elimination treatment"
        ]
      }
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 130,
        includes: [
          "Hand wash with biodegradable soap",
          "Rinse & hand dry with microfiber",
          "Clean exterior windows & mirrors",
          "Basic tire shine"
        ]
      },
      premium: {
        name: "Premium Exterior",
        price: 180,
        includes: [
          "Foam cannon pre-wash",
          "Clay bar treatment (if needed)",
          "Hand wax/sealant",
          "Wheel & tire deep clean + protectant",
          "Bug & tar removal"
        ]
      }
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 250,
        includes: ["Basic Interior + Basic Exterior"]
      },
      premium: {
        name: "Premium Full",
        price: 380,
        includes: ["Premium Interior + Premium Exterior"]
      }
    }
  },

  suv: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 180,
        includes: [
          "Vacuum carpets, mats & seats",
          "Wipe dashboard, console & vents",
          "Clean interior windows",
          "Air freshener"
        ]
      },
      premium: {
        name: "Premium Interior",
        price: 260,
        includes: [
          "Full vacuum + seat shampoo",
          "Leather conditioning (if applicable)",
          "Deep clean crevices & vents",
          "Sanitize high-touch surfaces",
          "Odor removal"
        ]
      }
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 160,
        includes: [
          "Hand wash & rinse",
          "Hand dry with microfiber",
          "Clean mirrors & windows",
          "Tire dressing"
        ]
      },
      premium: {
        name: "Premium Exterior",
        price: 210,
        includes: [
          "Foam pre-wash",
          "Clay bar + paint decontamination",
          "Wax or sealant application",
          "Deep wheel & tire detail",
          "Trim & plastic restoration"
        ]
      }
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 320,
        includes: ["Basic Interior + Basic Exterior"]
      },
      premium: {
        name: "Premium Full",
        price: 460,
        includes: ["Premium Interior + Premium Exterior"]
      }
    }
  },

  truck: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 200,
        includes: [
          "Cab vacuum & mat cleaning",
          "Wipe dash & console",
          "Clean windows & mirrors"
        ]
      },
      premium: {
        name: "Premium Interior",
        price: 280,
        includes: [
          "Deep vacuum + upholstery shampoo",
          "Leather/vinyl conditioning",
          "Sanitize steering wheel & controls"
        ]
      }
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 170,
        includes: ["Pressure rinse", "Hand wash", "Hand dry", "Tire dressing"]
      },
      premium: {
        name: "Premium Exterior",
        price: 240,
        includes: [
          "Foam cannon wash",
          "Undercarriage rinse",
          "Wax / sealant",
          "Wheel detail & protectant"
        ]
      }
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 360,
        includes: ["Basic Interior + Basic Exterior"]
      },
      premium: {
        name: "Premium Full",
        price: 520,
        includes: ["Premium Interior + Premium Exterior"]
      }
    }
  },

  van: {
    interior: {
      basic: {
        name: "Basic Interior",
        price: 210,
        includes: ["Vacuum & wipe down", "Window cleaning", "Air freshener"]
      },
      premium: {
        name: "Premium Interior",
        price: 300,
        includes: ["Deep vacuum + shampoo", "Sanitize surfaces", "Leather care if present"]
      }
    },
    exterior: {
      basic: {
        name: "Basic Exterior",
        price: 180,
        includes: ["Hand wash", "Dry", "Tire dressing"]
      },
      premium: {
        name: "Premium Exterior",
        price: 250,
        includes: ["Foam wash", "Wax", "Wheel detail"]
      }
    },
    full: {
      basic: {
        name: "Basic Full",
        price: 380,
        includes: ["Basic Interior + Basic Exterior"]
      },
      premium: {
        name: "Premium Full",
        price: 560,
        includes: ["Premium Interior + Premium Exterior"]
      }
    }
  },

  bike: {
    full: {
      basic: {
        name: "Bike Full",
        price: 120,
        includes: ["Pressure rinse", "Mild soap wash", "Chain degrease & lube", "Tire shine"]
      },
      premium: {
        name: "Bike Premium",
        price: 180,
        includes: ["Deep clean + polish", "Chrome polish", "Detail & protect"]
      }
    }
  },

  boat: {
    interior: {
      basic: {
        name: "Boat Interior (per ft)",
        pricePerFt: 19,
        includes: [
          "Vacuum cabin & seats",
          "Wipe down consoles",
          "Interior window cleaning"
        ]
      }
    },
    exterior: {
      basic: {
        name: "Boat Exterior (per ft)",
        pricePerFt: 23,
        includes: [
          "Pressure rinse hull & deck",
          "Soap wash & rinse",
          "Scrub non-skid surfaces"
        ]
      }
    },
    full: {
      basic: {
        name: "Boat Full (per ft)",
        pricePerFt: 35,
        includes: ["Interior + Exterior (per ft)"]
      }
    }
  },

  jetski: {
    full: {
      basic: {
        name: "JetSki Full",
        price: 220,
        includes: ["Pressure rinse", "Shampoo & hand dry", "Seat & console clean", "Wax/protect"]
      }
    }
  },

  rv: {
    interior: {
      basic: {
        name: "RV Interior (per ft)",
        pricePerFt: 25,
        includes: ["Vacuum floor & upholstery", "Wipe surfaces", "Bathroom quick clean"]
      }
    },
    exterior: {
      basic: {
        name: "RV Exterior (per ft)",
        pricePerFt: 25,
        includes: ["Pressure wash sides & roof", "Hand dry", "Tire & trim clean"]
      }
    },
    full: {
      basic: {
        name: "RV Full (per ft)",
        pricePerFt: 40,
        includes: ["Full interior + exterior (per ft)"]
      }
    }
  }
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
  { id: "bike", name: "Bike" }
];

// ---------------- Additional Services ----------------
export const additionalServices = [
  { id: "odor_removal", name: "Odor Removal", price: 50 },
  { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
  { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
  { id: "headlight_restore", name: "Headlight Restoration", price: 60 }
];

// ---------------- Time Slots ----------------
export const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM"
];

// ---------------- City-State Map (Virginia list as requested earlier) ----------------
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
  "Winchester": "Virginia"
};

// ---------------- serviceTypes (for email templates / simpler lookup) ----------------
export const serviceTypes: serviceType[] = [
  {
    id: "interior",
    name: "Interior",
    packages: [
      { name: "Basic Interior", price: 150, includes: [] },
      { name: "Premium Interior", price: 250, includes: [] }
    ]
  },
  {
    id: "exterior",
    name: "Exterior",
    packages: [
      { name: "Basic Exterior", price: 130, includes: [] },
      { name: "Premium Exterior", price: 200, includes: [] }
    ]
  },
  {
    id: "full",
    name: "Full",
    packages: [
      { name: "Basic Full", price: 250, includes: [] },
      { name: "Premium Full", price: 450, includes: [] }
    ]
  }
];

// ---------------- Price helpers (type-safe access) ----------------

/**
 * Calculate price for a single selected package.
 * - For pricePerFt packages (boat/rv) pass vehicleSize (number).
 * - For other vehicles, packageId is like "interior-basic" or "full-premium".
 */
export const calculatePrice = (
  vehicleType: string,
  packageIdOrCategory: string,
  serviceCategory?: string,
  vehicleSize?: number
): number => {
  // If caller passes serviceCategory separate (legacy), prefer it, else parse packageIdOrCategory
  let category = serviceCategory;
  let packageKey = packageIdOrCategory;

  // If packageIdOrCategory looks like "interior-basic" split it
  if (!serviceCategory && typeof packageIdOrCategory === "string" && packageIdOrCategory.includes("-")) {
    const parts = packageIdOrCategory.split("-");
    category = parts[0];
    packageKey = parts[1];
  }

  // Safe lookups using keyof
  const vs = services[vehicleType];
  if (!vs) return 0;

  // Boats / RVs — use pricePerFt
  if (vehicleType === "boat" || vehicleType === "rv") {
    const cat = category as keyof VehicleService;
    const pkg = vs[cat];
    // Some entries for boats/rv are stored only as 'full' or 'interior' with pricePerFt on basic.
    // We'll try to find a 'basic' package if present
    if (!pkg) return 0;
    // if pkg has numeric keys like 'basic', pick that, else try first value
    const firstKey = Object.keys(pkg)[0];
    const found = (pkg as Record<string, ServicePackage>)[packageKey] || (pkg as Record<string, ServicePackage>)[firstKey];
    const pricePerFt = found?.pricePerFt ?? 0;
    return pricePerFt * (vehicleSize ?? 0);
  }

  // Normal vehicles (sedan, suv, truck, van, bike, jetski)
  const cat = (category ?? "full") as keyof VehicleService;
  const pkgRecord = vs[cat] as Record<string, ServicePackage> | undefined;
  if (!pkgRecord) return 0;
  const pkg = pkgRecord[packageKey];
  return pkg?.price ?? 0;
};

/**
 * Calculate total price from a booking form-like object:
 * formData shape expected to contain:
 * { vehicleType, packageType (string like "interior-basic"), vehicleSize (number for per-ft), additionalServices: string[] }
 */
export const calculateTotalPrice = (formData: any): number => {
  let total = 0;
  const vehicleType = formData?.vehicleType;
  const packageType = formData?.packageType;
  const vehicleSize = Number(formData?.vehicleSize || 0);
  const addons: string[] = Array.isArray(formData?.additionalServices) ? formData.additionalServices : [];

  if (!vehicleType || !packageType) return 0;

  // If packageType includes "-" parse category and key
  const [categoryPart, pkgKeyPart] = packageType.includes("-") ? packageType.split("-") : [packageType, "basic"];

  // Price for boats/rv (per ft)
  if (vehicleType === "boat" || vehicleType === "rv") {
    const pricePerFt = calculatePrice(vehicleType, categoryPart, categoryPart, vehicleSize);
    total += pricePerFt;
  } else {
    // normal: look up price
    total += calculatePrice(vehicleType, packageType);
  }

  // Add-ons
  if (addons && addons.length) {
    addons.forEach((addId) => {
      const add = additionalServices.find((a) => a.id === addId);
      if (add) total += add.price;
    });
  }

  return total;
};
