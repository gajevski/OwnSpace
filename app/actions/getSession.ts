import { getServerSession, Session } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function getSession(): Promise<Session | null> {
  return await getServerSession(options);
}
