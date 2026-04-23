"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface BlogPost {
  image?: string;
  category?: string;
  categoryColor?: string;
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  href?: string;
  icon?: ReactNode;
}

export interface BlogGridProps extends HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[];
  variant?: "grid" | "featured";
  columns?: number;
}

function BlogCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const Wrapper = post.href ? "a" : "div";

  return (
    <Wrapper
      {...(post.href ? { href: post.href } : {})}
      className={cn("flex flex-col overflow-hidden group", post.href && "no-underline")}
      style={{
        border: "1px solid var(--s-border)",
        borderStyle: "var(--s-border-style, solid)" as any,
        borderRadius: "var(--s-radius-md, 6px)",
        background: "var(--s-surface)",
        transition: `all var(--s-duration-fast, 150ms)`,
      }}
    >
      {post.image && (
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: large ? "16/10" : "16/9" }}
        >
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
            style={{ transitionDuration: "var(--s-duration-normal, 200ms)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--s-background) 0%, transparent 60%)", opacity: 0.6 }} />
          {post.category && (
            <span
              className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider font-[family:var(--s-font-mono)] px-2 py-0.5"
              style={{
                color: "var(--s-text)",
                background: "var(--s-surface)",
                border: "1px solid var(--s-border)",
              }}
            >
              {post.category}
            </span>
          )}
          {post.href && (
            <span
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-[11px]"
              style={{
                color: "var(--s-text-muted)",
                background: "var(--s-surface)",
                border: "1px solid var(--s-border)",
                borderRadius: "var(--s-radius-sm, 4px)",
              }}
            >
              &nearr;
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "var(--s-card-padding, 16px)" }}>
        <h3
          className={cn("font-semibold mb-1", large ? "text-lg" : "text-sm")}
          style={{ color: "var(--s-text)", lineHeight: 1.3 }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[13px] mb-3 line-clamp-2" style={{ color: "var(--s-text-muted)", lineHeight: 1.5 }}>
            {post.excerpt}
          </p>
        )}
        {(post.author || post.date) && (
          <div className="flex items-center justify-between gap-2 text-[11px] font-[family:var(--s-font-mono)]" style={{ color: "var(--s-text-subtle)" }}>
            {post.author && <span className="truncate min-w-0">{post.author}</span>}
            {post.date && <span className="tabular-nums shrink-0">{post.date}</span>}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export const BlogGrid = forwardRef<HTMLDivElement, BlogGridProps>(
  function BlogGrid({ posts, variant = "grid", columns = 3, className, ...rest }, ref) {
    if (variant === "featured" && posts.length >= 3) {
      return (
        <div
          ref={ref}
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}
          style={{ gridTemplateRows: undefined }}
          {...rest}
        >
          <div className="md:row-span-2">
            <BlogCard post={posts[0]!} large />
          </div>
          <BlogCard post={posts[1]!} />
          <BlogCard post={posts[2]!} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}
        {...rest}
      >
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    );
  },
);
