import Link from "next/link";
import { MapPin, Shield, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        About NYU Campus Cycle
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        NYU Campus Cycle is a campus-only, peer-to-peer marketplace for used student
        items: textbooks, electronics, dorm essentials, small furniture, and
        more. List what you don’t need, find what you do — with on-campus
        pickup to keep exchanges fast and trusted.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-nyu-purple/20 bg-nyu-purple/5 p-4 dark:bg-nyu-purple/10">
        <Shield className="h-5 w-5 shrink-0 text-nyu-purple" />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            On-campus pickup only
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            No shipping. Buyers and sellers meet at agreed campus locations
            (e.g. Bobst, Kimmel, dorm lobbies) for a safe, in-person exchange.
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Calendar className="h-5 w-5" />
          Launch plan (micromarket strategy)
        </h2>
        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            One campus, one semester transition week, high-density pickup
            points. We start with a single campus and a focused time window
            (e.g. start/end of semester) when demand for textbooks and dorm
            items is highest. Pickup is limited to a few busy spots (library,
            student center, dorms) so meetups are convenient and visible.
          </p>
        </div>
      </section>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
        <MapPin className="h-5 w-5 shrink-0 text-gray-500" />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            Pickup locations (demo)
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Bobst Library, Kimmel Center, dorm lobbies (7th St, Third North),
            Palladium, Weinstein. Sellers choose where they’re willing to meet.
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
        This is a demo-only app. No backend or authentication yet — all data
        is stored in your browser for the session.
      </p>
      <Link
        href="/market"
        className="mt-4 inline-block text-nyu-purple hover:underline focus:ring-2 focus:ring-nyu-purple"
      >
        Back to market
      </Link>
    </div>
  );
}
