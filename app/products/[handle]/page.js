import { NOTICE_PRODUCTS } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return NOTICE_PRODUCTS.map((p) => ({
    handle: p.handle,
  }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = NOTICE_PRODUCTS.find((p) => p.handle === handle);
  if (!product) return { title: "Product Not Found | The Cozy Theory" };

  return {
    title: `${product.title} | The Cozy Theory`,
    description: `Shop ${product.title} by The Cozy Theory Studio. Artisanal homeware, stoneware ceramics, and handcrafted living objects.`,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = NOTICE_PRODUCTS.find((p) => p.handle === handle) || null;

  // Related products from same category or collection
  const relatedProducts = NOTICE_PRODUCTS.slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} handle={handle} />;
}
