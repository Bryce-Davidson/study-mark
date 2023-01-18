import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jhyylvxwqnxfhlmmbolv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoeXlsdnh3cW54ZmhsbW1ib2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQwMzY5OTUsImV4cCI6MTk4OTYxMjk5NX0.LhLA8i1_qpAxlc3HwPkrfhzg4HWrCRq1fvuE0P1brAU"
);
