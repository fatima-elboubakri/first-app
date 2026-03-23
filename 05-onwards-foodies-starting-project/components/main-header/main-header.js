'use client'

import logo from "@/assets/logo.png";
import Link from "next/link";
import classes from "./main-header.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MainHeader() {
    const path = usePathname();
    return <header className={classes.header}>
        <Link href="/" className={classes.logo} >
            <Image src={logo} alt="a plat with food on it" />
            Nextlevel Food
        </Link>
        <nav className={classes.nav}>
            <ul>
                <li><Link href="/meals" className={path.startsWith("/meals") ? classes.active : undefined}>Browse Meals</Link></li>
                <li><Link href="/community" className={path.startsWith("/community") ? classes.active : undefined}>Foodies Community</Link></li>
            </ul>
        </nav>
    </header>
}