import React from "react";
import MostVisitedArea from "../components/MostVisitedArea";
import VisitPurposeChart from "../components/VisitPurposeChart";
import GenderVisitChart from "../components/GenderVisitChart";
import RankTravelChart from "../components/RankTravelChart";
import CategoryChart from "../components/CategoryChart";

const Chart = () => {
  return (
    <div>
      <h1>여행 데이터 통계</h1>
      <MostVisitedArea />
      <VisitPurposeChart />
      <GenderVisitChart />
      <RankTravelChart />
      <CategoryChart />
    </div>
  );
};

export default Chart;
