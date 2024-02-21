import { memo } from 'react';
import type { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
    { field: 'Mã chứng khoán', headerName: 'ID', width: 70 },
    { field: 'Giá', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
            checkboxSelection
            sx={{
              color: 'white', // Set text color to white
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                color: 'white', // Set text color to white for headers and cells
              },
              '& .MuiDataGrid-footerContainer': {
                color: 'white', // Set text color to white for footer
              },
            }}
          />
          <div className={classes.nhanDinhChung}>Nhận định chung</div>
          <div className={classes.frame2}>
            <div className={classes.chinhSua}>Chỉnh sửa</div>
          </div>
          <div className={classes.line20}>
            <Line20Icon className={classes.icon} />
          </div>
        </div>
      </div>
    </div>
  );
});
