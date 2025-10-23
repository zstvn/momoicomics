import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { comicApi } from '@/services/api';
import { Comic } from '@/types/comic';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ComicList = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await comicApi.deleteComic(deleteId);
      setComics(comics.filter(c => c.id !== deleteId));
      toast({
        title: 'Success',
        description: 'Comic deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete comic',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await comicApi.updateComic(id, { isFeatured: !currentStatus });
      setComics(comics.map(c => c.id === id ? { ...c, isFeatured: !currentStatus } : c));
      toast({
        title: 'Success',
        description: 'Comic updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update comic',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Comics</h1>
          <Button asChild>
            <Link to="/admin/comics/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Comic
            </Link>
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comics.map((comic) => (
                  <TableRow key={comic.id}>
                    <TableCell>
                      <img src={comic.coverImage} alt={comic.title} className="w-12 h-16 object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{comic.title}</TableCell>
                    <TableCell>{comic.author}</TableCell>
                    <TableCell>
                      <Badge variant={comic.status === 'ongoing' ? 'default' : 'outline'}>
                        {comic.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={comic.isFeatured ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFeatured(comic.id, comic.isFeatured)}
                      >
                        {comic.isFeatured ? 'Yes' : 'No'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant={comic.isVisible ? 'default' : 'secondary'}>
                        {comic.isVisible ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/comics/${comic.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(comic.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comic and all its chapters.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};
