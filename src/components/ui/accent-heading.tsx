export function AccentHeading({
  text,
  accentWords = [],
  className = "heading-xl",
  as: Tag = "h1",
}: {
  text: string;
  accentWords?: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  if (!accentWords.length) {
    return <Tag className={className}>{text}</Tag>;
  }

  const pattern = new RegExp(
    `\\b(${accentWords.map(escapeRegExp).join("|")})\\b`,
    "gi",
  );
  const parts = text.split(pattern);
  const accentSet = new Set(accentWords.map((word) => word.toLowerCase()));

  return (
    <Tag className={className}>
      {parts.map((part, index) =>
        accentSet.has(part.toLowerCase()) ? (
          <span
            key={`${part}-${index}`}
            className="mx-1.5 my-1 inline-block rounded-md bg-white px-2.5 py-1 text-brand-purple shadow-sm first:ml-0 last:mr-0 sm:mx-2 sm:px-3"
          >
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </Tag>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
