# React Native Chat Application

## Assignment Overview

This project is a React Native application that implements a chat screen for both Android and iOS devices. The application fetches chat data from an API and displays it with infinite scrolling functionality to load older messages.

**Current Date:** 2025-07-09  
**Developer:** nithinmouli

## Features

- Chat interface with message bubbles
- Pagination with infinite scrolling to load older messages
- Cross-platform compatibility (Android & iOS)
- Real-time message display
- User-friendly interface with loading indicators

## API Integration

The application uses the following API to retrieve chat data:
```
curl --location 'https://qa.corider.in/assignment/chat?page=0'
```

The API supports pagination by incrementing the page parameter to retrieve older chat messages.

## Project Structure

```
assignment/                         # Root project directory
├── .expo/                          # Expo configuration files (auto-generated)
├── .vscode/                        # VSCode editor settings
├── app/                            # Expo Router app directory (file-based routing)
│   ├── _layout.js                  # Root layout component for navigation
│   ├── index.js                    # App entry point (redirects to chat)
│   └── chat/                       # Chat screen directory
│       └── index.js                # Main chat screen component
├── assets/                         # Static assets
│   ├── adaptive-icon.png           # App icon for adaptive icons
│   ├── favicon.png                 # Web favicon
│   ├── icon.png                    # App icon
│   └── splash.png                  # Splash screen
├── components/                     # Reusable UI components
│   ├── chat/                       # Chat-specific components
│   │   ├── ChatHeader.js           # Header component with title and user info
│   │   ├── ChatInput.js            # Input component for typing and sending messages
│   │   ├── LoadingIndicator.js     # Loading spinner for pagination
│   │   ├── MessageBubble.js        # Component for rendering chat messages
│   │   └── index.js                # Export file for chat components
│   └── index.js                    # Main export file for all components
├── constants/                      # Application constants
│   ├── Api.js                      # API endpoints and configuration
│   ├── Colors.js                   # Color definitions for consistent styling
│   └── index.js                    # Export file for constants
├── hooks/                          # Custom React hooks
│   ├── useChatData.js              # Hook for fetching and managing chat data
│   └── index.js                    # Export file for hooks
├── node_modules/                   # Installed npm packages (auto-generated)
├── scripts/                        # Build and utility scripts
├── .gitignore                      # Git ignore file
├── app.json                        # Expo application configuration
├── eslint.config.js                # ESLint configuration
├── expo-env.d.ts                   # TypeScript definitions for Expo
├── package-lock.json               # NPM package lock file
├── package.json                    # NPM package configuration
├── README.md                       # Project documentation
└── tsconfig.json                   # TypeScript configuration
```

## Implementation Details

### Components

- **ChatHeader**: Displays the chat title and user information
- **ChatInput**: Provides input field for typing and sending messages
- **LoadingIndicator**: Shows loading status during pagination
- **MessageBubble**: Renders individual chat messages with appropriate styling

### Hooks

- **useChatData**: Custom hook that manages fetching and updating chat data with pagination

### Core Functionality

The application implements infinite scrolling by:
1. Loading the most recent messages on initial render
2. Detecting when the user scrolls above a certain threshold
3. Triggering API calls with incremented page numbers to fetch older messages
4. Appending new messages to the existing chat history

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npx expo start
   ```
4. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app on your device

## Requirements

- Node.js (v14 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Physical device or emulator for testing

## Notes

- The application is built using Expo and React Native
- The UI is designed to match exactly with the provided specifications
- The code is original and plagiarism-free
- The application is compatible with both Android and iOS devices
