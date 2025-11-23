# Ramon

A modern chrome new tab extension built with Next.js and TypeScript.

## 🧰 Project Overview

This project uses:

* Next.js (TypeScript)
* Tailwind CSS for styling
* A frontend architecture suitable for extension into backend/API integration

## 📦 Getting Started

### Prerequisites

* Node.js (recommend v16+)
* Yarn or npm or pnpm

### Installation

```bash
git clone https://github.com/devShoari/ramon.git  
cd ramon  
npm install  
# or  
yarn  
# or  
pnpm install  
```

### Running the Development Server

```bash
npm run dev  
# or  
yarn dev  
# or  
pnpm dev  
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app live.

## 🔧 Building & Production

To create a production build:

```bash
npm run build  
npm run start  
```

## 🎯 How to Contribute

Feel free to submit pull requests, open issues, or suggest changes. Some possible areas for enhancement:

* Add global state management (e.g., Redux, Zustand, Recoil)
* Integrate API calls and backend services
* Add authentication (OAuth, JWT)
* Expand routing under `src/app` for new pages
* Improve accessibility and responsive design

## 📁 Project Structure (excerpt)

```
ramon/
├─ public/                    # Static assets  
├─ src/
│   ├─ app/                   # Next.js App folder with pages & components  
│   ├─ styles/                # Global styles, Tailwind config  
│   └─ …  
├─ .eslintrc.json             # Linting rules  
├─ next.config.ts             # Next.js configuration  
├─ tsconfig.json              # TypeScript configuration  
└─ …
```

This project is open-source and available.
