import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { createTask } from "../../api/task.api";
import { getUsers } from "../../api/user.api";

import { useAuth } from "../../hooks/useAuth";

import {
  createTaskSchema,
  type CreateTaskFormData,
} from "../../utils/validation";

function CreateTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: user?.role === "ADMIN",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  });

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      toast.success("Task created successfully");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      navigate("/tasks");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to create task"
        );
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (data: CreateTaskFormData) => {
    mutation.mutate({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: new Date(data.dueDate).toISOString(),

      assignedUserIds:
        user?.role === "ADMIN"
          ? selectedUsers
          : [],
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <h1 className="mb-8 text-3xl font-bold">
          Create Task
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
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
            <option value="">Select Priority</option>

            <option value="LOW">LOW</option>

            <option value="MEDIUM">MEDIUM</option>

            <option value="HIGH">HIGH</option>
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
            Create Task
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default CreateTask;