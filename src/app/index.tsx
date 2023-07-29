import { supabase } from "@/supabase/init";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { router } from "expo-router";
export default function Page() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        router.replace("home");
      } else {
        router.replace("login");
      }
    });
  }, []);
}
