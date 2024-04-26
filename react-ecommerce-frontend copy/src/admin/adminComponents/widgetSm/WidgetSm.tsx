import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../../axios";

export default function WidgetSm() {
  const [users, setUsers ] = useState([]);

  useEffect(()=> {
    const getUser =async () => {
      try {
        const res = await userRequest.get("/api/users/get-all-users")
        setUsers(res.data.users)
      } catch (error){
          error
      }
    }
    getUser();
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
      {users.map((user) => (
      <>
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.image || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
              alt=""
              className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.firstName} {user.lastName}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        </>
       ))}
       </ul>
    </div>
  );
}
