import { Meal } from "@/generated/prisma";

type Props = {
  meal: Meal;
};

export default function MealCard(props: Props) {
  const { meal } = props;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold leading-none tracking-tight text-slate-950">
          {meal.name}
        </h2>
        <div className="mt-0 text-xs">
          {new Date(meal.date).toISOString().slice(0, 10)}
        </div>
      </div>
      {meal.description && (
        <div className="mt-0 text-sm mb-2">{meal.description}</div>
      )}
      <div className="mt-0 text-xs italic">{meal.created_by_email}</div>
    </div>
  );
}
