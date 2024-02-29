'use client'

import React, { useState } from "react";
import EditableImage from "../../components/layout/EditableImage";

const Carousel = () => {
    const [image, setImage] = useState("");
    const [menImage, setMenImage] = useState("");
    const [womenImage, setWomenImage] = useState("");
    const [kidsImage, setKidsImage] = useState("");

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
            <EditableImage link={image} setLink={(data) => uploadImage(data, 'image')} />
            <EditableImage link={menImage} setLink={(data) => uploadImage(data, 'men')} />
            <EditableImage link={womenImage} setLink={(data) => uploadImage(data, 'women')} />
            <EditableImage link={kidsImage} setLink={(data) => uploadImage(data, 'kids')} />
            <button className="m-4" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Carousel;
