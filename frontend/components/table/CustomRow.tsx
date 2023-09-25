"use client"
import React from "react";
import { createData } from "./create-dumy-data";
import { TableRow, TableCell, IconButton, Collapse, Box, Typography, TableHead, TableBody, Table } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CustomTableIndex } from "./CustomTable";

const CustomRow = (props:CustomTableIndex) =>{
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {props.coins}
          </TableCell>
          <TableCell align="right">{props.price}</TableCell>
          {props.isSell !== null && <TableCell align="right">{props.isSell}</TableCell>}
          {props.isSell === null && <TableCell align="right"> - </TableCell>}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              hello
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export default CustomRow;