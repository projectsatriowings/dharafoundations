/**
 * Generates a URL-safe slug from a title string.
 * e.g. "Dhara Divine Awards 2026" → "dhara-divine-awards-2026"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove non-word characters (except hyphens)
    .replace(/\-\-+/g, '-')     // Replace multiple hyphens with single
    .replace(/^-+/, '')          // Trim leading hyphens
    .replace(/-+$/, '');         // Trim trailing hyphens
}
