"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { NOTICE_PRODUCTS } from "@/lib/products";

const StoreContext = createContext(null);

export const INITIAL_COLLECTIONS = [
  {
    id: "col-all",
    handle: "all-products",
    title: "All Objects",
    description: "Complete archive of artisanal homeware and living objects.",
    image: "https://cdn.shopify.com/s/files/1/0593/5890/4514/files/TT-285_1.jpg?v=1733303728",
    itemCount: NOTICE_PRODUCTS.length,
  },
  {
    id: "col-ceramics",
    handle: "everyday-ceramics",
    title: "Everyday Ceramics",
    description: "Handcrafted stoneware, daily mugs, and glazed bowls.",
    image: "https://thehomedefiner.com/cdn/shop/files/TT-224_1.jpg?v=1733303649",
    itemCount: 158,
  },
  {
    id: "col-tableware",
    handle: "tableware",
    title: "Tableware & Dining",
    description: "Porcelain & stoneware dining plates, ramen bowls, and oil pourers.",
    image: "https://thehomedefiner.com/cdn/shop/files/DD-96_1.jpg?v=1733303710",
    itemCount: 82,
  },
  {
    id: "col-serveware",
    handle: "serveware",
    title: "Platters & Serveware",
    description: "Elevated ceramic serving trays, dip bowls, and cheese platters.",
    image: "https://thehomedefiner.com/cdn/shop/files/TT-080_1.jpg?v=1733303512",
    itemCount: 54,
  },
  {
    id: "col-linen",
    handle: "home-linen",
    title: "Home Linen & Bedding",
    description: "Pure washed cotton bedsheets, quilted covers, and runners.",
    image: "https://thehomedefiner.com/cdn/shop/files/THD383_1.jpg?v=1733303800",
    itemCount: 45,
  },
  {
    id: "col-vases",
    handle: "vases-planters",
    title: "Vases & Planters",
    description: "Contemporary ceramic and stoneware vases for botanical stems.",
    image: "https://thehomedefiner.com/cdn/shop/files/TT-16_1.jpg?v=1733303610",
    itemCount: 42,
  },
  {
    id: "col-candles",
    handle: "candles-holders",
    title: "Candles & Holders",
    description: "Sculptural candleholders and ambient t-light vessels.",
    image: "https://thehomedefiner.com/cdn/shop/files/THD368_1.jpg?v=1733303740",
    itemCount: 28,
  },
  {
    id: "col-decor",
    handle: "decorative-objects",
    title: "Decorative Objects",
    description: "Handcrafted figurines, bookends, and organic conversation pieces.",
    image: "https://thehomedefiner.com/cdn/shop/files/THD082_1.jpg?v=1733303700",
    itemCount: 40,
  },
  {
    id: "col-festive",
    handle: "merry-bright",
    title: "Festive Accents",
    description: "Heirloom holiday figurines, winter village pieces, and seasonal tabletop items.",
    image: "https://thehomedefiner.com/cdn/shop/files/THD107_1.jpg?v=1733303790",
    itemCount: 385,
  },
];

export const INITIAL_ORDERS = [
  {
    id: "TCT-894120",
    customer: {
      name: "Aarav Mehta",
      email: "aarav.mehta@gmail.com",
      city: "Mumbai, MH",
    },
    total: 3130,
    itemsCount: 2,
    financialStatus: "Paid (UPI)",
    fulfillmentStatus: "Dispatched",
    date: "Sep 14, 2026, 02:15 PM",
    items: [
      { title: "TT-251 Ceramic Chicken Condiment Jar", price: 1450, quantity: 1 },
      { title: "Pure Washed Cotton Queen Bedsheet", price: 1680, quantity: 1 },
    ],
  },
  {
    id: "TCT-894088",
    customer: {
      name: "Diya Narang",
      email: "diya.narang@outlook.com",
      city: "Bengaluru, KA",
    },
    total: 4250,
    itemsCount: 3,
    financialStatus: "Paid (Cards)",
    fulfillmentStatus: "Unfulfilled",
    date: "Sep 14, 2026, 01:42 PM",
    items: [
      { title: "DD-97 Ceramic Floral Baking & Serving Dish", price: 1850, quantity: 1 },
      { title: "TT-285 Ceramic Water Pitcher Vintage Floral", price: 2400, quantity: 1 },
    ],
  },
  {
    id: "TCT-893954",
    customer: {
      name: "Rohan Varma",
      email: "rohan.v@gmail.com",
      city: "New Delhi, DL",
    },
    total: 2800,
    itemsCount: 1,
    financialStatus: "COD Pending",
    fulfillmentStatus: "Dispatched",
    date: "Sep 14, 2026, 11:20 AM",
    items: [
      { title: "Pure Washed Cotton King Bedsheet (Ed. 43)", price: 2800, quantity: 1 },
    ],
  },
  {
    id: "TCT-893812",
    customer: {
      name: "Ananya Deshmukh",
      email: "ananya.d@gmail.com",
      city: "Pune, MH",
    },
    total: 5600,
    itemsCount: 4,
    financialStatus: "Paid (UPI)",
    fulfillmentStatus: "Delivered",
    date: "Sep 13, 2026, 06:45 PM",
    items: [
      { title: "THD070 Red Floral Ceramic Ginger Jar with Lid", price: 2800, quantity: 2 },
    ],
  },
  {
    id: "TCT-893701",
    customer: {
      name: "Vikram Sengupta",
      email: "vikram.s@yahoo.co.in",
      city: "Kolkata, WB",
    },
    total: 1950,
    itemsCount: 2,
    financialStatus: "Paid (UPI)",
    fulfillmentStatus: "Delivered",
    date: "Sep 13, 2026, 03:10 PM",
    items: [
      { title: "TT- 16 Pink Tulip Ceramic Flower Vase", price: 1950, quantity: 1 },
    ],
  },
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(NOTICE_PRODUCTS);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [analytics, setAnalytics] = useState({
    activeVisitors: 24,
    todayVisitors: 1428,
    todaySessions: 2190,
    conversionRate: 3.42,
    averageOrderValue: 3120,
    totalSales: 486240,
    totalOrders: 156,
  });

  // Load custom stored products and collections on mount
  useEffect(() => {
    try {
      const storedCustomProds = localStorage.getItem("tct_custom_products");
      if (storedCustomProds) {
        const custom = JSON.parse(storedCustomProds);
        if (Array.isArray(custom) && custom.length > 0) {
          // Prepend newly added custom products
          setProducts([...custom, ...NOTICE_PRODUCTS]);
        }
      }

      const storedCustomCols = localStorage.getItem("tct_custom_collections");
      if (storedCustomCols) {
        const customC = JSON.parse(storedCustomCols);
        if (Array.isArray(customC) && customC.length > 0) {
          setCollections([...INITIAL_COLLECTIONS, ...customC]);
        }
      }

      const storedOrders = localStorage.getItem("tct_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error("Failed to load stored store data", e);
    }
  }, []);

  // Live visitor fluctuation simulator (Shopify live pulse)
  useEffect(() => {
    const timer = setInterval(() => {
      setAnalytics((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newActive = Math.max(12, Math.min(48, prev.activeVisitors + delta));
        return {
          ...prev,
          activeVisitors: newActive,
          todayVisitors: prev.todayVisitors + (Math.random() > 0.6 ? 1 : 0),
        };
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Add new product
  const addProduct = (newProd) => {
    const slug = newProd.handle || newProd.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const productWithDefaults = {
      id: Date.now(),
      handle: slug,
      title: newProd.title,
      body_html: newProd.description || newProd.body_html || "Artisanal piece curated by The Cozy Theory studio.",
      vendor: newProd.vendor || "The Cozy Theory",
      product_type: newProd.product_type || "Everyday Ceramics",
      price: String(newProd.price || "1450.00"),
      compare_at_price: newProd.compare_at_price ? String(newProd.compare_at_price) : null,
      available: newProd.available !== undefined ? newProd.available : true,
      inventory: newProd.inventory !== undefined ? Number(newProd.inventory) : 25,
      images: Array.isArray(newProd.images) && newProd.images.length > 0
        ? newProd.images
        : ["https://thehomedefiner.com/cdn/shop/files/TT-224_1.jpg?v=1733303649"],
      tags: newProd.tags || ["New Drop", "Curated Living", newProd.product_type || "Homeware"],
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => {
      const updated = [productWithDefaults, ...prev];
      // Save custom products separately in localStorage
      try {
        const existingCustom = JSON.parse(localStorage.getItem("tct_custom_products") || "[]");
        localStorage.setItem("tct_custom_products", JSON.stringify([productWithDefaults, ...existingCustom]));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    return productWithDefaults;
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        const existingCustom = JSON.parse(localStorage.getItem("tct_custom_products") || "[]");
        const filteredCustom = existingCustom.filter((p) => p.id !== id);
        localStorage.setItem("tct_custom_products", JSON.stringify(filteredCustom));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Add new collection
  const addCollection = (newCol) => {
    const slug = newCol.handle || newCol.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const collectionObject = {
      id: "col-" + Date.now(),
      handle: slug,
      title: newCol.title,
      description: newCol.description || "Curated seasonal collection by The Cozy Theory.",
      image: newCol.image || "https://thehomedefiner.com/cdn/shop/files/TT-285_1.jpg?v=1733303728",
      itemCount: 0,
      createdAt: new Date().toISOString(),
    };

    setCollections((prev) => {
      const updated = [...prev, collectionObject];
      try {
        const existing = JSON.parse(localStorage.getItem("tct_custom_collections") || "[]");
        localStorage.setItem("tct_custom_collections", JSON.stringify([...existing, collectionObject]));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    return collectionObject;
  };

  // Update order status (Fulfill / Dispatch / Deliver)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o));
      try {
        localStorage.setItem("tct_orders", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        collections,
        orders,
        analytics,
        addProduct,
        deleteProduct,
        addCollection,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    // Graceful fallback if invoked outside provider
    return {
      products: NOTICE_PRODUCTS,
      collections: INITIAL_COLLECTIONS,
      orders: INITIAL_ORDERS,
      analytics: { activeVisitors: 24, todayVisitors: 1428, totalSales: 486240 },
      addProduct: () => {},
      deleteProduct: () => {},
      addCollection: () => {},
      updateOrderStatus: () => {},
    };
  }
  return context;
}
