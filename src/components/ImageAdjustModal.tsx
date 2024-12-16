import _ from "lodash";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { ILayer } from "../constants/interfaces";
import { CanvasContext } from "../provider/CanvasProvider";
import Modal from "./common/Modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ImageAdjustModal: FC<Props> = ({ isOpen, onClose }) => {
    const { layers, setLayers, selectedLayerId } = useContext(CanvasContext);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef(0);
    const selectedLayerRef = useRef<ILayer | null>();
    const filterRef = useRef('');
    const [brightness, setBrightness] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [contrast, setContrast] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        selectedLayerRef.current = _.cloneDeep(layers.find((layer) => layer.id == selectedLayerId));
        if (selectedLayerRef.current) {
            const { width, height } = selectedLayerRef.current.image;
            const scale = 640 / width;
            setWidth(width * scale);
            setHeight(height * scale);
        }
    }, [layers, selectedLayerId]);

    useEffect(() => {
        filterRef.current = `brightness(${100 + 0.5 * brightness}%) saturate(${saturation}%) contrast(${100 + 0.5 * contrast}%)`;
    }, [brightness, saturation, contrast]);

    const render = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            ctx.filter = filterRef.current;
            console.log(filterRef.current);
            if (selectedLayerRef.current) {
                ctx.drawImage(selectedLayerRef.current.image, 0, 0);
            }
        }

        animationRef.current = requestAnimationFrame(render);
    }

    useEffect(() => {
        animationRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const handleSave = () => {
        if (selectedLayerRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = selectedLayerRef.current.width;
            canvas.height = selectedLayerRef.current.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.filter = filterRef.current;
                ctx.drawImage(selectedLayerRef.current.canvas, 0, 0);
                setLayers(layers.map(layer => layer.id == selectedLayerId ? { ...layer, canvas } : layer));
                onClose();
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-2">
                <div key={selectedLayerId} className="relative w-[640px]">
                    <canvas
                        ref={canvasRef}
                        width={selectedLayerRef.current?.image.width} height={selectedLayerRef.current?.image.height}
                        style={{ width, height }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                        <p className="w-[120px]">輝度:</p>
                        <input className="flex-grow" type="range" min="-50" max="50" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
                        <p className="w-[40px] text-right">{brightness}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="w-[120px]">彩度:</p>
                        <input className="flex-grow" type="range" min="0" max="100" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} />
                        <p className="w-[40px] text-right">{saturation}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="w-[120px]">コントラスト:</p>
                        <input className="flex-grow" type="range" min="-50" max="50" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
                        <p className="w-[40px] text-right">{contrast}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button className="px-2 py-1" onClick={handleSave}>
                        保存
                    </button>
                    <button className="px-2 py-1" onClick={onClose}>
                        キャンセル
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ImageAdjustModal;
