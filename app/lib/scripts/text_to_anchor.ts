export function textToAnchor(text: string): string {
    return text
        .replaceAll(/&+/g, "and")
        .replaceAll(/[_\s,.;:!"£$%/()=?^'']+/g, "-")
        .replace(/-$/, "")
        .replace(/^-/, "")
        .toLowerCase()
}
