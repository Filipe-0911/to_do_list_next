export { default } from "next-auth/middleware";

// export const config = {["/tasks/:path*", "/api/tasks/:path*"]};
export const config = { matcher: ["/tasks/:path*", "/api/tasks/:path*"] };