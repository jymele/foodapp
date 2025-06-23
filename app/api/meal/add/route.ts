import { PrismaClient } from "@/generated/prisma";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const { mealName, userEmail, mealDate } = await request.json();

  // Get the room ID for the user
  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: userEmail },
  });

  if (!userHousehold) {
    return Response.json({
      ok: false,
      status: 400,
      message: "User is not assigned to any household.",
    });
  }

  await prisma.meal.create({
    data: {
      name: mealName,
      // type: mealType,
      date: new Date(mealDate),
      description: "",
      household_id: userHousehold.household_id,
      created_by_email: userEmail,
    },
  });

  return Response.json({
    ok: true,
    status: 200,
    message: "Meal added successfully",
  });
}
