import { memo } from 'react';
import type { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MenuItem, Select } from '@mui/material';
import resets from '../../components/_resets.module.css';
import classes from './Dashboard.module.css';
import { Line20Icon } from '../../components/Line20lcon.tsx/Line20Icon.js';
import { ListboxComponent_Property1Defa } from './ListboxComponent_Property1Defa/ListboxComponent_Property1Defa';
// import { UserCircle } from './UserCircle/UserCircle';
import Header from '../../components/Header/Header';
interface Props {
  className?: string;
}
/* @figmaId 2346:153 */
export const Dashboard: FC<Props> = memo(function Dashboard(props = {}) {
  const columns: GridColDef[] = [
    { 
      field: 'Mã chứng khoán', 
      headerName: 'Mã CK', 
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.maCK || ''}`,
    },
    { 
      field: 'Giá', 
      headerName: 'Giá', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.price === 'number') {
          return params.row.price.toFixed(2);
        } else {
          return '0.00';
        }
      },
    },
    { 
      field: 'Tăng giảm', 
      headerName: '+/-', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.inc_dec === 'number') {
          return params.row.inc_dec.toFixed(2);
        } else {
          return '0.00';
        }
      },
    },
    { 
      field: 'Tỉ lệ %', 
      headerName: '%', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.percent === 'number') {
          return params.row.percent.toFixed(2)+'%';
        } else {
          return '0.00%';
        }
      },
    },
    {
      field: 'Tổng khối lượng',
      headerName: 'Tổng khối lượng',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        if (typeof params.row.total === 'number') {
          return params.row.total.toFixed(2);
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
      renderCell: (params) => ( // Thêm dropdown với dấu "..." trên mỗi dòng
      <Select value="" displayEmpty IconComponent={() => null}>
        <MenuItem value="" disabled>
          ...
        </MenuItem>
      </Select>
      ),
    },
  ];
  
  const rows = [
    { id: 1, maCK: 'ACB', price: 100, inc_dec: 1.00, percent: 0.00, total: 1000 },
    { id: 2, maCK: 'BID', price: 100, inc_dec: -1.00, percent: 1.00, total: 0 },
    { id: 3, maCK: 'CTG', price: 100, inc_dec: 0.00, percent: 1.00, total: 1000 },
    { id: 4, maCK: 'EIB', price: 100, inc_dec: 1.00, percent: 1.00, total: 1000 },
    { id: 5, maCK: 'HDB', price: 100, inc_dec: 1.00, percent: 1.00, total: 1000 },
    { id: 6, maCK: 'MBB', price: 100, inc_dec: 0.00, percent: 1.00, total: 1000 },
    { id: 7, maCK: 'MSB', price: 100.0055, inc_dec: 1.00, percent: 1.00, total: 1000 },
    { id: 8, maCK: 'OCB', price: 100, inc_dec: 1.00, percent: 1.00, total: 1000 },
    { id: 9, maCK: 'SHB', price: 100, inc_dec: 1.00, percent: 1.00, total: 1000 },
  ];
  
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.dashboard}>
        <Header/>
        <div className={classes.main}>
          <ListboxComponent_Property1Defa className={classes.listboxComponent} />
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              color: 'white', 
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                color: 'white', 
              },
              '& .MuiDataGrid-footerContainer': {
                color: 'white', 
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows ': {
                color: 'white',
              },
              '& .MuiSelect-icon': {
                color: 'white', 
              },
              '& .MuiSvgIcon-root, & .MuiSvgIcon-fontSizeMedium': {
                color: 'white', 
              },
              '& .MuiOutlinedInput-input': {
                color: 'white'
              },
            }}
          />
          <div className={classes.contentbox}>
            <div className={classes.nhanDinhChung}>Nhận định chung</div>
            <div className={classes.frame2}>
              <div className={classes.chinhSua}>Chỉnh sửa</div>
            </div>
          </div>
          
          <div className={classes.nhanDinh}>Lô xe điện VinFast được mua bởi 3 khách hàng Indonesia phục vụ cho mục tiêu mở rộng đội xe của các doanh nghiệp tại địa phương. Tổng Giám đốc VinFast Indonesia (đứng giữa) và các đại diện doanh nghiệp tại lễ ký kết. Cụ thể, trong khuôn khổ triển lãm IIMS 2024, VinFast đã chính thức ký kết Biên bản Ghi nhớ về việc cung cấp 600 chiếc xe điện cho 3 doanh nghiệp Indonesia, bao gồm: PT. Energi Mandiri Bumi Pertiwi, PT. Sumber Amarta Jaya và PT. Teknologi Karya Digital Nusa Tbk. Các mẫu xe này sẽ phục vụ cho mục tiêu mở rộng đội xe doanh nghiệp của các công ty, đáp ứng nhu cầu ngày càng tăng của thị trường giao thông xanh Indonesia. Thỏa thuận này khẳng định uy tín của VinFast và sức hút của thương hiệu tại đất nước vạn đảo, đồng thời mở ra cơ hội để hãng xe Việt khai thác những tiềm năng to lớn của thị trường xe điện địa phương, cũng như thúc đẩy sự phát triển giao thông xanh trong khu vực.</div>
          <div className={classes.line20}>
            <Line20Icon className={classes.icon} />
          </div>
        </div>
      </div>
    </div>
  );
});
