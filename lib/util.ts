
export const sanitizeString = (input: string) => {
    return input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")         // replace spaces with hyphens
        .replace(/[^a-z0-9\-\.]/g, "") // keep alphanumerics, hyphens, and dots
        .replace(/-+/g, "-");          // collapse multiple hyphens
};