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
import { Link, useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


interface Props {
  className?: string;
}
export const Dashboard: FC<Props> = memo(function Dashboard(props = {}) {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const currentDate  = dayjs();;
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);  
  const isLoggedIn = localStorage.getItem("token");
  useEffect(() => {
    fetchStockData(selectedDate);
  }, [selectedDate]);

  const fetchStockData = (date: Date) => {
    getStockbyDate(date)
      .then((data) => {
        setStocks(data);        
      })
      .catch((error) => {
        console.log("Error fetching stocks:", error);
      });
  };

  const [tokenTimeout, setTokenTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const isLoggedInToToast = localStorage.getItem("isLoggedIn");
    if (isLoggedInToToast === "true") {
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

  const handleDetailStock = (symbol: string) => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      // Chuyển hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
      navigate("/login");
    } else {
      // Nếu đã đăng nhập, thực hiện hành động bình thường
      // Ví dụ: chuyển hướng đến trang chi tiết chứng khoán
      navigate(`/stock/${symbol}`);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "Mã chứng khoán",
      headerName: "Mã CK",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.symbol || ""}`,
    },
    {
      field: "Giá trần",
      headerName: "Giá trần",
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 200,
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
      width: 250,
      renderCell: (params) => (
        <Button 
          variant="outlined"  
          onClick={() => handleDetailStock(params.row.symbol)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const rows = stocks;

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <ToastContainer />
      <div className={classes.dashboard}>
        <Header />
        <div className={classes.main}>
          <div className={classes.datepicker}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                value={selectedDate}
                onChange={handleDateChange}
                label="Chọn ngày"
              />
            </LocalizationProvider>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
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
