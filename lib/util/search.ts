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
    },
    {
        name: "Typer",
        url: "/typer",
        description: "The Typer Game."
    },
    {
        name: "Leaderboard",
        url: "/typer/leaderboard",
        description: "The Typer Leaderboard."
    }
];

/**
 * @todo Add MDX articles here.
 */
export const SearchItems: SearchItem[] = {
    ...wikiPages
};
