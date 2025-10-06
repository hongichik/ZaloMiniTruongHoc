import React, { useState, useEffect } from "react";
import { Text } from "zmp-ui";

interface BannerSlide {
    id: number;
    title: string;
    subtitle: string;
    emoji: string;
    banner?: string;
    gradient: string;
    placeholder?: string;
    article_link?: string;
    button_text?: string;
}

interface BannerSliderProps {
    slides: BannerSlide[];
    apiBaseUrl?: string;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ 
    slides, 
    apiBaseUrl = import.meta.env.VITE_API_BASE_URL 
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide effect
    useEffect(() => {
        if (slides.length === 0) return;
        
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="banner-slider-container">
            {slides.map((slide, index) => (
                <div key={slide.id || `slide-${index}`} className={`banner-slide ${index === currentSlide ? 'active' : ''}`}>
                    <div
                        className={`banner-image bg-gradient-to-br ${slide.gradient}`}
                        style={slide.banner ? {
                            backgroundImage: `url(${apiBaseUrl}/storage/${slide.banner})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        } : {}}
                    >
                        <div className="slide-overlay">
                            <div className="banner-image-placeholder">
                                {slide.emoji}
                            </div>
                            <h3 className="banner-title">{slide.title}</h3>
                            <p className="banner-subtitle">{slide.subtitle}</p>
                            {slide.placeholder && (
                                <Text size="xSmall" className="text-white opacity-70 mt-2">
                                    {slide.placeholder}
                                </Text>
                            )}
                            {slide.article_link && slide.button_text && (
                                <button
                                    className="banner-button"
                                    onClick={() => window.open(slide.article_link, '_blank')}
                                >
                                    {slide.button_text} →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots indicator */}
            <div className="banner-dots">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id || `dot-${index}`}
                        className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;