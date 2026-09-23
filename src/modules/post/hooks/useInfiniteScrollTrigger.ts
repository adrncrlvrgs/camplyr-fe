import { useEffect, useRef } from "react";

export function useInfiniteScrollTrigger(onIntersect: () => void, enabled: boolean) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!enabled || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onIntersect();
            },
            { rootMargin: "200px" }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [onIntersect, enabled]);

    return sentinelRef;
}