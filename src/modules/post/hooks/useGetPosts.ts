// hooks/useGetPosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Post } from "@/utils/constant/types";
import { getAllPost } from "@/utils/api/post.api";

export function useGetPosts(limit = 10) {
  const query = useInfiniteQuery({
    queryKey: ["posts", limit],
    queryFn: ({ pageParam }) => getAllPost({ cursor: pageParam, limit }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  // dedupe by id — cheap insurance against any overlapping/duplicate page
  // fetch, regardless of what triggered it. useMemo so this only re-runs
  // when the underlying query data actually changes, not on every render.
  const posts: Post[] = useMemo(() => {
    const flat = query.data?.pages.flatMap((page) => page.items.flat()) ?? [];
    const seen = new Set<string>();
    return flat.filter((post) => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });
  }, [query.data]);

  return {
    posts,
    isLoadingPost: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    serverError: query.isError ? (query.error as Error) : null,
    refetchPosts: query.refetch,
  };
}