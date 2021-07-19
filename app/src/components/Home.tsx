import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { createFlowchart, getFlowcharts, queryClient } from "../api";
import Box from "./Box";

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const {
    isLoading,
    data: flowcharts,
    isFetching,
  } = useQuery(["flowcharts"], getFlowcharts, {
    refetchOnWindowFocus: false,
  });

  const { mutate: newFlowchart, isLoading: mutationLoading } = useMutation(
    async (data: any) => createFlowchart(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["flowcharts"]);
        reset();
      },
    }
  );
  const onSubmit = async (x: any) => {
    await newFlowchart(x);
  };

  return (
    <Box gap={4} p={4}>
      <h1>Your Flowcharts</h1>
      <h2>Add New</h2>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} gap={2}>
        <input type="text" {...register("title")} />
        <textarea {...register("text")} />
        <button type="submit" disabled={mutationLoading}>
          Submit
        </button>
      </Box>
      <Box flow="column" gap={2}>
        <h2>Your Charts </h2>
        {isFetching && <div>Loading...</div>}
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        flowcharts?.map((flowchart) => (
          <Box gap={2} key={flowchart.key}>
            <h3>{flowchart.title}</h3>
            <p>{flowchart.text}</p>
          </Box>
        ))
      )}
    </Box>
  );
}
