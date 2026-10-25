export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-text focus:shadow-lg focus:outline focus:outline-2 focus:outline-text"
    >
      Skip to content
    </a>
  );
}
