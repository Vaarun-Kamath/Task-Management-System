"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });
  const user = session?.user;

  useLayoutEffect(() => {
    const fetchData = () => {
        try {
            console.log("SESS", session);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [session]);

  return (
    <section className="flex flex-row gap-5 mt-4">
      <div>Hello {user?.email}</div>
      <div>Hello {JSON.stringify(user)}</div>
      <div>Hello {JSON.stringify(session)}</div>
    </section>
  );
}
