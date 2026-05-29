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
          Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
          .env.local, then run the SQL migration in Supabase.
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
