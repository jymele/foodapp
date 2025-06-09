import Form from "next/form";
import submitMeal from "./action";
import SubmitButton from "@/custom/SubmitButton";
import { auth } from "@/auth";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import appSettings from "@/appsettings";

export default async function AddMealPage() {
  const session = await auth();

  // use the user email to find the room the user is in

  checkIfLoggedIn();

  return (
    <div className="page">
      <Form action={submitMeal} className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-semibold mb-4">Add Meal</h1>
        <input
          name="meal-name"
          placeholder="Meal Name"
          className="input"
          required
        />
        <input
          type="date"
          name="date"
          className="input w-full"
          defaultValue={new Date().toLocaleDateString(
            appSettings.defaultLanguage
          )}
        />
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
        <SubmitButton classes="px-3.5 py-2.5 rounded-lg shadow-sm bg-slate-900 text-slate-50 flex items-center gap-2 justify-center hover:bg-slate-700 disabled:bg-slate-500">
          <div>Send</div>
        </SubmitButton>
      </Form>
    </div>
  );
}
