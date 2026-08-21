# RentSpace

RentSpace is a full-stack rental-listing web application inspired by modern accommodation marketplaces. Users can create accounts, publish listings with images, browse listings by category, and leave reviews.

## Features

- User signup, login, and logout with Passport.js
- Create, view, edit, and delete rental listings
- Cloudinary-backed image uploads
- Listing categories and category filtering
- Authenticated reviews with 1–5 star ratings
- Owner-only listing management and author-only review deletion
- Flash messages, validation, custom error pages, and persistent sessions

## Tech stack

- Node.js 22.16.0
- Express 5
- MongoDB and Mongoose
- EJS and EJS-Mate
- Passport.js with `passport-local-mongoose`
- Cloudinary, Multer, and `multer-storage-cloudinary`
- Joi validation

## Prerequisites

- Node.js 22.16.0 or compatible
- A MongoDB database (MongoDB Atlas is recommended)
- A Cloudinary account for listing-image uploads

## Installation

1. Clone the repository and open the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   SECRET=replace-with-a-long-random-session-secret
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   ```

4. Start the application:

   ```bash
   node app.js
   ```

5. Open [http://localhost:8080/listings](http://localhost:8080/listings) in your browser.

## Seeding sample listings

The project includes sample listing data in `init/data.js`. The seed script currently connects to a local MongoDB instance at `mongodb://127.0.0.1:27017/rentspace`.

Start local MongoDB, then run:

```bash
node init/index.js
```

> The seeded listings reference a predefined user ID. Create a matching user or update the `owner` value in `init/index.js` before seeding if needed.

## Project structure

```text
controllers/  Request-handling logic
models/       Mongoose models for users, listings, and reviews
routes/       Express route definitions
views/        EJS templates and shared layouts
public/       Static CSS and client-side JavaScript
init/         Sample data and database seed script
utils/        Error and async-handler utilities
```

## Main routes

| Route | Purpose |
| --- | --- |
| `GET /listings` | Browse listings; supports `?category=<category>` |
| `GET /listings/new` | Show the new-listing form |
| `POST /listings` | Create a listing (authenticated) |
| `GET /listings/:id` | View a listing and its reviews |
| `PUT /listings/:id` | Update a listing (owner only) |
| `DELETE /listings/:id` | Delete a listing (owner only) |
| `POST /listings/:id/reviews` | Add a review (authenticated) |
| `DELETE /listings/:id/reviews/:reviewId` | Delete a review (author only) |
| `/signup`, `/login`, `/logout` | Account and session routes |

## Available categories

`rooms`, `beach`, `trending`, `country_side`, `beach_front`, `swimming_pool`, `iconic_cities`, `omg`, `camping`, `hiking`, and `farms`.

## License

This project is licensed under the ISC License.
