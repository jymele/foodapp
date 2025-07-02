# FoodApp

A collaborative meal planning and household management web application built with Next.js, Prisma, and React.

## Features

- User authentication (NextAuth)
- Dashboard with daily and weekly meal views
- Add, edit, and delete meals
- Household/room management
- Invite and manage household members
- Responsive UI with animated transitions

## Project Structure

- `app/` - Main Next.js app directory
  - `dashboard/` - User dashboard, meal and household management
  - `new-household/` - Create and manage new households, invitations
  - `search/` - Search functionality
  - `ui/` - UI components
  - `lib/` - Shared utilities
  - `api/` - API routes for authentication and meal management
- `custom/` - Custom React components (MealCard, MealList, Navigation, etc.)
- `generated/prisma/` - Prisma client and types
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets
- `utils/` - Utility functions

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (or compatible database)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd foodapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values (database URL, NextAuth secrets, etc.)
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Register or sign in to create or join a household.
- Add meals for today or the week.
- Invite other users to your household.
- Manage household members and meal plans from the dashboard.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run start` - Start the production server
- `npx prisma studio` - Open Prisma Studio to view/edit the database

## Technologies Used

- Next.js (App Router)
- React
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- Framer Motion (motion/react)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
