export default function Footer() {
    return (
        <footer className="w-full border-t border-border/40 py-8 mt-12 bg-background">
            <div className="max-w-3xl mx-auto px-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Orven Casido. All rights reserved.</p>
                <p>
                    No Cost Headless Website with DevOps Practice | FE Vibe Coded hehe
                </p>
            </div>
        </footer>
    );
}
