import Link from "next/link";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";


export default function NavBar() {
  return (
    <header className="bg-white border-b shadow-sm mb-6">
      <div className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">

        <h1 className="text-2xl font-bold">Life Hacks</h1>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-blue-600">
          <Link href="/">Home</Link>
          <Link href="/posts">View All Posts</Link>
          <Link href="/posts/new">Add New Post</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/users/you">My Profile</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="flex gap-3 text-blue-600">
         <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

      </div>
    </header>
  );
}
