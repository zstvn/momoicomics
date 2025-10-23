export interface Comic {
  id: string;
  title: string;
  synopsis: string;
  coverImage: string;
  author: string;
  genres: string[];
  status: 'ongoing' | 'completed';
  isFeatured: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  comicId: string;
  title: string;
  chapterNumber: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  chapterId: string;
  imageUrl: string;
  pageNumber: number;
  order: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
