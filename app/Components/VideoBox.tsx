
export default function VideoBox(props: any) {
    return (
        <div className="flex rounded-sm items-center justify-center bg-simligray w-full h-full min-h-[85vh] lg:min-h-[500px] max-w-[1600px]">
            <video ref={props.video} autoPlay playsInline className="w-full h-full object-contain bg-black"></video>
            <audio ref={props.audio} autoPlay></audio>
        </div>
    );
}