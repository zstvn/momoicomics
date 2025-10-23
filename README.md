# 🎨 Momoi Comics - Frontend# Welcome to your Lovable project



A modern, beautiful web comic reader built with React, TypeScript, and Tailwind CSS.## Project info



![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)**URL**: https://lovable.dev/projects/95067423-d014-4383-a08c-3dfe087cc80c

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)

![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)## How can I edit this code?

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

There are several ways of editing your application.

## ✨ Features

**Use Lovable**

- 📚 **Comic Library** - Browse and discover comics with beautiful card layouts

- 🔍 **Search & Filter** - Find comics by title, author, genre, or statusSimply visit the [Lovable Project](https://lovable.dev/projects/95067423-d014-4383-a08c-3dfe087cc80c) and start prompting.

- 📖 **Smooth Reader** - Optimized reading experience with page navigation

- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable readingChanges made via Lovable will be committed automatically to this repo.

- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile

- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times**Use your preferred IDE**

- 🎨 **Beautiful UI** - Modern design with Radix UI components

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

## 🚀 Quick Start

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Prerequisites

Follow these steps:

- Node.js 16+ and npm

```sh

### Installation# Step 1: Clone the repository using the project's Git URL.

git clone <YOUR_GIT_URL>

1. **Clone the repository**

   ```bash# Step 2: Navigate to the project directory.

   git clone https://github.com/zstvn/momoicomics.gitcd <YOUR_PROJECT_NAME>

   cd momoicomics

   ```# Step 3: Install the necessary dependencies.

npm i

2. **Install dependencies**

   ```bash# Step 4: Start the development server with auto-reloading and an instant preview.

   npm installnpm run dev

   ``````



3. **Configure API URL****Edit a file directly in GitHub**

   

   Create a `.env` file in the root directory:- Navigate to the desired file(s).

   ```env- Click the "Edit" button (pencil icon) at the top right of the file view.

   VITE_API_URL=https://api.momoi.cc- Make your changes and commit the changes.

   ```

   **Use GitHub Codespaces**

   Replace `https://api.momoi.cc` with your actual API endpoint.

- Navigate to the main page of your repository.

4. **Start development server**- Click on the "Code" button (green button) near the top right.

   ```bash- Select the "Codespaces" tab.

   npm run dev- Click on "New codespace" to launch a new Codespace environment.

   ```- Edit files directly within the Codespace and commit and push your changes once you're done.

   

   Open [http://localhost:8080](http://localhost:8080) in your browser.## What technologies are used for this project?



## 🏗️ Build for ProductionThis project is built with:



```bash- Vite

npm run build- TypeScript

```- React

- shadcn-ui

The built files will be in the `dist/` directory, ready to deploy.- Tailwind CSS



## 📦 Project Structure## How can I deploy this project?



```Simply open [Lovable](https://lovable.dev/projects/95067423-d014-4383-a08c-3dfe087cc80c) and click on Share -> Publish.

src/

├── components/          # Reusable UI components## Can I connect a custom domain to my Lovable project?

│   ├── ui/             # Base UI components (buttons, cards, etc.)

│   ├── ComicCard.tsx   # Comic display cardYes, you can!

│   ├── ComicGrid.tsx   # Grid layout for comics

│   ├── Navbar.tsx      # Navigation barTo connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

│   └── ThemeToggle.tsx # Dark/light mode toggle

├── pages/              # Page componentsRead more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

│   ├── Home.tsx        # Homepage with featured comics
│   ├── ComicDetail.tsx # Comic details and chapters
│   ├── Reader.tsx      # Comic reading interface
│   ├── Search.tsx      # Search and browse page
│   └── admin/          # Admin panel pages
├── services/           # API integration
│   └── api.ts          # API client functions
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript type definitions
│   └── comic.ts        # Comic, Chapter, Page types
├── App.tsx             # Main app component
└── main.tsx           # Entry point
```

## 🛠️ Tech Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **shadcn/ui** - Pre-built components

### State & Data
- **React Query** - Server state management
- **Context API** - Global state management

## 🎨 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run build:dev    # Build with development mode

# Quality
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🔧 Configuration

### API Configuration

The app connects to a REST API backend. Configure the API URL in your `.env` file:

```env
VITE_API_URL=https://your-api-domain.com
```

### Required API Endpoints

The frontend expects these endpoints:

- `GET /comics/index.php` - List all comics
- `GET /comics/featured.php` - Featured comics
- `GET /comics/latest.php` - Latest updates
- `GET /comics/get.php?id={id}` - Comic details
- `GET /chapters/index.php?comic_id={id}` - Chapters list
- `GET /pages/index.php?chapter_id={id}` - Chapter pages
- `POST /auth/login.php` - Admin login

## 🎯 Features Roadmap

- [ ] User accounts and reading history
- [ ] Bookmarks and favorites
- [ ] Reading progress tracking
- [ ] Comments and ratings
- [ ] Recommendations engine
- [ ] Offline reading support (PWA)
- [ ] Multiple language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for beautiful component designs
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub

---

Made with ❤️ for comic lovers everywhere
