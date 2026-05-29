import { data } from "@/lib/site-content"

export type BlogPost = (typeof data.blogPosts)[number]

export const blogPosts = data.blogPosts
