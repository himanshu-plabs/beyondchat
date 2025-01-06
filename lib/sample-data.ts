export const samplePages = [
  {
    id: "page_1",
    url: "https://example.com/about",
    content: `About Us - Example Company

We're a leading technology company specializing in AI-powered solutions. Our mission is to make artificial intelligence accessible to businesses of all sizes.

Founded in 2020, we've helped over 1,000 companies transform their customer service operations through intelligent automation. Our team of experts combines decades of experience in machine learning, natural language processing, and customer experience design.

Key Facts:
- Founded: 2020
- Customers: 1,000+
- Team Size: 50+
- Global Presence: 5 countries`,
    relevanceScore: 0.95,
    status: "pending",
  },
  {
    id: "page_2",
    url: "https://example.com/products",
    content: `Our Products

1. AI Chat Platform
- 24/7 customer support automation
- Multi-language support
- Custom training capabilities
- Analytics dashboard

2. Knowledge Base Manager
- Automatic content organization
- Smart search functionality
- Content quality scoring
- Integration with popular CMS

3. Analytics Suite
- Real-time performance metrics
- Customer satisfaction tracking
- ROI calculator
- Custom reporting`,
    relevanceScore: 0.88,
    status: "pending",
  },
  {
    id: "page_3",
    url: "https://example.com/pricing",
    content: `Pricing Plans

Basic Plan - $99/month
- Up to 1,000 conversations
- Basic analytics
- Email support
- 2 team members

Pro Plan - $299/month
- Up to 10,000 conversations
- Advanced analytics
- Priority support
- 5 team members

Enterprise Plan - Custom pricing
- Unlimited conversations
- Custom features
- Dedicated support
- Unlimited team members`,
    relevanceScore: 0.75,
    status: "pending",
  },
  {
    id: "page_4",
    url: "https://example.com/blog/ai-trends-2024",
    content: `AI Trends in 2024

The landscape of artificial intelligence is rapidly evolving. Here are the key trends we're seeing in 2024:

1. Conversational AI Advancement
- More natural dialogues
- Better context understanding
- Emotional intelligence

2. Multi-modal AI
- Text, voice, and visual processing
- Cross-platform integration
- Unified user experiences

3. Privacy-First AI
- Local processing
- Data minimization
- Compliance automation`,
    relevanceScore: 0.82,
    status: "pending",
  },
  {
    id: "page_5",
    url: "https://example.com/support",
    content: `Customer Support

Get help with our products and services:

Common Questions:
Q: How do I get started?
A: Sign up for a free trial and follow our quick setup guide.

Q: What's your uptime guarantee?
A: We maintain 99.9% uptime with 24/7 monitoring.

Q: How secure is your platform?
A: We use bank-level encryption and are SOC 2 compliant.

Contact Methods:
- Email: support@example.com
- Phone: 1-800-EXAMPLE
- Live Chat: Available 24/7`,
    relevanceScore: 0.91,
    status: "pending",
  },
];

export const sampleTrainingResults = {
  modelMetrics: {
    accuracy: 0.94,
    f1Score: 0.92,
    precision: 0.95,
    recall: 0.89,
  },
  improvements: [
    "Enhanced context understanding",
    "Better handling of technical queries",
    "Improved response consistency",
    "More natural conversation flow",
  ],
  processedPages: 5,
  totalTokens: 15000,
  averageResponseTime: "0.8s",
};

export const sampleCustomizations = {
  theme: {
    primaryColor: "blue",
    font: "inter",
    position: "bottom-right",
    preview: {
      light: {
        background: "#FFFFFF",
        text: "#1A1A1A",
        primary: "#2563EB",
        secondary: "#F3F4F6",
      },
      dark: {
        background: "#1A1A1A",
        text: "#FFFFFF",
        primary: "#3B82F6",
        secondary: "#374151",
      },
    },
  },
  behavior: {
    welcomeMessage: "👋 Hi there! How can I help you today?",
    tone: "professional",
    fallbackMessage:
      "I'm not sure I understand. Could you please rephrase that?",
    operatingHours: {
      enabled: true,
      start: "09:00",
      end: "17:00",
      timezone: "America/New_York",
    },
    quickReplies: [
      "Tell me about your products",
      "What are your pricing plans?",
      "How do I get started?",
      "Contact support",
    ],
  },
  analytics: {
    averageResponseTime: "1.2s",
    satisfactionRate: 4.8,
    resolutionRate: 0.92,
    commonTopics: [
      { name: "Pricing", count: 450 },
      { name: "Technical Support", count: 380 },
      { name: "Features", count: 320 },
      { name: "Integration", count: 250 },
    ],
  },
};

export const sampleTrainingPages = [
  {
    id: "1",
    url: "https://docs.example.com/getting-started",
    content:
      "Welcome to our comprehensive documentation. This guide will help you get started with our platform...",
    relevanceScore: 0.95,
    status: "approved",
    lastModified: "2024-02-15T10:30:00Z",
    wordCount: 1250,
    category: "documentation",
  },
  {
    id: "2",
    url: "https://docs.example.com/api-reference",
    content:
      "API Reference Documentation: This section covers all available endpoints, authentication methods...",
    relevanceScore: 0.88,
    status: "pending",
    lastModified: "2024-02-14T15:45:00Z",
    wordCount: 3200,
    category: "api",
  },
  {
    id: "3",
    url: "https://blog.example.com/best-practices",
    content:
      "Learn about the best practices for implementing our solutions in your workflow...",
    relevanceScore: 0.75,
    status: "pending",
    lastModified: "2024-02-13T09:15:00Z",
    wordCount: 850,
    category: "blog",
  },
  {
    id: "4",
    url: "https://docs.example.com/tutorials",
    content:
      "Step-by-step tutorials to help you master advanced features and implementations...",
    relevanceScore: 0.92,
    status: "approved",
    lastModified: "2024-02-12T14:20:00Z",
    wordCount: 2100,
    category: "tutorial",
  },
  {
    id: "5",
    url: "https://support.example.com/faq",
    content:
      "Frequently asked questions about common issues and their solutions...",
    relevanceScore: 0.68,
    status: "rejected",
    lastModified: "2024-02-11T11:10:00Z",
    wordCount: 450,
    category: "support",
  },
] as const;

export type TrainingPage = (typeof sampleTrainingPages)[number];
