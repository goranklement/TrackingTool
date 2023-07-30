import { useContext } from "react";
import { UserContext } from "./UserContext";
const History = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return <h2>History</h2>;
};
export default History;
