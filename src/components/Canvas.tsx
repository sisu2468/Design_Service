import clsx from "clsx";
import _ from "lodash";
import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { HitTestCode } from "../constants/enums";
import { ILayer, IPoint } from "../constants/interfaces";
import { CanvasContext } from "../provider/CanvasProvider";
import { calculateRotationAngle, calculateScale, getLayerTransformedPoints, Icon, isContain, isInBox, loadImage } from "../utils";

interface Props {
    mask: string;
}

const Canvas: FC<Props> = ({ mask }) => {
    const animationRef = useRef(0);
    const guideAnimationRef = useRef(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const guideCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const maskRef = useRef<HTMLImageElement>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const closeIconRef = useRef(new Icon('/icons/cross.png'));
    const rotateIconRef = useRef(new Icon('/icons/rotate-right.png'));
    const scaleIconRef = useRef(new Icon('/icons/scale.png'));
    const cloneIconRef = useRef(new Icon('/icons/duplicate.png'));
    const { layers, selectedLayerId, setSelectedLayerId, zoom } = useContext(CanvasContext);
    const layersRef = useRef<ILayer[]>([]);
    const selectedLayerRef = useRef<ILayer | null>();
    const selectedLayerIdRef = useRef<string | null>();
    const zoomRef = useRef(1);
    const startPos = useRef<IPoint>();
    const currPos = useRef<IPoint>();
    const [isDraggable, setIsDraggable] = useState(false);
    const [isScalable, setIsScalable] = useState(false);
    const [isRotatable, setIsRotatable] = useState(false);
    const [isClosable, setIsClosable] = useState(false);
    const [isClonable, setIsClonable] = useState(false);
    const isDragging = useRef(false);
    const isScaling = useRef(false);
    const isRotating = useRef(false);

    const render = () => {
        try {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (canvas && ctx) {
                const width = canvas.width;
                const height = canvas.height;

                ctx.fillStyle = '#dedede';
                ctx.fillRect(0, 0, width, height);

                layersRef.current.forEach(layer => {
                    if (!layer.visible)
                        return;
                    ctx.save();

                    let { position, scale } = layer;

                    ctx.translate(position.x, position.y);
                    ctx.rotate(layer.rotation);
                    ctx.scale(scale.x, scale.y);

                    ctx.drawImage(layer.canvas, -layer.width / 2, -layer.height / 2);

                    ctx.restore();
                });

                if (maskRef.current) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-out'
                    ctx.drawImage(maskRef.current, 0, 0);
                    ctx.restore();
                }
            }
        } catch (err: any) {
            console.error(err.message);
        }

        animationRef.current = requestAnimationFrame(render);
    }

    const renderGuide = () => {
        try {
            const canvas = guideCanvasRef.current;
            const ctx = canvas?.getContext('2d');

            if (canvas && ctx) {
                const width = canvas.width;
                const height = canvas.height;

                ctx.clearRect(0, 0, width, height);

                layersRef.current.forEach(layer => {
                    if (!layer.visible)
                        return;
                    if (layer.id == selectedLayerIdRef.current) {
                        const points = getLayerTransformedPoints(layer).map(({ x, y }) => ({ x: x * zoomRef.current, y: y * zoomRef.current }));
                        ctx.beginPath();
                        ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
                        for (let i = 0; i < points.length; i++) {
                            ctx.lineTo(points[i].x, points[i].y);
                        }
                        ctx.setLineDash([]);
                        ctx.closePath();
                        ctx.strokeStyle = 'white';
                        ctx.stroke();
                        ctx.setLineDash([5, 5]);
                        ctx.strokeStyle = 'black';
                        ctx.stroke();
                        closeIconRef.current.render(ctx, points[0].x - 12, points[0].y - 12);
                        rotateIconRef.current.render(ctx, points[1].x - 12, points[1].y - 12);
                        scaleIconRef.current.render(ctx, points[2].x - 12, points[2].y - 12);
                        cloneIconRef.current.render(ctx, points[3].x - 12, points[3].y - 12);
                    }
                });
            }
        } catch (err: any) {
            console.error(err.message);
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

    useEffect(() => {
        (async () => {
            maskRef.current = await loadImage(mask);
            setWidth(maskRef.current.width);
            setHeight(maskRef.current.height);
        })();
    }, [mask]);

    useEffect(() => {
        layersRef.current = layers;
    }, [layers]);

    useEffect(() => {
        selectedLayerIdRef.current = selectedLayerId;
        selectedLayerRef.current = _.cloneDeep(_.find(layersRef.current, (layer) => layer.id == selectedLayerIdRef.current));
    }, [selectedLayerId]);

    useEffect(() => {
        zoomRef.current = zoom;
    }, [zoom]);

    const hitTest = (x: number, y: number) => {
        let layer = null;
        let code = HitTestCode.None;
        for (let i = 0; i < layers.length; i++) {
            const points = getLayerTransformedPoints(layers[i]);
            if (selectedLayerIdRef.current == layers[i].id) {
                if (isInBox(points[0], 24 / zoomRef.current, { x, y })) {
                    code = HitTestCode.TopLeft;
                }
                if (isInBox(points[1], 24 / zoomRef.current, { x, y })) {
                    code = HitTestCode.TopRight;
                }
                if (isInBox(points[2], 24 / zoomRef.current, { x, y })) {
                    code = HitTestCode.BottomRight;
                }
                if (isInBox(points[3], 24 / zoomRef.current, { x, y })) {
                    code = HitTestCode.BottomLeft;
                }
            }
            if (code == HitTestCode.None && isContain(points, { x, y })) {
                layer = layers[i];
            }
        }
        return { layer, code };
    }

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        let x = e.clientX - canvasRef.current!.getBoundingClientRect().left;
        let y = e.clientY - canvasRef.current!.getBoundingClientRect().top;
        x /= zoomRef.current;
        y /= zoomRef.current;
        currPos.current = { x, y };
        const { layer, code } = hitTest(x, y);
        setIsDraggable(layer ? true : false);
        setIsRotatable(code == HitTestCode.TopRight);
        setIsScalable(code == HitTestCode.BottomRight);
        setIsClosable(code == HitTestCode.TopLeft);
        setIsClonable(code == HitTestCode.BottomLeft);
        layersRef.current?.forEach(layer => {
            if (layer.id == selectedLayerIdRef.current) {
                if (selectedLayerRef.current && currPos.current) {
                    const points = getLayerTransformedPoints(selectedLayerRef.current);
                    if (layer.id == selectedLayerIdRef.current) {
                        const center = { x: (points[0].x + points[2].x) / 2, y: (points[0].y + points[2].y) / 2 };
                        if (isDragging.current) {
                            layer.position.x = center.x + currPos.current!.x - startPos.current!.x;
                            layer.position.y = center.y + currPos.current!.y - startPos.current!.y;
                        }
                        if (isRotating.current) {
                            const rotation = calculateRotationAngle(center, points[1], currPos.current);
                            layer.rotation = rotation;
                        }
                        if (isScaling.current) {
                            const { x, y } = calculateScale(center, { x: layer.width / 2, y: layer.height / 2 }, currPos.current);
                            layer.scale.x = x;
                            layer.scale.y = y;
                        }
                    }
                }
            }
        })
    }

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        let x = e.clientX - canvasRef.current!.getBoundingClientRect().left;
        let y = e.clientY - canvasRef.current!.getBoundingClientRect().top;
        x /= zoomRef.current;
        y /= zoomRef.current;
        startPos.current = { x, y };
        currPos.current = { x, y };
        const { layer, code } = hitTest(x, y);
        if (code == HitTestCode.TopRight) {
            isRotating.current = true;
        } else if (code == HitTestCode.BottomRight) {
            isScaling.current = true;
        } else if (code == HitTestCode.TopLeft) {

        } else if (code == HitTestCode.BottomLeft) {

        } else if (layer) {
            setSelectedLayerId(layer.id);
            isDragging.current = true;
        }
    }

    const handleMouseUp = () => {
        isDragging.current = false;
        isScaling.current = false;
        isRotating.current = false;
        selectedLayerRef.current = _.cloneDeep(_.find(layersRef.current, (layer) => layer.id == selectedLayerIdRef.current));
    }

    return (
        <div className="relative" style={{ width: width * zoom, height: height * zoom }}>
            <canvas
                ref={canvasRef}
                width={width} height={height}
                className="w-full h-full"
            />
            <canvas
                ref={guideCanvasRef}
                className={clsx(
                    "absolute left-0 top-0",
                    (isClosable || isClonable) ? 'cursor-pointer'
                        : isRotatable ? 'cursor-crosshair'
                            : isScalable ? 'cursor-nwse-resize'
                                : isDraggable ? 'cursor-move' : 'cursor-default'
                )}
                width={Math.floor(width * zoom)} height={Math.floor(height * zoom)}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >

            </canvas>
        </div>
    )
}

export default Canvas;
