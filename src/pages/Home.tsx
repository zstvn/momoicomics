import { useEffect, useState } from 'react';
import { Comic } from '@/types/comic';
import { comicApi } from '@/services/api';
import { ComicGrid } from '@/components/ComicGrid';
import { Navbar } from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const [featuredComics, setFeaturedComics] = useState<Comic[]>([]);
  const [latestComics, setLatestComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComics = async () => {
      try {
        const [featured, latest] = await Promise.all([
          comicApi.getFeaturedComics(),
          comicApi.getLatestComics(10),
        ]);
        setFeaturedComics(featured);
        setLatestComics(latest);
      } catch (error) {
        console.error('Failed to load comics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[2/3] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/20 to-background py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Welcome to Momoi
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing comics from talented creators around the world
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Browse All Comics
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Comics */}
        {featuredComics.length > 0 && (
          <ComicGrid comics={featuredComics} title="Featured Comics" />
        )}

        {/* Latest Updates */}
        {latestComics.length > 0 && (
          <ComicGrid comics={latestComics} title="Latest Updates" />
        )}
      </div>
    </div>
  );
};
