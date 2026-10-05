import { Link } from "react-router-dom";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 shadow-sm">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
          <path d="M9 13L12 16L9 19" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 19H21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-neutral-900"}`}>
        Sighten
      </span>
    </Link>
  );
}
