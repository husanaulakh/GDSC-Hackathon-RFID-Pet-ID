# PawTracker

**Reuniting lost pets with their families**

PawTracker is a web application that uses advanced **RFID technology** and an **AI-driven** approach to help lost pets find their way home quickly and securely. Built with React and hosted on Vercel, it offers a seamless dashboard for pet owners to register and update pet statuses (LOST, FOUND, HOME) in real time.

## Key Features
- **RFID Integration**: Assigns a unique RFID tag to each pet for quick and secure identification.
- **Real-Time Updates**: Instantly notify owners with status updates.
- **User-Friendly Dashboard**: Easily register new pets, update statuses, and monitor pet activities.
- **AI-Driven Matching**: Leverages AI for processing pet data and optimising search and match functionality.
- **Scalable Deployment**: Powered by a Supabase backend and hosted on Vercel for reliable performance.

## Tech Stack
- **Frontend**: React (Vite + TypeScript), Tailwind CSS/Shadcn UI, Framer Motion
- **Backend**: Supabase (database & authentication)
- **Deployment**: Vercel

## Installation & Usage

### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/pawtracker.git
cd pawtracker
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Supabase keys:

```ini
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
```

### 4. Run the development server
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

### 5. Build for Production
```bash
npm run build
```

## License
This project is licensed under the MIT License.
