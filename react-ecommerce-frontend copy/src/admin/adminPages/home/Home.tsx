import Chart from "../../adminComponents/chart/Chart";
import FeaturedInfo from "../../adminComponents/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
import WidgetSm from "../../adminComponents/widgetSm/WidgetSm";
import WidgetLg from "../../adminComponents/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../axios";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );

  useEffect(() => {
    const getUserStats =async () => {
      try {
        const res = await userRequest.get("/api/users/get-user-stats")
        const sortItem = res.data.userData.sort((a,b) => {
          return a._id - b._id
        })
        sortItem.map((item) =>
        setUserStats((prev) => [
          ...prev,
          {name: MONTHS[item._id - 1], "Active User": item.total}
        ])
        )
      } catch (error) {
        error
      }
    };
    getUserStats();
  },[MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
