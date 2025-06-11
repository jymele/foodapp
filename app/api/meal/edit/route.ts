import { PrismaClient } from "@/generated/prisma";

export async function POST(request: Request) {
  const { id, name } = await request.json();
  const prisma = new PrismaClient();

  const response = await prisma.meal.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return Response.json({ response });
}
