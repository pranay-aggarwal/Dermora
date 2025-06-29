# Dermora

Dermora is a modern web application built with React, Vite, and Tailwind CSS. It features a suite of interactive components, including a camera capture tool, chatbot, dashboard, leaderboard, and quiz functionality. The project is structured for scalability and maintainability, leveraging modular components and hooks.

## Features

- 📸 Camera Capture: Take and process images directly in the browser.
- 🤖 Chatbot: Interactive chatbot for user engagement.
- 📊 Dashboard: Visualize data and user progress.
- 🏆 Leaderboard: Track and display top users.
- 📝 Quiz: Interactive quizzes for user learning and assessment.
- 🎨 Modern UI: Built with Tailwind CSS and custom UI components.

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
# Dermora
