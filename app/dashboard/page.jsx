import CreateStream from "../../components/CreateStream";
import Withdraw from "../../components/Withdraw";

export default function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <CreateStream />
      <Withdraw />
    </div>
  );
}