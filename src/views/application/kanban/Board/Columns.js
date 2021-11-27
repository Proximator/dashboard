import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton } from '@mui/material';

// third-party
import { Droppable, Draggable } from 'react-beautiful-dnd';

// project imports
import EditColumn from './EditColumn';
import Items from './Items';
import AddItem from './AddItem';
import AlertColumnDelete from './AlertColumnDelete';
import { gridSpacing } from 'store/constant';
import { DELETE_COLUMN, SNACKBAR_OPEN } from 'store/actions';

// assets
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// column drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => ({
    minWidth: 250,
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
    backgroundColor: isDragging ? theme.palette.grey[50] : theme.palette.primary.light,
    borderRadius: radius,
    userSelect: 'none',
    margin: `0 ${16}px 0 0`,
    height: '100%',
    ...draggableStyle
});

// column drop wrapper
const getDropWrapper = (isDraggingOver, theme, radius) => ({
    background: isDraggingOver ? theme.palette.primary[200] : theme.palette.primary.light,
    padding: '8px 16px 14px',
    width: 'auto',
    borderRadius: radius
});

// ==============================|| KANBAN BOARD - COLUMN ||============================== //

const Columns = ({ column, index }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const customization = useSelector((state) => state.customization);
    const kanban = useSelector((state) => state.kanban);
    const { items } = kanban;
    const columnItems = column.itemIds.map((itemId) => items.filter((item) => item.id === itemId)[0]);

    const [open, setOpen] = useState(false);
    const handleColumnDelete = () => {
        setOpen(true);
    };

    const handleClose = (status) => {
        setOpen(false);
        if (status) {
            dispatch({
                type: DELETE_COLUMN,
                payload: {
                    columnId: column.id
                }
            });

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Column deleted successfully',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                alertSeverity: 'success'
            });
        }
    };

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `${customization.borderRadius}px`)}
                >
                    <Droppable droppableId={column.id} type="item">
                        {(providedDrop, snapshotDrop) => (
                            <div
                                ref={providedDrop.innerRef}
                                {...providedDrop.droppableProps}
                                style={getDropWrapper(snapshotDrop.isDraggingOver, theme, `${customization.borderRadius}px`)}
                            >
                                <Grid container alignItems="center" spacing={gridSpacing}>
                                    <Grid item xs zeroMinWidth>
                                        <EditColumn column={column} />
                                    </Grid>
                                    <Grid item sx={{ mb: 1.5 }}>
                                        <IconButton onClick={handleColumnDelete} size="large">
                                            <DeleteTwoToneIcon fontSize="small" aria-controls="menu-simple-card" aria-haspopup="true" />
                                        </IconButton>
                                        <AlertColumnDelete title={column.title} open={open} handleClose={handleClose} />
                                    </Grid>
                                </Grid>
                                {columnItems.map((item, i) => (
                                    <Items key={i} item={item} index={i} />
                                ))}
                                {providedDrop.placeholder}
                                <AddItem columnId={column.id} />
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

Columns.propTypes = {
    column: PropTypes.object,
    index: PropTypes.number
};

export default Columns;
