interface IBadge {
    text: string;
}

export default function Badge({ text }: IBadge) {
    return (
        <div className="flex flex-col relative">
            <div className={`flex flex-grow items-center justify-center z-10 bg-cyan-800 p-1`}>
                <p className="text-[10px] text-white truncate">{text}</p>
            </div>
            <div className="absolute inset-0 bg-black border-4 border-black translate-x-0.5 translate-y-0.5" />
        </div>
    );
}