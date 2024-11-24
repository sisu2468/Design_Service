import { useState } from "react";
import { MdSwapHoriz } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePicture } from "react-icons/ai";

const UploadImage = () => {
    const [modalview, setModalView] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*", // Only accept image files
        multiple: false,   // Prevent multiple file uploads (if you want single image only)
    });

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            console.log('Uploading file:', file);
            // Here you can handle the file upload, e.g., send to an API
        } else {
            alert('Please select a file to upload');
        }
    };

    return (
        <div className="w-56 px-2">
            {/* <div className="py-3.5 mt-2 h-5">
                <button 
                    className="bg-gray-800 p-1.5 px-4 text-white font-medium rounded-sm text-xs flex items-center gap-1 hover:bg-gray-600"
                    onClick={() => setModalView(!modalview)}
                >
                    フラッグを変更する
                    <MdSwapHoriz size={16} />
                </button>
            </div> */}

            <div className="mt-4">
                <div {...getRootProps()} className="border-dashed border-2 p-4 text-center text-gray-600 cursor-pointer">
                    <input {...getInputProps()} />
                    {selectedFiles.length > 0 ? (
                        // <p className="mt-2 text-sm text-gray-500">
                        //     {selectedFiles[0].name}
                        // </p>
                        <img src={selectedFiles[0]} />
                    ):(
                        <div className="flex items-center justify-center">
                            <AiOutlinePicture className="" size={50} />
                        </div>
                    )}
                    <p className="text-sm">写真をドラッグ＆ドロップ</p>
                </div>
            </div>

            <div className="mt-3 flex justify-center">
                <button 
                    onClick={handleUpload}
                    className="border-[1px] border-gray-400 text-white text-sm px-6 py-2 hover:bg-gray-600"
                >
                    または写真を選択
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
