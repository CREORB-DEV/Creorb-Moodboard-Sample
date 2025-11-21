# Mobile Folder Setup and Run Guide

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm package manager
- Expo CLI
- Expo Go app installed on your mobile device (for testing)

## Setup Instructions
```bash
# 1. Navigate to project folder
cd ./mobile/moodboard-app

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start the Expo development server
npx expo start
```

## Running the App

After starting the Expo server, you have several options:

- **Press 'a'** - Open on Android emulator
- **Press 'i'** - Open on iOS simulator (Mac only)
- **Press 'w'** - Open in web browser
- **Scan QR code** - Use Expo Go app on your physical device

## Troubleshooting
```bash
# Clear cache if you encounter issues
npx expo start -c

# Reset metro bundler cache
npm start -- --reset-cache

# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Environment Setup (if applicable)

If your app uses environment variables:
```bash
# Create .env file in the root of mobile/moodboard-app
cp .env.example .env
# Then edit .env with your configuration
```

## Additional Notes

- Ensure your mobile device and development machine are on the same network
- For iOS development on Mac, Xcode must be installed
- For Android development, Android Studio with emulator setup is required