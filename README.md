# KoinX - Tax Harvesting Dashboard

A precision-crafted, highly interactive React dashboard built to calculate, simulate, and optimize crypto tax harvesting. Designed pixel-perfectly with Next.js and Tailwind CSS.

## ✨ Key Features

- **Dynamic Tax Harvesting Simulation**  
  Real-time computation engine that updates `Pre-Harvesting` and `After-Harvesting` realized and net capital gains immediately when you toggle specific holdings. 

- **Interactive Holdings Ledger**  
  Granular selection controls to include/exclude assets like Bitcoin, Ethereum, and Tether from your harvesting simulation. By default, it displays a concise summary of the top 5 assets with a smooth `View all / Show less` expandable list.

- **Intelligent Tri-state Sorting**  
  Clickable table headers offering immediate Ascending, Descending, and Default restorable sorting on both *Short-term* and *Long-term* columns, complete with `lucide-react` indicator arrows.

- **Pixel-Perfect Dark Mode Integration**  
  First-class native dark mode using `next-themes`. Colors are precisely mapped to standard hex tokens (`#0F1425`, `#161C2D`, `#2C3B6E`, `#1A254B`) to perfectly match the sleek, high-contrast production mockups.

- **Fluid Animations & Micro-interactions**  
  Features native smooth expanding/collapsing accordion drops for disclaimers using CSS grid transitions, and hover-activated informational tooltips.

- **Fully Responsive Architecture**   
  Fluidly adapts from ultra-wide desktop monitors down to mobile devices. It effortlessly converts grid metric cards to vertical stacks, incorporates a mobile hamburger menu, and secures the main ledger with accessible horizontal scrolling.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** [shadcn/ui](https://ui.shadcn.com/) primitives (Headless, accessible UI)
- **Icons:** Lucide React
- **Theming:** `next-themes` (Class-based strategy)

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the automatically redirecting Entry/Home page leading directly into the main Tax Harvesting board (`/koinX`).
