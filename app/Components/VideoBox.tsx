
export default function VideoBox(props: any) {
    return (
        <div className="aspect-video flex rounded-sm overflow-hidden items-center justify-center bg-simligray w-full max-w-[1100px] h-auto">
            <video ref={props.video} autoPlay playsInline className="w-full h-full object-cover"></video>
            <audio ref={props.audio} autoPlay></audio>
        </div>
    );
}