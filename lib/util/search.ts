export interface SearchItem {
    name: string
    image?: string
    url: string
    description?: string
}

export const wikiPages: SearchItem[] = [
    {
        name: "Home",
        url: "/",
        description: "The homepage."
    },
    {
        name: "Dashboard",
        url: "/dashboard",
        description: "The dashboard."
    }
];

/**
 * @todo Add MDX articles here.
 */
export const SearchItems: SearchItem[] = {
    ...wikiPages
};
