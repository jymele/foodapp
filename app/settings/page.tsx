import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import { auth } from "@/auth";
import SignOut from "@/custom/signout";
import Navigation from "@/custom/Navigation";

export default async function ProfilePage() {
  checkIfLoggedIn();

  const session = await auth();

  return (
    <div className="page flex flex-col gap-2">
      <div className="flex flex-row-reverse mb-6">
        <Navigation session={session} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1>{session!.user?.name}</h1>
          <div>
            <SignOut />
          </div>
        </div>

        <p>This is the profile page.</p>
      </div>
    </div>
  );
}
