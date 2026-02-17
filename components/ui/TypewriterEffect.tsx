'use client'

import { useState, useEffect } from 'react'


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
            <span
                className={`inline-block ml-1 w-[2px] h-[1em] bg-primary align-middle animate-blink ${cursorClassName}`}
            />
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 0.8s linear infinite;
                }
            `}</style>
        </span>
    )
}
