import {
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import { useRewards } from '@/contexts/RewardsContext';

interface EnhancedTableHeadType {
  onRequestSort: (a: any, b: any) => () => {};
  rowCount: number;
  theme: any;
  selected: number[];
  numSelected: number;
  onSelectAllClick: () => {};
  order: 'asc' | 'desc';
  orderBy: string;
  headCells: {
    id: 'string';
    numeric: boolean;
    label: string;
    align: "center" | "inherit" | "left" | "right" | "justify" | undefined;
    disablePadding? : boolean
  }[];
}

export const EnhancedTableToolbar = ({ selected } : {selected: number[]}) => {
    const numSelected = selected.length;
    const { deleteRewards } = useRewards();

    return (
        <Toolbar
            sx={{
                p: 0,
                pl: 1,
                pr: 1,
                ...(numSelected > 0 && {
                    color: (theme) => theme.palette.secondary.main
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography color="inherit" variant="h4">
                    {numSelected} Selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle">
                    Nutrition
                </Typography>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton size="large" onClick={() => deleteRewards(selected)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  theme,
  selected,
  headCells
}: EnhancedTableHeadType) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar selected={selected} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell?.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
              Action
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
