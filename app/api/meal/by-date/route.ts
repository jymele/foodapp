import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const householdId = searchParams.get("householdId");

    if (!date || !householdId) {
      return NextResponse.json(
        { error: "Date and household ID are required" },
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();
    const selectedDate = new Date(date);

    // Set to start of day for consistent comparison
    selectedDate.setHours(0, 0, 0, 0);

    const meals = await prisma.meal.findMany({
      where: {
        household_id: householdId,
        date: selectedDate,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ meals });
  } catch (error) {
    console.error("Error fetching meals by date:", error);
    return NextResponse.json(
      { error: "Failed to fetch meals" },
      { status: 500 }
    );
  }
}
