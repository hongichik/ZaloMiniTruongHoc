import React from "react";

interface ContactDetails {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    working_hours?: string;
}

interface ContactSectionProps {
    title?: string;
    contactDetails: ContactDetails;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
    title = "Thông tin liên hệ",
    contactDetails
}) => {
    const handleCallPhone = () => {
        if (contactDetails.phone) {
            window.open(`tel:${contactDetails.phone.replace(/[^0-9+]/g, '')}`, "_self");
        }
    };

    const handleSendEmail = () => {
        if (contactDetails.email) {
            window.open(`mailto:${contactDetails.email}`, "_self");
        }
    };

    const defaultContact = {
        address: '123 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM',
        phone: '(028) 3123 4567',
        email: 'info@smartschool.edu.vn',
        website: 'www.smartschool.edu.vn'
    };

    const contact = { ...defaultContact, ...contactDetails };

    return (
        <div className="school-info-card">
            <div className="info-header">
                <div className="info-icon">📍</div>
                <h3 className="section-title">{title}</h3>
            </div>

            {contact.address && (
                <div className="info-row">
                    <span className="info-label">Địa chỉ:</span>
                    <span className="info-value">{contact.address}</span>
                </div>
            )}

            {contact.phone && (
                <div className="info-row">
                    <span className="info-label">Điện thoại:</span>
                    <span className="info-value">{contact.phone}</span>
                </div>
            )}

            {contact.email && (
                <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{contact.email}</span>
                </div>
            )}

            {contact.website && (
                <div className="info-row">
                    <span className="info-label">Website:</span>
                    <span className="info-value">{contact.website}</span>
                </div>
            )}

            {contact.working_hours && (
                <div className="info-row">
                    <span className="info-label">Giờ làm việc:</span>
                    <span className="info-value">{contact.working_hours}</span>
                </div>
            )}

            <div className="contact-grid">
                <button className="primary-button" onClick={handleCallPhone}>
                    📞 Gọi điện
                </button>
                <button className="secondary-button" onClick={handleSendEmail}>
                    ✉️ Gửi email
                </button>
            </div>
        </div>
    );
};

export default ContactSection;