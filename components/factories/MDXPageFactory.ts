import { readdir } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

interface IOpts {
    path: string
}

interface IParams {}

export default function MDXPageFactory (args: IOpts) {
    return async function MDXPage ({ params }: { params: IParams }) {
        const files = await readdir(resolve(fileURLToPath(import.meta.url), `../../app/(cshs)/${args.path}/articles`), { withFileTypes: true });
    };
}
