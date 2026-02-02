# Mission: Build "The Architect" Portfolio
**Role:** Senior Frontend Architect & UI Designer
**Goal:** Build a high-performance, "crazy" animated portfolio website.
**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion.
**UI Library:** Aceternity UI (or Magic UI) for "crazy" visual effects.

---

## Step 1: Core Setup & Vibe
Initialize a Next.js project. Install `framer-motion`, `clsx`, `tailwind-merge`, and the necessary dependencies for **Aceternity UI**.
* **Theme:** Dark Mode (Cyberpunk/Neon aesthetics: Deep Black `#0a0a0a` with Cyan/Purple glows).
* **Typography:** 'Space Grotesk' or 'Inter' (clean, modern).

## Step 2: The "Crazy" Hero Section
Create a Hero section using the **"Background Beams"** or **"Sparkles"** component from Aceternity UI.
* **Headline:** "Siddhant Wani" (Large, glowing text).
* **Subtext:** "Undergraduate at PICT | AI & DS | Competitive Programmer".
* **Interaction:** The background should react to mouse movement (hover effects).

## Step 3: Coding Profiles (Bento Grid)
Create a **Bento Grid** layout for my coding stats. Use the **"Glowing Stars"** or **"Moving Border"** cards.
* **Card 1 (Codeforces):** Display "Specialist" rank.
* **Card 2 (LeetCode):** Display "Questions Solved: 500+".
* **Card 3 (CodeChef/AtCoder):** Links to profiles.
* **Animation:** Cards should scale up `1.05x` on hover with a smooth spring animation.

## Step 4: The Projects Section (3D Pin Effect)
Use the **"3D Pin"** component (floating perspective cards) for these two projects:
1.  **Rubik’s Cube Solver:**
    * Desc: "C++ & CMake | Kociemba's Algorithm | Solves in <20 moves".
    * Visual: A floating 3D card that reveals the GitHub link on hover.
2.  **Collaborative Whiteboard:**
    * Desc: "MERN Stack | Socket.IO | Real-time Drawing Sync".
    * Visual: Similar 3D floating card.

## Step 5: The "Barclays Hack-O-Hire" Experience (Featured Section)
Create a dedicated, visually distinct section for my achievement as a **Finalist in Barclays Hack-O-Hire 2025**.
* **Layout:** Split screen. Left side = Text, Right side = Image Carousel.
* **Text:** Add a placeholder block: "{PASTE LINKEDIN POST CAPTION HERE}".
* **Images:** Create an image slider (or "Parallax Scroll") where I can drop my hackathon photos.
* **Badge:** Add a glowing badge that says "National Finalist 2025".

## Step 6: Skills & Contact
* **Skills:** A "Infinite Moving Cards" marquee scrolling horizontally (C++, Python, MERN, React, LaTeX, Git).
* **Footer:** Simple "Contact Me" with email (wanisid24@gmail.com) and LinkedIn link.

## Execution Plan
1.  Scaffold the app.
2.  Set up the Tailwind config for the complex animations.
3.  Create the components file by file.
4.  Verify the "hover" physics are smooth (60fps).