# Moekyawaung-dev-premium-portfolio 🚀

A premium, highly polished portfolio website built with React, Vite, and Tailwind CSS. This project showcases the extensive skills and experience of Moe Kyaw Aung, a Senior Android & Flutter Developer.

## Key Features ✨

*   **Full-Page Navigation:** Seamless transitions and a comprehensive routing system covering 36 distinct routes.
*   **Command Palette (⌘K):** Fuzzy search across all routes and quick actions for enhanced navigation and productivity.
*   **Custom Cursor:** An interactive cursor that provides visual feedback and adapts to interactive elements.
*   **Ambient Effects:** Includes particle fields, aurora meshes, and orb animations for a visually rich experience.
*   **Multi-language Support:** Content available in English, Burmese (မြန်မာ), and Thai.
*   **Dynamic Theming:** Supports both dark and light modes.
*   **Performance Focused:** Built with performance optimization in mind, utilizing techniques like code splitting and efficient rendering.
*   **Accessibility:** Adheres to WCAG 2.2 AA standards with keyboard navigation, focus states, and reduced motion options.
*   **Rich Content:** Showcases projects, skills, experience, talks, writing, and more through well-structured sections.
*   **Single File Build:** Optimized for deployment using `vite-plugin-singlefile`.

## Tech Stack 🛠️

*   **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4.1.17
*   **State Management:** Zustand (via custom `useApp` hook)
*   **Iconography:** Inline SVG icons (Lucide)
*   **Animation:** CSS transitions, `react-spring` (implied by visual effects)
*   **Build Tools:** Vite
*   **Deployment:** `vite-plugin-singlefile` for single-file builds
*   **Styling:** Custom CSS variables and Tailwind CSS
*   **Other Dependencies:** `clsx`, `tailwind-merge`

## Installation 🛠️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-moe-kyawaung/Moekyawaung-dev-premium-portfolio.git
    cd Moekyawaung-dev-premium-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage 🚀

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command will start a local development server, typically at `http://localhost:5173`.

2.  **Build for production:**
    ```bash
      npm run build
    ```
    This command creates an optimized single-file build in the `dist` directory, ready for deployment.

3.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally.

## Project Structure 📂

```
Moekyawaung-dev-premium-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── chrome.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── fx.tsx
│   │   ├── Footer.tsx
│   │   ├── Nav.tsx
│   │   ├── PageHero.tsx
│   │   ├── ResumeDrawer.tsx
│   │   ├── sections.tsx
│   │   ├── ui.tsx
│   │   └── ... (other components)
│   ├── pages/
│   │   ├── collections.tsx
│   │   ├── core.tsx
│   │   ├── engineering.tsx
│   │   ├── Home.tsx
│   │   ├── people.tsx
│   │   ├── system.tsx
│   │   └── work.tsx
│   ├── lib/
│   │   ├── data.ts
│   │   └── store.tsx
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Features 🌟

*   **Interactive Hero Section:** Features a video background, typing effects for roles, and a bento-style side rail with live telemetry.
*   **Command Palette:** Integrated command palette (⌘K) for quick navigation and actions across all 36 routes.
*   **Custom Cursor:** An immersive custom cursor that reacts to interactions.
*   **Ambient Visual Effects:** Includes constellation particles, aurora meshes, scanlines, and subtle orb animations.
*   **Multi-Language Support:** Seamlessly switch between English, Burmese (မြန်မာ), and Thai.
*   **SEO Optimized:** Includes comprehensive meta tags, structured data (Schema.org Person), and canonical links.
*   **Responsive Design:** Adapts gracefully across various screen sizes and devices.
*   **Performance Focus:** Utilizes techniques like `vite-plugin-singlefile` for optimized builds and `useInView` for lazy loading effects.
*   **Accessibility:** Built with accessibility in mind, following WCAG 2.2 AA guidelines.
*   **Detailed Case Studies:** In-depth pages for key projects, outlining problem, role, architecture, outcomes, and lessons learned.
*   **Skills Visualization:** Progress rings and skill bars that animate into view.
*   **Internationalization:** Built with locale-aware content and typography.

## Tech Stack 💻

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand (via `useApp` context)
*   **Routing:** Hash-based routing (internal)
*   **Icons:** Inline SVG icons via `lucide-react` (implied)
*   **Animations:** Custom CSS animations, `react-intersection-observer` (via `useInView`)
*   **Utilities:** `clsx`, `tailwind-merge`

## Installation ⚙️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-moe-kyawaung/Moekyawaung-dev-premium-portfolio.git
    cd Moekyawaung-dev-premium-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage 🚀

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command starts a local development server, typically accessible at `http://localhost:5173`.

2.  **Build for production:**
    ```bash
    npm run build
    ```
    This command creates an optimized, single-file production build in the `dist` directory.

3.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally for testing.

## Project Structure 📁

```
Moekyawaung-dev-premium-portfolio/
├── public/
│   └── index.html             # Main HTML entry point with meta tags and font links
├── src/
│   ├── components/
│   │   ├── chrome.tsx         # UI chrome elements (preloader, cursor, etc.)
│   │   ├── CommandPalette.tsx # Command palette UI
│   │   ├── fx.tsx             # Visual effects (constellation, split text, etc.)
│   │   ├── Footer.tsx         # Site footer component
│   │   ├── Nav.tsx            # Navigation bar component
│   │   ├── PageHero.tsx       # Hero section component for inner pages
│   │   ├── ResumeDrawer.tsx   # Resume download/copy drawer
│   │   ├── sections.tsx       # Reusable content sections
│   │   └── ui.tsx             # UI primitives (Button, Card, Reveal, etc.)
│   ├── pages/
│   │   ├── collections.tsx    # Pages for collections (Apps, Certs, etc.)
│   │   ├── core.tsx           # Core pages (About, Resume, Skills, Tech Stack)
│   │   ├── engineering.tsx    # Engineering-focused pages
│   │   ├── Home.tsx           # Landing page component
│   │   ├── people.tsx         # People-related pages (Experience, Talks, etc.)
│   │   ├── system.tsx         # System pages (Pricing, FAQ, Legal, etc.)
│   │   └── work.tsx           # Work-related pages (Projects, Case Studies, Labs)
│   ├── lib/
│   │   ├── data.ts            # All static data for the site
│   │   └── store.tsx          # Global state management (context API)
│   ├── utils/
│   │   └── cn.ts              # Classnames utility (clsx + twMerge)
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles and Tailwind directives
│   └── main.tsx               # React entry point
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Important links 🔗

*   **Live Demo:** [https://moekyawaung.github.io/](https://moekyawaung.github.io/)
*   **GitHub Repository:** [https://github.com/Dev-moe-kyawaung/Moekyawaung-dev-premium-portfolio](https://github.com/Dev-moe-kyawaung/Moekyawaung-dev-premium-portfolio)
*   **Author Profile:** [https://github.com/Dev-moe-kyawaung/](https://github.com/Dev-moe-kyawaung/)

## Contributing 🤝

Contributions are welcome! Please feel free to fork the repository, make your changes, and submit a pull request. For significant changes, please open an issue first to discuss what you would like to change.

## License 📄

No license information provided in the repository. It's advisable to check the repository for explicit licensing details or assume standard open-source practices if none are stated.

---

**Portfolio V000 · Powered by React & Vite**

*Fork*, *star*, and *issue* with gratitude.

[Moe Kyaw Aung](https://github.com/Dev-moe-kyawaung) · [Contact](mailto:moekyawaung@programmer.net)

---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**