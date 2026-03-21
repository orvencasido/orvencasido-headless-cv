import HeroHeader from "@/components/HeroHeader"
import { type Resume } from "@/sanity/utils"

export default function JourneyPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl font-bold">The Journey</h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Coming soon. A deep dive into my professional path and technical evolution.
            </p>
        </main>
    )
}
