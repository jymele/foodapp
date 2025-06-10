import { PrismaClient } from "@/generated/prisma";

export async function POST(request: Request) {
  const { id } = await request.json();
  const prisma = new PrismaClient();
  //   console.log("Id is ", id);

  if (!id) {
    throw new Error("Meal id is not provided");
  }

  const response = await prisma.meal.delete({ where: { id: id as string } });
  //   console.log(response);

  return Response.json({ response });
}
