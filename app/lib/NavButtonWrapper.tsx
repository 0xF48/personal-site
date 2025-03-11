"use client";
import dynamic from "next/dynamic";

const NavButton = dynamic(() => import("./NavButton").then(mod => mod.NavButton), {
	ssr: false // Disable SSR for this component
});

export function NavButtonWrapper() {
	return <NavButton />;
}