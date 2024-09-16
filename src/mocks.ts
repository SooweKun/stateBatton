import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { State } from "./App";

const jsonData: State = {
  data: {
    description: "Слава ариец",
    id: 1,
    name: "гитлер",
  },
  status: "start",
};

export const getData = () => {
  const { data, isLoading } = useQuery<State | undefined>({
    queryKey: ["data"],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(jsonData);
        }, 3 * 1000);
        reject("отказ");
      });
    },
  });
  return { data, isLoading };
};
type mutateF =
  | {
      mutate: UseMutateFunction<State[] | null, Error, void, unknown>;
      isSuccess: boolean;
    }
  | undefined;
export const setData = (id: number, status: State["status"]) => {
  const queryClient = useQueryClient();
  if (!queryClient) return;
  return useMutation({
    mutationKey: ["data"],
    mutationFn: async () => {
      const existingData: undefined | State[] = queryClient.getQueryData([
        "data",
      ]);
      console.log(existingData);
      if (!existingData) {
        return null;
      }
      {
        const updatedData = existingData.map((item) => {
          if (item.data.id === id) {
            return { ...item, status };
          }
          return item;
        });
        queryClient.setQueryData(["data"], updatedData);
        return updatedData;
      }
    },
  });
};
