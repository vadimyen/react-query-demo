import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  User as UserType,
  UserPreview,
  useUpdateUserMutation,
  useUserQuery,
} from "./queries";

export type UserProps = {
  preview: UserPreview;
};

type Form = Omit<UserType, "id" | "avatar">;

export const User: FC<UserProps> = ({ preview }) => {
  const [open, setOpen] = useState(false);
  const { data: user, isLoading: isUserLoading } = useUserQuery(preview.id, {
    enabled: open,
  });
  const { register, handleSubmit } = useForm<Form>();
  const { mutate, isLoading: isMutationLoading } = useUpdateUserMutation();

  const submitDisabled = isMutationLoading || isMutationLoading;

  const onSubmit = (values: Form) =>
    user
      ? mutate(
          { id: user.id, payload: values },
          {
            onSuccess: (_, variables) => {
              toast.success(`User #${variables.id} updated`);
            },
            onError: (_, variables) => {
              toast.error(`User hasn't been #${variables.id} updated`);
            },
          }
        )
      : undefined;

  return (
    <article>
      <details open={open} onToggle={() => setOpen((prev) => !prev)}>
        <summary>
          #{preview.id} {preview.email}
        </summary>
        {user && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">Name</label>
              <input {...register("name")} defaultValue={user.name} />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input {...register("phone")} defaultValue={user.phone} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input {...register("email")} defaultValue={user.email} />
            </div>

            <input
              type="submit"
              title="Update user"
              disabled={submitDisabled}
            />
          </form>
        )}
        {isUserLoading && <span>Loading...</span>}
      </details>
    </article>
  );
};
