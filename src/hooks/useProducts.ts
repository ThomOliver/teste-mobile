import { useInfiniteQuery } from '@tanstack/react-query';

import { getProducts } from '../services/products';

interface Props {
  search: string;
  category: string;
  maxPrice?: number;
}

export function useProducts({
  search,
  category,
  maxPrice,
}: Props) {
  return useInfiniteQuery({
    queryKey: [
      'products',
      search,
      category,
      maxPrice,
    ],

    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        search,
        category,
        maxPrice,
        skip: pageParam,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      const nextSkip =
        pages.length * 10;

      if (nextSkip >= lastPage.total) {
        return undefined;
      }

      return nextSkip;
    },
  });
}