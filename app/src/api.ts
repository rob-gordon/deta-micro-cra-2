import { QueryClient } from "react-query";

const API = process.env.REACT_APP_API ?? "/";

export const queryClient = new QueryClient();

type Flowchart = {
  key: string;
  text: string;
  title: string;
};

export async function getFlowcharts() {
  let flowcharts = await (
    (await (
      await fetch(API + "flowcharts", {
        method: "GET",
        redirect: "follow",
      })
    ).json()) as { value: Flowchart[] }
  ).value;

  flowcharts = flowcharts.filter((flowchart) => "text" in flowchart);

  return flowcharts;
}

export async function createFlowchart(data: { title: string; text: string }) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  const result = await fetch(API + "flowcharts", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    redirect: "follow",
  });

  return result;
}
