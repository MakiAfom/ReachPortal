import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();

const supabase = createClient(
  "https://ptbzierbjcvjbhvcasir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YnppZXJiamN2amJodmNhc2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxMzQ4NTksImV4cCI6MjAxOTcxMDg1OX0.6RiBBOv62clJICh8mcHvKJggL_MR22lUqh-wU1o9H1Y"
);

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
