import { College, CollegeFilters } from '../types';
import { mockColleges } from '../data/colleges';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const collegeService = {
  getColleges: async (params?: {
    search?: string;
    filters?: Partial<CollegeFilters>;
    sortBy?: 'rating' | 'fees-asc' | 'fees-desc' | 'placement' | 'aiScore';
    page?: number;
    limit?: number;
  }) => {
    await delay(700); // Simulate network delay
    
    let result = [...mockColleges];
    
    // Search
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(searchLower) ||
             c.location.city.toLowerCase().includes(searchLower) ||
             c.location.state.toLowerCase().includes(searchLower) ||
             c.courses.some(course => course.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Filters
    if (params?.filters) {
      const { state, feesMax, ratingMin, courseType, placementMin } = params.filters;
      
      if (state && state !== 'All') {
        result = result.filter(c => c.location.state === state);
      }
      if (feesMax && feesMax > 0) {
        result = result.filter(c => c.fees <= feesMax);
      }
      if (ratingMin && ratingMin > 0) {
        result = result.filter(c => c.rating >= ratingMin);
      }
      if (courseType && courseType !== 'All') {
        result = result.filter(c => c.courses.some(course => course.type === courseType));
      }
      if (placementMin && placementMin > 0) {
        result = result.filter(c => c.placementPercentage >= placementMin);
      }
    }
    
    // Sort
    if (params?.sortBy) {
      const sort = params.sortBy;
      result.sort((a, b) => {
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'fees-asc') return a.fees - b.fees;
        if (sort === 'fees-desc') return b.fees - a.fees;
        if (sort === 'placement') return b.placementPercentage - a.placementPercentage;
        if (sort === 'aiScore') return b.aiScore - a.aiScore;
        return 0;
      });
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedItems = result.slice(startIndex, endIndex);
    const hasMore = endIndex < result.length;
    
    return {
      items: paginatedItems,
      total: result.length,
      hasMore,
      page
    };
  },
  
  getCollegeById: async (id: string): Promise<College | null> => {
    await delay(600);
    const college = mockColleges.find(c => c.id === id);
    return college || null;
  },
  
  compareColleges: async (ids: string[]): Promise<College[]> => {
    await delay(800);
    return mockColleges.filter(c => ids.includes(c.id));
  }
};
export type SortOption = 'rating' | 'fees-asc' | 'fees-desc' | 'placement' | 'aiScore';
