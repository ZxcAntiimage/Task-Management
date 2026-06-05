"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main");
  }, [router]);

  return (
    <div className="">
      <h1>Redirecting...</h1>
    </div>
  )
}
