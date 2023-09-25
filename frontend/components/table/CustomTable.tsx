import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { rows } from './create-dumy-data';
import CustomRow from './CustomRow';

export interface CustomTableIndex {
  coins:string
  isSell?:boolean
  price:string
}

interface CustomTableProps {
  data:CustomTableIndex[]
}

const CustomTable = (props:CustomTableProps) => {
  return (
    <TableContainer className='w-full' component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Coin or Coins</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">What Should be Done?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row:CustomTableIndex) => (
            <CustomRow coins={row.coins} price={row.price} isSell={row.isSell}  />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;