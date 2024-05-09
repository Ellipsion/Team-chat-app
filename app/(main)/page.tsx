import ServerForm from "@/components/custom/server/server-form";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <div className="bg-zinc-700 p-3 rounded shadow">
        <div>
          <h2 className="mb-5 font-medium">Create your server</h2>
        </div>
        <div>
          <ServerForm />
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
