import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#2B303A',
        display: 'flex',
        color: '#FFFFFF',
        padding: '20px 0',
        position: 'relative',
        bottom: 0,
        left: 0,
        minHeight: '100px', // Ensure footer has a consistent height
      }}
    >
      <Container fluid>
        <div
          style={{
            paddingLeft: "77px",
            paddingRight: "10px",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Space the contents evenly
            flexWrap: 'wrap', // Wrap contents on smaller screens
          }}
        >
          {/* AWS Logo Section */}
          <Image
            src="/aws-logo.png" // Ensure the correct path to your AWS logo image
            alt="AWS Logo"
            style={{ height: '50px', marginRight: '15px' }}
            fluid
          />
          
          {/* AWS Technologies Section */}
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <div>
              <h5>AWS Technologies</h5>
              <ul className="list-unstyled mb-0">
                <li>S3</li>
                <li>DynamoDB</li>
                <li>Cognito</li>
                <li>Lambda</li>
                <li>API Gateway</li>
              </ul>
            </div>
          </div>

          {/* Powered By Section */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <h5>Powered by</h5>
              <ul className="list-unstyled mb-0">
                <li>React.js</li>
                <li>MaterialUI</li>
                <li>Bootstrap</li>
                <li>Emotion</li>
                <li>AOS</li>
              </ul>
            </div>
          </div>

          {/* Rights Reserved Section */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Gemhallics. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
