# Life Hacks - Social App

Life Hacks is a full‑stack social application built with **Next.js**, **PostgreSQL**, and **Clerk** for authentication. Users can browse posts, filter by category, create their own posts, edit their profile, and leave comments.

## Features
- Sign up and sign in with **Clerk authentication**
- User profiles with editable bios
- Browse posts and filter by category (Productivity, Health, Education, Finance)
- Create new posts with a title, content, and category
- View posts on individual pages
- Add comments to posts
- Delete posts (server actions handle this securely)

## Components
- **Header.jsx** – Global navigation bar with links to Home, Posts, Categories, About, and user profile/sign in
- **EditBio.jsx** – Form for updating user biography
- **Comments.jsx** – Displays all comments for a post
- **AddComment.jsx** – Form to submit a new comment
- **DeleteButton.jsx** – Handles deleting posts
- **User pages** – `/users/you` for the logged-in user

## How it works
- Uses the **Next.js App Router**, mapping folders directly to routes
- **PostgreSQL** stores users, posts, and comments
- **Clerk** manages authentication, ensuring only signed-in users can create posts or edit their bio

## What I learned
- Setting up user authentication with Clerk in Next.js
- Creating user profiles and associating posts with users

## Things I found difficult
- Integrating Clerk authentication with the database
- Passing the Clerk user to database queries
- Managing database relationships between users, posts, and comments

## Future Updates

- While this version of Life Hacks covers the core functionality—creating posts, editing your bio, and viewing your own profile—there are several additional features planned for future updates:

--Edit the content of posts after submission to correct mistakes or add information.

--View other users’ profiles directly from their posts.

--Follow other users and stay updated on their activity.

## How to run it
- Clone the repository
- Install the dependencies with `npm install`
- Run server with `npm run dev`
- Open in browser at `http://localhost:3000`
