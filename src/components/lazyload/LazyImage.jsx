import { useState } from "react";

export default function LazyImage({src, alt = "", className = "", width, height, ...props}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={`${className} ${loaded ? "is-loaded" : "is-loading"}`}
            onLoad={() => setLoaded(true)}
            {...props}/>
    );
}