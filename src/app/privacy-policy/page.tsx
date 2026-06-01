import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NovaPR.",
}

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect contact details, company information, project requirements, and messages you share with us through forms, email, phone, or consultation requests.",
      "We may also collect basic technical information such as browser type, device information, pages visited, and usage patterns to help improve the website experience.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use the information you provide to respond to enquiries, prepare proposals, deliver services, manage client relationships, and improve our communications and website.",
      "We do not sell your personal information. We may share information with trusted service providers only where needed to operate our business or deliver requested services.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational measures to protect information from unauthorized access, misuse, loss, or disclosure.",
      "No online transmission or storage system is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us to request access, correction, or deletion of personal information we hold about you, subject to applicable legal and business requirements.",
      "You can also unsubscribe from marketing communications where an unsubscribe option is provided.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or requests, contact us at hello@novapr.in.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how NovaPR collects, uses, protects, and handles information shared with us."
      updated="June 1, 2026"
      sections={sections}
    />
  )
}
