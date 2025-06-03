import { Meal } from "@/generated/prisma";
import appSettings from "@/appsettings";

type Props = {
  meal: Meal;
};

export default function MealCard(props: Props) {
  const { meal } = props;

  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
      <h2 className="font-semibold leading-none tracking-tight mb-4 text-slate-950">
        {meal.name}
      </h2>
      <div className="mt-0 text-sm">{meal.date.toDateString()}</div>
      {meal.description && (
        <div className="mt-0 text-sm">{meal.description}</div>
      )}
      <div className="mt-0 text-sm">Added by: {meal.addedByEmail}</div>
    </div>
  );
}
