import { Router } from "express";
import webpush from "web-push";

import dotenv from "dotenv";
dotenv.config();

const router = Router();

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webpush.setVapidDetails(
  "mailto:you@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 🔔 Временное хранилище подписок (можно заменить на БД)
let subscriptions: webpush.PushSubscription[] = [];

// POST /api/notifications — сохранить подписку
router.post("/", (req: any, res: any) => {
  const subscription = req.body;
  console.log(subscription, vapidKeys)

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: "Некорректная подписка" });
  }

  subscriptions.push(subscription);
  console.log("✅ Подписка добавлена:", subscription.endpoint);

  res.sendStatus(201);
});

// POST /api/notifications/notify — отправить уведомления всем
router.post("/notify", async (req, res) => {
  const payload = JSON.stringify({
    title: "Пройди новый тест!",
    body: "Случайный тест уже ждёт тебя!",
    icon: "/tests/default.svg",
  });

  let success = 0;

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
      success++;
    } catch (err) {
      console.error("❌ Ошибка отправки:", err);
      // Можно удалить невалидные подписки
    }
  }

  res.json({ sent: success, total: subscriptions.length });
});

export default router;
