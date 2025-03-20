'use client';
import { useEffect, useRef, useState, ReactNode } from "react";

export function Clipper({
	children,
	className
}: {
	children: ReactNode;
	className?: string;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const outerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1
			}
		);

		if (outerRef.current) {
			observer.observe(outerRef.current);
		}

		return () => {
			if (outerRef.current) {
				observer.unobserve(outerRef.current);
			}
		};
	}, []);

	return (
		<div ref={outerRef} className={className}>
			{isVisible ? children : null}
		</div>
	);
}
