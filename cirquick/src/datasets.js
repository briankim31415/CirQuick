import * as React from 'react';
import './App.css';
import './datasets.css';
import {Link, useParams} from 'react-router-dom';

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'desc', label: 'Description', minWidth: 200 },
  { id: 'download', label: 'Download', minWidth: 170 },
];

function createTable() {
  var data = require('./dataset_list.json');
  var index = 0;
  var data_list = [];
  while (data[index] != null) {
    // var name = data[index].Name;
    var link = data[index].Link;
    var name = <a href={link} target="_blank"> {data[index].Name} </a>;
    var desc = data[index].Description;
    var download_link = data[index].Download;
    var download = <a href={download_link}> {download_link} </a>
    var element = { name, desc, download };
    data_list.push(element);
    index++;
  }
  return data_list;
}

const rows = createTable();

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function Buttons () {
  const {userId} = useParams();
  return(
    <div>
      <Link to={`/users/${userId}`}>
        <button className = "button">User Home</button>
      </Link>

      <Link to = "/">
        <button className = "button">Logout</button>
      </Link>
    </div>
  );
}
export default function datasets() {
    return(
        <div className = "datasets">
            <h1 id = "header">CIRQUICK</h1>
            
            <br />
            <Buttons />

            <h2>Dataset Download</h2>
            <div id="table">
                <StickyHeadTable />
            </div>
        </div>
    );
}