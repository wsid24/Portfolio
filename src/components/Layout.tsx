import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative z-10 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
