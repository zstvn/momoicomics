import { useEffect, useState } from 'react';
import { Comic } from '@/types/comic';
import { comicApi } from '@/services/api';
import { ComicGrid } from '@/components/ComicGrid';
import { Navbar } from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon } from 'lucide-react';

const GENRES = ['Fantasy', 'Adventure', 'Action', 'Romance', 'Comedy', 'Mystery', 'Supernatural', 'Thriller', 'Slice of Life'];

export const Search = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComics();
  }, [selectedGenre, selectedStatus]);

  const loadComics = async () => {
    setLoading(true);
    try {
      const data = await comicApi.getComics({
        genre: selectedGenre || undefined,
        status: selectedStatus || undefined,
      });
      setComics(data);
    } catch (error) {
      console.error('Failed to load comics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await comicApi.getComics({
        search: searchTerm,
        genre: selectedGenre || undefined,
        status: selectedStatus || undefined,
      });
      setComics(data);
    } catch (error) {
      console.error('Failed to search comics:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComics = comics.filter((comic) =>
    searchTerm ? comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comic.author.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Browse Comics</h1>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Genres</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedGenre === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedGenre(null)}
              >
                All
              </Badge>
              {GENRES.map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Status</h3>
            <div className="flex gap-2">
              <Badge
                variant={selectedStatus === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus(null)}
              >
                All
              </Badge>
              <Badge
                variant={selectedStatus === 'ongoing' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus('ongoing')}
              >
                Ongoing
              </Badge>
              <Badge
                variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus('completed')}
              >
                Completed
              </Badge>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : filteredComics.length > 0 ? (
          <ComicGrid comics={filteredComics} />
        ) : (
          <p className="text-center text-muted-foreground py-12">No comics found</p>
        )}
      </div>
    </div>
  );
};
