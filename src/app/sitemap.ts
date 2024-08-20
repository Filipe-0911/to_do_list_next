import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: process.env.NEXTAUTH_URL || "https://task-manager-pearl-one.vercel.app",
            lastModified: new Date(),
        }
    ]
  
}