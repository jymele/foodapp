import Form from "next/form";
import submitMeal from "./action";
import SubmitButton from "@/custom/SubmitButton";
import { SendHorizontal } from "lucide-react";
import { auth } from "@/auth";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";

export default async function AddMealPage() {
  const session = await auth();

  // use the user email to find the room the user is in

  checkIfLoggedIn();

  return (
    <div className="mt-14 container mx-auto p-2">
      <Form action={submitMeal} className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-semibold mb-4">Add Meal</h1>
        <input name="meal-name" placeholder="Meal Name" className="input" />
        <input type="date" name="date" className="input" />
        <input
          type="hidden"
          name="user-email"
          value={session!.user!.email as string}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input"
        />
        <SubmitButton>
          <SendHorizontal />
        </SubmitButton>
      </Form>
    </div>
  );
}
