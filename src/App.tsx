import "./App.css";
import { useState } from "react";
import { getData, setData } from "./mocks";
import "./index.css";

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
  const { data } = getData();
  if (!data) return;
  const [one, setOne] = useState<"start" | "click" | "loading" | "clicked">(
    "start",
  );

  const {} = setData(data.data.id, one);
  const handleClick = () => {
    setOne("click");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-pink-500 text-black  w-20 h-8 rounded-xl shadow-xl hover:bg-slate-700"
      >
        {one}
      </button>
    </div>
  );
};

export default App;
