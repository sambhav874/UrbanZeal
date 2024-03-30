'use client'
import React, { useState, useEffect } from "react";
import EditableImage from "../../components/layout/EditableImage";
import Image from "next/image";
import { toast } from "react-hot-toast";
import DeleteButton from './../../components/DeleteButton';
import { useParams } from "next/navigation";

const Carousel = () => {
    const [image, setImage] = useState("");
    const [menImage, setMenImage] = useState("");
    const [womenImage, setWomenImage] = useState("");
    const [kidsImage, setKidsImage] = useState("");
    const { id } = useParams();

    const [carouselImages, setCarouselImages] = useState({
        images: [],
        menImages: [],
        womenImages: [],
        kidsImages: []
    });

    useEffect(() => {
        fetch('/api/carousel')
            .then(res => res.json())
            .then(data => {
                setCarouselImages(data);
                console.log('Carousel Images:', data);
            })
            .catch(error => console.error('Error fetching carousel images:', error));
    }, []);

    const uploadImage = async (imageData, category) => {
        try {
            if (!imageData) return; // Skip upload if no image data provided

            const response = await fetch('/api/carousel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [`${category}ImageUrl`]: imageData })
            });
            const data = await response.json();
            console.log('Image uploaded successfully:', data);
            // Set the image in the state
            if (category === 'image') setImage(imageData);
            else if (category === 'men') setMenImage(imageData);
            else if (category === 'women') setWomenImage(imageData);
            else if (category === 'kids') setKidsImage(imageData);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDelete = async (_id, category) => {
        try {
            const promise = new Promise(async (resolve, reject) => {
                const response = await fetch(`/api/carousel?_id=${_id}&category=${category}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            });

            await toast.promise(promise, {
                loading: 'Deleting...',
                success: 'Deleted',
                error: 'Error',
            });

            // Remove the image from the state based on the category
            const updatedCarouselImages = { ...carouselImages };
            updatedCarouselImages[`${category}Images`] = updatedCarouselImages[`${category}Images`].filter(img => img._id !== _id);
            setCarouselImages(updatedCarouselImages);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleSubmit = async () => {
        // Perform any necessary actions before submitting
        // Example: Log the uploaded images
        console.log("Image:", image);
        console.log("Men Image:", menImage);
        console.log("Women Image:", womenImage);
        console.log("Kids Image:", kidsImage);
        // You can add logic here to handle the submission if needed
    };

    return (
        <div className="max-w-5xl mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Upload Carousel Images</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Image Upload Section */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Image</h2>
                    <EditableImage link={image} setLink={(data) => uploadImage(data, 'image')} />
                    <div className="grid grid-cols-1 gap-4">
                        {carouselImages.images.map(carouselImage => (
                            <div key={carouselImage._id} className="carousel-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl relative">
                                <Image src={carouselImage.imageUrl} width={200} height={200} alt="Carousel Image" className="object-cover w-full h-full" />
                                <div className="absolute bottom-2 left-2">
                                    <DeleteButton label="Delete" onDelete={() => handleDelete(carouselImage._id, 'image')} className="bg-red-500  text-white rounded-full p-2 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Men Upload Section */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Men</h2>
                    <EditableImage link={menImage} setLink={(data) => uploadImage(data, 'men')} />
                    <div className="grid grid-cols-1 gap-4">
                        {carouselImages.menImages.map(menImage => (
                            <div key={menImage._id} className="carousel-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl relative">
                                <Image src={menImage.menImageUrl} width={200} height={200} alt="Men Image" className="object-cover w-full h-full" />
                                <div className="absolute bottom-2 left-2">
                                    <DeleteButton label="Delete" onDelete={() => handleDelete(menImage._id, 'men')} className="bg-red-500 text-white rounded-full p-2 cursor-pointer " />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Women Upload Section */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Women</h2>
                    <EditableImage link={womenImage} setLink={(data) => uploadImage(data, 'women')} />
                    <div className="grid grid-cols-1 gap-4">
                        {carouselImages.womenImages.map(womenImage => (
                            <div key={womenImage._id} className="carousel-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl relative">
                                <Image src={womenImage.womenImageUrl} width={200} height={200} alt="Women Image" className="object-cover w-full h-full" />
                                <div className="absolute bottom-2 left-2">
                                    <DeleteButton label="Delete" onDelete={() => handleDelete(womenImage._id, 'women')} className="bg-red-500 text-white rounded-full p-2 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kids Upload Section */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Kids</h2>
                    <EditableImage link={kidsImage} setLink={(data) => uploadImage(data, 'kids')} />
                    <div className="grid grid-cols-1 gap-4">
                        {carouselImages.kidsImages.map(kidsImage => (
                            <div key={kidsImage._id} className="carousel-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl relative">
                                <Image src={kidsImage.kidsImageUrl} width={200} height={200} alt="Kids Image" className="object-cover w-full h-full" />
                                <div className="absolute bottom-2 left-2">
                                    <DeleteButton label="Delete" onDelete={() => handleDelete(kidsImage._id, 'kids')} className="bg-red-500 text-white rounded-full p-2 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Carousel;
