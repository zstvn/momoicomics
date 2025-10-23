import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { comicApi } from '@/services/api';
import { Comic } from '@/types/comic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, BarChart } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const AdminDashboard = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    try {
      const data = await comicApi.getComics();
      setComics(data);
    } catch (error) {
      console.error('Failed to load comics:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalComics: comics.length,
    ongoingComics: comics.filter(c => c.status === 'ongoing').length,
    completedComics: comics.filter(c => c.status === 'completed').length,
    featuredComics: comics.filter(c => c.isFeatured).length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <Button asChild>
            <Link to="/admin/comics/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Comic
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Comics</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalComics}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ongoingComics}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedComics}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.featuredComics}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Comics</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : comics.length > 0 ? (
              <div className="space-y-2">
                {comics.slice(0, 5).map((comic) => (
                  <Link
                    key={comic.id}
                    to={`/admin/comics/${comic.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={comic.coverImage} alt={comic.title} className="w-12 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-medium text-card-foreground">{comic.title}</h3>
                        <p className="text-sm text-muted-foreground">{comic.author}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{comic.status}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No comics yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
