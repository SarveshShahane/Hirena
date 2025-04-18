# Hirena - Job Portal Platform

![License](https://img.shields.io/badge/license-Open--Source-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Last Updated](https://img.shields.io/badge/last%20updated-2025--04--18-orange)

**Hirena** is a full-stack job portal web application that allows job seekers, employers, and administrators to interact on a single platform. Built with Node.js, Express, EJS, MongoDB, and Bootstrap, Hirena aims to provide a seamless experience for users to search, apply, and manage job postings efficiently.

## 🌐 Features

### 👤 Job Seekers
- Register and login with email verification
- Create and update personal profiles
- Upload resumes (only once, saved in DB)
- Browse and apply to job listings
- Track application history
- Bookmark jobs for later

### 🏢 Employers
- Register and login with role-based access
- Post and manage job listings
- View applicants for each job
- Dashboard view of jobs and total applications

### 🔐 Admins
- Manage users and jobs
- View platform analytics (planned)
- Monitor reported content or abuse (future)

### 🔔 Common Features
- Flash messages for feedback
- Responsive UI with Bootstrap
- Session-based authentication using Passport.js
- Role-based authorization
- Announcements, Notifications (in progress)

## 📁 Project Structure
```
Job-Portal/
│ 
├── models/     # Mongoose Schemas (User, Job, Application, Resume, etc.)
├── routes/     # Modularized route files (user, job, admin, employer)
├── views/      # EJS templates (with layouts and includes)
├── public/     # Static files (CSS, JS, Images)
├── utils/      # Custom error classes, middleware
├── config/     # Passport config
└── app.js      # Main server file
```

## ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS, Bootstrap
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: Passport.js (Local Strategy)
- **Templating**: EJS + EJS-Mate layouts
- **Flash Messaging**: Connect-flash
- **Validation & Error Handling**: Custom middleware

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or Atlas)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/SarveshShahane/Hirena.git
   cd Hirena
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the server
   ```bash
   npm start
   ```

## 📬 Contact

For any issues, feedback, or collaboration ideas, reach out at:  
📧 **[hirena.job@gmail.com](mailto:hirena.job@gmail.com)**

## 🚧 Future Updates

This project is still under active development. Planned features include:
- AI Resume screening for employers
- Web3-based verification (optional)
- Real-time chat between seekers and employers
- Admin analytics dashboard
- Public job feeds and subscriptions

> Stay tuned for more updates and improvements!

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source for educational and portfolio purposes. You are free to fork, contribute, and enhance it.

---

Developed with ❤️ by [SarveshShahane](https://github.com/SarveshShahane)

Last updated: 2025-04-18
