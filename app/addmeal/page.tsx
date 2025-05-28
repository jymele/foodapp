import Form from "next/form";
import submitMeal from "./action";
import SubmitButton from "@/custom/SubmitButton";
import { SendHorizontal } from "lucide-react";

export default function AddMealPage() {
  return (
    <div className="mt-14 container mx-auto p-2">
      <Form action={submitMeal} className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-semibold mb-4">Add Meal</h1>
        <input name="meal-name" placeholder="Meal Name" className="input" />
        <input type="date" name="date" className="input" />
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
