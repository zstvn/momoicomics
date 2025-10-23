import { Comic } from '@/types/comic';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ComicCardProps {
  comic: Comic;
}

export const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  return (
    <Link to={`/comic/${comic.id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:scale-105">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={comic.coverImage}
            alt={comic.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-card-foreground line-clamp-1 mb-2">
            {comic.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {comic.synopsis}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {comic.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{comic.author}</span>
            <Badge variant={comic.status === 'ongoing' ? 'default' : 'outline'}>
              {comic.status}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};
