import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

// project imports
import { EDIT_COLUMN } from 'store/actions';

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

const EditColumn = ({ column }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleColumnRename = (event) => {
        dispatch({
            type: EDIT_COLUMN,
            payload: {
                column: {
                    id: column.id,
                    title: event.target.value,
                    itemIds: column.itemIds
                }
            }
        });
    };

    return (
        <OutlinedInput
            fullWidth
            value={column.title}
            onChange={handleColumnRename}
            sx={{
                mb: 1.5,
                '& input:focus': {
                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50]
                },
                '& input:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50]
                },
                '& input:hover + fieldset': {
                    display: 'block'
                },
                '&, & input': { bgcolor: 'transparent' },
                '& fieldset': { display: 'none' },
                '& input:focus + fieldset': { display: 'block' }
            }}
        />
    );
};

EditColumn.propTypes = {
    column: PropTypes.object
};

export default EditColumn;
