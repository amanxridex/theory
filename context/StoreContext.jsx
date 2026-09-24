"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { NOTICE_PRODUCTS, CATEGORIES_LIST } from "@/lib/products";
import {
  getProducts,
  getCategories,
  getOrders,
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  createCategory as dbCreateCategory,
  updateOrderStatus as dbUpdateOrderStatus,
  getCustomers as dbGetCustomers,
  getDiscounts as dbGetDiscounts,
  getDbMetrics,
  getRealAnalytics,
} from "@/lib/supabase";

const StoreContext = createContext(null);

export const INITIAL_COLLECTIONS = [
  {
    id: "col-all",
    handle: "all-products",
    title: "All Objects",
    label: "All Objects",
    description: "Complete archive of artisanal homeware and living objects.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product_79-01.png?v=1784392136",
    itemCount: NOTICE_PRODUCTS.length,
  },
  {
    id: "col-ceramics",
    handle: "everyday-ceramics",
    title: "Everyday Ceramics",
    label: "Everyday Ceramics",
    description: "Handcrafted stoneware, daily mugs, and glazed bowls.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product9-01.png?v=1784242846",
    itemCount: 158,
  },
  {
    id: "col-tableware",
    handle: "tableware",
    title: "Tableware & Dining",
    label: "Tableware & Dining",
    description: "Porcelain & stoneware dining plates, ramen bowls, and oil pourers.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/TT75REDDIVIDEDBOWL.png?v=1788126151",
    itemCount: 82,
  },
  {
    id: "col-serveware",
    handle: "serveware",
    title: "Platters & Serveware",
    label: "Platters & Serveware",
    description: "Elevated ceramic serving trays, dip bowls, and cheese platters.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/IMG_0517_ab4b2575-73cd-44f0-bef6-e22d87b409e1.jpg?v=1726212864",
    itemCount: 54,
  },
  {
    id: "col-linen",
    handle: "home-linen",
    title: "Home Linen & Bedding",
    label: "Home Linen & Bedding",
    description: "Pure washed cotton bedsheets, quilted covers, and runners.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/DSC00422_eee0df88-82cb-49a4-818d-182c056960b2.jpg?v=1740976529",
    itemCount: 45,
  },
  {
    id: "col-vases",
    handle: "vases-planters",
    title: "Vases & Planters",
    label: "Vases & Planters",
    description: "Contemporary ceramic and stoneware vases for botanical stems.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/ChatGPTImageJul18_2026_11_18_29PM.png?v=1784397111",
    itemCount: 42,
  },
  {
    id: "col-candles",
    handle: "candles-holders",
    title: "Candles & Holders",
    label: "Candles & Holders",
    description: "Sculptural candleholders and ambient t-light vessels.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/DSC07087_copy_ca9966aa-409f-4d01-a865-701ca110f64c.jpg?v=1726405433",
    itemCount: 28,
  },
  {
    id: "col-decor",
    handle: "decorative-objects",
    title: "Decorative Objects",
    label: "Decorative Objects",
    description: "Handcrafted figurines, bookends, and organic conversation pieces.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/ChatGPTImageJul18_2026_04_59_45PM.png?v=1784374314",
    itemCount: 40,
  },
  {
    id: "col-festive",
    handle: "merry-bright",
    title: "Festive Accents",
    label: "Festive Accents",
    description: "Heirloom holiday figurines, winter village pieces, and seasonal tabletop items.",
    image: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/ChatGPTImageSep13_2026_05_26_10PM.png?v=1789300631",
    itemCount: 385,
  },
];

function normalizeOrder(o) {
  const customerName = o.customer_name || o.customer?.name || "Customer";
  const customerEmail = o.customer_email || o.customer?.email || "";
  const city = o.shipping_address?.city || o.customer?.city || "India";
  const items = Array.isArray(o.items) ? o.items : [];
  const itemsCount = o.itemsCount || items.reduce((s, it) => s + (it.quantity || 1), 0);
  const total = parseFloat(o.total) || 0;
  const fulfillmentStatus = o.fulfillment_status || o.fulfillmentStatus || "Unfulfilled";
  const financialStatus =
    o.payment_status === "paid"
      ? `Paid (${o.payment_method || "Online"})`
      : o.financialStatus || "COD Pending";
  const date = o.created_at
    ? new Date(o.created_at).toLocaleString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : o.date || "Recent";

  return {
    ...o,
    id: o.id,
    customer: {
      name: customerName,
      email: customerEmail,
      city: city,
      phone: o.customer_phone || "",
    },
    customer_name: customerName,
    customer_email: customerEmail,
    items,
    itemsCount,
    total,
    financialStatus,
    fulfillmentStatus,
    fulfillment_status: fulfillmentStatus,
    date,
    created_at: o.created_at,
  };
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(NOTICE_PRODUCTS);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(true);

  const [analytics, setAnalytics] = useState({
    activeVisitors: 24,
    todayVisitors: 1428,
    todaySessions: 2190,
    conversionRate: 3.42,
    averageOrderValue: 2484,
    totalSales: 12418,
    totalOrders: 5,
  });

  // Load from Supabase on mount
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, ordRes, custRes, discRes, mtrRes] = await Promise.all([
        getProducts({ limit: 1000 }),
        getCategories(),
        getOrders(),
        dbGetCustomers(),
        dbGetDiscounts(),
        getDbMetrics(),
      ]);

      if (prodRes && prodRes.products && prodRes.products.length > 0) {
        setProducts(prodRes.products);
        setIsDbConnected(prodRes.fromDb);
      }

      if (catRes && catRes.length > 0) {
        // Merge or set collections
        const formattedCats = catRes.map((c) => ({
          id: c.id || c.handle,
          handle: c.handle,
          title: c.label || c.name || c.title,
          label: c.label || c.name || c.title,
          description: c.description || "",
          image: c.image_url || c.image || "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product_79-01.png?v=1784392136",
          itemCount: 0,
        }));
        setCollections(formattedCats);
      }

      if (ordRes && ordRes.length > 0) {
        setOrders(ordRes.map(normalizeOrder));
      }

      if (custRes) {
        setCustomers(custRes);
      }

      if (discRes) {
        setDiscounts(discRes);
      }

      if (mtrRes) {
        setAnalytics((prev) => ({
          ...prev,
          totalSales: mtrRes.totalSales,
          totalOrders: mtrRes.totalOrders,
          averageOrderValue: mtrRes.averageOrderValue,
        }));
      }

      const trafficRes = await getRealAnalytics();
      if (trafficRes) {
        setAnalytics((prev) => ({
          ...prev,
          activeVisitors: trafficRes.activeVisitors,
          todayVisitors: Math.max(trafficRes.todayVisitors, 1),
          todaySessions: Math.max(trafficRes.todayPageViews, 1),
        }));
      }
    } catch (err) {
      console.error("Failed to load initial Supabase data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Live visitor tracking pulse from real Supabase events
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const traffic = await getRealAnalytics();
        if (traffic) {
          setAnalytics((prev) => ({
            ...prev,
            activeVisitors: traffic.activeVisitors,
            todayVisitors: Math.max(traffic.todayVisitors, 1),
            todaySessions: Math.max(traffic.todayPageViews, 1),
          }));
        }
      } catch (e) {
        // silent
      }
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Add new product (syncs directly to Supabase)
  const addProduct = async (newProd) => {
    try {
      const created = await dbCreateProduct(newProd);
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error("Failed to insert product into DB, adding to local state:", err);
      const slug =
        newProd.handle ||
        newProd.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const fallbackProd = {
        id: Date.now(),
        handle: slug,
        title: newProd.title,
        description: newProd.description || "",
        product_type: newProd.product_type || "Homeware",
        price: parseFloat(newProd.price || 0),
        compare_at_price: newProd.compare_at_price ? parseFloat(newProd.compare_at_price) : null,
        available: newProd.available !== false,
        inventory_quantity: 25,
        images: Array.isArray(newProd.images) ? newProd.images : [],
        tags: newProd.tags || [],
      };
      setProducts((prev) => [fallbackProd, ...prev]);
      return fallbackProd;
    }
  };

  // Delete product (syncs to Supabase)
  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await dbDeleteProduct(id);
    } catch (err) {
      console.error("Failed to delete from DB:", err);
    }
  };

  // Update product (syncs to Supabase)
  const updateProduct = async (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    try {
      await dbUpdateProduct(id, updates);
    } catch (err) {
      console.error("Failed to update in DB:", err);
    }
  };

  // Add new collection (syncs to Supabase)
  const addCollection = async (newCol) => {
    try {
      const created = await dbCreateCategory(newCol);
      const formatted = {
        id: created.id,
        handle: created.handle,
        title: created.label,
        label: created.label,
        description: created.description,
        image: created.image_url,
        itemCount: 0,
      };
      setCollections((prev) => [...prev, formatted]);
      return formatted;
    } catch (err) {
      console.error("Failed to insert collection in DB:", err);
      const slug =
        newCol.handle ||
        newCol.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const fallbackCol = {
        id: "col-" + Date.now(),
        handle: slug,
        title: newCol.title,
        label: newCol.title,
        description: newCol.description || "",
        image: newCol.image || "",
        itemCount: 0,
      };
      setCollections((prev) => [...prev, fallbackCol]);
      return fallbackCol;
    }
  };

  // Update order status (syncs to Supabase)
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              fulfillmentStatus: newStatus,
              fulfillment_status: newStatus,
            }
          : o
      )
    );
    try {
      await dbUpdateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error("Failed to update order status in DB:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        collections,
        orders,
        customers,
        discounts,
        analytics,
        loading,
        isDbConnected,
        refreshData,
        addProduct,
        deleteProduct,
        updateProduct,
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
    return {
      products: NOTICE_PRODUCTS,
      collections: INITIAL_COLLECTIONS,
      orders: [],
      customers: [],
      discounts: [],
      analytics: { activeVisitors: 24, todayVisitors: 1428, totalSales: 12418, totalOrders: 5 },
      loading: false,
      isDbConnected: true,
      refreshData: () => {},
      addProduct: () => {},
      deleteProduct: () => {},
      updateProduct: () => {},
      addCollection: () => {},
      updateOrderStatus: () => {},
    };
  }
  return context;
}
