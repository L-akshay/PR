import { data } from "@/lib/site-content"

export type TeamMember = (typeof data.teamMembers)[number]

export const teamMembers = data.teamMembers
