import React from 'react';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

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
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="355"
                image="/path/to/sample-image.jpg" // Replace with actual image path
                alt="Sample Name"
              />
              <CardContent>
                <Typography variant="h6">Sample Name</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Sample Role
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sample description about the team member's role and contributions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default AboutUs;
