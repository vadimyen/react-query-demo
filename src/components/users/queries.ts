import toast from "react-hot-toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { parseQueryArgs } from "react-query/types/core/utils";
import { api } from "../../api/api";

type Id = number;
type DateISO = string;

const PER_PAGE = 5;

export type User = {
  id: Id;
  email: string;
  name: string;
  phone: string;
};

export type UserPreview = Pick<User, "id" | "email">;

type PaginatedResponse<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
  hasMore: boolean;
};

type OriginalUsersResponse = Array<User>;
type UsersResponse = PaginatedResponse<Array<UserPreview>>;

const fetchUsers = async (page = 1): Promise<UsersResponse> => {
  //hardcode to imitate server pagination
  const TOTAL_PAGES = 2;
  const result = await api
    .get(`users?_limit=5&_page=${page}`)
    .json<OriginalUsersResponse>();
  //   imitating backend data comes in this format
  return {
    page,
    per_page: PER_PAGE,
    total: 10,
    total_pages: TOTAL_PAGES,
    data: result.map((user) => ({ id: user.id, email: user.email })),
    hasMore: page < TOTAL_PAGES,
  };
};

export type UserResponse = User;

const fetchUser = (id: Id) => api.get(`users/${id}`).json<UserResponse>();

// query keys factory for convenience
const usersKeys = {
  all: ["users"] as const,
  paginated: (page: number) => [...usersKeys.all, { page }] as const,
  user: (id: Id) => [...usersKeys.all, { id }] as const,
};

export const useUsersQuery = (page: number) =>
  useQuery(usersKeys.paginated(page), () => fetchUsers(page), {
    keepPreviousData: true,
  });

export const useUserQuery = (
  id: Id,
  options?: UseQueryOptions<
    UserResponse,
    unknown,
    UserResponse,
    ReturnType<typeof usersKeys["user"]>
  >
) =>
  useQuery(usersKeys.user(id), () => fetchUser(id), {
    staleTime: 30 * 1000,
    ...options,
  });

type UpdateUserPayload = Omit<User, "id">;
type UpdateUserResponse = {
  name: string;
  email: string;
  phone: string;
};
export const updateUser = (values: {
  id: User["id"];
  payload: UpdateUserPayload;
}) =>
  api
    .patch(`users/${values.id}`, { json: values.payload })
    .json<UpdateUserResponse>();

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (values: Parameters<typeof updateUser>[0]) => updateUser(values),
    {
      retry: false,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(usersKeys.all);
        toast.success(`User #${variables.id} updated`);
      },
    }
  );
};
