'use client'

import { useEffect, useState, useRef } from 'react'

export function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)
    const [hasInView, setHasInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
            if (entry.isIntersecting) {
                setHasInView(true)
            }
        }, options)

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [options])

    return { ref, isInView, hasInView }
}
