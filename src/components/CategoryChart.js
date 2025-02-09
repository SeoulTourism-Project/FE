import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/category-wishlist")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>여행지 찜한 수 (카테고리별)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
            {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
