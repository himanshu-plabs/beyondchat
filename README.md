# BeyondChat

BeyondChat is an AI-powered customer support platform that helps businesses provide instant, intelligent responses to their customers. Built with modern technologies and best practices in mind.

## Features

- 🤖 AI-Powered Responses
- 🎨 Customizable Chat Widget
- 📊 Analytics Dashboard
- 🔄 Automated Training
- 🎯 Context-Aware Responses
- 🌙 Dark/Light Mode
- 📱 Mobile-First Design

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: React Query
- **Authentication**: NextAuth.js
- **Notifications**: React Toast
- **Email**: Resend
- **Tables**: React Table
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/himanshu-plabs/beyondchat.git
cd beyondchat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `/pages` - Next.js pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and shared logic
- `/types` - TypeScript type definitions
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Key Features

### Organization Setup

- Easy onboarding process
- Website scanning and content analysis
- Automated knowledge base creation

### AI Training

- Content review and approval system
- Training progress monitoring
- Performance metrics tracking
- Quality assurance tools

### Customization

- Theme customization (colors, fonts, position)
- Behavior settings (welcome message, tone, operating hours)
- Widget appearance preview
- Mobile-responsive design

## Mobile Optimization

- Bottom navigation
- Touch-friendly inputs (min 44px)
- Swipe gestures
- Responsive tables
- Full-screen modals
- Pull-to-refresh
- Infinite scroll

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
