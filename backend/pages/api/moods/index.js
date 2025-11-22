import { createClient } from "../../../lib/supabase";

export default async function handler(req, res) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.substring(7);
  
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
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ moods: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { mood, note, date } = req.body;

    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    try {
      const { data, error } = await supabase
        .from("moods")
        .insert([
          {
            user_id: user.id,
            mood,
            note: note || "",
            date: date || new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ mood: data[0] });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
