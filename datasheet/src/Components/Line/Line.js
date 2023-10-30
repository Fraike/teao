import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Vika } from "@vikadata/vika";
import dayjs from "dayjs";
import _ from "lodash";
import { useAsyncEffect } from "ahooks";
import "./Line.css";
function Line() {
  const [date, setDate] = useState([]);
  const [numberToday, setNumberToday] = useState([]);
  const [sheet, setSheet] = useState(null);
  const [pine, setPine] = useState(null);
  const [product, setProduct] = useState(null);
  const [pineData, setPineData] = useState([]);
  const [productData, setProductData] = useState([]);

  useAsyncEffect(async () => {
    const vika = new Vika({
      token: "uskU7Q2cwpCOKSJRRlsc5x8",
      fieldKey: "name",
    });
    // 通过 datasheetId 来指定要从哪张维格表操作数据。
    const datasheet = vika.datasheet("dst0zLP6FM2zpV0dqb");
    const kehuDatasheet = vika.datasheet("dstBS1ZlsGunT0X3tq");
    const productDatasheet = vika.datasheet("dstYSRR1yZF6jLoTZU");
    let tmpData = {};
    let tmpData2 = {};
    let dateArray = [];
    let numberArray = [];
    let kehuList = {};
    let productList = {};
    let kehuNumbers = {};

    await kehuDatasheet.records
      .query({
        viewId: "viwe8vw3MuoPx",
        maxRecords: 1000,
        pageSize: 1000,
      })
      .then((response) => {
        if (response.success) {
          console.log(response.data);
          response.data.records.map((item) => {
            kehuList[item.recordId] = item.fields["简名"];
          });
        } else {
          console.error(response);
        }
      });

    await productDatasheet.records
      .query({
        viewId: "viw8wkw7j1SoQ",
        maxRecords: 1000,
        pageSize: 1000,
      })
      .then((response) => {
        if (response.success) {
          console.log(response.data);
          response.data.records.map((item) => {
            productList[item.recordId] = item.fields["存货全名"];
          });
        } else {
          console.error(response);
        }
      });

    await datasheet.records
      .query({
        viewId: "viwubSCcBAcuZ",
        maxRecords: 1000,
        pageSize: 1000,
      })
      .then((response) => {
        if (response.success) {
          let xinquanNumber = 0;
          let bydNumber = 0;
          let FNumber = 0;
          let TNumber = 0;
          let tmpKehuList = {};
          let tmpProductList = {};
          console.log(' response.data', response.data);
          response.data.records.map((item) => {
            let kehuName = kehuList[item.fields["客户名称"][0]];
            let productName = productList[item.fields["品名"]?.[0]];

            //处理客户数据
            if (kehuName?.includes("比亚迪") === true) {
              bydNumber = bydNumber + item.fields["当天生产数量"];
            } else if (kehuName?.includes("新泉") === true) {
              xinquanNumber = xinquanNumber + item.fields["当天生产数量"];
            } else {
              if (Object.keys(tmpKehuList).includes(kehuName)) {
                tmpKehuList[kehuName] =
                  tmpKehuList[kehuName] + item.fields["当天生产数量"];
              } else {
                tmpKehuList[kehuName] = item.fields["当天生产数量"];
              }
            }

            //处理产品数据
            if (productName?.includes("015") === true) {
              FNumber = FNumber + item.fields["当天生产数量"];
            } else if (productName?.includes("023") === true) {
              TNumber = TNumber + item.fields["当天生产数量"];
            } else {
              if (Object.keys(tmpProductList).includes(productName)) {
                tmpProductList[productName] =
                  tmpProductList[productName] + item.fields["当天生产数量"];
              } else {
                tmpProductList[productName] = item.fields["当天生产数量"];
              }
            }

            if (Object.keys(tmpData).includes(dayjs(item.fields["日期"]).format("YYYY-MM-DD"))) {
              tmpData[dayjs(item.fields["日期"]).format("YYYY-MM-DD")] =
              tmpData[dayjs(item.fields["日期"]).format("YYYY-MM-DD")] + item.fields["当天生产数量"];
            } else {
              tmpData[dayjs(item.fields["日期"]).format("YYYY-MM-DD")] = item.fields["当天生产数量"];
            }
            // tmpData[dayjs(item.fields["日期"]).format("YYYY-MM-DD")] = [];
            // tmpData[dayjs(item.fields["日期"]).format("YYYY-MM-DD")].push(
            //   item.fields["当天生产数量"]
            // );
            // return dayjs(item.fields["日期"]).format("YYYY-MM-DD");
          });

          Object.keys(tmpKehuList).map((item) => {
            pineData.push({
              name: item,
              value: tmpKehuList[item],
            });
          });
          Object.keys(tmpProductList).map((item) => {
            productData.push({
              name: item,
              value: tmpProductList[item],
            });
          });
          pineData.push({
            name: "比亚迪",
            value: bydNumber,
          });
          pineData.push({
            name: "新泉",
            value: xinquanNumber,
          });
          productData.push({
            name: "RD-T015",
            value: FNumber,
          });
          productData.push({
            name: "RD-T023",
            value: TNumber,
          });
          setPineData(pineData);
          setProductData(productData);
          Object.keys(tmpData).map((item) => {
            dateArray.push(item);
            numberArray.push(tmpData[item]);
          });
          console.log("tmpData", tmpData);
          console.log("tmpData2", tmpData2);
          setDate(dateArray);
          setNumberToday(numberArray);
        } else {
          console.error(response, "error");
        }
      });
    let myChart = echarts.init(document.getElementById("trend"));
    setSheet(myChart);
    let pine = echarts.init(document.getElementById("pine"));
    setPine(pine);
    let product = echarts.init(document.getElementById("product"));
    setProduct(product);
  }, []);

  useEffect(() => {
    sheet &&
      sheet.setOption({
        title: {
          text: "产能趋势图",
          subtext: "来源注塑部生产日报表",
          left: "center",
        },
        xAxis: {
          name: "日期",
          nameLocation: "middle",
          type: "category",
          data: date,
          nameGap: 50,
          boundaryGap: false,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        yAxis: {
          type: "value",
          name: "数量 个",
          nameLocation: "middle",
          nameGap: 100,
        
        },
        series: [
          {
            data: numberToday,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: 'top'
            },
            emphasis: {
              focus: 'series'
            },
            
          },
        ],
      });
  }, [date, numberToday]);

  useEffect(() => {
    let tmpData = [];
    tmpData = _.filter(pineData, (item) => {
      return item.name && item.value > 10000;
    });

    pine &&
      pineData.length > 0 &&
      pine.setOption({
        title: {
          text: "客户产能分布图",
          subtext: "来源注塑部生产日报表",
          left: "center",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "item",
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: tmpData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.percent + '%)' +' ' + param.value;
              }
            },
          },
        ],
      });
  }, [pine, pineData]);

  useEffect(() => {
    let tmpData = [];
    tmpData = _.filter(productData, (item) => {
      return item.name && item.value > 10000;
    });

    product &&
      productData.length > 0 &&
      product.setOption({
        title: {
          text: "产能分布图",
          subtext: "来源注塑部生产日报表",
          left: "center",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "item",
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: tmpData,
            label: {
              show: true,
              formatter(param) {
                console.log("param", param);
                // correct the percentage
                return param.name + ' (' + param.percent + '%)' +' ' + param.value;
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
  }, [product, productData]);

  return (
    <div className="App">
      <div id="trend"></div>
      <div id="pine"></div>
      <div id="product"></div>
    </div>
  );
}

export default Line;
