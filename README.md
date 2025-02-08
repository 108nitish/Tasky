# **📌 Task Manager Web Application**

## **🚀 Overview**
A powerful and user-friendly **Task Manager Web Application** designed to streamline task management with features like user authentication, task categorization, email reminders, and a responsive UI.


[Visit My Website](https://nitish-drolia.onrender.com/) (This may take some time to load)


---

## **🛠️ Tools and Technologies**
### **Frontend:**
- HTML, CSS, JavaScript
- EJS for templating

### **Backend:**
- Node.js, Express.js

### **Database:**
- MongoDB

### **Dependencies:**
- `bcrypt / bcryptjs` → Secure password hashing
- `body-parser` → Parsing incoming request bodies
- `cookie-parser` → Managing authentication cookies
- `cors` → Enabling cross-origin requests
- `dotenv` → Handling environment variables
- `jsonwebtoken` → JWT-based user authorization
- `express-session` → Managing user sessions
- `method-override` → Supporting PUT & DELETE in forms
- `mongoose` → Database modeling and querying
- `node-cron` → Automating scheduled tasks
- `nodemailer` → Sending email reminders
- `nodemon` → Auto-restarting the server during development

---

## **✨ Key Features**
### **🔐 User Authentication and Authorization:**
- **Registration:** Secure sign-up with bcrypt password hashing
- **Login:** Token-based authentication with JWT

### **📋 Task Management:**
- **Home Page:** Displays tasks categorized by due dates (Today, Tomorrow, Next 3 Days)
- **Add Task:** Create tasks with priority levels, due dates, and descriptions
- **View All Tasks:** Organized task list with filtering options
- **Completed Tasks:** Dedicated section for completed tasks

### **📝 Notes Feature:**
- Users can add and manage personal notes for better organization

### **⏰ Task Reminder System:**
- Automatic email reminders sent at **8 AM daily** for upcoming tasks

### **📱 Responsive Design:**
- Optimized for all devices with a clean and intuitive UI

---

## **🔧 Methodology**
### **🔹 Backend Development:**
- Developed a **RESTful API** using **Express.js** to handle authentication and task operations
- Used **bcrypt** for secure password hashing and **JWT** for user authentication
- Created modular routes for **registration, login, task creation, and retrieval**
- Enabled HTTP verbs like **PUT and DELETE** using **method-override**

### **🔹 Frontend Integration:**
- Dynamic **EJS templates** for rendering content based on real-time data
- Pages for **registration, login, task creation, and task tracking**
- Color-coded task statuses for enhanced UX
- Fully responsive design for seamless access across devices

### **🔹 Database Integration:**
- **MongoDB** used for storing user data, tasks, and notes
- Structured schema for **user authentication and task categorization**
- Optimized queries to fetch tasks dynamically

### **🔹 Task Scheduling:**
- **node-cron** schedules automated email reminders at **8 AM daily**
- **nodemailer** sends emails for pending and in-progress tasks
- Fallback mechanisms for handling email failures

### **🔹 Testing & Debugging:**
- **Unit testing** for APIs related to authentication & task operations
- **Integration testing** for backend, frontend, and database communication
- Cross-browser & cross-device testing for UI responsiveness
- Error handling for **expired JWT tokens, invalid credentials, and duplicate tasks**

### **🔹 Security Measures:**
- Secure storage of **hashed passwords** with bcrypt
- JWT-based encrypted tokens for **authentication**
- **Environment variables** (`dotenv`) for managing sensitive credentials

### **🔹 Error Handling & Logging:**
- Centralized **error handling** for better debugging
- Logging mechanisms for **tracking server issues and email failures**

---

## **📥 Installation & Setup**

### **Prerequisites:**
- Install **Node.js** and **MongoDB** on your system
- Clone the repository:
  ```sh
  git clone https://github.com/yourusername/projectname.git
  cd projectname
  ```

### **Install Dependencies:**
```sh
npm install
```

### **Run the Project:**
```sh
npm start
```

---

## **📌 Usage**
- **Register/Login** to access your personal task manager
- **Create and manage** tasks with priority levels
- **Receive email reminders** for upcoming tasks
- **Mark tasks as completed** to track progress
- **Use the notes section** for personal memos

---
 

## **📩 Contact**
For any queries or feedback, feel free to reach out:
📧 Email: [your-email@example.com](mailto:nitishjangra31@gmail.com)  
🔗 GitHub: [github.com/yourusername](https://github.com/108nitish)  
📌 LinkedIn: [linkedin.com/in/yourusername](https://linkedin.com/in/nitish-jangra-93716b320/)

---

_🌟 Thank you for checking out this project! Happy Coding! 🚀_

