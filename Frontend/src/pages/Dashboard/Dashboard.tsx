import { memo, useEffect, useState } from "react";
import type { FC } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import resets from "../../components/_resets.module.css";
import classes from "./Dashboard.module.css";

import Header from "../../components/Header/Header";
import { getAllStocks } from "../../services/api/stock.api";
import { Link } from "react-router-dom";
interface Props {
  className?: string;
}
export const Dashboard: FC<Props> = memo(function Dashboard(props = {}) {
  const [stocks, setStocks] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    getAllStocks()
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.log("Error fetching stocks:", error);
      });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let width_maCK = 0.1;
  let width_giaTran = 0.08;
  let width_giaDay = 0.08;
  let width_giaMoCua = 0.08;
  let width_giaDongCua = 0.08;
  let width_tangGiam = 0.08;
  let width_tiLe = 0.08;
  let width_tongKhoiLuong = 0.1;
  let width_hanhdong = 0.15;
  const columns: GridColDef[] = [
    {
      field: "Mã chứng khoán",
      headerName: "Mã CK",
      width: windowSize.width*width_maCK,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.symbol || ""}`,
    },
    {
      field: "Giá trần",
      headerName: "Giá trần",
      width: windowSize.width*width_giaTran,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.high === "number") {
          return params.row.high.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Giá đáy",
      headerName: "Giá đáy",
      width: windowSize.width*width_giaDay,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.low === "number") {
          return params.row.low.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Giá mở cửa",
      headerName: "Giá mở cửa",
      width: windowSize.width*width_giaMoCua,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.open === "number") {
          return params.row.open.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Giá đóng cửa",
      headerName: "Giá đóng cửa",
      width: windowSize.width*width_giaDongCua,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.previous_close_price === "number") {
          return params.row.previous_close_price.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Tăng giảm",
      headerName: "+/-",
      width: windowSize.width*width_tangGiam,
      renderCell: (params: GridValueGetterParams) => {
        const value =
          typeof params.row.diffirence === "number" ? params.row.diffirence : 0;
        let textColor = "white";

        if (value > 0) {
          textColor = "green";
        } else if (value < 0) {
          textColor = "red";
        } else {
          textColor = "#FFC300";
        }

        return <span style={{ color: textColor }}>{value.toFixed(0)}</span>;
      },
    },
    {
      field: "Tỉ lệ %",
      headerName: "%",
      width: windowSize.width*width_tiLe,
      renderCell: (params: GridValueGetterParams) => {
        const value =
          typeof params.row.percent === "number" ? params.row.percent : 0;
        let textColor = "white";

        if (value > 0) {
          textColor = "green";
        } else if (value < 0) {
          textColor = "red";
        } else {
          textColor = "#FFC300";
        }

        return (
          <span style={{ color: textColor }}>
            {params.row.percent.toFixed(2) + "%"}
          </span>
        );
      },
    },
    {
      field: "Tổng khối lượng",
      headerName: "Tổng khối lượng",
      width: windowSize.width*width_tongKhoiLuong,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.volume === "number") {
          return params.row.volume.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Hành động",
      headerName: "Hành động",
      sortable: false,
      width: windowSize.width*width_hanhdong,
      renderCell: (params) => (
          <Button variant="outlined">
            <Link to={`/stock/${params.row.symbol}`} style={{color: "black" }}>
              Chi tiết
            </Link>
          </Button>
      ),
    },
  ];

  const rows = stocks;

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.dashboard}>
        <Header />
        <div className={classes.main}>
          <DataGrid
            rows={rows}
            columns={columns}
            style={{width:windowSize.width*0.85, margin:"0 auto"}}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
});
