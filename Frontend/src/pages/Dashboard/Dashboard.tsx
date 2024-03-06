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
import { getStockbyDate } from "../../services/api/stock.api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


interface Props {
  className?: string;
}
export const Dashboard: FC<Props> = memo(function Dashboard(props = {}) {
  const [stocks, setStocks] = useState([]);
  const currentDate  = dayjs();;
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);  

  useEffect(() => {
    fetchStockData(selectedDate);
  }, [selectedDate]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const fetchStockData = (date: Date) => {
    getStockbyDate(date)
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
  };

  const [tokenTimeout, setTokenTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      toast.success("Welcome");

      const timeout = setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
      }, 20 * 1000); 

      setTokenTimeout(timeout);
    }

    return () => {
      if (tokenTimeout) {
        clearTimeout(tokenTimeout);
      }
    };
  }, []);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date || new Date()); 
  };

  const columns: GridColDef[] = [
    {
      field: "Mã chứng khoán",
      headerName: "Mã CK",
      width: windowSize.width*0.1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.symbol || ""}`,
    },
    {
      field: "Giá trần",
      headerName: "Giá trần",
      width: windowSize.width*0.08,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.high === "number") {
          return params.row.high.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "ngay",
      headerName: "ngay",
      width: windowSize.width*0.08,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.date || ""}`,
    },
    {
      field: "Giá đáy",
      headerName: "Giá đáy",
      width: windowSize.width*0.08,
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
      width: windowSize.width*0.08,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.open === "number") {
          return params.row.open.toFixed(0);
        } else {
          return "0";
        }
      },
    },
    {
      field: "Giá đóng cửa hôm qua",
      headerName: "Giá đóng cửa hôm qua",
      width: windowSize.width*0.08,
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
      width: windowSize.width*0.07,
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
      width: windowSize.width*0.07,
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
      width: windowSize.width*0.10,
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
      width: windowSize.width*0.10,
      renderCell: (params) => (
        <Button variant="outlined">
          <Link to={`/stock/${params.row.symbol}`} style={{ color: "black" }}>
            Chi tiết
          </Link>
        </Button>
      ),
    },
  ];
  if (windowSize.width >576 && windowSize.width <= 992) {
    columns.splice(1, 5);
    columns.forEach((column, index) => {
      if (index !== 0 && index !== columns.length - 1) { 
        column.width = windowSize.width * 0.14; 
      } else {
        column.width = windowSize.width * 0.2; 
      }
    });
  } else
  if (windowSize.width <= 576) {
    columns.splice(1, 8);
    columns.forEach((column, index) => {
      if (index === 0) { 
        column.width = windowSize.width * 0.3; 
      } else if (index === columns.length - 1) {
        column.width = windowSize.width * 0.3; 
      }
    });
  }

  const rows = stocks;

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <ToastContainer />
      <div className={classes.dashboard}>
        <Header />
        <div className={classes.main}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              value={selectedDate}
              onChange={handleDateChange}
              label="Chọn ngày"
            />
          </LocalizationProvider>
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
