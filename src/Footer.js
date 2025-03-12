import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/donation-guidelines">Donation Guidelines</a>
                <a href="/faqs">FAQs</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
            <div className="contact-info">
                <p>Email: <a href="mailto:info@donationproject.com">info@donationproject.com</a></p>
                <p>Phone: +1-234-567-890</p>
                <p>Follow us on social media</p>
            </div>
        </footer>
    );
};

export default Footer;
