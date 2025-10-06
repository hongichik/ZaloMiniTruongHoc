import React from "react";
import { Text } from "zmp-ui";

interface InfrastructureImage {
    title: string;
    icon?: string;
    banner?: string;
    placeholder?: string;
    alt_text?: string;
}

interface InfrastructureGalleryProps {
    title?: string;
    images: InfrastructureImage[];
    apiBaseUrl?: string;
    onMapIconToEmoji: (iconClass: string) => string;
}

const InfrastructureGallery: React.FC<InfrastructureGalleryProps> = ({ 
    title = "Hình ảnh cơ sở vật chất",
    images,
    apiBaseUrl = import.meta.env.VITE_API_BASE_URL,
    onMapIconToEmoji
}) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="school-info-card">
            <div className="info-header">
                <div className="info-icon">🏫</div>
                <h3 className="section-title">{title}</h3>
            </div>

            <div className="image-gallery">
                {images.map((image, index) => (
                    <div key={image.id || `image-${index}`} className="image-card">
                        {image.banner ? (
                            <div
                                className="image-real"
                                style={{
                                    backgroundImage: `url(${apiBaseUrl}/storage/${image.banner})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <div className="image-overlay">
                                    <div className="image-icon">
                                        {image.icon?.startsWith('fas fa-') 
                                            ? onMapIconToEmoji(image.icon) 
                                            : (image.icon || '🏫')
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="image-placeholder">
                                <div className="image-icon">
                                    {image.icon?.startsWith('fas fa-') 
                                        ? onMapIconToEmoji(image.icon) 
                                        : (image.icon || '🏫')
                                    }
                                </div>
                                <Text size="xSmall" className="text-center leading-tight">
                                    {image.placeholder || image.alt_text || `// ${image.title}`}
                                </Text>
                            </div>
                        )}
                        <div className="image-title">{image.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfrastructureGallery;