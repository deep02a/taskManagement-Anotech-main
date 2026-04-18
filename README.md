# Anotech Task Manager

A sophisticated full-stack task management platform built with Next.js (App Router), Express.js, TypeScript, Tailwind CSS, and MongoDB. Features a premium, enterprise-grade user interface with modern design patterns.

## ✨ What makes it special

- **Premium UI/UX**: Enterprise-level design with gradients, animations, and professional typography
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Real-time Task Management**: Full CRUD operations with status workflows
- **Team Collaboration**: Task assignment and filtering capabilities
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Performance Optimized**: Efficient rendering and data fetching

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

**Backend (Vercel-native API):**
- Next.js Route Handlers (`/api/*`)
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Infrastructure:**
- RESTful API design
- Environment-based configuration

## 🚀 Features

### Authentication
- User registration and login
- JWT token-based sessions
- Protected routes
- Secure password handling

### Task Management
- Create, read, update, delete tasks
- Status tracking (To Do, In Progress, Done)
- Due date management
- Task assignment to team members
- Advanced filtering and search

### User Experience
- Modern gradient backgrounds
- Smooth animations and transitions
- Professional typography (Inter font)
- Intuitive navigation
- Loading states and error handling
- Responsive grid layouts

### Dashboard Analytics
- Task statistics overview
- Status-based filtering
- Visual progress indicators
- Clean data visualization

## 📦 Installation

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
   cd anotech-task-manager
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Database:**
   - Ensure MongoDB is running
   - Update `MONGODB_URI` in `.env`

4. **Development:**
   ```bash
   npm run dev
   ```

5. **Production build:**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/anotech-task-manager
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_API_URL=/api
```

### Local Port
- App + API: `http://localhost:3000`

## 🎨 Design Philosophy

This application follows modern enterprise design principles:

- **Accessibility**: WCAG compliant color contrasts and focus states
- **Performance**: Optimized bundle sizes and efficient re-renders
- **Scalability**: Component-based architecture for easy extension
- **User-Centric**: Intuitive workflows and clear visual hierarchy

## 📱 Responsive Design

- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Adaptive grid systems and touch-friendly interactions
- **Mobile**: Single-column layouts with optimized spacing

## 🔒 Security

- Password hashing with bcryptjs
- JWT tokens with expiration
- Input validation and sanitization
- CORS protection
- Secure API endpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add these Vercel environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL` as `/api` (optional, default is already `/api`)
3. Deploy automatically

#### Important Notes for Vercel
- The app now uses Next.js API routes under `app/api/*`, which are compatible with Vercel serverless functions.
- MongoDB must be reachable from Vercel (MongoDB Atlas is recommended).
- If migrating from local MongoDB, move your data to Atlas before production deployment.

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx recommended)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by developers who care about user experience and clean code.

---

*Transform your team's productivity with enterprise-grade task management.*
