# bitWisdom - MERN Stack Application

A full-stack web application built with MongoDB, Express, React, Node.js, and Tailwind CSS, configured for AWS deployment.

## Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled
- **dotenv** for environment variables

### Deployment
- **AWS Elastic Beanstalk** (Backend)
- **AWS S3** (Frontend static hosting)

## Project Structure

```
bitWisdom/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── .env               # Frontend environment variables
│   └── package.json
├── server/                # Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── .env              # Backend environment variables
│   └── package.json
└── package.json          # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- AWS CLI (for deployment)
- EB CLI (Elastic Beanstalk CLI)

### Installation

1. **Clone the repository** (or initialize as shown above)

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables:**

   **Server** (.env in server directory):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bitwisdom
   NODE_ENV=development
   ```

   **Client** (.env in client directory):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Development

**Run both frontend and backend concurrently:**
```bash
npm run dev
```

**Or run them separately:**

Backend:
```bash
npm run dev:server
```

Frontend:
```bash
npm run dev:client
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## AWS Deployment

### Backend Deployment (Elastic Beanstalk)

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize Elastic Beanstalk:**
   ```bash
   cd server
   eb init -p node.js -r us-east-1 bitwisdom-api
   ```

3. **Create environment:**
   ```bash
   eb create bitwisdom-api-env
   ```

4. **Set environment variables:**
   ```bash
   eb setenv MONGODB_URI=your_mongodb_uri NODE_ENV=production
   ```

5. **Deploy:**
   ```bash
   eb deploy
   ```

6. **Open application:**
   ```bash
   eb open
   ```

### Frontend Deployment (S3 + CloudFront)

1. **Build the React app:**
   ```bash
   cd client
   npm run build
   ```

2. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://bitwisdom-frontend
   ```

3. **Configure bucket for static website hosting:**
   ```bash
   aws s3 website s3://bitwisdom-frontend --index-document index.html --error-document index.html
   ```

4. **Update bucket policy** (make it public):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::bitwisdom-frontend/*"
       }
     ]
   }
   ```

5. **Upload build files:**
   ```bash
   aws s3 sync dist/ s3://bitwisdom-frontend
   ```

6. **Update frontend .env for production:**
   ```env
   VITE_API_URL=http://your-eb-url.elasticbeanstalk.com
   ```

7. **Rebuild and redeploy:**
   ```bash
   npm run build
   aws s3 sync dist/ s3://bitwisdom-frontend --delete
   ```

### Optional: CloudFront Setup

For better performance and HTTPS:

1. Create CloudFront distribution pointing to S3 bucket
2. Enable HTTPS with ACM certificate
3. Update CORS in backend to allow CloudFront domain

## Database Setup

### Local MongoDB
```bash
mongod
```

### MongoDB Atlas (Recommended for production)
1. Create cluster at https://cloud.mongodb.com
2. Get connection string
3. Update MONGODB_URI in server/.env

## API Endpoints

Base URL: `http://localhost:5000` (development)

- `GET /` - Health check

Add your API routes in `server/routes/`

## Environment Variables

### Production Settings

**Backend:**
- Set in Elastic Beanstalk environment configuration
- Use MongoDB Atlas connection string
- Enable CORS for frontend domain

**Frontend:**
- Update VITE_API_URL to point to Elastic Beanstalk URL
- Rebuild before deployment

## Useful Commands

```bash
# Install dependencies for both
npm run install-all

# Run development servers
npm run dev

# Build frontend for production
npm run build:client

# Deploy backend to AWS
cd server && eb deploy

# Deploy frontend to S3
cd client && npm run build && aws s3 sync dist/ s3://your-bucket-name
```

## Troubleshooting

### CORS Issues
- Update CORS configuration in `server/index.js`
- Add your frontend URL to allowed origins

### MongoDB Connection
- Check MongoDB is running locally
- Verify connection string in .env
- For Atlas, whitelist IP addresses

### AWS Deployment
- Ensure AWS credentials are configured
- Check EB logs: `eb logs`
- Verify environment variables are set

## Next Steps

- [ ] Set up authentication (JWT)
- [ ] Add user management
- [ ] Implement API endpoints
- [ ] Add error handling middleware
- [ ] Set up CI/CD pipeline
- [ ] Configure monitoring and logging
- [ ] Add rate limiting
- [ ] Implement caching

## License

ISC
