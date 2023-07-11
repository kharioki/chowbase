import React from "react";
import {
  IResourceComponentsProps,
  // BaseRecord,
  // useMany,
  // getDefaultFilter,
  // CrudFilters
} from "@refinedev/core";
import {
  // DateField,
  // ExportButton,
  List,
  // NumberField,
  // useAutocomplete,
  // useDataGrid,
} from "@refinedev/mui";

// import Autocomplete from "@mui/material/Autocomplete";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardHeader from "@mui/material/CardHeader";
// import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// import { useForm } from "@refinedev/react-hook-form";
// import { Controller } from "react-hook-form";

export const Supplier: React.FC<IResourceComponentsProps> = () => {

  return (
    <Stack spacing={2}>
      <Paper sx={{ padding: 2 }}>
        {/** supplier info, graph */}
      </Paper>

      <List
        headerProps={{
            title: "Supplier",
        }}
      >
        {/** history */}
      </List>
    </Stack>
  );
};
