import { useEffect, useState } from "react";
import { FaSpinner, FaSearch } from 'react-icons/fa'; // Importing a spinner and search icon

const FreeImages = () => {
    const [pixabayImages, setPixabayImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); // Default search term

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://pixabay.com/api/?key=47233717-bdc36cadff11da7fe84651a16&q=${searchQuery}&totalHits=500`
                );
                const data = await response.json();

                if (data.hits) {
                    setPixabayImages(data.hits);
                } else {
                    setError("No images found.");
                }
            } catch (err) {
                setError("Failed to fetch images");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [searchQuery]); // Trigger fetching whenever searchQuery changes

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchQuery(searchQuery.trim()); // To trim any spaces around the query
    };

    return (
        <div className="w-56 pt-4 px-2">
            {/* Search Box */}
            <div className="flex items-center mb-4">
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

            {/* Loading state */}
            {loading && (
                <div className="flex items-center justify-center space-x-2 py-4">
                    <FaSpinner className="animate-spin text-white text-xl" />
                    <span className="text-white text-sm">画像を読み込んでいます...</span>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="flex justify-center py-4">
                    <span className="text-red-500 text-sm">{error}</span>
                </div>
            )}

            {/* Image Grid with scrolling */}
            <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[500px]"> {/* Set max height for scroll */}
                {pixabayImages.map((image: any) => (
                    <div key={image.id} className="relative">
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-auto object-cover border-[1px] border-gray-400"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FreeImages;
