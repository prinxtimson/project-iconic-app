import { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import moment from "moment";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const LocationChart = ({ country }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const color = ["#F637EC", "#FFE0B2", "#E65100", "#FB8C00", "#E65100"];

    useEffect(() => {
        if (country) {
            let data = [];

            country.rows.map((item, index) => {
                data.push({
                    label: item[0],
                    value: item[1],
                    tooltext: `${item[0]}{br}{br} users: ${item[1]}%`,
                    color: color[index],
                });
            });

            setChartConfigs({
                type: "column2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "User Location",
                        xAxisName: "Country",
                        yAxisName: "Number of users",
                        //yAxisPosition: "right",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        //drawAnchors: "0",
                    },
                    data,
                },
            });
        }
    }, [country]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {country && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default LocationChart;
