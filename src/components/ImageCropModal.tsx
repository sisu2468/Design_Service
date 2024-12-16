import clsx from "clsx";
import _ from "lodash";
import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { ICrop, ILayer, IPoint } from "../constants/interfaces";
import { CanvasContext } from "../provider/CanvasProvider";
import Modal from "./common/Modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CURSORS = ['cursor-default', 'cursor-nwse-resize', 'cursor-nesw-resize', 'cursor-nwse-resize', 'cursor-nesw-resize'];

const ImageCropModal: FC<Props> = ({ isOpen, onClose }) => {
    const { layers, setLayers, selectedLayerId } = useContext(CanvasContext);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const guideCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef(0);
    const guideAnimationRef = useRef(0);
    const selectedLayerRef = useRef<ILayer | null>();
    const scaleRef = useRef(0);
    const pointsRef = useRef<IPoint[]>();
    const [crop, setCrop] = useState<ICrop>()
    const isDragging = useRef(0);
    const [isDraggable, setIsDraggable] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        selectedLayerRef.current = _.cloneDeep(layers.find((layer) => layer.id == selectedLayerId));
        if (selectedLayerRef.current) {
            const { width, height } = selectedLayerRef.current.image;
            scaleRef.current = 640 / width;
            setWidth(width * scaleRef.current);
            setHeight(height * scaleRef.current);
            setCrop(selectedLayerRef.current.crop);
        }
    }, [layers, selectedLayerId]);

    useEffect(() => {
        if (crop) {
            const { x1, y1, x2, y2 } = crop;
            pointsRef.current = [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }].map(({ x, y }) => ({ x: x * scaleRef.current, y: y * scaleRef.current }));
        }
    }, [crop]);

    const render = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            if (selectedLayerRef.current) {
                ctx.drawImage(selectedLayerRef.current.image, 0, 0);
            }
        }

        animationRef.current = requestAnimationFrame(render);
    }

    const renderGuide = () => {
        const canvas = guideCanvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            const width = canvas.width, height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
            if (pointsRef.current) {
                const points = pointsRef.current;
                ctx.clearRect(points[0].x, points[0].y, points[2].x - points[0].x, points[2].y - points[0].y);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
                for (let i = 0; i < 4; i++)
                    ctx.lineTo(points[i].x, points[i].y);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.setLineDash([]);
                ctx.strokeStyle = 'white';
                ctx.stroke();
                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.restore();
                ctx.save();
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.rect(points[i].x - 10, points[i].y - 10, 20, 20);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        guideAnimationRef.current = requestAnimationFrame(renderGuide);
    }

    useEffect(() => {
        animationRef.current = requestAnimationFrame(render);
        guideAnimationRef.current = requestAnimationFrame(renderGuide);
        return () => {
            cancelAnimationFrame(animationRef.current);
            cancelAnimationFrame(guideAnimationRef.current);
        }
    }, []);

    const getCorner = (x: number, y: number) => {
        const points = pointsRef.current;
        if (points) {
            for (let i = 0; i < 4; i++) {
                if (x >= points[i].x - 10 && x <= points[i].x + 10 && y >= points[i].y - 10 && y <= points[i].y + 10)
                    return i + 1;
            }
        }
        return 0;
    }

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        let x = e.clientX - canvasRef!.current!.getBoundingClientRect().left;
        let y = e.clientY - canvasRef!.current!.getBoundingClientRect().top;
        setIsDraggable(getCorner(x, y));
        if (isDragging.current && crop) {
            let { x1, y1, x2, y2 } = crop;
            if (isDragging.current == 1 || isDragging.current == 4) {
                x1 = x / scaleRef.current;
            }
            if (isDragging.current == 2 || isDragging.current == 3) {
                x2 = x / scaleRef.current;
            }
            if (isDragging.current == 1 || isDragging.current == 2) {
                y1 = y / scaleRef.current;
            }
            if (isDragging.current == 3 || isDragging.current == 4) {
                y2 = y / scaleRef.current;
            }
            setCrop({ x1, y1, x2, y2 });
        }
    }

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        let x = e.clientX - canvasRef!.current!.getBoundingClientRect().left;
        let y = e.clientY - canvasRef!.current!.getBoundingClientRect().top;
        isDragging.current = getCorner(x, y);
    }

    const handleMouseUp = () => {
        isDragging.current = 0;
    }

    const handleSave = () => {
        if (crop && selectedLayerRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = crop.x2 - crop.x1;
            canvas.height = crop.y2 - crop.y1;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const width = crop.x2 - crop.x1;
                const height = crop.y2 - crop.y1;
                ctx.drawImage(selectedLayerRef.current.image, crop.x1, crop.y1, width, height, 0, 0, width, height);
                setLayers(layers.map(layer => layer.id == selectedLayerId ? { ...layer, canvas, width, height, crop } : layer));
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
                    <canvas
                        ref={guideCanvasRef}
                        width={width} height={height}
                        className={clsx(
                            "absolute left-0 top-0 z-5 w-full h-full",
                            CURSORS[isDraggable || isDragging.current],
                        )}
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
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

export default ImageCropModal;
