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
  imageAspectRatio?: string;
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
  imageAspectRatio = "aspect-[21/9] sm:aspect-[3/1]",
}: ContentCardProps) => {


  return (
    <article className="group relative">
      <div className="flex flex-col gap-6">
        {image && (
          <div className={`${imageAspectRatio} overflow-hidden rounded-2xl border border-border/50 relative`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        )}

        <div className="flex flex-row items-baseline justify-between gap-4">
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
            <span className="shrink-0 text-[10px] md:text-sm font-semibold tabular-nums text-foreground whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>


        <div className="space-y-4">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-muted/100 text-foreground text-xs font-bold rounded-xl border border-border/50 hover:border-foreground/20 hover:bg-muted transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {description && (
            <p className="text-base text-foreground/80 leading-relaxed font-normal text-justify">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </article>

  );
};
