import type { Route } from "./+types/home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";

import Dashboard from "~/components/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Continental Post" },
    { name: "Stories from around the globe" },
  ];
}

export default function Home() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
    });
  }, []);

  return <Dashboard />;
}
