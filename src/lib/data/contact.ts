import { data, site } from "@/lib/site-content"

export type ContactOption = (typeof data.contact.contactOptions)[number]
export type ContactExpectation = (typeof data.contact.contactExpectations)[number]
export type ContactTopic = (typeof data.contact.contactConversationTopics)[number]
export type ContactQuestion = (typeof data.contact.contactFaqs)[number]
export type ContactReason = (typeof data.contact.contactReasons)[number]

export const contactPageIntro = data.contact.contactPageIntro
export const contactStrategyConsultation = data.contact.contactStrategyConsultation
export const contactOptions = data.contact.contactOptions
export const otherOptionsIntro = site.contactPage.otherOptionsIntro
export const contactExpectationsIntro = data.contact.contactExpectationsIntro
export const contactExpectations = data.contact.contactExpectations
export const contactConversationTopicsIntro =
  data.contact.contactConversationTopicsIntro
export const contactConversationTopics = data.contact.contactConversationTopics
export const contactFaqs = data.contact.contactFaqs
export const contactReasonsIntro = data.contact.contactReasonsIntro
export const contactReasons = data.contact.contactReasons
