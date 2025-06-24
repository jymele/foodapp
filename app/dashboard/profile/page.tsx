import { auth } from "@/auth";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  return (
    <div className="p-1 min-h-dvh flex flex-col gap-2">
      <div className="bg-teal-800 primary h-48 w-full rounded-lg p-2">
        <Image
          src={session!.user!.image as string}
          height="500"
          width="500"
          className="rounded-full w-24 h-24 ring-2 ring-slate-50"
          alt={session!.user!.name as string}
          priority
        />
      </div>
      <div className="flex-1">
        <div className="text-2xl font-bold">
          <h2 className="text-2xl font-semibold">{session!.user?.name}</h2>
          <h3 className="text-base font-medium opacity-70">
            {session!.user?.email}
          </h3>
        </div>
      </div>
    </div>
  );
}
