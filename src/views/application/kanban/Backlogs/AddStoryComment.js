import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// third-party
import { Chance } from 'chance';

// assets
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import AddToDriveTwoToneIcon from '@mui/icons-material/AddToDriveTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

import { ADD_STORY_COMMENT, SNACKBAR_OPEN } from 'store/actions';

const chance = new Chance();

// ==============================|| KANBAN BACKLOGS - ADD STORY COMMENT ||============================== //

const AddStoryComment = ({ storyId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [comment, setComment] = useState('');
    const [isComment, setIsComment] = useState(false);

    const addStoryComment = () => {
        if (comment.length > 0) {
            const newComment = {
                id: `${chance.integer({ min: 1000, max: 9999 })}`,
                comment,
                profileId: 'profile-1'
            };

            dispatch({
                type: ADD_STORY_COMMENT,
                payload: { storyId, comment: newComment }
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

    const handleAddStoryComment = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addStoryComment();
        }
    };

    const handleStoryComment = (event) => {
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
                        onChange={handleStoryComment}
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
                        onKeyUp={handleAddStoryComment}
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
                    <Button variant="contained" color="primary" onClick={addStoryComment}>
                        Comment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

AddStoryComment.propTypes = {
    storyId: PropTypes.string
};

export default AddStoryComment;
