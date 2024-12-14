import { createContext, FC, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ILayer } from "../constants/interfaces";
import { loadImage } from "../utils";

interface ICanvas {
    layers: ILayer[];
    setLayers: (layers: ILayer[]) => void;
    addLayer: (src: string) => void;
    selectedLayerId: string | null;
    setSelectedLayerId: (id: string | null) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
}

export const CanvasContext = createContext<ICanvas>({
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
    const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
    const [layers, setLayers] = useState<ILayer[]>([]);
    const [zoom, setZoom] = useState(1);

    const addLayer = async (src: string) => {
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
            scale: { x: 1, y: 1 },
            rotation: 0,
            position: { x: 0, y: 0 },
            visible: true,
            locked: false,
        };
        setLayers(layers => [...layers, layer])
    }

    return (
        <CanvasContext.Provider value={{ layers, setLayers, addLayer, selectedLayerId, setSelectedLayerId, zoom, setZoom }}>
            {children}
        </CanvasContext.Provider>
    )
}

export default CanvasProvider;
