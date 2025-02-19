import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { supabase } from "../../supabase/supabaseClient";

export const registerPushToken = async (userId) => {
  // if (!Device.isDevice) {
  //   throw new Error(
  //     "Push bildirimleri sadece fiziksel cihazlarda desteklenir."
  //   );
  // }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Bildirim izni reddedildi.");
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // Supabase'e token'ı kaydet
  const { error } = await supabase
    .from("push_tokens")
    .upsert([{ user_id: userId, expo_push_token: token }]);

  if (error) throw error;

  return token;
};

export const sendPushNotification = async (userId, title, body) => {
  console.log("sendPushNotification", userId, title, body);
  const { data: tokens, error } = await supabase
    .from("push_tokens")
    .select("expo_push_token")
    .eq("user_id", userId);


  if (error || !tokens.length) {
    throw new Error("Kullanıcıya ait push token bulunamadı.");
  }

  const messages = tokens.map(({ expo_push_token }) => ({
    to: expo_push_token,
    sound: "default",
    title,
    body,
  }));

  // Expo push notification servisine bildirim gönderiyoruz ve o da cihazlara iletir.
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  // Gönderilen notification'ı db'ye logluyoruz.
  const { data: notification, error: notificationError } = await supabase
    .from("notifications")
    .insert([{ title: title, body: body, user_id: userId }])
    .select();
};

export const fetchNotifications = async (userId) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
