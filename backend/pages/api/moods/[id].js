import { createClient } from "../../../lib/supabase";

export default async function handler(req, res) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.substring(7);
  const { id } = req.query;
  
  // Create Supabase client with the access token
  const supabase = createClient(req, res, token);

  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth error:", authError);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("moods")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        return res.status(404).json({ error: "Mood not found" });
      }

      return res.status(200).json({ mood: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    const { mood, note, date } = req.body;

    try {
      const { data, error } = await supabase
        .from("moods")
        .update({
          mood,
          note,
          date,
        })
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Mood not found" });
      }

      return res.status(200).json({ mood: data[0] });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { error } = await supabase
        .from("moods")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ message: "Mood deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
