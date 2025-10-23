import { Comic, Chapter, Page } from '@/types/comic';

// API Base URL - Update with your actual PHP backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.momoi.cc';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data || data;
}

// Helper function for API requests with credentials
async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}, requiresAuth = false): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    credentials: requiresAuth ? 'include' : 'omit', // Only include cookies for auth endpoints
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  return handleResponse<T>(response);
}

// Mock data for development (kept for fallback)
const mockComics: Comic[] = [
  {
    id: '1',
    title: 'Celestial Chronicles',
    synopsis: 'A tale of heroes rising to save their world from an ancient evil that threatens to consume everything.',
    coverImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop',
    author: 'Akira Tanaka',
    genres: ['Fantasy', 'Adventure', 'Action'],
    status: 'ongoing',
    isFeatured: true,
    isVisible: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-10-20',
  },
  {
    id: '2',
    title: 'Shadow Walker',
    synopsis: 'In a world where shadows come alive, one person must learn to control the darkness within.',
    coverImage: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop',
    author: 'Yuki Sato',
    genres: ['Mystery', 'Supernatural', 'Thriller'],
    status: 'ongoing',
    isFeatured: true,
    isVisible: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-10-18',
  },
  {
    id: '3',
    title: 'Digital Hearts',
    synopsis: 'A romantic comedy about finding love in the digital age, where virtual and reality blur.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    author: 'Hana Kim',
    genres: ['Romance', 'Comedy', 'Slice of Life'],
    status: 'completed',
    isFeatured: false,
    isVisible: true,
    createdAt: '2023-11-05',
    updatedAt: '2024-09-30',
  },
];

const mockChapters: Chapter[] = [
  { id: 'c1', comicId: '1', title: 'The Beginning', chapterNumber: 1, order: 1, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: 'c2', comicId: '1', title: 'First Steps', chapterNumber: 2, order: 2, createdAt: '2024-02-01', updatedAt: '2024-02-01' },
  { id: 'c3', comicId: '1', title: 'The Challenge', chapterNumber: 3, order: 3, createdAt: '2024-03-01', updatedAt: '2024-03-01' },
];

const mockPages: Page[] = [
  { id: 'p1', chapterId: 'c1', imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1200&fit=crop', pageNumber: 1, order: 1 },
  { id: 'p2', chapterId: 'c1', imageUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&h=1200&fit=crop', pageNumber: 2, order: 2 },
  { id: 'p3', chapterId: 'c1', imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1200&fit=crop', pageNumber: 3, order: 3 },
];

// API functions
export const comicApi = {
  // Get all comics with optional filters
  getComics: async (params?: { genre?: string; status?: string; search?: string; featured?: boolean }): Promise<Comic[]> => {
    const queryParams = new URLSearchParams();
    if (params?.genre) queryParams.append('genre', params.genre);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.featured) queryParams.append('featured', 'true');

    const query = queryParams.toString();
    return apiRequest<Comic[]>(`/comics/index.php${query ? `?${query}` : ''}`);
  },

  // Get single comic
  getComic: async (id: string): Promise<Comic> => {
    return apiRequest<Comic>(`/comics/get.php?id=${id}`);
  },

  // Get featured comics
  getFeaturedComics: async (limit = 10): Promise<Comic[]> => {
    return apiRequest<Comic[]>(`/comics/featured.php?limit=${limit}`);
  },

  // Get latest comics
  getLatestComics: async (limit = 10): Promise<Comic[]> => {
    return apiRequest<Comic[]>(`/comics/latest.php?limit=${limit}`);
  },

  // Create comic (admin)
  createComic: async (data: Omit<Comic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comic> => {
    return apiRequest<Comic>('/comics/create.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Update comic (admin)
  updateComic: async (id: string, data: Partial<Comic>): Promise<Comic> => {
    return apiRequest<Comic>(`/comics/update.php?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Delete comic (admin)
  deleteComic: async (id: string): Promise<void> => {
    await apiRequest<void>(`/comics/delete.php?id=${id}`, {
      method: 'POST',
    }, true); // Requires auth
  },
};

export const chapterApi = {
  // Get chapters for a comic
  getChapters: async (comicId: string): Promise<Chapter[]> => {
    return apiRequest<Chapter[]>(`/chapters/index.php?comic_id=${comicId}`);
  },

  // Get single chapter
  getChapter: async (id: string): Promise<Chapter> => {
    return apiRequest<Chapter>(`/chapters/get.php?id=${id}`);
  },

  // Create chapter (admin)
  createChapter: async (data: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Chapter> => {
    return apiRequest<Chapter>('/chapters/create.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Update chapter (admin)
  updateChapter: async (id: string, data: Partial<Chapter>): Promise<Chapter> => {
    return apiRequest<Chapter>(`/chapters/update.php?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Delete chapter (admin)
  deleteChapter: async (id: string): Promise<void> => {
    await apiRequest<void>(`/chapters/delete.php?id=${id}`, {
      method: 'POST',
    }, true); // Requires auth
  },
};

export const pageApi = {
  // Get pages for a chapter
  getPages: async (chapterId: string): Promise<Page[]> => {
    return apiRequest<Page[]>(`/pages/index.php?chapter_id=${chapterId}`);
  },

  // Create page (admin)
  createPage: async (data: Omit<Page, 'id'>): Promise<Page> => {
    return apiRequest<Page>('/pages/create.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Update page (admin)
  updatePage: async (id: string, data: Partial<Page>): Promise<Page> => {
    return apiRequest<Page>(`/pages/update.php?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, true); // Requires auth
  },

  // Delete page (admin)
  deletePage: async (id: string): Promise<void> => {
    await apiRequest<void>(`/pages/delete.php?id=${id}`, {
      method: 'POST',
    }, true); // Requires auth
  },

  // Upload page image (admin)
  uploadPageImage: async (file: File, type: 'comics' | 'pages' = 'pages'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const result = await handleResponse<{ url: string }>(response);
    return result.url;
  },

  // Legacy methods for compatibility
  uploadPage: async (data: Omit<Page, 'id'>): Promise<Page> => {
    return pageApi.createPage(data);
  },

  reorderPages: async (chapterId: string, pageIds: string[]): Promise<void> => {
    // Implement batch update if needed
    console.warn('reorderPages not yet implemented in backend');
  },
};

// Auth API
export const authApi = {
  // Login
  login: async (username: string, password: string): Promise<{ token: string; user: any }> => {
    return apiRequest<{ token: string; user: any }>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }, true); // Requires auth
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiRequest<void>('/auth/logout.php', {
      method: 'POST',
    }, true); // Requires auth
  },

  // Verify session
  verify: async (): Promise<{ isAdmin: boolean; user: any }> => {
    try {
      return await apiRequest<{ isAdmin: boolean; user: any }>('/auth/verify.php', {}, true);
    } catch (error) {
      // 401 is expected when not logged in, return false instead of throwing
      return { isAdmin: false, user: null };
    }
  },
};

// Upload API
export const uploadApi = {
  uploadImage: async (file: File, type: 'comics' | 'pages' = 'comics'): Promise<string> => {
    return pageApi.uploadPageImage(file, type);
  },
};
