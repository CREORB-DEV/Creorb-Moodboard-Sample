import { createClient } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const supabase = createClient(req, res);

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    });

    if (error) {
      console.error("Refresh error:", error);
      return res.status(401).json({ error: error.message });
    }

    return res.status(200).json({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Refresh exception:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
