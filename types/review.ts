export interface Review {
  id: string;
  tourId: string;
  reviewer: {
    displayName: string;
    country?: string;
    avatar?: string;
    verified: boolean;
  };
  rating: 1 | 2 | 3 | 4 | 5;
  title: Record<string, string>;
  content: Record<string, string>;
  language: string;
  visitDate: string;
  createdAt: string;
  response?: {
    content: Record<string, string>;
    respondedAt: string;
  };
}
