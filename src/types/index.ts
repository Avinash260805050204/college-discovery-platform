export interface Course {
  name: string;
  duration: string;
  fees: number; // yearly fees
  type: 'Engineering' | 'Management' | 'Science' | 'Arts' | 'Medical';
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PlacementStats {
  averagePackage: string; // e.g. "8.5 LPA"
  highestPackage: string; // e.g. "45 LPA"
  placementPercentage: number; // e.g. 92
  topRecruiters: string[];
}

export interface College {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  fees: number; // average yearly fees
  rating: number; // out of 5
  placementPercentage: number;
  aiScore: number; // Compatibility out of 100
  logoUrl?: string;
  bannerUrl?: string;
  overview: string;
  courses: Course[];
  placementDetails: PlacementStats;
  reviews: Review[];
  facilities: string[];
  establishedYear: number;
}

export interface CollegeFilters {
  state: string;
  feesMax: number;
  ratingMin: number;
  courseType: string;
  placementMin: number;
}

export interface UserSession {
  user: {
    username: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}
