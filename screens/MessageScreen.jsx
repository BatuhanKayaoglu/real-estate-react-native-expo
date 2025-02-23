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
  const { listingId, recipientId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    (async () => {
      const storedUserId = await AsyncStorage.getItem("userId"); 
      setUserId(storedUserId); // userId'yi güncelliyoruz

      console.log("userId", storedUserId);
      console.log("recipientId", recipientId);
      console.log("listingId", listingId);

      await fetchMessages(storedUserId);

      // Gerçek zamanlı mesaj dinleme
      const messageSubscription = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          (payload) => {
            if (
              (payload.new.sender_id === storedUserId &&
                payload.new.receiver_id === recipientId) ||
              (payload.new.sender_id === recipientId &&
                payload.new.receiver_id === storedUserId)
            ) {
              setMessages((prevMessages) => [...prevMessages, payload.new]);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(messageSubscription);
      };
    })();
  }, [recipientId]);

  const fetchMessages = async (currentUserId) => {
    if (!currentUserId) return; // userId yoksa işlem yapma

    const { data, error } = await supabase
  .from("messages")
  .select("*")
  .eq("sender_id", currentUserId) // currentUserId ile eşleşen sender_id
//   .eq("receiver_id", recipientId) // recipientId ile eşleşen receiver_id
  .eq("listing_id", listingId) // listingId ile eşleşen listing_id
  .order("created_at", { ascending: true });


    if (!error) {
      setMessages(data);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !userId) return; // userId yoksa gönderme

    const { error } = await supabase.from("messages").insert([
      {
        sender_id: userId,
        receiver_id: recipientId,
        listing_id: listingId,
        message: newMessage.trim(),
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
