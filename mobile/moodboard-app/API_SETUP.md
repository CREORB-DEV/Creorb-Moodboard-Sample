# Frontend API Setup

## Update Backend URL

Before running the app, update the API URL in `api/axios.js`:

### For Local Development:

1. Find your computer's IP address:
   - Mac/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Windows: Run `ipconfig` and look for IPv4 Address

2. Update `api/axios.js`:
```javascript
const API_URL = 'http://YOUR_IP_ADDRESS:3001/api';
// Example: const API_URL = 'http://192.168.1.100:3001/api';
```

### For Production:
```javascript
const API_URL = 'https://your-production-domain.com/api';
```

## Install Axios

If not already installed:
```bash
cd mobile/moodboard-app
npm install axios
```

## Usage Examples

### Login
```javascript
import { authService } from './services/authService';

const { user, session } = await authService.login('email@example.com', 'password');
```

### Create Mood
```javascript
import { moodService } from './services/moodService';

const mood = await moodService.createMood('happy', 'Great day!', new Date().toISOString());
```

### Get All Moods
```javascript
const moods = await moodService.getMoods();
```
