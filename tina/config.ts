import { defineConfig, type TinaField } from "tinacms"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main"

const text = (name: string, label?: string): TinaField => ({
  type: "string",
  name,
  label,
})

const textarea = (name: string, label?: string): TinaField => ({
  type: "string",
  name,
  label,
  ui: { component: "textarea" },
})

const image = (name: string, label?: string): TinaField => ({
  type: "image",
  name,
  label,
})

const numberField = (name: string, label?: string): TinaField => ({
  type: "number",
  name,
  label,
})

const booleanField = (name: string, label?: string): TinaField => ({
  type: "boolean",
  name,
  label,
})

const linkFields: TinaField[] = [text("href", "Href"), text("label", "Label")]

const link = (name: string, label?: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: linkFields,
})

const stringList = (name: string, label?: string): TinaField => ({
  type: "string",
  name,
  label,
  list: true,
})

const intro = (name: string, label?: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    text("label", "Label"),
    text("title", "Title"),
    textarea("description", "Description"),
  ],
})

const metric = (name: string, label?: string, numeric = false): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  fields: [
    numeric ? numberField("value", "Value") : text("value", "Value"),
    text("suffix", "Suffix"),
    text("label", "Label"),
    textarea("detail", "Detail"),
    textarea("description", "Description"),
  ],
})

const cta = (name: string, label?: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    text("eyebrow", "Eyebrow"),
    stringList("heading", "Heading Lines"),
    textarea("supporting", "Supporting Copy"),
    link("primaryCta", "Primary CTA"),
    link("secondaryCta", "Secondary CTA"),
  ],
})

const serviceFields: TinaField[] = [
  text("slug", "Slug"),
  text("shortLabel", "Short Label"),
  text("title", "Title"),
  textarea("eyebrow", "Eyebrow"),
  textarea("description", "Description"),
  textarea("intro", "Intro"),
  textarea("longDescription", "Long Description"),
  image("image", "Image"),
  image("heroImage", "Hero Image"),
  stringList("keywords", "Keywords"),
  stringList("subServices", "Sub Services"),
  {
    type: "object",
    name: "process",
    label: "Process",
    list: true,
    fields: [text("title", "Title"), textarea("description", "Description")],
  },
  metric("metrics", "Metrics"),
]

const projectFields: TinaField[] = [
  numberField("id", "ID"),
  text("slug", "Slug"),
  text("title", "Title"),
  text("category", "Category"),
  text("market", "Market"),
  text("duration", "Duration"),
  textarea("teaserOutcome", "Teaser Outcome"),
  textarea("summary", "Summary"),
  stringList("outcomes", "Outcomes"),
]

const portfolioFields: TinaField[] = [
  numberField("id", "ID"),
  text("slug", "Slug"),
  text("category", "Category"),
  text("client", "Client"),
  text("title", "Title"),
  textarea("result", "Result"),
  textarea("excerpt", "Excerpt"),
  image("image", "Image"),
  text("market", "Market"),
  text("engagementDuration", "Engagement Duration"),
  textarea("situation", "Situation"),
  textarea("strategy", "Strategy"),
  textarea("execution", "Execution"),
  metric("results", "Results"),
  metric("metrics", "Metrics"),
]

const contactDataFields: TinaField[] = [
  intro("contactPageIntro", "Page Intro"),
  {
    type: "object",
    name: "contactStrategyConsultation",
    label: "Strategy Consultation",
    fields: [
      text("label", "Label"),
      textarea("title", "Title"),
      stringList("paragraphs", "Paragraphs"),
      {
        type: "object",
        name: "highlights",
        label: "Highlights",
        list: true,
        fields: [text("title", "Title"), textarea("description", "Description")],
      },
    ],
  },
  {
    type: "object",
    name: "contactOptions",
    label: "Contact Options",
    list: true,
    fields: [
      text("label", "Label"),
      textarea("title", "Title"),
      textarea("description", "Description"),
      text("value", "Value"),
      text("href", "Href"),
      booleanField("external", "External"),
    ],
  },
  intro("contactExpectationsIntro", "Expectations Intro"),
  {
    type: "object",
    name: "contactExpectations",
    label: "Expectations",
    list: true,
    fields: [
      text("title", "Title"),
      text("timeframe", "Timeframe"),
      textarea("description", "Description"),
    ],
  },
  intro("contactConversationTopicsIntro", "Conversation Topics Intro"),
  {
    type: "object",
    name: "contactConversationTopics",
    label: "Conversation Topics",
    list: true,
    fields: [text("title", "Title"), textarea("description", "Description")],
  },
  {
    type: "object",
    name: "contactFaqs",
    label: "FAQs",
    list: true,
    fields: [textarea("question", "Question"), textarea("answer", "Answer")],
  },
  intro("contactReasonsIntro", "Reasons Intro"),
  {
    type: "object",
    name: "contactReasons",
    label: "Reasons",
    list: true,
    fields: [text("title", "Title"), textarea("description", "Description")],
  },
]

export default defineConfig({
  clientId: isLocal ? undefined : process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: isLocal ? undefined : process.env.TINA_TOKEN,
  branch: isLocal ? undefined : branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    },
  },
  schema: {
    collections: [
      {
        name: "siteContent",
        label: "Site Content",
        path: "content",
        format: "json",
        match: {
          include: "site",
        },
        fields: [
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            fields: [
              text("brandPrefix", "Brand Prefix"),
              text("brandAccent", "Brand Accent"),
              {
                type: "object",
                name: "links",
                label: "Links",
                list: true,
                fields: [
                  text("label", "Label"),
                  text("href", "Href"),
                  booleanField("hasDropdown", "Has Dropdown"),
                ],
              },
              text("servicesDropdownLabel", "Services Dropdown Label"),
              link("primaryCta", "Primary CTA"),
              text("mobileTitle", "Mobile Title"),
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              textarea("description", "Description"),
              text("quickLinksHeading", "Quick Links Heading"),
              text("servicesHeading", "Services Heading"),
              text("contactHeading", "Contact Heading"),
              textarea("address", "Address"),
              text("phone", "Phone"),
              text("email", "Email"),
              text("copyright", "Copyright"),
              text("legal", "Legal"),
              {
                type: "object",
                name: "socials",
                label: "Social Links",
                list: true,
                fields: [text("type", "Icon Type"), text("href", "Href")],
              },
            ],
          },
          {
            type: "object",
            name: "home",
            label: "Home Page",
            fields: [
              {
                type: "object",
                name: "hero",
                label: "Hero",
                fields: [
                  text("eyebrow", "Eyebrow"),
                  text("headingPrefix", "Heading Prefix"),
                  stringList("rotatingWords", "Rotating Words"),
                  text("headingSuffix", "Heading Suffix"),
                  textarea("description", "Description"),
                  image("image", "Image"),
                  text("imageAlt", "Image Alt"),
                  link("primaryCta", "Primary CTA"),
                  link("secondaryCta", "Secondary CTA"),
                  text("insightLabel", "Insight Label"),
                  stringList("insightItems", "Insight Items"),
                ],
              },
              {
                type: "object",
                name: "clients",
                label: "Client Marquee",
                fields: [
                  text("label", "Label"),
                  stringList("rowOne", "Row One"),
                  stringList("rowTwo", "Row Two"),
                ],
              },
              {
                type: "object",
                name: "whatWeDo",
                label: "What We Do",
                fields: [
                  text("label", "Label"),
                  text("title", "Title"),
                  textarea("description", "Description"),
                  image("image", "Image"),
                  text("imageAlt", "Image Alt"),
                  link("cta", "CTA"),
                ],
              },
              intro("servicesPreview", "Services Preview"),
              intro("whyChoosePr", "Why Choose PR"),
              {
                type: "object",
                name: "whySubscribe",
                label: "Why Subscribe",
                fields: [
                  text("label", "Label"),
                  text("title", "Title"),
                  textarea("description", "Description"),
                  {
                    type: "object",
                    name: "cards",
                    label: "Cards",
                    list: true,
                    fields: [
                      text("id", "ID"),
                      text("icon", "Icon"),
                      text("title", "Title"),
                      textarea("description", "Description"),
                    ],
                  },
                ],
              },
              intro("whyChooseUs", "Why Choose Us"),
              {
                type: "object",
                name: "projectsPreview",
                label: "Projects Preview",
                fields: [
                  textarea("footerText", "Footer Text"),
                  link("primaryCta", "Primary CTA"),
                  link("secondaryCta", "Secondary CTA"),
                ],
              },
              intro("testimonialsIntro", "Testimonials Intro"),
              cta("letsTalk", "Let's Talk CTA"),
              intro("contactShort", "Short Contact"),
            ],
          },
          {
            type: "object",
            name: "pageHeroes",
            label: "Page Heroes",
            fields: [
              intro("services", "Services"),
              intro("caseStudies", "Case Studies"),
              intro("blog", "Blog"),
              intro("contact", "Contact"),
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Page",
            fields: [
              {
                type: "object",
                name: "hero",
                label: "Hero",
                fields: [
                  text("eyebrow", "Eyebrow"),
                  text("headingLineOne", "Heading Line One"),
                  text("headingLineTwo", "Heading Line Two"),
                  textarea("description", "Description"),
                  text("scrollLabel", "Scroll Label"),
                ],
              },
              intro("mission", "Mission"),
              metric("stats", "Stats", true),
              intro("timelineIntro", "Timeline Intro"),
              intro("valuesIntro", "Values Intro"),
              {
                type: "object",
                name: "values",
                label: "Values",
                list: true,
                fields: [
                  text("icon", "Icon"),
                  text("title", "Title"),
                  textarea("description", "Description"),
                ],
              },
              cta("closing", "Closing CTA"),
            ],
          },
          {
            type: "object",
            name: "servicesPage",
            label: "Services Page",
            fields: [
              intro("intro", "Intro"),
              metric("highlights", "Highlights"),
              intro("fullList", "Full Service List"),
              cta("closing", "Closing CTA"),
              {
                type: "object",
                name: "detail",
                label: "Service Detail Pages",
                fields: [
                  text("focusLabel", "Focus Label"),
                  text("whyLabel", "Why Label"),
                  link("startCta", "Start CTA"),
                  link("allServicesCta", "All Services CTA"),
                  intro("processIntro", "Process Intro"),
                  intro("relatedIntro", "Related Intro"),
                  cta("closing", "Closing CTA"),
                ],
              },
            ],
          },
          intro("blogPage", "Blog Page"),
          {
            type: "object",
            name: "caseStudiesPage",
            label: "Case Studies Page",
            fields: [
              intro("includedIntro", "Included Engagements"),
              cta("closing", "Closing CTA"),
              {
                type: "object",
                name: "detail",
                label: "Detail Pages",
                fields: [
                  text("backLabel", "Back Label"),
                  text("summaryLabel", "Summary Label"),
                  stringList("blocks", "Block Labels"),
                  text("resultsLabel", "Results Label"),
                  text("resultsHeading", "Results Heading"),
                  cta("closing", "Closing CTA"),
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contactPage",
            label: "Contact Page",
            fields: [
              intro("consultationRequest", "Consultation Request"),
              {
                type: "object",
                name: "form",
                label: "Form",
                fields: [
                  text("namePlaceholder", "Name Placeholder"),
                  text("emailPlaceholder", "Email Placeholder"),
                  text("phonePlaceholder", "Phone Placeholder"),
                  text("companyPlaceholder", "Company Placeholder"),
                  text("primarySelectLabel", "Primary Select Label"),
                  stringList("primarySelectOptions", "Primary Options"),
                  text("secondarySelectLabel", "Secondary Select Label"),
                  stringList("secondarySelectOptions", "Secondary Options"),
                  textarea("messagePlaceholder", "Message Placeholder"),
                  text("submitLabel", "Submit Label"),
                ],
              },
              intro("otherOptionsIntro", "Other Options Intro"),
              {
                type: "object",
                name: "finalCta",
                label: "Final CTA",
                fields: [text("label", "Label"), textarea("note", "Note")],
              },
            ],
          },
          {
            type: "object",
            name: "data",
            label: "Reusable Data",
            fields: [
              { type: "object", name: "services", label: "Services", list: true, fields: serviceFields },
              stringList("serviceTickerTags", "Service Ticker Tags"),
              {
                type: "object",
                name: "allServiceGroups",
                label: "All Service Groups",
                list: true,
                fields: [text("title", "Title"), stringList("items", "Items")],
              },
              stringList("projectCategories", "Project Categories"),
              intro("projectSectionIntro", "Project Section Intro"),
              intro("projectsPageIntro", "Projects Page Intro"),
              intro("projectsClosingCta", "Projects Closing CTA"),
              { type: "object", name: "projectItems", label: "Project Items", list: true, fields: projectFields },
              stringList("homepageFeaturedProjectSlugs", "Homepage Featured Project Slugs"),
              { type: "object", name: "portfolioItems", label: "Case Studies", list: true, fields: portfolioFields },
              {
                type: "object",
                name: "featuredCaseStudy",
                label: "Featured Case Study",
                fields: [
                  text("client", "Client"),
                  text("title", "Title"),
                  textarea("result", "Result"),
                  textarea("excerpt", "Excerpt"),
                  image("image", "Image"),
                ],
              },
              {
                type: "object",
                name: "blogPosts",
                label: "Blog Posts",
                list: true,
                fields: [
                  text("slug", "Slug"),
                  text("category", "Category"),
                  text("title", "Title"),
                  textarea("excerpt", "Excerpt"),
                  image("image", "Image"),
                  text("readTime", "Read Time"),
                  textarea("content", "Content"),
                ],
              },
              { type: "object", name: "contact", label: "Contact Data", fields: contactDataFields },
              metric("heroStats", "Hero Stats"),
              metric("statsTicker", "Stats Ticker", true),
              metric("performanceStats", "Performance Stats", true),
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  text("name", "Name"),
                  text("role", "Role"),
                  textarea("quote", "Quote"),
                ],
              },
              {
                type: "object",
                name: "timeline",
                label: "Timeline",
                list: true,
                fields: [
                  text("year", "Year"),
                  text("title", "Title"),
                  textarea("description", "Description"),
                ],
              },
              {
                type: "object",
                name: "teamMembers",
                label: "Team Members",
                list: true,
                fields: [
                  text("name", "Name"),
                  text("role", "Role"),
                  image("image", "Image"),
                  text("linkedin", "LinkedIn"),
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
