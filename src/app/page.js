import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-4">

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>

        <div className="flex gap-4">
          <Link
            href="/posts"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View All Posts
          </Link>

          <Link
            href="/posts/new"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add New Post
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>

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
