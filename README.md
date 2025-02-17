# employee-management-lit
📌 Features
1️⃣ List All Employee Records
✔️ Displays employee records in two formats: Table View & List View
✔️ Allows switching between table and list views
✔️ Pagination functionalities
✔️ Each record has Edit & Delete options

2️⃣ Add a New Employee Record
✔️ Web component for adding employees
✔️ User fills in required fields:

First Name, Last Name
Date of Employment, Date of Birth
Phone Number, Email Address
Department (Analytics, Tech)
Position (Junior, Medior, Senior)
✔️ Validation rules to ensure data correctness
✔️ Navigates back to employee list after successful creation

3️⃣ Edit an Existing Employee Record
✔️ Web component for editing employee details
✔️ Pre-fills existing data for updates
✔️ Prompts user before updating
✔️ Navigates back to employee list after successful edit

4️⃣ Delete an Employee Record
✔️ Delete an employee from the list
✔️ Confirmation prompt before deletion
✔️ List updates automatically after deletion

⚡ Additional Functionalities
🗺️ Navigation
✔️ Navigation Menu Component for seamless movement across pages
✔️ Implemented Vaadin Router for smooth page transitions

📱 Responsive Design
✔️ Fully responsive UI without Bootstrap or any CSS framework
✔️ Designed for desktop & mobile views

🌍 Localization (Multi-language Support)
✔️ Supports Turkish 🇹🇷 & English 🇬🇧
✔️ Language preference is detected from the HTML <lang> attribute


💾 State Management
✔️ Redux Toolkit for storing employee data
✔️ LocalStorage to persist data

🧪 Unit Testing
✔️ 85%+ test coverage using Mocha & Web Test Runner


📦 Tech Stack
LitElement (for UI components)
Redux Toolkit (for state management)
Vaadin Router (for navigation)
LocalStorage (for data persistence)
Mocha & Web Test Runner (for testing)

🚀 Setup & Installation

🔧 Prerequisites
Node.js (v16+ recommended)

npm or yarn
📥 Clone Repository
sh
git clone https://github.com/ayseverr/employee-management-lit.git
cd employee-management-lit

📦 Install Dependencies
sh
npm install
▶️ Run Development Server
sh
npm run dev
App runs on: http://localhost:8000

🛠️ Run Tests
sh
npm run test
📝 Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m "Add new feature")
Push to your branch (git push origin feature-branch)
Open a Pull Request
📜 License
MIT License

💡 Author: Aygül

🔥 A powerful, minimal, and efficient employee management app using LitElement. 🚀
