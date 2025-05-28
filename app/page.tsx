import SignIn from "@/custom/signin";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
