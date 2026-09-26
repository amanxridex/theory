/**
 * Standard 4 Product Accordion Sections
 * (Object Details, Material & Dimensions, Care & Maintenance, Shipping & Returns)
 */

export const DEFAULT_PRODUCT_SECTIONS = {
  objectDetails: {
    key: "objectDetails",
    accordionId: "details",
    title: "Object Details",
    enabled: true,
    content:
      "The Cozy Theory crafts artisanal objects, everyday ceramics, and pure linens to stay cozy, stay you. Designed with organic balances and tactile finishes to bring character to every room.\n\nEach piece undergoes meticulous quality inspection before dispatch, ensuring every surface reflects warmth and elegance.",
  },
  materialDimensions: {
    key: "materialDimensions",
    accordionId: "dimensions",
    title: "Material & Dimensions",
    enabled: true,
    content:
      "Material: Artisanal Stoneware / Handcrafted Ceramic\nWeight: Approx 450g - 1.5kg\nFinish: Hand-applied organic ceramic glaze\nOrigin: Handcrafted in India",
  },
  careMaintenance: {
    key: "careMaintenance",
    accordionId: "care",
    title: "Care & Maintenance",
    enabled: true,
    content:
      "Wipe clean with a dry or gently damp microfiber cloth. Avoid harsh chemical cleaners or abrasive scouring pads. Handle with care to preserve artisanal stoneware finish.",
  },
  shippingReturns: {
    key: "shippingReturns",
    accordionId: "shipping",
    title: "Shipping & Returns",
    enabled: true,
    content:
      "• Complimentary express domestic delivery across India on orders above Rs. 9,999.\n• Enjoy Rs. 500 off on orders above Rs. 5,999.\n• In the rare event of transit mishap, 50% refund or replacement provided if damaged.\n• Dispatches within 24–48 hours via premium express courier.",
  },
};

/**
 * Parses raw product description column from DB or object.
 * Returns { descriptionText, sections }
 */
export function parseProductSections(raw) {
  if (!raw || raw === "None") {
    return {
      descriptionText: "",
      sections: JSON.parse(JSON.stringify(DEFAULT_PRODUCT_SECTIONS)),
    };
  }

  // If already an object
  if (typeof raw === "object") {
    if (raw.sections) {
      return {
        descriptionText: raw.text || raw.descriptionText || "",
        sections: mergeWithDefaults(raw.sections),
      };
    }
    return {
      descriptionText: "",
      sections: mergeWithDefaults(raw),
    };
  }

  // If JSON string in DB
  if (typeof raw === "string" && raw.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          descriptionText: parsed.text || parsed.descriptionText || "",
          sections: mergeWithDefaults(parsed.sections || parsed),
        };
      }
    } catch (e) {
      // Fall through to plain text
    }
  }

  // Plain string description
  const defaultClone = JSON.parse(JSON.stringify(DEFAULT_PRODUCT_SECTIONS));
  if (raw && raw !== "None") {
    // If there's an existing custom text description, use it as Object Details content
    defaultClone.objectDetails.content = raw;
  }

  return {
    descriptionText: raw === "None" ? "" : raw,
    sections: defaultClone,
  };
}

function mergeWithDefaults(userSections) {
  const merged = JSON.parse(JSON.stringify(DEFAULT_PRODUCT_SECTIONS));
  if (!userSections || typeof userSections !== "object") return merged;

  for (const key of Object.keys(DEFAULT_PRODUCT_SECTIONS)) {
    if (userSections[key]) {
      merged[key] = {
        ...merged[key],
        ...userSections[key],
        enabled: userSections[key].enabled !== false, // default true
        content:
          userSections[key].content !== undefined
            ? userSections[key].content
            : merged[key].content,
      };
    }
  }
  return merged;
}

/**
 * Serializes description text and the 4 sections into a JSON string
 * to store cleanly in Supabase products.description column.
 */
export function serializeProductSections(descriptionText, sections) {
  return JSON.stringify({
    text: (descriptionText || "").trim(),
    sections: {
      objectDetails: {
        title: "Object Details",
        enabled: sections?.objectDetails?.enabled !== false,
        content: sections?.objectDetails?.content || "",
      },
      materialDimensions: {
        title: "Material & Dimensions",
        enabled: sections?.materialDimensions?.enabled !== false,
        content: sections?.materialDimensions?.content || "",
      },
      careMaintenance: {
        title: "Care & Maintenance",
        enabled: sections?.careMaintenance?.enabled !== false,
        content: sections?.careMaintenance?.content || "",
      },
      shippingReturns: {
        title: "Shipping & Returns",
        enabled: sections?.shippingReturns?.enabled !== false,
        content: sections?.shippingReturns?.content || "",
      },
    },
  });
}
