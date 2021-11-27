import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, TextField, Stack, useTheme } from '@mui/material';

// third-party
import { Chance } from 'chance';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN, ADD_COLUMN } from 'store/actions';

const chance = new Chance();

// ==============================|| KANBAN BOARD - ADD COLUMN ||============================== //

const AddColumn = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [isTitle, setIsTitle] = useState(false);

    const [isAddColumn, setIsAddColumn] = useState(false);
    const handleAddColumnChange = () => {
        setIsAddColumn((prev) => !prev);
    };

    const addColumn = () => {
        if (title.length > 0) {
            const newColumn = {
                id: `${chance.integer({ min: 1000, max: 9999 })}`,
                title,
                itemIds: []
            };

            dispatch({
                type: ADD_COLUMN,
                payload: { column: newColumn }
            });

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Column Add successfully',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                alertSeverity: 'success'
            });
            setIsAddColumn((prev) => !prev);
            setTitle('');
        } else {
            setIsTitle(true);
        }
    };

    const handleAddColumn = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addColumn();
        }
    };

    const handleColumnTitle = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        if (newTitle.length <= 0) {
            setIsTitle(true);
        } else {
            setIsTitle(false);
        }
    };

    return (
        <MainCard
            sx={{
                minWidth: 250,
                backgroundColor: theme.palette.primary.light,
                height: '100%'
            }}
            contentSX={{ p: 1.5, '&:last-child': { pb: 1.5 } }}
        >
            <Grid container alignItems="center" spacing={1}>
                {isAddColumn && (
                    <Grid item xs={12}>
                        <SubCard contentSX={{ p: 2, transition: 'background-color 0.25s ease-out' }}>
                            <Grid container alignItems="center" spacing={0.5}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder="Add Column"
                                        value={title}
                                        onChange={handleColumnTitle}
                                        sx={{
                                            mb: 2,
                                            '& input': { bgcolor: 'transparent', p: 0, borderRadius: '0px' },
                                            '& fieldset': { display: 'none' },
                                            '& .MuiFormHelperText-root': {
                                                ml: 0
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'transparent'
                                            }
                                        }}
                                        onKeyUp={handleAddColumn}
                                        helperText={isTitle ? 'Column title is required.' : ''}
                                        error={isTitle}
                                    />
                                </Grid>
                                <Grid item xs zeroMinWidth />
                                <Grid item>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Button variant="text" color="error" sx={{ width: '100%' }} onClick={handleAddColumnChange}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={addColumn} size="small">
                                            Add
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                )}
                {!isAddColumn && (
                    <Grid item xs={12}>
                        <Button variant="text" color="primary" sx={{ width: '100%' }} onClick={handleAddColumnChange}>
                            Add Column
                        </Button>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default AddColumn;
