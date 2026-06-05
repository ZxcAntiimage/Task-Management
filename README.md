# 🎯 Task Management Dashboard

A modern, responsive, and feature-rich Task Management Dashboard built based on the popular **Pickolab Studio (Figma Community)** design concept. This project represents a comprehensive ecosystem for tracking personal and team productivity, featuring interactive charts, a custom weekly calendar, a drag-and-drop file uploader, and an integrated chat system.

🔗 **Project Links:**
*   **Figma Design:** [Figma Design Link](https://figma.com)
*   **GitHub Repository:** [GitHub Repository](https://github.com)

---

## 🚀 Implemented Features

Currently, the complete visual layouts and client-side business logic have been fully implemented:

### 📊 Overview & Analytics Dashboard
*   **Running Tasks Card:** Features a total tasks counter integrated with a custom circular progress `PieChart` component.
*   **Activity Line Chart:** A smooth, responsive weekly activity line chart featuring styled data points and custom floating tooltips (`2 Task`).
*   **Task List Sections:** Dedicated blocks for "Time Limit" and "New Task" lists with independent pagination and instant data slicing.
*   **Dynamic Search:** Fully functional global search on the main dashboard that dynamically filters cards by title and automatically toggles the interface into a "Search Results" view.

### 👥 Mentors & Team Management
*   **Recent Mentors Slider:** A compact top-row slider for quick browsing with smooth horizontal pagination controls.
*   **Mentors Grid:** Main grid component displaying detailed mentor cards including descriptions, specialties, total tasks, and reviews.
*   **Interactive Follow State:** Isolated subscription state tracking (`Follow` / `Followed`) mapped specifically to each mentor's unique ID.

### 📅 Interactive Tools
*   **Weekly Calendar:** An interactive custom calendar with smooth month navigation. Selected days are beautifully styled inside a distinct dark vertical pill container with a vibrant blue circle wrapping the day number.
*   **Drag & Drop File Uploader:** A custom Shadcn UI uploader component integrated with Redux. It handles non-serializable file objects, displays per-file uploading progress indicators, and supports item removal.

### 💬 Chat & Messages Module
*   **Conversations List:** A sleek sidebar displaying active chat contacts, avatars, and timestamps for the last received messages.
*   **Dynamic Chat Window:** Powered by Redux State to seamlessly transition between conversation windows. The header automatically pulls the selected user's metadata and dynamically reflects their `Online` status.
*   **Message Bubbles Grid:** Strict layout rules ensuring message containers are correctly aligned to the left side of the screen using content-based sizing (`w-fit` + `items-start`).

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org) (TypeScript)
*   **UI Components & Styling:** [Shadcn UI](https://shadcn.com) + [Tailwind CSS](https://tailwindcss.com)
*   **State Management:** [Redux Toolkit](https://js.org) (orchestrating active tabs, chat IDs, and uploaded file metadata)
*   **Data Visualization:** [Recharts](https://recharts.org) (Circular Progress & Line Charts)
*   **Icons:** [Lucide React](https://lucide.dev)

---

## 🏗️ In Progress

*   [ ] **Message Section Search:** Implementing live filtering for the contacts sidebar based on the "Search Name" input field.

---

## 🗺️ Roadmap & Future Plans

1.  **Deep Performance Optimization:**
    *   Refactoring folder structure and component breakdown to maximize build performance.
    *   Adding debouncing logic to search input hooks to reduce unnecessary re-rendering cycles during fast typing.
    *   Polishing grid layout behaviors for nested chart modules.
2.  **Full Backend Integration:**
    *   Building a robust server-side architecture using **NestJS**.
    *   Integrating a relational database (PostgreSQL/MySQL) via **Prisma ORM**.
    *   Replacing current mock datasets (`databaseTasks`, `databasePeoples`, `databaseMentors`) with real production API endpoints.
    *   Implementing server-side asset storage for files uploaded through the drag-and-drop component.

---

## 🔧 Getting Started (Local Installation)

1. Clone the repository:
   ```bash
   git clone https://github.com.git
   ```
2. Navigate to the project root directory:
   ```bash
   cd Task-Management
   ```
3. Install project dependencies (the project uses the pnpm package manager):
   ```bash
   pnpm install
   ```
4. Spin up the local development server:
   ```bash
   pnpm dev
   ```
