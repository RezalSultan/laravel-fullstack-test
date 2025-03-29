import { Toaster as Sonner } from "@/Components/ui/sonner";
import { Toaster } from "@/Components/ui/toaster";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <Sonner />
            <main className="mt-6 p-4 w-full">
                {children}
                <Toaster />
            </main>
        </>
    );
}
