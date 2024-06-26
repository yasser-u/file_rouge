"use client";
import {useEffect, useState} from "react";
import "../../../styles/globals.css";


const images = [
    'assets/images/adult-1866533_1920.jpg',
    'assets/images/glass-blower-451121_1920.jpg',
    'assets/images/hands-4314327_1920.jpg',
    'assets/images/sewing-5117018_1920.jpg',
    'assets/images/tools-1083796_1920.jpg',
    'assets/images/workshop-4524838_1920.jpg',
];

export default function Home() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col justify-center gap-10 items-center h-full">
            <div className="h-1/5 text-center">
                <h2 className="text-3xl font-bold">Découvrez la magie de l'artisanat local avec LinkArt</h2>
                <p className="text-lg text-gray-700 font-bold">
                    Entrez dans l'univers des artisans d'art de votre région et laissez-vous séduire par leur créativité et
                    <br />leur savoir-faire d'exception. LinkArt vous invite à une expérience unique, où vous pourrez découvrir,
                    <br />rencontrer et soutenir les talents qui font la richesse de notre patrimoine artisanal.
                    <br />Prêt à être émerveillé ? C'est parti pour un voyage au cœur du fait-main !
                </p>
            </div>

            <div className="relative max-w-[1250] max-h-4/5 p-5 ">
                <img src={images[currentImage]} alt="Slider" className="w-[900px]  h-[500px]  object-cover rounded-xl"/>
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                >
                    &lt;
                </button>
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
