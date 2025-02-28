import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../supabase/supabaseClient";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MessageScreen({ route }) {
  const { listingId, listOwnerId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("storedUserId:", storedUserId);
      setUserId(storedUserId);

      console.log("userId:", storedUserId);
      console.log("listOwnerId:", listOwnerId);
      console.log("listingId:", listingId);

      if (storedUserId) {
        await fetchMessages(storedUserId);
        setupRealtimeSubscription(storedUserId);
      }
    })();

    return () => {
      supabase.removeAllChannels();
    };
  }, [listingId, listOwnerId]);

  const fetchMessages = async (currentUserId) => {
    if (!currentUserId) return;
  
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
      .eq("listing_id", listingId)
      .order("created_at", { ascending: true });
  
    if (!error) {
      setMessages(data);
    }
  };
  
  const setupRealtimeSubscription = (currentUserId) => {
    const subscription = supabase
      .channel("user_messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          console.log("Yeni mesaj:", newMessage);

          if (
            (newMessage.sender_id === currentUserId && newMessage.receiver_id === listOwnerId) ||
            (newMessage.sender_id === listOwnerId && newMessage.receiver_id === currentUserId) ||
            (newMessage.sender_id ===listOwnerId && newMessage.sender_id === currentUserId)
          ) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !userId) return; // Boş mesaj göndermeyi önle
    
    const isListingOwner = userId === listOwnerId; // Kullanıcı ilan sahibi mi?
  
    let correctReceiverId = listOwnerId; // Varsayılan olarak ilan sahibine mesaj gider
  
    if (isListingOwner) {
      // Eğer ilan sahibi isek, ilk mesaj atan kişiye cevap veriyoruz
      const firstMessage = messages.find(msg => msg.sender_id !== userId);
      if (firstMessage) {
        correctReceiverId = firstMessage.sender_id; // İlk mesaj atan kişiye cevap gitmeli
      }
    }
  
    console.log("Gönderen ID:", userId);
    console.log("Alıcı ID:", correctReceiverId);
  
    const { error } = await supabase.from("messages").insert([
      {
        sender_id: userId,
        receiver_id: correctReceiverId,
        listing_id: listingId,
        content: newMessage.trim(),
        is_read: false,
      },
    ]);
  
    if (!error) {
      setNewMessage("");
    }
  };
  

  const renderMessage = ({ item }) => {
    const isSender = item.sender_id === userId;
    return (
      <View
        style={[
          styles.messageBubble,
          isSender ? styles.sender : styles.receiver,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.created_at).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={28} color="#007bff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  sender: {
    backgroundColor: "#d1e7dd",
    alignSelf: "flex-end",
  },
  receiver: {
    backgroundColor: "#e2e3e5",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 65,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});
