'use client'
import React, { useState } from "react";

const ContactPage = () => {
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, query })
            });

            if (response.ok) {
                alert('Email sent successfully!');
                setEmail('');
                setQuery('');
            } else {
                throw new Error('Error sending email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email');
        }
    };

    return (
        <section className="mx-auto max-w-[80%] m-8 text-center">
            <div className="m-4">
                <div className="text-2xl font-bold mb-4">Contact Us</div>
                <form className="text-left" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Enter your Email:</label>
                        <input type="email" id="email" name="email" className="border rounded-md px-4 py-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="query" className="block">Ask your query:</label>
                        <textarea id="query" name="query" className="border rounded-md px-4 py-2 w-full h-32" value={query} onChange={(e) => setQuery(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ContactPage;
