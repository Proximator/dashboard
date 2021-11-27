import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// third-party
import { Chance } from 'chance';

// project imports
import { ADD_ITEM_COMMENT, SNACKBAR_OPEN } from 'store/actions';

// assets
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import AddToDriveTwoToneIcon from '@mui/icons-material/AddToDriveTwoTone';

const chance = new Chance();

// ==============================|| KANBAN BOARD - ADD ITEM COMMENT ||============================== //

const AddItemComment = ({ itemId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [comment, setComment] = useState('');
    const [isComment, setIsComment] = useState(false);

    const addTaskComment = () => {
        if (comment.length > 0) {
            const newComment = {
                id: `${chance.integer({ min: 1000, max: 9999 })}`,
                comment,
                profileId: 'profile-1'
            };

            dispatch({
                type: ADD_ITEM_COMMENT,
                payload: { itemId, comment: newComment }
            });

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Comment Add successfully',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                alertSeverity: 'success'
            });
            setComment('');
        } else {
            setIsComment(true);
        }
    };

    const handleAddTaskComment = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addTaskComment();
        }
    };

    const handleTaskComment = (event) => {
        const newComment = event.target.value;
        setComment(newComment);
        if (newComment.length <= 0) {
            setIsComment(true);
        } else {
            setIsComment(false);
        }
    };

    return (
        <Box
            sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                borderRadius: `${customization.borderRadius}px`
            }}
        >
            <Grid container alignItems="center" spacing={0.5}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Add Comment"
                        value={comment}
                        onChange={handleTaskComment}
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
                        onKeyUp={handleAddTaskComment}
                        helperText={isComment ? 'Comment is required.' : ''}
                        error={isComment}
                    />
                </Grid>
                <Grid item>
                    <Button variant="text" color="primary" sx={{ p: 0.5, minWidth: 32 }}>
                        <AddPhotoAlternateTwoToneIcon />
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="text" color="primary" sx={{ p: 0.5, minWidth: 32 }}>
                        <AttachFileTwoToneIcon />
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="text" color="primary" sx={{ p: 0.5, minWidth: 32 }}>
                        <AddToDriveTwoToneIcon />
                    </Button>
                </Grid>
                <Grid item xs zeroMinWidth />
                <Grid item>
                    <Button variant="contained" color="primary" onClick={addTaskComment}>
                        Comment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

AddItemComment.propTypes = {
    itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default AddItemComment;
