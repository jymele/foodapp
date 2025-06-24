import { auth } from "@/auth";
import ProfileImage from "@/app/ui/ProfileImage";

export default async function Page() {
  const session = await auth();

  return (
    <div className="p-1 min-h-dvh flex flex-col gap-2">
      <div className="bg-teal-800 primary h-48 w-full rounded-lg p-2"></div>
      <div className="flex-1 relative p-2">
        <div className="md:-mt-16 md:ml-4 md:flex md:items-end">
          <ProfileImage
            imgSrc={session!.user!.image as string}
            name={session!.user!.name as string}
          />
          <div className="p-2 text-center md:text-left md:mb-3">
            <h2 className="text-2xl font-semibold">{session!.user?.name}</h2>
            <h3 className="text-base font-medium opacity-70">
              {session!.user?.email}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
