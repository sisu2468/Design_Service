import { useEffect, useState } from "react";

const FreeImages = () => {
    const [pixabayImages, setPixabayImages] = useState<any[]>([]); // Array to store fetched images
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState<string | null>(null); // To handle errors

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(
                    "https://pixabay.com/api/?key=47261292-bb078052be9daa732c5f6504e&q=yellow+flowers&image_type=photo&pretty=true"
                );
                const data = await response.json();
                
                if (data.hits) {
                    setPixabayImages(data.hits); // Set the fetched images to the state
                }
            } catch (err) {
                setError("Failed to fetch images"); // Set error if fetching fails
            } finally {
                setLoading(false); // Set loading to false after request is complete
            }
        };

        fetchImages();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <div className="w-56">
            {loading && <p>Loading images...</p>}
            {error && <p>{error}</p>}
            
            <div className="grid grid-cols-2 gap-2">
                {pixabayImages.map((image: any) => (
                    <div key={image.id} className="relative">
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreeImages;
