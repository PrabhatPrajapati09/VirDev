import { redirect } from "react-router-dom";

export async function authLoader() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  try {
    const res = await fetch(`${backendUrl}/api/user/data`, {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.success) {
        return data.userData; // available in Home via useLoaderData()
      }
    }
  } catch (_) {}

  // if not authenticated → redirect to /login
  throw redirect("/login");
}
