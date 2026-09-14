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

  const priceFormatted = Number(product.price).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

  const title = `${product.title} (₹${priceFormatted}) | The Cozy Theory`;
  const description = `Shop ${product.title} (₹${priceFormatted}) by The Cozy Theory. Handcrafted ${product.product_type || "artisanal homeware"}, daily stoneware ceramics, and living objects.`;
  const image = product.images && product.images[0] ? product.images[0] : "https://thecozytheory.com/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: "THE COZY THEORY",
      title,
      description,
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
