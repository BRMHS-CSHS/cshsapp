"use client";

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote";
import { HTMLProps } from "react";

import Link from "@/components/links/Link";

const components = {
    Link,
    a: (props: HTMLProps<HTMLAnchorElement>) => (<Link href={props.href ?? "https://example.com"}>{props.children}</Link>)
};

export default function MDXClient (props: MDXRemoteProps): React.ReactElement<MDXRemoteProps, typeof MDXRemote> {
    return <MDXRemote {...props} components={components} />;
}
