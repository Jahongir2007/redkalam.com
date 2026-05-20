import { useState, useEffect } from "react";

export function Router({ routes }) {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onPopState = () => setPath(window.location.pathname);

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const Component = routes[path] || routes["/404"];
    return <Component />;
}

export function navigate(to) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

export function Link({ to, children }) {
    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}