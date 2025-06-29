# Dermora

Dermora is a modern web application built with React, Vite, and Tailwind CSS. It features a suite of interactive components, including a camera capture tool, chatbot, dashboard, leaderboard, and quiz functionality. The project is structured for scalability and maintainability, leveraging modular components and hooks.

## Features

- 📸 Camera Capture: Take and process images directly in the browser.
- 🤖 Chatbot: Interactive chatbot for user engagement, powered by Gemini for natural language understanding and response generation.
- 📊 Dashboard: Visualize data and user progress.
- 🏆 Leaderboard: Track and display top users.
- 📝 Quiz: Interactive quizzes for user learning and assessment.
- 🎨 Modern UI: Built with Tailwind CSS and custom UI components.

## Technology Highlights

- **Gemini Integration:** The chatbot leverages Gemini, a state-of-the-art language model, to understand user queries and generate intelligent, conversational responses.
- **RAG Model:** A Retrieval-Augmented Generation (RAG) model is used to access a state-of-the-art in-house dataset, enabling the system to provide highly relevant and accurate product recommendations by combining internal knowledge with Gemini's AI capabilities.
- **Supabase Integration:** Supabase is used as a backend service to store and retrieve answers to user questions, enabling dynamic and persistent data handling for the chatbot and other features.

## Additional Project Highlights

- **Personalized Skincare Recommendations:** Combines RAG and Gemini to deliver tailored product and routine suggestions using a curated in-house dataset of skincare knowledge, ingredients, and product types.
- **Rich UI Component Library:** The `src/components/ui/` directory contains a comprehensive set of reusable UI primitives (buttons, dialogs, navigation menus, breadcrumbs, etc.), all styled with Tailwind CSS and designed for consistency and accessibility.
- **Custom Hooks and Utilities:** The `src/hooks/` and `src/lib/` folders provide custom React hooks (e.g., for mobile detection, toast notifications) and utility libraries (such as Supabase client setup and general utilities), supporting modular and maintainable code.
- **Animated and Responsive Design:** Uses animation libraries (such as Framer Motion) for smooth transitions and interactive feedback, and is fully responsive for both desktop and mobile users.
- **Data-Driven Dashboard:** The Dashboard component visualizes user progress and achievements, encouraging engagement and tracking improvement over time.
- **Quiz and Leaderboard Features:** Interactive quizzes help users learn about skincare, while the leaderboard fosters a sense of community and friendly competition.
- **Modern Development Stack:** Built with React, Vite, and TypeScript for fast development and type safety. Uses PostCSS and Tailwind for styling, and ESLint for code quality.
- **Extensible and Scalable Architecture:** Modular structure with clear separation of components, hooks, data, and pages, making it easy to extend the app with new features or integrate additional data sources and AI models.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or bun

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Running the App

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

## Project Structure

```
src/
  components/         # Reusable React components
    CameraCapture.tsx
    Chatbot.tsx
    Dashboard.tsx
    Leaderboard.tsx
    Quiz.tsx
    ui/               # UI primitives (buttons, dialogs, etc.)
  data/               # Static or mock data
  hooks/              # Custom React hooks
  lib/                # Utility libraries (e.g., Supabase client)
  pages/              # Page-level components
  App.tsx             # Main app component
  main.tsx            # App entry point
public/               # Static assets
```

## Customization

- UI components are located in `src/components/ui/`.
- Supabase integration is set up in `src/lib/supabaseClient.ts`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

[MIT](LICENSE)
