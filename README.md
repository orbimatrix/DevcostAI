# DevCost AI: Global Project Estimator

DevCost AI is an intelligent project estimation tool that leverages **Google's Gemini 3 Pro** and **Gemini 2.5 Flash** models to analyze technical documentation, architectural diagrams, and UI mockups. It generates detailed, localized development cost and timeline estimates based on real-time global labor market data.

## 🚀 Features

-   **Multi-Modal Analysis**: Upload system architecture diagrams, database schemas, or UI mockups. The AI interprets visual data to assess project complexity.
-   **Localized Market Data**: Select a target country (e.g., USA, Germany, Vietnam) to fetch real-time wage data, currency exchange rates, and developer seniority spreads.
-   **Comprehensive Cost Breakdown**:
    -   Minimum, Average, and Maximum cost scenarios.
    -   Component allocation (Backend, Frontend, DevOps, QA).
    -   Infrastructure and 3rd-party license estimates.
-   **Interactive AI Consultant**: Chat with the estimation engine to challenge assumptions, ask for savings strategies, or compare costs against other regions.
-   **Visual Dashboards**: Interactive charts for cost distribution and timeline projections using Recharts.
-   **Social Sharing**: Easily share estimate summaries to Twitter (X), LinkedIn, or Facebook.

## 🛠️ Technology Stack

-   **Frontend**: React 19 (ES Modules)
-   **Styling**: Tailwind CSS (with Typography plugin)
-   **AI & ML**: Google GenAI SDK (`@google/genai`)
    -   *Gemini 2.5 Flash*: Used for rapid market data retrieval and search grounding.
    -   *Gemini 3 Pro*: Used for deep "Thinking" analysis of architectural images and complex reasoning for estimates.
-   **Visualization**: Recharts
-   **Markdown Rendering**: React Markdown

## 📋 How It Works

1.  **Market Analysis**: When a user selects a country, the app uses Gemini with Google Search tools to find the latest hourly rates for Junior, Mid, Senior, and DevOps roles in that region.
2.  **Project Parsing**: The user uploads files (Images/PDFs). Gemini 3 Pro analyzes these visual assets alongside text requirements to determine the number of distinct features, API endpoints, and complexity drivers.
3.  **Estimation Logic**:
    -   The AI calculates total developer hours based on complexity.
    -   It applies the localized wage data to these hours.
    -   It generates a structured JSON response containing the timeline and cost split.
4.  **Consultation**: The user can chat with the result. The chat context includes the full estimation JSON, allowing the AI to answer specific questions like "Why is the backend cost 40%?".

## 📦 Setup & Configuration

This project is designed to run in a modern web environment supporting ES Modules and React 19.

### Prerequisites

-   A Google AI Studio API Key with access to `gemini-3-pro-preview` and `gemini-2.5-flash`.

### Environment Variables

The application expects the API key to be available via:

```typescript
process.env.API_KEY
```

### Running Locally

1.  Clone the repository.
2.  Ensure you have a build system or runtime that supports the imports defined in the `importmap` within `index.html` or convert them to standard npm packages.
3.  Serve the `index.html` file.

## 🛡️ License

This project is a demonstration of Gemini's multimodal capabilities and is provided as-is.