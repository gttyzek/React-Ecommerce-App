import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../../axios";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/api/order/get-monthly-stats");
        const sortItem = res.data.income.sort((a,b) => {
          return a._id - b._id
        })
        setIncome(sortItem);
        setPercentage((sortItem[1].total * 100) / sortItem[0].total - 100);

      } catch (error) {
        error;
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          {income.length > 1 && (
          <span className="featuredMoney">${income[1]?.total}</span>
          )}
          <span className="featuredMoneyRate">
            {percentage < 0 ? (
              <>
                -{Math.floor(Math.abs(percentage))}
                <ArrowDownward className="featuredIcon negative" />
              </>
            ) : (
              <>
                +{Math.floor(percentage)}
                <ArrowUpward className="featuredIcon" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
