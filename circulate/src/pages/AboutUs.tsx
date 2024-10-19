import React from 'react';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Box, Typography } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <div>
      <Header />
      <Box sx={{ padding: 4, backgroundColor: '#D3D3D3' }}>
        <Typography variant="h5" align="center" gutterBottom paddingBottom={1}>
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paddingBottom={2}>
          Our mission is to develop innovative, user-friendly software solutions that solve real-world problems.
          We strive to combine technical expertise with creativity, ensuring a seamless and impactful experience 
          for our users. By fostering collaboration, continuous learning, and a passion for technology, we aim to 
          push the boundaries of what’s possible and deliver value to our community.
        </Typography>
      </Box>
      <Footer />
    </div>
  );
};

export default AboutUs;
