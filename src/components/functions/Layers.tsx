import clsx from "clsx";
import { FC, useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaLockOpen, FaTrash } from "react-icons/fa";
import { ILayer } from "../../constants/interfaces";
import { CanvasContext } from "../../provider/CanvasProvider";

const Layer: FC<{
    index: number;
    layerInfo: ILayer;
    onDragStart: (index: number) => void;
    onDrop: (index: number) => void;
    isDragging: boolean;
    handleToggleVisible: (id: string, visible: boolean) => void;
    handleToggleLock: (id: string, locked: boolean) => void;
    handleDelete: (id: string) => void;
    handleSelect: (id: string) => void;
}> = ({ layerInfo, index, onDragStart, onDrop, isDragging, handleToggleVisible, handleToggleLock, handleDelete, handleSelect }) => {
    const { selectedLayerId } = useContext(CanvasContext);

    return (
        <div
            className={clsx(
                "px-2 py-1 flex justify-between items-center border border-[#4B7C92] cursor-pointer",
                layerInfo.id == selectedLayerId ? 'bg-[#2F6C84]' : 'bg-[#384A52]',
                isDragging ? 'opacity-50' : '',
            )}
            draggable={true}
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
            onClick={() => handleSelect(layerInfo.id)}
        >
            <p className="text-white">
                {layerInfo.name}
            </p>
            <div className="flex gap-2">
                {layerInfo.visible ? (
                    <FaEye size={12} color="white" onClick={() => handleToggleVisible(layerInfo.id, false)} />
                ) : (
                    <FaEyeSlash size={12} color="white" onClick={() => handleToggleVisible(layerInfo.id, true)} />
                )}
                {layerInfo.locked ? (
                    <FaLock size={12} color="white" onClick={() => handleToggleLock(layerInfo.id, false)} />
                ) : (
                    <FaLockOpen size={12} color="white" onClick={() => handleToggleLock(layerInfo.id, true)} />
                )}
                <FaTrash size={12} color="white" onClick={() => handleDelete(layerInfo.id)} />
            </div>
        </div>
    )
}

const Layers = () => {
    const { layers, setLayers, setSelectedLayerId } = useContext(CanvasContext);

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const onDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const onDrop = (index: number) => {
        if (draggedIndex === null) return;

        const newLayers = [...layers];
        const [movedLayer] = newLayers.splice(draggedIndex, 1);
        newLayers.splice(index, 0, movedLayer);

        setLayers(newLayers);
        setDraggedIndex(null);
    };

    return (
        <div className="p-2 w-full flex flex-col gap-2">
            {layers.map((layer, index) => (
                <Layer
                    key={index}
                    layerInfo={layer}
                    index={index}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    isDragging={draggedIndex === index}
                    handleToggleVisible={(id, visible) => setLayers(layers.map((layer) => layer.id == id ? { ...layer, visible } : layer))}
                    handleToggleLock={(id, locked) => setLayers(layers.map((layer) => layer.id == id ? { ...layer, locked } : layer))}
                    handleDelete={(id) => setLayers(layers.filter(layer => layer.id != id))}
                    handleSelect={(id) => setSelectedLayerId(id)}
                />
            ))}
        </div>
    )
}

export default Layers;
