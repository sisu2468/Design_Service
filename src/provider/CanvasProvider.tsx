import { createContext, FC, MutableRefObject, ReactNode, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ILayer, IPoint } from "../constants/interfaces";
import { loadImage } from "../utils";

interface ICanvas {
    canvasRef: MutableRefObject<HTMLCanvasElement | null> | null;
    maskIndex: number;
    setMaskIndex: (mask: number) => void;
    layers: ILayer[];
    setLayers: (layers: ILayer[]) => void;
    addLayer: (src: string, position?: IPoint, scale?: IPoint, rotation?: number) => void;
    selectedLayerId: string | null;
    setSelectedLayerId: (id: string | null) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
}

export const CanvasContext = createContext<ICanvas>({
    canvasRef: null,
    maskIndex: 0,
    setMaskIndex: (_: number) => { },
    layers: [],
    setLayers: (_: ILayer[]) => { },
    addLayer: (_: string) => { },
    selectedLayerId: null,
    setSelectedLayerId: (_: string | null) => { },
    zoom: 1,
    setZoom: (_: number) => { },
});

interface IProps {
    children: ReactNode;
}

const CanvasProvider: FC<IProps> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [maskIndex, setMaskIndex] = useState(0);
    const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
    const [layers, setLayers] = useState<ILayer[]>([]);
    const [zoom, setZoom] = useState(1);

    const addLayer = async (src: string, position?: IPoint, scale?: IPoint, rotation?: number) => {
        const image = await loadImage(src);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0);
        const layer: ILayer = {
            id: uuidv4(),
            name: 'New Layer',
            src,
            image,
            canvas,
            width: image.width,
            height: image.height,
            crop: { x1: 0, y1: 0, x2: image.width, y2: image.height },
            scale: { x: scale?.x || 1, y: scale?.y || 1 },
            rotation: rotation || 0,
            position: { x: position ? position.x + 50 : image.width / 2, y: position ? position.y + 50 : image.height / 2 },
            visible: true,
            locked: false,
        };
        setLayers(layers => [...layers, layer])
    }

    return (
        <CanvasContext.Provider value={{ canvasRef, maskIndex, setMaskIndex, layers, setLayers, addLayer, selectedLayerId, setSelectedLayerId, zoom, setZoom }}>
            {children}
        </CanvasContext.Provider>
    )
}

export default CanvasProvider;
