import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Comic, Chapter } from '@/types/comic';
import { comicApi, chapterApi } from '@/services/api';
import { Navbar } from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const ComicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComic = async () => {
      if (!id) return;
      try {
        const [comicData, chaptersData] = await Promise.all([
          comicApi.getComic(id),
          chapterApi.getChapters(id),
        ]);
        setComic(comicData);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Failed to load comic:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComic();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <Skeleton className="aspect-[2/3] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Comic not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="grid md:grid-cols-[300px,1fr] gap-8 mb-12">
          {/* Cover Image */}
          <div className="rounded-lg overflow-hidden border">
            <img
              src={comic.coverImage}
              alt={comic.title}
              className="w-full h-auto"
            />
          </div>

          {/* Comic Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {comic.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {comic.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
              <Badge variant={comic.status === 'ongoing' ? 'default' : 'outline'}>
                {comic.status}
              </Badge>
            </div>

            <div className="space-y-4 text-muted-foreground mb-6">
              <p><span className="font-semibold text-foreground">Author:</span> {comic.author}</p>
              <p className="text-foreground leading-relaxed">{comic.synopsis}</p>
            </div>

            {chapters.length > 0 && (
              <Button asChild size="lg">
                <Link to={`/comic/${comic.id}/chapter/${chapters[0].id}`}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Reading
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Chapters List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Chapters</h2>
          <div className="grid gap-2">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/comic/${comic.id}/chapter/${chapter.id}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div>
                  <h3 className="font-medium text-card-foreground">
                    Chapter {chapter.chapterNumber}: {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(chapter.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <ArrowLeft className="h-5 w-5 rotate-180 text-muted-foreground" />
              </Link>
            ))}
            {chapters.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No chapters available yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
