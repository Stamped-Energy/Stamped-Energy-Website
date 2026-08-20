"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

type BlogCatalogProps = {
  initialPosts: BlogPostListItem[];
  initialHasMore: boolean;
  initialPage: number;
  /** From URL ?search= so WebSite SearchAction lands on a working catalog. */
  initialSearch?: string;
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function BlogCatalog({
  initialPosts,
  initialHasMore,
  initialPage,
  initialSearch = "",
}: BlogCatalogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const hydratedSearchRef = useRef(false);
  const { isReady, prefersReducedMotion } = useMotion();

  const fetchPosts = useCallback(
    async (options: { page: number; category: string; search: string; append: boolean }) => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const params = new URLSearchParams({
          page: String(options.page),
          limit: "6",
          category: options.category,
        });
        if (options.search.trim()) {
          params.set("search", options.search.trim());
        }

        const response = await fetch(`/api/blog/posts?${params.toString()}`);
        const json = (await response.json()) as {
          success: boolean;
          data?: {
            posts: BlogPostListItem[];
            pagination: { hasMore: boolean; page: number };
          };
        };

        if (!response.ok || !json.success || !json.data) {
          setFetchError("Could not load articles. Please try again.");
          return;
        }

        setPosts((current) =>
          options.append ? [...current, ...json.data!.posts] : json.data!.posts,
        );
        setHasMore(json.data.pagination.hasMore);
        setPage(json.data.pagination.page);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (hydratedSearchRef.current || !initialSearch.trim()) {
      return;
    }
    hydratedSearchRef.current = true;
    void fetchPosts({
      page: 1,
      category: "all",
      search: initialSearch,
      append: false,
    });
  }, [fetchPosts, initialSearch]);

  const handleCategoryChange = async (categoryId: string) => {
    setActiveCategory(categoryId);
    await fetchPosts({ page: 1, category: categoryId, search, append: false });
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchPosts({ page: 1, category: activeCategory, search, append: false });
  };

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-blog-catalog-item]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion, posts.length, activeCategory] },
  );

  const filterButtonClass = (isActive: boolean) =>
    cn(
      "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors md:px-4 md:py-2 md:text-sm",
      isActive
        ? "border-secondary bg-secondary text-on-secondary"
        : "border-outline-variant/60 bg-surface-lowest text-on-surface-variant hover:border-outline-variant hover:text-on-surface",
    );

  return (
    <section
      id="blog-catalog"
      ref={sectionRef}
      className="scroll-mt-20 bg-surface-low py-8 md:section-y"
    >
      <Container>
        <div data-blog-catalog>
          <div className="border-b border-outline-variant/40 pb-5 md:pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              All articles
            </p>
            <h2 className="mt-1 text-lg font-bold text-on-surface md:text-xl">
              Browse by topic
            </h2>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-5 flex gap-2 md:mt-6"
            role="search"
          >
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              className="h-11 min-w-0 flex-1 rounded-xl border border-outline-variant/60 bg-surface-lowest px-4 text-sm text-on-surface outline-none ring-primary/30 placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-2"
            />
            <Button
              type="submit"
              variant="outline"
              className="h-11 w-11 shrink-0 px-0 sm:h-12 sm:w-auto sm:px-5"
              disabled={isLoading}
              aria-label="Search articles"
            >
              <SearchIcon className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>

          <div className="relative mt-4 md:mt-5">
            <div
              className="scroll-row -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:flex md:flex-wrap md:justify-center md:overflow-visible md:px-0"
              role="tablist"
              aria-label="Filter blog posts"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === "all"}
                onClick={() => handleCategoryChange("all")}
                className={filterButtonClass(activeCategory === "all")}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={filterButtonClass(activeCategory === category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:gap-5 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} dataAttr="data-blog-catalog-item" />
          ))}
        </div>

        {fetchError ? (
          <p className="mt-8 text-center text-sm text-error md:mt-10" role="alert">
            {fetchError}
          </p>
        ) : null}

        {!fetchError && posts.length === 0 ? (
          <p className="mt-8 text-center text-sm text-on-surface-variant md:mt-10">
            No articles found. Try another filter or search term.
          </p>
        ) : null}

        {hasMore ? (
          <div className="mt-6 flex justify-center md:mt-8">
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() =>
                fetchPosts({
                  page: page + 1,
                  category: activeCategory,
                  search,
                  append: true,
                })
              }
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
