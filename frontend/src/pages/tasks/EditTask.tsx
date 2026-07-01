import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import MultiSelect from "../../components/common/MultiSelect";

import {
  getTaskById,
  updateTask,
} from "../../api/task.api";

import { getUsers } from "../../api/user.api";

import { useAuth } from "../../hooks/useAuth";

import {
  createTaskSchema,
  type CreateTaskFormData,
} from "../../utils/validation";

function EditTask() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const [selectedUsers, setSelectedUsers] =
    useState<number[]>([]);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: user?.role === "ADMIN",
  });

  const { data: task } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(Number(id)),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (!task) return;

    reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split("T")[0],
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedUsers(
      task.assignments.map(
        (assignment) => assignment.user.id
      )
    );
  }, [task, reset]);

  const mutation = useMutation({
    mutationFn: (data: CreateTaskFormData) =>
      updateTask(Number(id), {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: new Date(
          data.dueDate
        ).toISOString(),

        assignedUserIds:
          user?.role === "ADMIN"
            ? selectedUsers
            : [],
      }),

    onSuccess: () => {
      toast.success("Task updated");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task", id],
      });

      navigate(`/tasks/${id}`);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Update failed"
        );
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  if (!task) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <h1 className="mb-8 text-3xl font-bold">
          Edit Task
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) =>
            mutation.mutate(data)
          )}
        >
          <Input
            label="Title"
            error={errors.title?.message}
            {...register("title")}
          />

          <Input
            label="Description"
            error={errors.description?.message}
            {...register("description")}
          />

          <Select
            label="Priority"
            error={errors.priority?.message}
            {...register("priority")}
          >
            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>
          </Select>

          <Input
            type="date"
            label="Due Date"
            error={errors.dueDate?.message}
            {...register("dueDate")}
          />

          {user?.role === "ADMIN" && (
            <MultiSelect
              users={users.filter(
                (u) => u.id !== user.id
              )}
              selected={selectedUsers}
              onChange={setSelectedUsers}
            />
          )}

          <Button
            loading={mutation.isPending}
            type="submit"
          >
            Update Task
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditTask;