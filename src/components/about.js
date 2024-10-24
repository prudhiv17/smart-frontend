import React from 'react';
import styled, { keyframes } from 'styled-components';
import aboutUsBackgroundImage from '../assets/aboutus.jpg'; 
import { FaFacebookF, FaTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const borderAnimation = keyframes`
  0% {
    border-image-source: linear-gradient(90deg, red, yellow, green);
  }
  
  
  100% {
    border-image-source: linear-gradient(90deg, yellow, green, red);
  }
`;

const AboutUsContainer = styled.div`
  min-height: 110vh;
  min-width: 220vh;
  background-image: url(${aboutUsBackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 40px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutUsContent = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  background: rgba(1, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(1, 0, 0, 0.5);
  border: 5px solid;
  border-image-slice: 1;
  animation: ${borderAnimation} 5s linear infinite;
  position: relative;
`;

const AboutUsHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const AboutUsParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SocialMediaContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialMediaIcon = styled.a`
  color: #fff;
  font-size: 2rem;
  margin: 10px 0;
  transition: color 0.3s ease;
  &:hover {
    color: #00bfae; 
  }
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <AboutUsContent>
        <AboutUsHeader>About Us</AboutUsHeader>
        <AboutUsParagraph>
          Welcome to Precision Agriculture, where technology meets tradition to revolutionize farming practices. Our mission is to provide innovative solutions that help farmers make informed decisions, enhance crop yields, and sustain the environment.
        </AboutUsParagraph>
        <AboutUsParagraph>
          Our platform integrates advanced tools for disease detection, crop recommendation, and fertilizer calculation, ensuring that farmers receive the best advice tailored to their specific needs. We strive to bridge the gap between technology and agriculture, making modern farming more accessible and efficient.
        </AboutUsParagraph>
        <AboutUsParagraph>
          Founded by a team of experts in agriculture and technology, Precision Agriculture is committed to improving farming practices and increasing productivity. Join us on our journey to make agriculture smarter, more sustainable, and profitable.
        </AboutUsParagraph>
      </AboutUsContent>

      <SocialMediaContainer>
        <SocialMediaIcon href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <FaFacebookF />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://wa.me/" target="_blank" aria-label="WhatsApp">
          <FaWhatsapp />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram />
        </SocialMediaIcon>
      </SocialMediaContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;