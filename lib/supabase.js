import { createClient } from "@supabase/supabase-js";
import { NOTICE_PRODUCTS, CATEGORIES_LIST } from "./products.js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvvrjgukgrlwmvbgtvch.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dnJqZ3VrZ3Jsd212Ymd0dmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjU4NTYsImV4cCI6MjEwNTgwMTg1Nn0.Fm-mgxcHkZiqOL79_5rXFDrwx-R2r2IzHpdTyzr3Fec";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch products from Supabase with search, filter, and sorting.
 * Gracefully falls back to local data if query fails or network is offline.
 */
export async function getProducts({
  category = null,
  search = "",
  limit = null,
  offset = 0,
  sort = "default",
} = {}) {
  try {
    let query = supabase.from("products").select("*", { count: "exact" });

    if (category && category !== "all" && category !== "all-products") {
      // Check if matching category handle or product_type or tags
      query = query.or(
        `category.ilike.%${category}%,product_type.ilike.%${category}%,tags.cs.{${category}}`
      );
    }

    if (search && search.trim() !== "") {
      const term = search.trim();
      query = query.or(`title.ilike.%${term}%,handle.ilike.%${term}%,description.ilike.%${term}%`);
    }

    if (sort === "price-asc") {
      query = query.order("price", { ascending: true });
    } else if (sort === "price-desc") {
      query = query.order("price", { ascending: false });
    } else if (sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else if (sort === "title-asc") {
      query = query.order("title", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    if (limit) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback to local products
      return {
        products: NOTICE_PRODUCTS,
        total: NOTICE_PRODUCTS.length,
        fromDb: false,
      };
    }

    return {
      products: data,
      total: count || data.length,
      fromDb: true,
    };
  } catch (err) {
    console.error("Error in getProducts from Supabase:", err);
    return {
      products: NOTICE_PRODUCTS,
      total: NOTICE_PRODUCTS.length,
      fromDb: false,
    };
  }
}

/**
 * Fetch a single product by handle
 */
export async function getProductByHandle(handle) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("handle", handle)
      .maybeSingle();

    if (error || !data) {
      return NOTICE_PRODUCTS.find((p) => p.handle === handle) || null;
    }
    return data;
  } catch (err) {
    console.error("Error in getProductByHandle from Supabase:", err);
    return NOTICE_PRODUCTS.find((p) => p.handle === handle) || null;
  }
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return CATEGORIES_LIST;
    }
    return data;
  } catch (err) {
    console.error("Error in getCategories from Supabase:", err);
    return CATEGORIES_LIST;
  }
}

/**
 * Insert a new product into Supabase
 */
export async function createProduct(prod) {
  const slug =
    prod.handle ||
    prod.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const row = {
    id: prod.id || Date.now(),
    title: prod.title,
    handle: slug,
    price: parseFloat(prod.price) || 0,
    compare_at_price: prod.compare_at_price ? parseFloat(prod.compare_at_price) : null,
    images: Array.isArray(prod.images) ? prod.images : [prod.images].filter(Boolean),
    product_type: prod.product_type || "Homeware",
    category: prod.category || prod.product_type || "Serveware",
    tags: Array.isArray(prod.tags) ? prod.tags : (prod.tags || "").split(",").map((s) => s.trim()).filter(Boolean),
    available: prod.available !== false,
    description: prod.description || "",
    inventory_quantity: prod.inventory !== undefined ? Number(prod.inventory) : 25,
  };

  const { data, error } = await supabase
    .from("products")
    .upsert([row], { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Failed to insert product in Supabase:", error);
    throw error;
  }
  return data;
}

/**
 * Update an existing product
 */
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update product in Supabase:", error);
    throw error;
  }
  return data;
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete product in Supabase:", error);
    throw error;
  }
  return true;
}

/**
 * Create a new order in Supabase & record customer
 */
export async function createOrder(order) {
  const orderId = order.id || "TCT-" + Math.floor(100000 + Math.random() * 900000);

  const orderRow = {
    id: orderId,
    customer_name: order.customer_name || `${order.shipping_address?.firstName || ""} ${order.shipping_address?.lastName || ""}`.trim() || "Customer",
    customer_email: order.customer_email || order.contact?.email || "",
    customer_phone: order.customer_phone || order.contact?.phone || "",
    shipping_address: order.shipping_address || {},
    items: order.items || [],
    subtotal: parseFloat(order.subtotal) || 0,
    shipping_cost: parseFloat(order.shipping_cost) || 0,
    discount: parseFloat(order.discount) || 0,
    total: parseFloat(order.total) || 0,
    payment_method: order.payment_method || "COD",
    payment_status: order.payment_status || "paid",
    fulfillment_status: order.fulfillment_status || "Unfulfilled",
    notes: order.notes || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 1. Insert order
  const { data: insertedOrder, error: orderErr } = await supabase
    .from("orders")
    .insert([orderRow])
    .select()
    .single();

  if (orderErr) {
    console.error("Error creating order in Supabase:", orderErr);
    // Don't crash user flow if network glitch, return local object
    return orderRow;
  }

  // 2. Upsert customer
  if (orderRow.customer_email) {
    try {
      // Check existing customer
      const { data: existingCust } = await supabase
        .from("customers")
        .select("*")
        .eq("email", orderRow.customer_email)
        .maybeSingle();

      if (existingCust) {
        await supabase
          .from("customers")
          .update({
            orders_count: (existingCust.orders_count || 0) + 1,
            total_spent: (parseFloat(existingCust.total_spent) || 0) + orderRow.total,
            phone: orderRow.customer_phone || existingCust.phone,
            city: orderRow.shipping_address?.city || existingCust.city,
          })
          .eq("id", existingCust.id);
      } else {
        await supabase.from("customers").insert([
          {
            id: "cust-" + Date.now(),
            name: orderRow.customer_name,
            email: orderRow.customer_email,
            phone: orderRow.customer_phone,
            city: orderRow.shipping_address?.city || "",
            orders_count: 1,
            total_spent: orderRow.total,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (custErr) {
      console.warn("Could not upsert customer stats:", custErr);
    }
  }

  return insertedOrder;
}

/**
 * Fetch all orders
 */
export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
}

/**
 * Update order fulfillment or payment status
 */
export async function updateOrderStatus(orderId, updates) {
  const payload = typeof updates === "string" ? { fulfillment_status: updates } : updates;
  const { data, error } = await supabase
    .from("orders")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Failed to update order status in Supabase:", error);
    throw error;
  }
  return data;
}

/**
 * Fetch customers
 */
export async function getCustomers() {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("total_spent", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching customers:", err);
    return [];
  }
}

/**
 * Fetch discounts
 */
export async function getDiscounts() {
  try {
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching discounts:", err);
    return [];
  }
}

/**
 * Insert collection / category
 */
export async function createCategory(cat) {
  const slug =
    cat.handle ||
    cat.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const row = {
    id: cat.id || "col-" + Date.now(),
    label: cat.label || cat.title,
    handle: slug,
    filter: cat.filter || slug,
    description: cat.description || "",
    image_url: cat.image || cat.image_url || "",
    display_order: cat.display_order || 10,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("categories")
    .upsert([row], { onConflict: "handle" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Real-time Database Metrics for Admin Dashboard
 */
export async function getDbMetrics() {
  try {
    const [prodRes, ordRes, custRes] = await Promise.all([
      supabase.from("products").select("id, available, inventory_quantity", { count: "exact" }),
      supabase.from("orders").select("id, total, fulfillment_status, payment_status, created_at"),
      supabase.from("customers").select("id, total_spent", { count: "exact" }),
    ]);

    const productsCount = prodRes.count || prodRes.data?.length || NOTICE_PRODUCTS.length;
    const orders = ordRes.data || [];
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
    const unfulfilledOrders = orders.filter((o) => o.fulfillment_status === "Unfulfilled").length;
    const customersCount = custRes.count || custRes.data?.length || 0;

    return {
      productsCount,
      totalOrders,
      totalSales,
      averageOrderValue,
      unfulfilledOrders,
      customersCount,
    };
  } catch (err) {
    console.error("Error calculating DB metrics:", err);
    return null;
  }
}
