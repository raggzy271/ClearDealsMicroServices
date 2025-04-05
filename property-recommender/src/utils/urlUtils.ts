export function generatePropertyUrl(id: number, name: string, propertyCategory: 'residential' | 'commercial'): string {
    // Convert to lowercase and replace spaces with hyphens
    const slug = name.toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '');        // Trim - from end of text

    console.log(propertyCategory)
    return `https://www.cleardeals.co.in/${propertyCategory === 'commercial' ? 'commercial-' : ''}property-detail/${id}/${slug}/`;
}