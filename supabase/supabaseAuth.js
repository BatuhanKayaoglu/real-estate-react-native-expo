import { supabase } from "./supabaseClient"; 

async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Kayıt başarısız:", error.message);
    return { success: false, error };
  }

  console.log("Kayıt başarılı:", data);
  return { success: true, data };
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Giriş başarısız:", error.message);
    return { success: false, error };
  }

  console.log("Giriş başarılı:", data);
  return { success: true, data };
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Çıkış başarısız:", error.message);
    return { success: false, error };
  }

  console.log("Çıkış başarılı");
  return { success: true };
}

async function  getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export const supabaseAuth = {
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getUser,
};
