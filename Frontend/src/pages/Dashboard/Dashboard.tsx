import { memo, useEffect, useState } from 'react';
import type { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar  } from '@mui/x-data-grid';
import { MenuItem, Select } from '@mui/material';
import resets from '../../components/_resets.module.css';
import classes from './Dashboard.module.css';
import { Line20Icon } from '../../components/Line20lcon.tsx/Line20Icon.js';
import { ListboxComponent_Property1Defa } from './ListboxComponent_Property1Defa/ListboxComponent_Property1Defa';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { getAllStocks } from '../../services/api/stock.api';
import { Link } from 'react-router-dom';
interface Props {
  className?: string;
}
/* @figmaId 2346:153 */
export const Dashboard: FC<Props> = memo(function Dashboard(props = {}) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
      getAllStocks()
          .then(data => {
              setStocks(data);
          })
          .catch(error => {
              console.log('Error fetching stocks:', error);
          });
  }, []);
  
  const columns: GridColDef[] = [
    { 
      field: 'Mã chứng khoán', 
      headerName: 'Mã CK', 
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.symboy || ''}`,
    },
    { 
      field: 'Giá trần', 
      headerName: 'Giá trần', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.high === 'number') {
          return params.row.high.toFixed(0);
        } else {
          return '0.00';
        }
      },
    },
    { 
      field: 'Giá đáy', 
      headerName: 'Giá đáy', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.low === 'number') {
          return params.row.low.toFixed(0);
        } else {
          return '0.00';
        }
      },
    },
    { 
      field: 'Giá mở cửa', 
      headerName: 'Giá mở cửa', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.open === 'number') {
          return params.row.open.toFixed(0);
        } else {
          return '0.00';
        }
      },
    },
    { 
      field: 'Giá đóng cửa hôm qua', 
      headerName: 'Giá đóng cửa hôm qua', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.previous_close_price === 'number') {
          return params.row.previous_close_price.toFixed(0);
        } else {
          return '0';
        }
      },
    },
    {
      field: 'Tăng giảm', 
      headerName: '+/-', 
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        const value = typeof params.row.diffirence === 'number' ? params.row.diffirence : 0;
        let textColor = 'white'; // Màu mặc định cho chữ
    
        if (value > 0) {
          textColor = 'green'; 
        } else if (value < 0) {
          textColor = 'red'; 
        } else {
          textColor = 'yellow'; 
        }
    
        return (
          <span style={{ color: textColor }}>
            {value.toFixed(0)}
          </span>
        );
      },
    },
    { 
      field: 'Tỉ lệ %', 
      headerName: '%', 
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        const value = typeof params.row.percent === 'number' ? params.row.percent : 0;
        let textColor = 'white'; // Màu mặc định cho chữ
    
        if (value > 0) {
          textColor = 'green'; 
        } else if (value < 0) {
          textColor = 'red'; 
        } else {
          textColor = 'yellow'; 
        }
    
        return (
          <span style={{ color: textColor }}>
            {params.row.percent.toFixed(2)+'%'}
          </span>
        );
      },
      // valueGetter: (params: GridValueGetterParams) => {
      //   if (typeof params.row.percent === 'number') {
      //     return params.row.percent.toFixed(2)+'%';
      //   } else {
      //     return '0.00%';
      //   }
      // },
    },
    {
      field: 'Tổng khối lượng',
      headerName: 'Tổng khối lượng',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.volume === 'number') {
          return params.row.volume.toFixed(2);
        } else {
          return '0.00';
        }
      },
    },
    {
      field: 'Hành động',
      headerName: 'Hành động',
      sortable: false,
      width: 250,
      renderCell: (params) => ( 
      <Select value="" displayEmpty IconComponent={() => null}>
        <MenuItem value="" >
          <Link to={`/stock/${params.row.symboy}`}>...</Link>
        </MenuItem>
      </Select>
      ),
    },
  ];
  
  const rows = stocks;
  
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.dashboard}>
        <Header/>
        <div className={classes.main}>
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
