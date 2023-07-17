import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  // useMany,
  getDefaultFilter,
  CrudFilters,
  useNavigation
} from "@refinedev/core";
import {
  DateField,
  // DateField,
  ExportButton,
  List,
  // NumberField,
  useAutocomplete,
  useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

interface IInventory {
  id: number;
  created_at: string;
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_unit: string;
  item_sku: string;
  last_updated?: string;
  supplier_id?: number;
  store_id?: number;
}

export const Inventory: React.FC<IResourceComponentsProps> = () => {
  const { show } = useNavigation();

  const { search, filters } = useDataGrid({
    initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { store } = params;

      filters.push({
        field: "store.id",
        operator: "eq",
        value: (store ?? [].length) > 0 ? store : undefined,
      });

      return filters;
    },
  });

  const { dataGridProps } = useDataGrid<IInventory>({
    initialPageSize: 10,
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  console.log({dataGridProps});

  const { autocompleteProps: storeAutocompleteProps } = useAutocomplete({
    resource: "stores",
    defaultValue: getDefaultFilter("store.id", filters, "eq"),
  });

  const { handleSubmit, control } = useForm<BaseRecord>({
    defaultValues: {
      store: getDefaultFilter("store.id", filters, "eq"),
    },
  });

  const columns = React.useMemo<GridColDef<IInventory>[]>(
    () => [
        {
          field: "id",
          headerName: "ID",
          width: 100,
        },
        {
          field: "item_name",
          headerName: "Name",
          flex: 1,
        },
        {
          field: "item_quantity",
          headerName: "Quantity",
          flex: 1,
        },
        {
          field: "item_unit",
          headerName: "Unit",
          flex: 1,
        },
        {
          field: "item_sku",
          headerName: "SKU",
          flex: 1,
        },
        {
          field: "item_price",
          headerName: "Price",
          flex: 1,
        },
        {
          field: "created_at",
          headerName: "Created At",
          flex: 1,
          renderCell: (params) => (
            <DateField value={params.value} format="dd/MM/yyyy" />
          ),
        },
        {
          field: "last_updated",
          headerName: "Last Updated",
          flex: 1,
          renderCell: (params) => (
            <DateField value={params.value} format="dd/MM/yyyy" />
          ),
        },
    ],
    [],
  );


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title="Filter by store" />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <Controller
                control={control}
                name="store"
                render={({ field }) => (
                  <Autocomplete
                    {...storeAutocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id ?? value);
                    }}
                    getOptionLabel={(item) => {
                      return item.title
                        ? item.title
                        : storeAutocompleteProps?.options?.find(
                            (p) =>
                              p.id.toString() ===
                              item.toString(),
                          )?.title ?? "";
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      option?.id?.toString() ===
                        (value?.id ?? value)?.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Store"
                        placeholder="Store name"
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              <br />
              <Button type="submit" variant="contained">
                Filter
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <List
          title={<Typography variant="h5">Inventory</Typography>}
          wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
          headerProps={{
            action: (
              <ExportButton
                // onClick={triggerExport}
                // loading={isLoading}
              />
            ),
          }}
        >
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            onRowClick={({ id }) => {
              show("inventory/item", id);
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            sx={{
              ...dataGridProps.sx,
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
            }}
          />
        </List>
      </Grid>
    </Grid>
  );
};
