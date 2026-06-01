import Link from "next/link"

export default function SupabaseSetupNotice() {
  return (
    <section className="px-5 py-36 lg:px-16">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
        <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
          Supabase Setup
        </p>
        <h1 className="mt-5 font-serif text-5xl font-light text-[#F5F0E8]">
          Add your Supabase keys to enable the portal.
        </h1>
        <p className="mt-5 font-ui text-sm leading-relaxed text-[#888880]">
          Create a Supabase project, run the SQL in
          supabase/migrations/001_minimal_project_backend.sql, then add
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to
          .env.local.
        </p>
        <p className="mt-4 font-ui text-sm leading-relaxed text-[#888880]">
          Full steps are in docs/SUPABASE_SETUP.md.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex font-ui text-[11px] uppercase tracking-[0.24em] text-[#C9A84C]"
        >
          Back to site
        </Link>
      </div>
    </section>
  )
}
