# A full-stack notes management application with a bold neubrutalism design aesthetic. Built with React, Node.js, Express, and MongoDB.

## Signup  and Login Page 
<img width="644" height="676" alt="Screenshot 2025-11-21 at 4 04 31 PM" src="https://github.com/user-attachments/assets/03b2b5c7-ce65-4868-a363-45c5c5d59fc7" />
<img width="644" height="676" alt="Screenshot 2025-11-21 at 4 04 53 PM" src="https://github.com/user-attachments/assets/28decb6a-1431-40f5-a963-3368cb8bf687" />

## notes displayed on frontend will look like this 
# user can edit /update or delete notes or create new Notes by enetring title,description and some relevnat tags 
# all crud operation with secure login signup workflow 

<img width="1375" height="716" alt="Screenshot 2025-11-21 at 4 08 22 PM" src="https://github.com/user-attachments/assets/9d07bf0a-de26-4bd7-a6ce-04fc34fe6ad7" />



##  Local Development Setup
### Make sure MongoDB is running on your system (or you have a cloud URI) before starting.
---

###  Step 1: Clone the Repository  
```bash
git clone "https://github.com/kavyakapoor420/Haqdarshak-Stackoverflow-project.git" NotesApp
cd NotesApp

```
### Step 2: Run the Frontend (React + Vite)
```
cd frontend
npm install
npm run dev

```
Frontend available at:
 http://localhost:5173

### Step 3: Run the Node.js Backend (Authentication & REST APIs)
```
cd ..
cd backend
npm install
nodemon app.js
```

Node backend running at:
 http://localhost:5000