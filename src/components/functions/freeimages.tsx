import axios from "axios";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { FaSpinner } from "react-icons/fa6";
import { CanvasContext } from "../../provider/CanvasProvider";

const FreeImages = () => {
    const { addLayer } = useContext(CanvasContext);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const { leftImages, rightImages } = useMemo(() => {
        const leftImages = [], rightImages = [];
        let leftHeight = 0, rightHeight = 0;
        for (let i = 0; i < images.length; i++) {
            if (leftHeight <= rightHeight) {
                leftImages.push(images[i]);
                leftHeight += images[i].previewHeight / images[i].previewWidth;
            } else {
                rightImages.push(images[i]);
                rightHeight += images[i].previewHeight / images[i].previewWidth;
            }
        }
        return { leftImages, rightImages };
    }, [images]);

    const fetchImages = async (page: number) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`https://pixabay.com/api/?key=47233717-bdc36cadff11da7fe84651a16&q=${searchQuery}&per_page=20&page=${page}`);
            setImages((prev) => [...prev, ...res.data.hits]);
        } catch (err: any) {
            console.error(err.message);
        }
        setIsLoading(false);
        setPage(page);
    };

    useEffect(() => {
        fetchImages(1);
    }, [searchQuery]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchQuery(searchQuery.trim());
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = imageContainerRef.current!;
        if (scrollHeight - scrollTop <= clientHeight && !isLoading) {
            fetchImages(page + 1);
        }
    };

    return (
        <div className="px-2 py-4 w-full h-full flex flex-col gap-2">
            <div className="flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    placeholder="キーワード"
                    className="w-full px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                    onClick={handleSearchSubmit}
                    className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-600"
                >
                    <FaSearch size={16} />
                </button>
            </div>

            <div ref={imageContainerRef} className="flex-[1_1_0] grid grid-cols-2 gap-1 overflow-y-auto" onScroll={handleScroll}>
                <div className="flex flex-col gap-1">
                    {leftImages.map((image: any, index: number) => (
                        <img
                            key={index}
                            className="object-cover border-[1px] border-gray-400"
                            src={image.previewURL}
                            alt={image.tags}
                            onClick={() => {
                                addLayer(image.largeImageURL);
                            }}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    {rightImages.map((image: any, index: number) => (
                        <img
                            key={index}
                            className="object-cover border-[1px] border-gray-400"
                            src={image.previewURL}
                            alt={image.tags}
                            onClick={() => {
                                addLayer(image.largeImageURL);
                            }}
                        />
                    ))}
                </div>
                <div className="col-span-2 h-24 flex justify-center items-center">
                    {isLoading && (
                        <FaSpinner className="animate-spin text-white text-xl" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreeImages;
