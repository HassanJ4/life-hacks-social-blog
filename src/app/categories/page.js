import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>

        <div className="grid grid-cols-2 gap-4">
          {["Productivity", "Health", "Education", "Finance"].map((cat) => (
            <Link
              key={cat}
              href={`/posts?category=${cat.toLowerCase()}`}
              className="border p-4 rounded bg-white hover:bg-gray-50 shadow-sm"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}