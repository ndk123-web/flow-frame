# Getting Started

Follow these steps to set up and run FlowFrame locally.

## Prerequisites

Ensure you have the following runtime engines installed:
- Node.js (v18 or higher) or Bun (v1.0 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ndk123-web/flowframe.git
   cd flowframe/client
   ```

2. Install dependencies:
   ```bash
   # Using npm
   npm install
   # Or using Bun
   bun install
   ```

## Development Execution

Run the local development server:
```bash
# Using npm
npm run dev
# Or using Bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to access the application.

## Static Building

Validate TypeScript rules and compile static production build pages:
```bash
# Using npm
npm run build
# Or using Bun
bun run build
```