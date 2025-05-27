# AI Humanizer

A powerful web application that transforms AI-generated content into natural, human-like text. Built with React, TypeScript, and Tailwind CSS.

## Features

- **AI Text Humanization**: Convert AI-generated text into natural-sounding content
- **Multiple Humanization Levels**: Choose between light, medium, and strong humanization
- **User Authentication**: Secure login and registration system
- **Credit System**: Track usage with a flexible credit-based system
- **Project Management**: Save and manage your humanized texts
- **Responsive Design**: Fully responsive interface that works on all devices
- **Multiple Pricing Tiers**: Free, Basic, Premium, and Enterprise plans

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-humanizer.git
cd ai-humanizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Text Humanization**:
   - Navigate to the home page
   - Paste your AI-generated text in the input field
   - Select your desired humanization level
   - Click "Humanize Text" to process

2. **Account Management**:
   - Create an account or log in
   - Access your dashboard to view credits and saved projects
   - Upgrade your plan for additional features

3. **Project Management**:
   - Save humanized texts for later use
   - Access your history in the dashboard
   - Edit or delete saved projects

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── pages/         # Application pages/routes
└── styles/        # Global styles and Tailwind config
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)