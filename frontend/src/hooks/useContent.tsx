import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  async function refresh() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched content:", response.data);
      setContents(response.data.content);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { contents, refresh };
}
