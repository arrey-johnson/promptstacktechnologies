/**
 * Subtle label for development/preview builds only.
 * Prevents placeholder Work/Insights from being mistaken for real proof.
 */
export function DevelopmentPreviewLabel({
  noun = "case study",
}: {
  noun?: string;
}) {
  return (
    <p className="mb-3 text-xs font-medium tracking-wide text-text-muted">
      Development preview — replace with real {noun}
    </p>
  );
}
