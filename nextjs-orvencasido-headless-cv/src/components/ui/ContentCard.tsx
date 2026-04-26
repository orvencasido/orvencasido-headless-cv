import Link from "next/link";

interface ContentCardProps {
  image?: string | null;
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  tags?: string[];
  children?: React.ReactNode;
  titleHref?: string;
}

export const ContentCard = ({
  image,
  title,
  subtitle,
  badge,
  description,
  tags,
  children,
  titleHref,
}: ContentCardProps) => {


  return (
    <article className="group relative">
      <div className="flex flex-col gap-6">
        {image && (
          <div className="aspect-video overflow-hidden rounded-2xl border border-border/50 relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        )}

        <div className="flex flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-foreground transition-all">
              {titleHref ? (
                <Link
                  href={titleHref}
                  className="hover:underline hover:text-primary/80 transition-all"
                >
                  {title}
                </Link>
              ) : (
                <span className="group-hover:text-primary/80 transition-all">
                  {title}
                </span>
              )}
            </h3>
            {subtitle && (
              <p className="text-base md:text-lg font-bold text-foreground/70 uppercase tracking-widest text-[10px] md:text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {badge && (
            <span className="shrink-0 text-[10px] md:text-sm font-semibold tabular-nums text-muted-foreground bg-muted/50 px-2 md:px-3 py-1 rounded-full border border-border/50 whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>


        <div className="space-y-4">
          {description && (
            <p className="text-lg text-foreground/80 leading-relaxed font-normal text-justify">
              {description}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-muted/50 text-foreground text-xs font-bold rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-muted transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </article>

  );
};
