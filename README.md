# 🏨 Royal Place — Hotel Management Frontend

## Welcome to the frontend of Royal Place, a modern and responsive hotel management website built with Next.js, TypeScript, and Tailwind CSS. This application provides users with seamless access to essential features like browsing rooms, booking stays, managing profiles, making payments, and exploring hotel amenities — all with a clean and intuitive interface.

## 🚀 Features

- **User Authentication & Role Management**
- **Room Booking System**
- **Aamarpay Payment Integration**
- **Hotel Amenities**
- **Customer Testimonials**
- **Cancellation Prediction Endpoint**

---

## 🛠 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Alauddin-24434/royal-palce-frontend.git
cd royal-palce-frontend
```

### 2. Install Dependencies

This project uses [pnpm](https://pnpm.io/) (recommended), but you can use npm if needed.

#### Using pnpm (recommended):

```bash
pnpm install
```

#### Using npm:

1. **Delete the pnpm lockfile first:**
   ```bash
   rm -rf pnpm-lock.yaml
   ```
2. **Then install dependencies:**
   ```bash
   npm install
   ```

> **Warning:** Do **not** mix pnpm and npm in the same project.

---

## 🚀 Running the Project

### Development

```bash
pnpm run dev
# or
npm run dev
```

.env

```bash
NEXT_PUBLIC_API_BASE_URL=your backednd url add hare
JWT_ACCESS_TOKEN_SECRET=your jwtsecrect add hare but must be same as backend and clint same sercet
```

### Production

```bash
pnpm run build && pnpm start
# or
npm run build && npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📫 Contact

For questions or support, please contact [alauddin150900@gmail.com].
