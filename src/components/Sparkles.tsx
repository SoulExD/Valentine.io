import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Sparkle = ({ style }: { style: React.CSSProperties }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
            style={{
                ...style,
                position: 'absolute',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
        </motion.div>
    );
};

export const Sparkles = () => {
    const [sparkles, setSparkles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    useEffect(() => {
        const generateSparkles = () => {
            const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
                id: i,
                style: {
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                },
            }));
            setSparkles(newSparkles);
        };

        generateSparkles();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {sparkles.map((sparkle) => (
                <Sparkle key={sparkle.id} style={sparkle.style} />
            ))}
        </div>
    );
};
