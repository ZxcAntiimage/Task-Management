# 🎯 Task Management Dashboard

A modern, responsive, and feature-rich Task Management Dashboard built based on the popular **Pickolab Studio (Figma Community)** design concept. This project represents a comprehensive ecosystem for tracking personal and team productivity, featuring interactive charts, a custom weekly calendar, a drag-and-drop file uploader, and an integrated chat system.

🔗 **Project Links:**
*   **Live Demo:** [https://task-management-six-blond.vercel.app/](https://task-management-six-blond.vercel.app/)
*   **Figma Design:** [Figma Design Link](https://www.figma.com/design/YRvblaDKC0PJ8EZYk9xAUK/Task-Management-Dashboard---Pickolab-Studio--Community-?node-id=2-2552&p=f&t=VlLEazpUhuC5tR6H-0)
*   **GitHub Repository:** [GitHub Repository](https://github.com/ZxcAntiimage/Task-Management)

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
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org) (orchestrating active tabs, chat IDs, and uploaded file metadata)
*   **Data Visualization:** [Recharts](https://recharts.org) (Circular Progress & Line Charts)
*   **Icons:** [Lucide React](https://lucide.dev)
*   **Package Manager:** [PNPM](https://pnpm.io)

---

## 🏗️ Project Structure

```
task-managment/
├── apps/
│   ├── web/                  # Next.js application
│   │   ├── app/               # App router pages
│   │   ├── components/        # Reusable components
│   │   ├── features/          # Feature modules
│   │   ├── shared/            # Shared utilities
│   │   ├── widgets/           # UI widgets
│   │   └── pages/             # Legacy pages
│   └── backend/               # Backend service
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── eslint-config/         # ESLint configuration
│   └── typescript-config/     # TypeScript configuration
└── package.json              # Root package.json
```

---

## 🔧 Getting Started (Local Installation)

### Prerequisites
- Node.js v20+
- PNPM v8+
- Git

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ZxcAntiimage/Task-Management.git
   ```

2. Navigate to the project root directory:
   ```bash
   cd Task-Management
   ```

3. Install project dependencies:
   ```bash
   pnpm install
   ```

4. Spin up the local development server:
   ```bash
   pnpm dev
   ```

5. Open your browser to:
   ```
   http://localhost:3000
   ```

---

## 🚀 Deployment

The project is deployed on Vercel and can be accessed at:
👉 [https://task-management-six-blond.vercel.app/](https://task-management-six-blond.vercel.app/)

### Deployment Process

1. **Automatic Deployment:** The project is configured for automatic deployment on Vercel when changes are pushed to the `main` branch.

2. **Environment Variables:** No special environment variables are required for the current frontend-only implementation.

3. **Build Command:**
   ```bash
   pnpm build
   ```

4. **Start Command:**
   ```bash
   pnpm start
   ```

---

## 📋 Key Features in Detail

### 🎨 Design System
- **Responsive Layout:** Fully responsive design that works on all screen sizes
- **Dark/Light Mode:** Built-in theme switching with proper color scheme management
- **Custom Components:** Extensive use of Shadcn UI components with custom styling

### 🔧 State Management
- **Redux Toolkit:** Centralized state management for:
  - Active tab navigation
  - Chat system state
  - File upload management
  - Task progress tracking

### 📊 Data Visualization
- **Recharts Integration:** Beautiful, interactive charts:
  - Activity line chart with custom tooltips
  - Circular progress indicators
  - Responsive chart containers

### 🌐 Internationalization
- **i18n Ready:** Built with internationalization support
- **Multi-language:** Easy to add new languages and translations

---

## 🔧 Development Workflow

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

### Code Quality
- **ESLint:** Configured with custom rules for TypeScript and React
- **Prettier:** Opinionated code formatter
- **TypeScript:** Strict type checking throughout the codebase

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow the existing code style
- Use meaningful commit messages
- Write clear, concise documentation
- Include tests for new features

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- **Figma Community:** For the original design inspiration
- **Shadcn UI:** For the beautiful component library
- **Vercel:** For seamless deployment and hosting
- **Open Source Community:** For all the amazing tools and libraries used in this project

---

## 📞 Support

For any questions or issues, please open an issue on the GitHub repository or contact the maintainers.

**Enjoy using the Task Management Dashboard! 🚀**