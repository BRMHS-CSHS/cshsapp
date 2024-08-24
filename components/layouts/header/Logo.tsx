import Image from "next/image";

import CSHSLogo from "../../../public/imgs/logo.webp";

export const Logo = (): React.ReactElement => (
    <Image
        src={CSHSLogo}
        alt="CSHS logo"
        width={undefined}
        height={32}
    />
);
