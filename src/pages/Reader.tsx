import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Chapter, Page, Comic } from '@/types/comic';
import { chapterApi, pageApi, comicApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronLeft, ZoomIn, ZoomOut, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export const Reader = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();
  
  const [comic, setComic] = useState<Comic | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapter = async () => {
      if (!id || !chapterId) return;
      try {
        const [comicData, chapterData, pagesData, chaptersData] = await Promise.all([
          comicApi.getComic(id),
          chapterApi.getChapter(chapterId),
          pageApi.getPages(chapterId),
          chapterApi.getChapters(id),
        ]);
        setComic(comicData);
        setChapter(chapterData);
        setPages(pagesData);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Failed to load chapter:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [id, chapterId]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pages.length]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      nextChapter();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      prevChapter();
    }
  };

  const nextChapter = () => {
    if (!chapter) return;
    const currentIndex = chapters.findIndex(ch => ch.id === chapter.id);
    if (currentIndex < chapters.length - 1) {
      const next = chapters[currentIndex + 1];
      navigate(`/comic/${id}/chapter/${next.id}`);
    }
  };

  const prevChapter = () => {
    if (!chapter) return;
    const currentIndex = chapters.findIndex(ch => ch.id === chapter.id);
    if (currentIndex > 0) {
      const prev = chapters[currentIndex - 1];
      navigate(`/comic/${id}/chapter/${prev.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!chapter || !pages.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Controls */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b transition-transform duration-300',
          showControls ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/comic/${id}`}>
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h2 className="font-semibold text-sm">{comic?.title}</h2>
              <p className="text-xs text-muted-foreground">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'single' ? 'continuous' : 'single')}
            >
              {viewMode === 'single' ? 'Single' : 'Scroll'}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[3rem] text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Reader Area */}
      <div
        className="pt-16 pb-20 min-h-screen flex items-center justify-center"
        onClick={() => setShowControls(!showControls)}
      >
        {viewMode === 'single' ? (
          <div className="relative max-w-4xl mx-auto px-4">
            <img
              src={pages[currentPage].imageUrl}
              alt={`Page ${currentPage + 1}`}
              className="w-full h-auto rounded-lg"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            {pages.map((page, index) => (
              <img
                key={page.id}
                src={page.imageUrl}
                alt={`Page ${index + 1}`}
                className="w-full h-auto rounded-lg"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t transition-transform duration-300',
          showControls ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevPage} disabled={currentPage === 0 && chapters.findIndex(ch => ch.id === chapter.id) === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {viewMode === 'single' && (
              <div className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {pages.length}
              </div>
            )}

            <Button variant="outline" onClick={nextPage} disabled={currentPage === pages.length - 1 && chapters.findIndex(ch => ch.id === chapter.id) === chapters.length - 1}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
