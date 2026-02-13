'use client'

import { motion } from 'framer-motion'

export function BackgroundIllustrations() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Top Right Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -right-[10%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl"
            />

            {/* Bottom Left Blob */}
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[20%] -left-[10%] w-[50rem] h-[50rem] bg-secondary/10 rounded-full blur-3xl"
            />

            {/* Center Accent Blob */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl"
            />
        </div>
    )
}
