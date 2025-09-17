
export default function VideoBox(props: any) {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[85vh] lg:min-h-[1000px] max-w-[1600px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <video ref={props.video} autoPlay playsInline className="w-full h-full object-contain bg-black"></video>
            <audio ref={props.audio} autoPlay></audio>
        </div>
    );
}