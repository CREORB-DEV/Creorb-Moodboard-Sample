import { createClient } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(200).json({ message: "Logout successful" });
    }

    const token = authHeader.substring(7);
    const supabase = createClient(req, res);

    const { error } = await supabase.auth.admin.signOut(token);

    if (error) {
      console.error("Logout error:", error);
    }

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout exception:", error);
    return res.status(200).json({ message: "Logout successful" });
  }
}
