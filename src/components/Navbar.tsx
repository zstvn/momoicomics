import { Link } from 'react-router-dom';
import { Search, BookOpen, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Momoi</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
