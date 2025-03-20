import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center">
      <h2 className="text-4xl font-bold">Ready to Test Your Knowledge?</h2>
      <p className="mt-4 text-lg">Start a quiz now and see where you stand!</p>
      <div className="mt-6">
        <Link href="/Quiz">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200">
            Take a Quiz
          </button>
        </Link>
      </div>
    </section>
  );
}
