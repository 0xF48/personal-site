"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion'
import React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
const springConfig = { stiffness: 600, damping: 35 }

import { createPortal } from 'react-dom'
import { useResizeObserver } from 'usehooks-ts'

export default function MotionBox({
	relativeContentPosition = false, //performance optimization
	usePositionRect,
	portalRef,
	useAbsoluteOffset = false,
	resetKey,
	classNames = { positionStyle: {}, style: '', position: '' },
	children,
}: {
	portalRef?: any,
	useAbsoluteOffset?: boolean,
	relativeContentPosition?: boolean,
	usePositionRect?: any,
	resetKey?: string,
	classNames?: {
		positionStyle?: any,
		style: string,
		position: string
	},
	children: React.ReactNode
}) {
	const placeholderRef = useRef(null)
	const positionRef = useRef(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const width = useMotionValue(0)
	const height = useMotionValue(0)
	const [fixedSize, setFixedSize] = useState([0, 0])
	const [init, setInit] = useState(false)

	const posIsRelative = useMemo(() => {
		return classNames.position.includes('relative')
	}, [classNames.position])

	const [isRelative, setIsRelative] = useState(posIsRelative)

	const { width: rw, height: rh } = useResizeObserver({ ref: { current: positionRef.current }, box: 'border-box' })



	let setX = 0
	let setY = 0
	if (positionRef.current) {
		setX = positionRef.current.offsetLeft
		setY = positionRef.current.offsetTop
		let rect = positionRef.current.getBoundingClientRect()
		setX = rect.x
		setY = rect.y
	}


	useEffect(() => {
		if (!positionRef.current) return

		x.set(setX)
		y.set(setY)

		if (posIsRelative) {
			spx.jump(setX)
			spy.jump(setY)
		}
	}, [setX, setY])


	// useEffect(() => {
	// 	const onResize = () => {
	// 		if (!positionRef.current) return


	// 		let rect = positionRef.current.getBoundingClientRect()

	// 		if (!posIsRelative && usePositionRect) {
	// 			rect = usePositionRect
	// 		}


	// 		width.set(rect.width)
	// 		height.set(rect.height)
	// 		x.set(rect.x)
	// 		y.set(rect.y)
	// 	}

	// 	//window.addEventListener('scroll', onResize)
	// 	window.addEventListener('resize', onResize)

	// 	// const update = () => {
	// 	// 	if (!positionRef.current) return

	// 	// 	let rect = positionRef.current.getBoundingClientRect()

	// 	// 	if (!posIsRelative && usePositionRect) {
	// 	// 		rect = usePositionRect
	// 	// 	}

	// 	// 	x.set(rect.x)
	// 	// 	y.set(rect.y)
	// 	// }

	// 	//const interval = setInterval(update, 100)

	// 	return () => {
	// 		//window.addEventListener('scroll', onResize)
	// 		window.removeEventListener('resize', onResize)
	// 		//clearInterval(interval)
	// 	}
	// }, [])


	useEffect(() => {
		if (!positionRef.current) return


		let setX = positionRef.current.offsetLeft
		let setY = positionRef.current.offsetTop
		let rect = positionRef.current.getBoundingClientRect()

		setX = rect.x
		setY = rect.y

		if (!init) {
			spx.jump(setX)
			spy.jump(setY)
			spwidth.jump(rect.width)
			spheight.jump(rect.height)
			setInit(true)
		}

		x.set(setX)
		y.set(setY)

		width.set(rect.width)
		height.set(rect.height)

		// setFixedSize([rect.width, rect.height])

	}, [positionRef, classNames.position])

	useEffect(() => {
		if (posIsRelative && !isRelative) {
			const timer = setTimeout(() => {
				setIsRelative(true)
			}, 400)
			return () => {
				clearTimeout(timer)
			}
		} else if (!posIsRelative && isRelative) {
			setIsRelative(false)
		}

	}, [posIsRelative])

	const spx = useSpring(x, springConfig)
	const spy = useSpring(y, springConfig)
	const spwidth = useSpring(width, springConfig)
	const spheight = useSpring(height, springConfig)

	const motionStyle = {
		x: spx,
		y: spy,
		width: spwidth,
		height: spheight,
	}


	let content: any = null


	if (isRelative) {
		content = <div className={classNames.style + ' w-full h-full relative'} >
			{children}
		</div>
	} else {
		let innerContent;

		if (relativeContentPosition) {
			innerContent = <div className='w-full h-full relative'>
				{children}
			</div>
		} else {
			innerContent = <motion.div style={{ width, height }} className='absolute left-0 top-0'>
				{children}
			</motion.div>
		}

		content = createPortal(<motion.div className={cn(useAbsoluteOffset ? 'absolute' : 'fixed', 'left-0 top-0 overflow-hidden', classNames.style)} style={motionStyle} >
			{innerContent}
		</motion.div >, portalRef?.current || document.body)
	}



	return <>
		<div className={classNames.position + ' pointer-events-none'} style={classNames.positionStyle} ref={positionRef}>
			{content}
		</div>
		{(!posIsRelative && isRelative) && content}
	</>


}