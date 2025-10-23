import { Comic } from '@/types/comic';
import { ComicCard } from './ComicCard';

interface ComicGridProps {
  comics: Comic[];
  title?: string;
}

export const ComicGrid: React.FC<ComicGridProps> = ({ comics, title }) => {
  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};
