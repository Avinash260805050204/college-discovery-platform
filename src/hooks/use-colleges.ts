import { useQuery } from '@tanstack/react-query';
import { collegeService, SortOption } from '../services/college.service';
import { CollegeFilters } from '../types';

export function useColleges(params: {
  search?: string;
  filters?: Partial<CollegeFilters>;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['colleges', params],
    queryFn: () => collegeService.getColleges(params),
  });
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => collegeService.getCollegeById(id),
    enabled: !!id,
  });
}
