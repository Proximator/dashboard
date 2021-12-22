import { useState, MouseEventHandler, MouseEvent, ChangeEventHandler } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  CardContent,
  Checkbox,
  Chip,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { useRewards } from '@/contexts/RewardsContext';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Reward, Objects } from '@/types';
import { getComparator, stableSort } from '../../utils/table';
import { EnhancedTableHead } from './EnhancedTableHead';

// ==============================|| TABLE HEADER TOOLBAR ||============================== //



const CustomTable = ({
  Add,
  headCells,
  rows
}: {
  Add: any;
  headCells: {
    id: string;
    numeric: boolean;
    label: string;
    align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | string | undefined;
    disablePadding?: boolean | undefined;
  }[];
  rows: Objects[],
}) => {
  const theme = useTheme();

  const { deleteRewards } = useRewards();
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [reward, setObject] = useState<Objects | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const handleSearch = (event: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) => {
    const newString = event?.target!.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = Object.keys(headCells.map(e => e.id));
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(rowsInitial);
    }
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelectedId: number[] = rows.filter((n) => n.id).map((n) => n.id as number);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEventHandler<HTMLTableCellElement>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (event?.target.value!) setRowsPerPage(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  const editObject = (object: Objects) => {
    setObject(object);
    handleClickOpenDialog();
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <MainCard title="Rewards List" content={false}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              onChange={handleSearch}
              placeholder="Search Reward"
              value={search}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Copy">
              <IconButton size="large">
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton size="large">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton size="large">
                <FilterListIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add Reward">
              <Fab
                color="primary"
                size="small"
                onClick={handleClickOpenDialog}
                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
            {open && <Add open={open} handleCloseDialog={handleCloseDialog} reward={reward} />}
          </Grid>
        </Grid>
      </CardContent>

      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            headCells={headCells}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            theme={theme}
            selected={selected}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Reward, index: number) => {
                /** Make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                    <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.expireDate}</TableCell>
                    <TableCell align="center">{row.discount}</TableCell>
                    <TableCell align="center">{row.isEngineering === true ? 'true' : 'false'}</TableCell>
                    <TableCell align="center">{row.targetGender}</TableCell>
                    <TableCell align="center">{row.isActive === true ? 'active' : 'inactive'}</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Grid container>
                        <Grid item xs={6} md={6} lg={6} sx={{ pr: 0 }}>
                          <IconButton size="medium">
                            <IconEdit onClick={() => editObject(row)} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <IconButton size="medium" onClick={() => deleteRewards([row.id!])}>
                            <IconTrash />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default CustomTable;
