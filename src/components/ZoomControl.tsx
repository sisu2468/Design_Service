import { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CanvasContext } from "../provider/CanvasProvider";

const ZoomControl = () => {
    const { zoom, setZoom } = useContext(CanvasContext);

    return (
        <div className="absolute right-6 bottom-6 bg-[#3F4652] flex">
            <div className="w-[32px] h-[32px] flex justify-center items-center" onClick={() => setZoom(Math.max(0.10, zoom - 0.1))}>
                <FaMinus color="white" />
            </div>
            <div className="px-4 flex items-center border-l border-r border-[#616875]">
                <input type="range" min="10" max="250" value={zoom * 100} onChange={(e) => setZoom(parseInt(e.target.value) / 100)} />
                <p className="w-[40px] text-white text-right">
                    {(zoom * 100).toFixed(0)}%
                </p>
            </div>
            <div className="w-[32px] h-[32px] flex justify-center items-center" onClick={() => setZoom(Math.min(0.10, zoom + 0.1))}>
                <FaPlus color="white" />
            </div>
        </div>
    )
}

export default ZoomControl;