import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.routes";
import testRoutes from "./routes/test.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();

app.use(express.json());

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Подключаем роуты
app.use("/api/users", userRoutes);
app.use("/api/results", testRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
