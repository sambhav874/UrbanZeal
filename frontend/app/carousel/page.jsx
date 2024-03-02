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
    const {id} = useParams();
    

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
            switch (category) {
                case 'image':
                    setCarouselImages(prevState => ({
                        ...prevState,
                        images: prevState.images.filter(img => img._id !== _id)
                    }));
                    break;
                case 'men':
                    setCarouselImages(prevState => ({
                        ...prevState,
                        menImages: prevState.menImages.filter(img => img._id !== _id)
                    }));
                    break;
                case 'women':
                    setCarouselImages(prevState => ({
                        ...prevState,
                        womenImages: prevState.womenImages.filter(img => img._id !== _id)
                    }));
                    break;
                case 'kids':
                    setCarouselImages(prevState => ({
                        ...prevState,
                        kidsImages: prevState.kidsImages.filter(img => img._id !== _id)
                    }));
                    break;
                default:
                    break;
            }
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
        <div className="max-w-2xl mx-auto my-8 p-2">
            <h1 className="text-3xl font-bold text-center">Upload Carousel Images</h1>
            <div>
                <EditableImage link={image} setLink={(data) => uploadImage(data, 'image')} />
                {carouselImages.images.map(carouselImage => (
                    <div key={carouselImage._id} className="carousel-card">
                        <Image src={carouselImage.imageUrl} width={200} height={200} alt="Carousel Image" />
                        <DeleteButton label="Delete" onDelete={() => handleDelete(carouselImage._id, 'image')} />
                    </div>
                ))}
            </div>

            {/* Render Men Images */}
            <div>
                <EditableImage link={menImage} setLink={(data) => uploadImage(data, 'men')} />
                {carouselImages.menImages.map(menImage => (
                    <div key={menImage._id} className="carousel-card">
                        <Image src={menImage.menImageUrl} width={200} height={200} alt="Men Image" />
                        <DeleteButton label="Delete" onDelete={() => handleDelete(menImage._id, 'men')} />
                    </div>
                ))}
            </div>

            {/* Render Women Images */}
            <div>
                <EditableImage link={womenImage} setLink={(data) => uploadImage(data, 'women')} />
                {carouselImages.womenImages.map(womenImage => (
                    <div key={womenImage._id} className="carousel-card">
                        <Image src={womenImage.womenImageUrl} width={200} height={200} alt="Women Image" />
                        <DeleteButton label="Delete" onDelete={() => handleDelete(womenImage._id, 'women')} />
                    </div>
                ))}
            </div>

            {/* Render Kids Images */}
            <div>
                <EditableImage link={kidsImage} setLink={(data) => uploadImage(data, 'kids')} />
                {carouselImages.kidsImages.map(kidsImage => (
                    <div key={kidsImage._id} className="carousel-card">
                        <Image src={kidsImage.kidsImageUrl} width={200} height={200} alt="Kids Image" />
                        <DeleteButton label="Delete" onDelete={() => handleDelete(kidsImage._id, 'kids')} />
                    </div>
                ))}
            </div>

            <button className="m-4" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Carousel;
