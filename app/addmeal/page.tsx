import Form from "next/form";
import submitMeal from "./action";
import SubmitButton from "@/custom/SubmitButton";
import { auth } from "@/auth";
import appSettings from "@/appsettings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AddMealPage() {
  const session = await auth();

  return (
    <div className="page">
      <Form action={submitMeal} className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-semibold mb-4">Add Meal</h1>
        <Input
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

        <Textarea
          name="description"
          placeholder="Description"
          className="input"
        />
        <SubmitButton classes="">
          <div>Send</div>
        </SubmitButton>
      </Form>
    </div>
  );
}
