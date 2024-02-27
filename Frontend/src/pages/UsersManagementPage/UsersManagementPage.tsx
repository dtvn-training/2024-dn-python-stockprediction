import React, { useCallback, useEffect, useMemo, useState } from "react";
import { User, UsersManagementPageProps } from "./UsersManagementPage.types";
import { PageLayout } from "../../components";
import { UsersApi } from "../../services/api/users.api";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useLayout } from "../../contexts/LayoutContext";

const UsersManagementPage: React.FC<UsersManagementPageProps> = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState<number>(0);
  const [rows, setRows] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { isSideBarOpen } = useLayout();

  const navigate = useNavigate();

  const getUsersPerPage = useCallback(
    async (page: number = 0) => {
      setIsLoading(true);

      try {
        const res = await UsersApi.getUsers({ page, search: searchValue });

        const totalRows = res?.data?.meta?.total ?? 0;

        setRowCount(totalRows);
        setRows(res?.data?.data ?? []);
      } catch (err) {
        console.log({ err });
      } finally {
        setIsLoading(false);
      }
    },
    [searchValue]
  );

  const onViewNewsHandler = useCallback(
    (id: string) => {
      navigate(`/management/users/${id}`);
    },
    [navigate]
  );

  const onPaginationModalChange = useCallback(
    async (model: GridPaginationModel) => {
      await getUsersPerPage(model.page);
      setPaginationModel(model);
    },
    [getUsersPerPage]
  );

  const onSearchChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchValue(value);
    },
    []
  );

  useEffect(() => {
    getUsersPerPage(paginationModel.page);
  }, [searchValue]);

  useEffect(() => {
    getUsersPerPage();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: isSideBarOpen ? 200 : 220,
        cellClassName: "name-column--cell",
      },
      {
        field: "role",
        headerName: "Role",
        width: isSideBarOpen ? 150 : 200,
      },
      { field: "email", headerName: "Email", width: isSideBarOpen ? 300 : 320 },
      {
        field: "dob",
        headerName: "Dob",
        width: isSideBarOpen ? 150 : 180,
        valueGetter: (params: { row: User }) =>
          new Date(params.row?.dob).toDateString(),
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
        renderCell: (params: { row: User }) => {
          return (
            <Tooltip title="Edit account">
              <Button onClick={onViewNewsHandler.bind(null, params.row.id)}>
                <EditNoteIcon />
              </Button>
            </Tooltip>
          );
        },
      },
    ],
    [isSideBarOpen, onViewNewsHandler]
  );

  return (
    <PageLayout>
      <div style={{ margin: "20px 30px 5px" }}>
        <Box
          mb="8px"
          display="flex"
          flexDirection="row"
          gap="32px"
          alignItems="center"
        >
          <Typography variant="h5" color="green">
            User Management
          </Typography>
          <FormControl sx={{ flex: 1 }}>
            <OutlinedInput
              fullWidth
              placeholder="Search news..."
              value={searchValue}
              onChange={onSearchChangeHandler}
            />
          </FormControl>
        </Box>
        <Box
          m="8px 0 0 0"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#94e2c",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#6c7ae0",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#dfe5f0",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#6c7ae0",
            },
            "& .MuiCheckbox-root": {
              color: `${"#b7ebde"} !important`,
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            paginationMode="server"
            loading={isLoading}
            onPaginationModelChange={onPaginationModalChange}
            rowCount={rowCount}
            paginationModel={paginationModel}
          />
        </Box>
      </div>
    </PageLayout>
  );
};

export default UsersManagementPage;
