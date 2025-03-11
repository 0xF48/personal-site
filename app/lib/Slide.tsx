"use client";


import { useEffect, useRef, useState } from "react";
import cn from 'classnames'
// const SlideVisibilityContext = createContext<{ isVisible: boolean }>({ isVisible: true });
const STOP_RENDER_DELAY = 3000
export function Slide({ useOuterRef, className, offset, children, outerChildren }: { useOuterRef?: any, outerChildren?: any, offset?: string, children: any, className: string }) {
	const [isVisible, setIsVisible] = useState(true);
	const [renderChildren, setRenderChildren] = useState(false);
	const slideRef = useOuterRef || useRef<HTMLDivElement>(null);

	// const { isVisible: isContextVisible } = useContext(SlideVisibilityContext);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: slideRef.current?.parentElement?.parentElement,
				threshold: 0.1,
			}
		);

		if (slideRef.current) {
			observer.observe(slideRef.current);
		}

		return () => {
			if (slideRef.current) {
				observer.unobserve(slideRef.current);
			}
		};
	}, [offset]);


	useEffect(() => {
		if (!isVisible) {
			let timer = setTimeout(() => {
				setRenderChildren(isVisible)
			}, STOP_RENDER_DELAY)
			return () => {
				clearTimeout(timer)
			}
		}

		if (isVisible) {
			setRenderChildren(true)
		}
	}, [isVisible])

	// const memoizedChildren = useMemo(() => {
	// 	return children;
	// }, [children]);

	if (offset == undefined) {
		return (
			<div ref={slideRef} className={cn(className, 'transform-gpu translate-x-0 shrink-0')}>
				{renderChildren && children}
			</div >
		);
	}

	return (
		<div ref={slideRef} className={cn(className, 'overflow-hidden shrink-0')}>
			<div
				className={cn(isVisible ? 'relative' : 'hidden', 'absolute left-0 top-0 w-full h-full overflow-visible transform-gpu transition-transform duration-300 flex flex-row')}
				style={{ transform: `scale(1) translate(${offset},0)` }}
			>
				{renderChildren && children}
			</div>
			{outerChildren}
		</div>
	);
}