import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { comicApi } from '@/services/api';
import { Comic } from '@/types/comic';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ComicForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [comic, setComic] = useState<Partial<Comic>>({
    title: '',
    synopsis: '',
    coverImage: '',
    author: '',
    genres: [],
    status: 'ongoing',
    isFeatured: false,
    isVisible: true,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadComic();
    }
  }, [id]);

  const loadComic = async () => {
    if (!id || id === 'new') return;
    try {
      const data = await comicApi.getComic(id);
      setComic(data);
    } catch (error) {
      console.error('Failed to load comic:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id && id !== 'new') {
        await comicApi.updateComic(id, comic);
        toast({
          title: 'Success',
          description: 'Comic updated successfully',
        });
      } else {
        await comicApi.createComic(comic as Omit<Comic, 'id' | 'createdAt' | 'updatedAt'>);
        toast({
          title: 'Success',
          description: 'Comic created successfully',
        });
      }
      navigate('/admin/comics');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save comic',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (value: string) => {
    // Store the raw value, split only when needed
    const genres = value.split(',').map(g => g.trim()).filter(Boolean);
    // Update the comic state with both raw value and parsed genres
    setComic({ ...comic, genres });
  };

  const [genreInput, setGenreInput] = useState('');

  useEffect(() => {
    if (comic.genres) {
      setGenreInput(comic.genres.join(', '));
    }
  }, [comic.id]); // Only update when comic changes (for editing)

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          {id && id !== 'new' ? 'Edit Comic' : 'Add New Comic'}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Comic Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={comic.title}
                  onChange={(e) => setComic({ ...comic, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="synopsis">Synopsis</Label>
                <Textarea
                  id="synopsis"
                  value={comic.synopsis}
                  onChange={(e) => setComic({ ...comic, synopsis: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  type="url"
                  value={comic.coverImage}
                  onChange={(e) => setComic({ ...comic, coverImage: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={comic.author}
                  onChange={(e) => setComic({ ...comic, author: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genres">Genres (comma separated)</Label>
                <Input
                  id="genres"
                  value={genreInput}
                  onChange={(e) => {
                    setGenreInput(e.target.value);
                    handleGenreChange(e.target.value);
                  }}
                  placeholder="Fantasy, Adventure, Action"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={comic.status}
                  onValueChange={(value: 'ongoing' | 'completed') => setComic({ ...comic, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch
                  id="featured"
                  checked={comic.isFeatured}
                  onCheckedChange={(checked) => setComic({ ...comic, isFeatured: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="visible">Visible</Label>
                <Switch
                  id="visible"
                  checked={comic.isVisible}
                  onCheckedChange={(checked) => setComic({ ...comic, isVisible: checked })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Comic'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/comics')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
