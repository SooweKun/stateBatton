import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import { getData, setData } from "./mocks";

interface data {
  id: number;
  name: string;
  description: string;
}

export interface State {
  status: "start" | "click" | "loading" | "clicked";

  data: data;
}

const App = () => {
  const [one, setOne] = useState("start");

  const { data, isLoading, isSuccess } = getData();
  const { mutate: setDataC } = setData(1, "click");
  const handleClick = () => {
    setOne("click");
    if (isLoading && one === "click") {
      setTimeout(() => {
        setOne("loading");
      }, 2 * 1000);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-pink text-orange border-gray-dark w-12 h-5"
      >
        {one}
      </button>
    </div>
  );
};

export default App;
