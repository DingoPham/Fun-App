import { useEffect, useRef, useState } from "react";

export default function LazyVideo({src, className = "", rootMargin = "300px", ...props}) {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin
            }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <video
            ref={videoRef}
            className={className}
            {...props}
        >
            {shouldLoad && (
                <source src={src} type="video/mp4" />
            )}
        </video>
    );
}