import { useEffect, useState } from "react";
import * as echarts from "echarts";
import "./index.css";

export default function () {
  const [date, setDate] = useState([]);
  const [numberToday, setNumberToday] = useState([]);
  const [sheet, setSheet] = useState(undefined);

  useEffect(() => {
    let myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      title: {
        text: "Rotation speed - torque characteristic(23°)",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        orient: "vertical",
        right: 0,
        top: "center",
        data: ["2", "4", "9", "14", "18", "23", "25"],
      },
      grid: {
        left: "10%",
        right: "15%",
        bottom: "10%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        name: "Rotation speed(rpm)",
        nameLocation: "middle",
        // length: 6,
        type: "category",
        boundaryGap: false,
        nameGap: 30,
        data: ["0", "20", "40", "60", "80", "100", "120", "140"],
      },
      yAxis: {
        name: "Torque [mN·m]",
        nameLocation: "middle",
        nameGap: 50,
        max: 55,
        nameTextStyle: {
          verticalAlign: "middle",
          // lineHeight: -50,
        },
        interval:5,
        type: "value",
      },
      series: [
        {
          name: "2",
          type: "line",
          data: [undefined, 2, 3, 3.8, 4.3, 4.7, 5.3, 6],
          smooth: true,
        },
        {
          name: "4",
          type: "line",
          data: [undefined, 4, 6, 8, 9, 10.5, 12, 13],
          smooth: true,
        },
        {
          name: "9",
          type: "line",
          data: [undefined, 9, 13, 15, 18, 20, 23, 25],
          smooth: true,
        },
        {
          name: "14",
          type: "line",
          data: [undefined, 14, 17, 20, 24, 28, 31, 33],
          smooth: true,
        },
        {
          name: "18",
          type: "line",
          data: [undefined, 18, 21, 24, 29, 34, 38, 40],
          smooth: true,
        },
        {
          name: "23",
          type: "line",
          data: [undefined, 23, 26, 30, 34, 39, 43, 46],
          smooth: true,
        },
        {
          name: "25",
          type: "line",
          data: [undefined, 25, 30, 35, 40, 45, 49, 52],
          smooth: true,
        },
      ],
    });
  }, []);

  return (
    <div className="App">
      120
      <div id="main"></div>
    </div>
  );
}
