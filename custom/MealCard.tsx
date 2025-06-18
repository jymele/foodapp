"use client";
import { useState } from "react";
import { Meal } from "@/generated/prisma";
import { Edit2, Trash2, Check, X, LoaderCircle } from "lucide-react";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { slideInVariants } from "@/utils/animations";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  meal: Meal;
  index?: number; // Optional index prop for future use
};

export default function MealCard(props: Props) {
  const { meal, index } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(meal.name);

  return (
    <motion.div
      variants={slideInVariants}
      initial="initial"
      animate="animate"
      custom={index ? index : 0}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {!isEditing ? (
              <Show
                id={meal.id}
                name={editedName}
                switchAction={() => {
                  setIsEditing(true);
                }}
                deleteAction={() => {}}
              />
            ) : (
              <Edit
                name={editedName}
                id={meal.id}
                cancelAction={() => {
                  setIsEditing(false);
                }}
                changeName={setEditedName}
              />
            )}
          </CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <div>
              <span className="text-sm text-muted-foreground">Added by: </span>
              <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-slate-200 text-slate-900 [a&]:hover:bg-secondary/90">
                {meal.created_by_email}
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Scheduled for:{" "}
              </span>
              <span className="text-sm font-medium text-foreground">
                {formatDate(meal.date.toISOString())}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

type ShowProps = {
  id: string;
  name: string;
  switchAction: () => void;
  deleteAction: () => void;
};

function Show({ id, name, switchAction }: ShowProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteItem = async () => {
    setLoading(true);
    await fetch("api/meal/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex-1">{name}</div>

        {/* Switch to edit button */}
        <button
          className="transition duration-150 cursor-pointer flex items-center justify-center rounded-lg h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={switchAction}
        >
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit meal name</span>
        </button>

        {/* Delete button */}
        <button
          onClick={deleteItem}
          aria-disabled={loading}
          disabled={loading}
          className="cursor-pointer transition duration-150 flex items-center justify-center rounded-lg h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          {!loading ? (
            <>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete meal</span>
            </>
          ) : (
            <>
              <LoaderCircle className="animate-spin" />
              <span className="sr-only">Loading...</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

type EditProps = {
  id: string;
  name: string;
  cancelAction: () => void;
  changeName: (name: string) => void;
};

function Edit({ id, name, cancelAction, changeName }: EditProps) {
  const [loading, setLoading] = useState(false);
  const [mealname, setMealName] = useState(name);

  const updateItem = async () => {
    setLoading(true);
    await fetch("api/meal/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: mealname }),
    });
    setLoading(false);
    changeName(mealname);
    cancelAction();
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex gap-2 items-center">
          <input type="hidden" value={id} name="meal-id" />
          <Input
            type="text"
            onChange={(e) => setMealName(e.target.value)}
            defaultValue={mealname}
            name="meal-name"
            className="flex-1"
          />

          {/* Edit button */}
          <button
            onClick={updateItem}
            aria-disabled={loading}
            disabled={loading}
            className="cursor-pointer transition duration-150 flex items-center justify-center rounded-lg h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Cancel meal editting</span>
          </button>
        </div>

        {/* Switch to edit button */}
        <button
          className="transition duration-150 cursor-pointer flex items-center justify-center rounded-lg h-8 w-8 p-0 text-slate-600 hover:text-slate-700 hover:bg-slate-50"
          onClick={cancelAction}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cancel meal edit</span>
        </button>
      </div>
    </>
  );
}
