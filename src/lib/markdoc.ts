export function getHeadingText(node: any): string {
  if (!node) return "";
  if (node.attributes?.content) return node.attributes.content;
  if (Array.isArray(node.children)) {
    return node.children.map(getHeadingText).join("");
  }
  return "";
}

export function extractTableOfContents(
  contentNode: any
): { id: string; title: string; level: number }[] {
  if (!contentNode) return [];
  const ast = contentNode.node || contentNode;
  const items: { id: string; title: string; level: number }[] = [];

  if (typeof ast.walk === "function") {
    for (const child of ast.walk()) {
      if (
        child.type === "heading" &&
        (child.attributes?.level === 2 || child.attributes?.level === 3)
      ) {
        const title = getHeadingText(child);
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        if (title) {
          items.push({ id, title, level: child.attributes.level });
        }
      }
    }
  }

  return items;
}
