import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { options } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home() {


  const session = await getServerSession(options);
  console.log("session", session);
  // if (!session) redirect("/login")
  return (
    <h1>
      hello
    </h1>
  );
}
