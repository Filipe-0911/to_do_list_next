import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "https://task-manager-pearl-one.vercel.app",
            lastModified: new Date(),
        }
    ]
  
}