# circulate-hackathon

## Contributors
- **Ash Niemann '26**: Project Manager
- **Monty Goldberg '26**: Backend
- **Connor Keane '26**: Frontend
- **Matthew Manganillo '25**: Full Stack

## About the Project

### Inspiration
As students, we often found ourselves with items we no longer needed but that could be useful to others—textbooks, furniture, electronics. Existing platforms were either too public or inconvenient. We wanted to build a safe, student-only marketplace to make giving and receiving items easier, fostering a more sustainable campus culture.

### What it does
Circulate is a web application where students can:
- **List items** they no longer need, such as furniture, books, or electronics.
- **Browse items** listed by other students, making the process of sharing resources easy and accessible.
- **Securely authenticate** using their university credentials, ensuring a safe, student-only environment.

### How we built it
- **Frontend**: Developed using **React.js** with **React-router-dom** for smooth navigation and **React-bootstrap** and **@mui/material** for a responsive and user-friendly design. **@emotion/react** and **@emotion/styled** were used for custom styling.
- **Backend**: Built using **AWS Lambda** for serverless backend functions, managed through **AWS API Gateway** for API calls.
- **Authentication**: Secured using **AWS Cognito**, allowing students to sign in with university credentials, ensuring that only verified students can use the platform.
- **Data Storage**: **AWS DynamoDB** handles data management for listings, while **AWS S3** stores images associated with each listing.
- **Other Integrations**: Enhanced user experience with **AOS** for smooth animations and **OpenAI API** for automated content generation when required.

### Challenges we ran into
- **Integrating AWS Services**: Managing the connections between AWS Lambda, API Gateway, and DynamoDB was complex, requiring careful configuration to ensure seamless data flow.
- **Ensuring Data Security**: Building a platform exclusively for students meant implementing strict authentication flows with **AWS Cognito**, ensuring that only authorized users could access the platform.
- **Frontend Design Consistency**: Maintaining a consistent design across different devices required adapting various **MUI** components and custom styles.

### Accomplishments that we're proud of
- **User Authentication**: Successfully implemented a secure login system using **AWS Cognito**, ensuring a safe environment for university students.
- **Responsive Design**: Built a clean, intuitive interface using **React**, **Bootstrap**, and **MUI**, making the platform easy to navigate on both mobile and desktop.
- **Community Impact**: Created a platform that fosters a culture of sharing and sustainability, helping students connect and exchange items easily.

### What we learned
- **Mastering AWS**: Improved our understanding of **AWS services**, including **Lambda**, **DynamoDB**, **S3**, and **Cognito**, which are essential for scalable and secure backend development.
- **Team Collaboration**: Enhanced our ability to work collaboratively, managing **Git workflows**, resolving conflicts, and integrating each team member’s contributions smoothly.
- **User-Centric Design**: Gained insights into designing a platform that balances functionality with an engaging user experience, especially when catering to a specific community like university students.

### What's next for Circulate
- **Feature Expansion**: Adding more advanced filtering and search capabilities to help users find items more efficiently, and enabling item requests for users.
- **Mobile App Development**: Exploring the development of a mobile app version for easier access.
- **Partnering with Universities**: Expanding to other campuses to make Circulate a hub for student exchanges nationwide, fostering a broader community of sustainability.
