'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterEffectProps {
    words: string[]
    className?: string
    cursorClassName?: string
}

export function TypewriterEffect({
    words,
    className = "",
    cursorClassName = ""
}: TypewriterEffectProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const word = words[currentWordIndex]

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                setCurrentText(word.substring(0, currentText.length + 1))

                // Finished typing word
                if (currentText.length === word.length) {
                    setTimeout(() => setIsDeleting(true), 1500) // Pause at end
                    return
                }
            } else {
                // Deleting
                setCurrentText(word.substring(0, currentText.length - 1))

                // Finished deleting
                if (currentText.length === 0) {
                    setIsDeleting(false)
                    setCurrentWordIndex((prev) => (prev + 1) % words.length)
                    return
                }
            }
        }, isDeleting ? 50 : 100) // Typing speed vs Deleting speed

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, currentWordIndex, words])

    return (
        <span className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className={`inline-block ml-1 w-[2px] h-[1em] bg-primary align-middle ${cursorClassName}`}
            />
        </span>
    )
}
