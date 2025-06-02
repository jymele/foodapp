import { Meal } from "@/generated/prisma";

type Props = {
  meal: Meal;
};

export default function MealCard(props: Props) {
  const { meal } = props;

  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
      <h2 className="font-semibold leading-none tracking-tight mb-4">
        {meal.name}
      </h2>
      <div>{new Date(meal.date).toLocaleDateString()}</div>
      {meal.description && <div className="mt-0">{meal.description}</div>}
      <div>Added by: {meal.addedByEmail}</div>
    </div>
  );
}
