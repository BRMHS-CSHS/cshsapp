"use client";

import React from "react";
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

export default function Header (): React.ReactElement {
    const pathname = usePathname();
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link href="/">
                    <Logo/>
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
                        input: "text-small border-0 focus:ring-0",
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
                            src="https://gravatar.com/avatar/5a92415df0af1d10efc32db2e3ed4762?size=256&cache=1724534655996"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem href="/profile" key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="admin_page" href="/admin">Admin Page</DropdownItem>
                        <DropdownItem key="settings" href="/settings">My Settings</DropdownItem>
                        <DropdownItem key="service_opp" href="/service">Service Opportunities</DropdownItem>
                        <DropdownItem key="service_hist" href="/service-history">Service History</DropdownItem>
                        <DropdownItem key="contact" href="/contact_page">Contact Society</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
