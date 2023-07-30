import { useContext } from "react";
import { UserContext } from "./UserContext";
const Trackers = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return <h2>Trackers</h2>;
};
export default Trackers;
