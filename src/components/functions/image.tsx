import { useContext, useMemo, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { AiOutlinePicture } from "react-icons/ai";
import { CanvasContext } from "../../provider/CanvasProvider";

const UploadImage = () => {
    const { addLayer } = useContext(CanvasContext);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const imageUrl = useMemo(() => selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : '', [selectedFiles]);

    const onDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    return (
        <div className="w-56 px-2">
            <div className="mt-4">
                <div {...getRootProps()} className="border-dashed border-2 p-4 text-center text-gray-600 cursor-pointer">
                    <input {...getInputProps()} />
                    {selectedFiles.length > 0 ? (
                        <img src={imageUrl} />
                    ) : (
                        <div className="flex items-center justify-center">
                            <AiOutlinePicture className="" size={50} />
                        </div>
                    )}
                    <p className="text-sm">写真をドラッグ＆ドロップ</p>
                </div>
            </div>

            <div className="mt-3 flex justify-center">
                <button
                    onClick={() => addLayer(imageUrl)}
                    className="border-[1px] border-gray-400 text-white text-sm px-6 py-2 hover:bg-gray-600"
                >
                    または写真を選択
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
