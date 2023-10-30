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
        text: "Temperature - torque characteristic(20r/min)",
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
        name: "Temperature [°C]",
        nameLocation: "middle",
        // length: 6,
        type: "category",
        boundaryGap: false,
        nameGap: 30,
        data: ["-30", "-10", "10", "30", "50", "70"],
      },
      yAxis: {
        name: "Torque [mN·m]",
        nameLocation: "middle",
        nameGap: 50,
        max: 30,
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
          data: [undefined, 2, 2, 2, 1.8, 1.7],
          smooth: true,
        },
        {
          name: "4",
          type: "line",
          data: [undefined, 6, 5, 4, 3.5, 3.3],
          smooth: true,
        },
        {
          name: "9",
          type: "line",
          data: [undefined, 13, 11, 9, 7, 6],
          smooth: true,
        },
        {
          name: "14",
          type: "line",
          data: [undefined, 19, 17, 14, 11, 9],
          smooth: true,
        },
        {
          name: "18",
          type: "line",
          data: [undefined, 23, 20, 17, 14, 12],
          smooth: true,
        },
        {
          name: "23",
          type: "line",
          data: [undefined, 28, 25, 21, 18.5, 17],
          smooth: true,
        },
        {
          name: "25",
          type: "line",
          data: [undefined, 30, 28, 24, 21, 19],
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
