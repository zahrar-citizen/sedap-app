import axios from "axios";

const API_URL = "https://yxcjyibnruliodfqifkn.supabase.co/rest/v1/note";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Y2p5aWJucnVsaW9kZnFpZmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTUxNjYsImV4cCI6MjA2NTE5MTE2Nn0.ZK4lPDTATs5SPHBQ8shxoQ5BUxNR6sahUK1UC5KkogI"; // pastikan ini valid

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const notesAPI = {
  async fetchNotes() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createNote(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteNote(id) {
    const url = `${API_URL}?id=eq.${id}`;
    await axios.delete(url, { headers });
  },
};
