# Support Ticketing CRM

A full-stack customer support ticketing system — create tickets, search and filter them, view details, add notes, and update status.

**Live app:** _add deployed frontend URL here_
**Demo video:** _add YouTube/demo link here_

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Image uploads:** Cloudinary
- **Deployment:** Render (backend Web Service + frontend Static Site)

## Features

- Create tickets with customer name, email, subject, description, and an optional image attachment
- Auto-generated ticket ID (`TKT-001`, `TKT-002`, ...) and timestamps
- List all tickets with ID, customer, subject, status, and relative "time ago" created date
- Live search-as-you-type (name, ID, email, description) and status filter (Open / In Progress / Closed)
- Ticket detail page with full description, attached image (click to zoom), and a notes timeline
- Update ticket status and add notes from the detail page

## Project Structure

```
.
├── backend/     # Express API + MongoDB models
└── frontend/    # React + Vite client
```

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your MongoDB and Cloudinary credentials
npm run dev             # starts on http://localhost:5050
```

Required environment variables (`backend/.env`):

| Variable                | Description                                  |
| ----------------------- | -------------------------------------------- |
| `PORT`                  | Port to run the server on (defaults to 5050) |
| `MONGODB_URI`           | MongoDB Atlas connection string              |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                        |

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # point at your running backend
npm run dev             # starts on http://localhost:5173
```

Required environment variables (`frontend/.env`):

| Variable       | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API (e.g. `http://localhost:5050` in dev, your deployed backend URL in production) |

## API Endpoints

| Method | Endpoint                  | Description                                                                                          |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `POST` | `/api/tickets`            | Create a ticket. Body: `customer_name, customer_email, subject, description`, optional `image` file. |
| `GET`  | `/api/tickets`            | List tickets. Query params: `status`, `search` (both optional).                                      |
| `GET`  | `/api/tickets/:ticket_id` | Get full ticket details, including notes.                                                            |
| `PUT`  | `/api/tickets/:ticket_id` | Update status and/or add a note. Body: `status`, `notes`.                                            |
