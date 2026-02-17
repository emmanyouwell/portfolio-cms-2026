'use client'



export function BackgroundIllustrations() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Top Right Blob */}
            <div
                className="absolute -top-[10%] -right-[10%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-blob-1"
            />

            {/* Bottom Left Blob */}
            <div
                className="absolute -bottom-[20%] -left-[10%] w-[50rem] h-[50rem] bg-secondary/10 rounded-full blur-3xl animate-blob-2"
            />

            {/* Center Accent Blob */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl animate-blob-3"
            />

            <style jsx>{`
                @keyframes blob-1 {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
                    50% { transform: scale(1.2) rotate(90deg); opacity: 0.5; }
                }
                @keyframes blob-2 {
                    0%, 100% { transform: scale(1.2) rotate(0deg); opacity: 0.3; }
                    50% { transform: scale(1) rotate(-90deg); opacity: 0.5; }
                }
                @keyframes blob-3 {
                    0%, 100% { transform: translate(-50%, -50%) translate(0, 0); opacity: 0.1; }
                    33% { transform: translate(-50%, -50%) translate(100px, -50px); opacity: 0.3; }
                    66% { transform: translate(-50%, -50%) translate(-50px, 50px); opacity: 0.1; }
                }
                .animate-blob-1 {
                    animation: blob-1 20s linear infinite;
                }
                .animate-blob-2 {
                    animation: blob-2 25s linear infinite;
                }
                .animate-blob-3 {
                    animation: blob-3 30s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
