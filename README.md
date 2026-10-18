
# 🌙 Dreamscape — Dream Journal

A full-stack web application to record, organize, and revisit your dreams in a personal and secure space.

Dreamscape lets users maintain a digital dream diary, explore past entries, search dreams, and view them on a calendar. It combines a **Spring Boot REST API** with a **React frontend**, backed by **MySQL**.

---

## ✨ Features

- 🔐 **User Authentication** — Register and log in securely.
- 🛡️ **JWT-Based Security** — Protected APIs using JSON Web Tokens.
- 📝 **Dream Management** — Create, view, edit, and delete dream entries.
- 🔎 **Search Dreams** — Find entries by title.
- 📅 **Dream Calendar** — Browse dreams by date.
- 👤 **Private User Data** — Users can access only their own dreams.
- 🎨 **Dreamy Interface** — A modern interface with a purple and navy aesthetic.

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Java 17, Spring Boot |
| Security | Spring Security, JWT |
| Database | MySQL |
| API Communication | REST API, Axios |
| Build Tools | Maven, npm |

---

## 📁 Project Structure

```text
DreamJournal/
├── src/
│   ├── main/
│   │   ├── java/in/mtk/dreamjournal/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   └── service/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── dream-journal-frontend/
│   ├── public/
│   └── src/
│       ├── context/
│       ├── pages/
│       └── services/
├── pom.xml
└── README.md
```

---

## ⚙️ Prerequisites

Install the following before running the project:

- Java Development Kit (JDK) 17
- Node.js and npm
- MySQL Server
- Git

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MohdTauseefKhan/DreamJournal.git
cd DreamJournal
```

### 2. Configure the MySQL database

Start MySQL and create the database:

```sql
CREATE DATABASE dream_journal;
```

### 3. Configure environment variables

The backend reads its database credentials and JWT signing secret from environment variables.

Set the following variables in your IDE run configuration or terminal:

| Variable | Purpose |
|---|---|
| `DB_URL` | MySQL JDBC URL; optional because a default is configured |
| `DB_USERNAME` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `JWT_SECRET` | Base64-encoded secret used to sign JWTs |

Example PowerShell configuration for the current terminal session:

```powershell
$env:DB_URL = "jdbc:mysql://localhost:3306/dream_journal"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your_mysql_password"
$env:JWT_SECRET = "your_base64_encoded_32_byte_secret"
```

Replace the example values with your own. **Never commit real credentials or secrets to GitHub.**

Generate a random 32-byte Base64 secret in PowerShell:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### 4. Run the Spring Boot backend

From the project root, run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 5. Run the React frontend

Open a **second terminal**:

```powershell
cd dream-journal-frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Keep both the backend and frontend running while using the application.

---

## 🔌 API Overview

The backend exposes REST endpoints under `/api`.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/dreams` | Create a dream |
| `GET` | `/api/dreams` | Retrieve the authenticated user's dreams |
| `PUT` | `/api/dreams/{id}` | Update a dream |
| `DELETE` | `/api/dreams/{id}` | Delete a dream |

Dream endpoints require authentication. Exact request fields and validation rules are defined in the backend DTOs.

---

## 🔒 Security Notes

- Authentication uses JWTs.
- Protected endpoints identify the authenticated user.
- Dream operations are restricted to the owning user.
- Database credentials and JWT signing secrets are supplied through environment variables.
- Never publish production credentials or private signing keys.

---

## 🛣️ Future Improvements

Potential enhancements include:

- Dream tags and mood tracking
- Dream statistics and visual analytics
- Exporting dream entries
- Deployment with a managed database
- Automated backend and frontend tests

---

## 👨‍💻 Author

**Mohd Tauseef Khan**

GitHub: [@MohdTauseefKhan](https://github.com/MohdTauseefKhan)

---

<p align="center">
  Made with ☕, Java, React, and a little imagination 🌙
</p>
