"use server";

// import { revalidatePath } from "next/cache";

export default async function submitMeal(formdata: FormData) {
  const mealName = formdata.get("meal-name") as string;
  const mealType = formdata.get("meal-type") as string;
  const date = formdata.get("date") as string;
  const description = formdata.get("description") as string;

  console.log("Meal Name:", mealName);
  console.log("Meal Type:", mealType);
  console.log("Date:", date);
  console.log("Description:", description);

  //   revalidatePath("/addmeal");
}
