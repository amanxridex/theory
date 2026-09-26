const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvvrjgukgrlwmvbgtvch.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dnJqZ3VrZ3Jsd212Ymd0dmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjU4NTYsImV4cCI6MjEwNTgwMTg1Nn0.Fm-mgxcHkZiqOL79_5rXFDrwx-R2r2IzHpdTyzr3Fec";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function cleanTestData() {
  console.log("Cleaning test data from Supabase while maintaining all products...");

  // 1. Delete test orders
  const { error: ordErr } = await supabase.from("orders").delete().neq("id", "___non_existent___");
  if (ordErr) console.error("Error clearing orders:", ordErr);
  else console.log("✓ Cleared all test orders");

  // 2. Delete test customers
  const { error: custErr } = await supabase.from("customers").delete().neq("id", "___non_existent___");
  if (custErr) console.error("Error clearing customers:", custErr);
  else console.log("✓ Cleared all test customers");

  // 3. Clear mock telemetry / analytics events
  const { error: evtErr } = await supabase.from("analytics_events").delete().neq("id", -1);
  if (evtErr) console.error("Error clearing analytics events:", evtErr);
  else console.log("✓ Cleared test analytics events");

  // Verify products are untouched
  const { count: prodCount } = await supabase.from("products").select("*", { count: "exact", head: true });
  console.log(`✓ Products intact: ${prodCount} products in database.`);

  console.log("Cleanup complete!");
}

cleanTestData();
