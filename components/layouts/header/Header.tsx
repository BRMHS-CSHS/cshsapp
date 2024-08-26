"use client";

import { usePathname } from "next/navigation";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import { Search } from "lucide-react";

import { Logo } from "./Logo";

import { wikiPages } from "@/lib/util/search";
import { useSession } from "next-auth/react";

export default function Header (): React.ReactElement {
    const pathname = usePathname();
    const session = useSession();
    return (
        <header>
            <Navbar isBordered maxWidth="2xl">
                <NavbarContent justify="start">
                    <NavbarBrand className="mr-4">
                        <Link href="/">
                            <Logo />
                            <p className="hidden sm:block ml-2 font-bold text-white">CSHS</p>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-3">
                        {wikiPages.map(page => (
                            <NavbarItem key={page.url} isActive={page.url === pathname}>
                                {page.url === pathname
                                    ? (<Link href={page.url} aria-current="page" color="primary">{page.name}</Link>)
                                    : (<Link href={page.url} color="foreground">{page.name}</Link>)}
                            </NavbarItem>
                        ))}
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<Search size={18} />}
                        type="search"
                    />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="primary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pinimg.com/736x/61/f7/5e/61f75ea9a680def2ed1c6929fe75aeee.jpg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem
                                href="/login"
                                key="profile"
                                className="h-14 gap-2"
                                color="success"
                            >
                                <p className="font-semibold">Sign In</p>
                                <p className="font-semibold">{session.data?.user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="admin_page" href="/admin">Admin Page</DropdownItem>
                            <DropdownItem key="settings" href="/settings" color="warning">My Settings</DropdownItem>
                            <DropdownItem key="service_opp" href="/service" color="success">Service Opportunities</DropdownItem>
                            <DropdownItem key="service_hist" href="/service-history" color="success">Service History</DropdownItem>
                            <DropdownItem key="contact" href="/contact_page" color="warning">Contact Society</DropdownItem>
                            <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </header>
    );
}
