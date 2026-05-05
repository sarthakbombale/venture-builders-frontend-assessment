# Venture Builders Frontend Assessment

## Tech Stack
- **Framework:** Next.js (App Router)
- **UI Library:** Material UI (MUI)
- **State Management:** Zustand
- **Auth:** NextAuth.js
- **API:** DummyJSON

## Why Zustand?
I chose **Zustand** for state management because:
1. **Simplicity:** It has significantly less boilerplate than Redux.
2. **Small Footprint:** It doesn't wrap the entire app in providers, keeping the bundle light.
3. **Async Actions:** Handling API calls directly inside the store is intuitive and clean.

## Optimization & Caching
- **API Pagination:** Implemented using `limit` and `skip` to ensure high performance with large datasets.
- **Client-Side Caching:** The Zustand store retains state during navigation, preventing redundant API calls when switching between tabs if data is already present.
- **Memoization:** Used MUI's built-in optimization patterns to reduce unnecessary re-renders.

## Setup Instructions
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file and add `NEXTAUTH_SECRET=your_secret_here`.
4. Run development server: `npm run dev`.