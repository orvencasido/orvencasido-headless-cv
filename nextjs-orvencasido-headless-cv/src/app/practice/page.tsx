export default function PracticePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 gap-8 p-10">
            {/* Middle Box */}
            <div className="w-full max-w-md h-32 flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl text-center">
                <h1 className="text-3xl font-bold text-gray-800">Hello</h1>
                <p className="text-gray-500 mt-2">Middle Box</p>
            </div>

            {/* Right Vertical Box (5x the height of middle box) */}
            <div className="w-64 h-[640px] bg-white shadow-xl rounded-2xl flex items-center justify-center">
                <p className="text-gray-800 font-bold -rotate-90 text-2xl tracking-widest uppercase">
                    hehe
                </p>
            </div>
        </main>
    );
}