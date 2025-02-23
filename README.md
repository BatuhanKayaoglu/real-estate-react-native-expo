# 📱 Real Estate App (React Native & Expo)

A modern and feature-rich real estate application built using **React Native** and **Expo**, designed to provide a seamless property buying, selling, and renting experience. Inspired by platforms like **Sahibinden.com**, this app allows users to post listings, manage favorites, receive real-time notifications, and make offers through an integrated messaging system.

Whether you're looking to buy your dream home or list a property for sale, this app makes the process smooth, intuitive, and efficient.

---

## 🚀 Features

### 🔐 **User Authentication**  
- Secure **Login** and **Register** functionality.
- Uses `react-native-async-storage/async-storage` to store `userId` and authentication `token` securely on the device.
- Session management with persistent login functionality.

### 🏠 **Post Property Listings**  
- Users can create, edit, and delete property listings.
- Upload images, set pricing, and provide detailed descriptions.
- Categorize listings as **for sale** or **for rent**.

### ⭐ **Add Listings to Favorites**  
- Quickly add interesting listings to a personal favorites list.
- Easy access to favorite properties from a dedicated favorites section.

### 📉 **Price Drop Notifications**  
- Automatically notifies users when the price of a favorited listing drops.
- Real-time push notifications ensure that users never miss out on great deals.

### 💬 **Real-Time Messaging System**  
- Contact property owners directly via real-time chat.
- Make offers and negotiate directly within the app.
- Utilizes Supabase's real-time database functionality for seamless communication.

### 🔔 **Push Notifications**  
- Uses `expo-notifications` for sending real-time updates and alerts.
- Receive notifications for messages, offers, or important app updates.

---

## 🛠️ Tech Stack

This application utilizes a modern technology stack to ensure performance, scalability, and maintainability:

- **React Native** & **Expo** → Cross-platform mobile app development  
- **Redux Toolkit (RTK) Query** → Efficient state management and API handling  
- **Supabase** → Backend as a service (BaaS) for real-time data handling and authentication  
- **AsyncStorage** → Secure local storage for tokens and user data  
- **Expo Notifications** → Real-time push notification service  


---

## ⚙️ Installation

Follow these steps to get the app running locally:

```bash
# Clone the repository
git clone https://github.com/your-username/real-estate-app.git

# Navigate into the project directory
cd real-estate-app

# Install dependencies
npm install

# Start the Expo development server
expo start
