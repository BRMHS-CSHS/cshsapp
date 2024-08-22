import { readdir } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

interface IOpts {
    path: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IParams {}

export default function MDXPageFactory (args: IOpts) {
    return async function MDXPage ({ params }: { params: IParams }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const files = await readdir(resolve(fileURLToPath(import.meta.url), `../../app/(cshs)/${args.path}/articles`), { withFileTypes: true });
    };
}
