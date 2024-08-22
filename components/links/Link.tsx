import Link, { LinkProps } from "next/link";

type Props = LinkProps & React.PropsWithChildren & Partial<{ target: string, className: string, unstyled: boolean }>;

export default function URLLink (props: Props): React.ReactElement<Props, typeof Link> {
    const { unstyled, ...passProps } = props;
    return (
        <Link
            {...passProps}
            className={
                unstyled
                    ? props.className
                    : `${props.className} tw-text-hyperlink tw-no-underline hover:tw-underline`
            }
        />
    );
}
