import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Button, Divider, Drawer, Grid, Stack, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import ItemComment from './ItemComment';
import EditItem from './EditItem';
import AddItemComment from './AddItemComment';
import AlertItemDelete from './AlertItemDelete';
import { DELETE_ITEM, SELECT_ITEM, SNACKBAR_OPEN } from 'store/actions';

// assets
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// ==============================|| KANBAN BOARD - ITEM DETAILS ||============================== //

const ItemDetails = () => {
    let selectedData;
    let commentList = <></>;

    const dispatch = useDispatch();
    const kanban = useSelector((state) => state.kanban);
    const { columns, comments, profiles, items, selectedItem, userStory } = kanban;

    // drawer
    const [open, setOpen] = useState(selectedItem !== false);
    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
        dispatch({
            type: SELECT_ITEM,
            payload: {
                selectedItem: false
            }
        });
    };

    useEffect(() => {
        if (selectedItem !== false) setOpen(true);
    }, [selectedItem]);

    if (selectedItem !== false) {
        selectedData = items.filter((item) => item.id === selectedItem)[0];
        if (selectedData?.commentIds) {
            commentList = selectedData.commentIds.reverse().map((commentId, index) => {
                const commentData = comments.filter((comment) => comment.id === commentId)[0];
                const profile = profiles.filter((item) => item.id === commentData.profileId)[0];
                return <ItemComment key={index} comment={commentData} profile={profile} />;
            });
        }
    }

    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = (status) => {
        setOpenModal(false);
        if (status) {
            handleDrawerOpen();
            dispatch({
                type: DELETE_ITEM,
                payload: {
                    itemId: selectedData.id
                }
            });

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Task Deleted successfully',
                variant: 'alert',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                alertSeverity: 'success'
            });
        }
    };

    return (
        <Drawer
            sx={{
                ml: open ? 3 : 0,
                flexShrink: 0,
                zIndex: 1200,
                overflowX: 'hidden',
                width: { xs: 320, md: 450 },
                '& .MuiDrawer-paper': {
                    height: '100vh',
                    width: { xs: 320, md: 450 },
                    position: 'fixed',
                    border: 'none',
                    borderRadius: '0px'
                }
            }}
            variant="temporary"
            anchor="right"
            open={open}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
        >
            <>
                {selectedData && (
                    <>
                        <Box sx={{ p: 3 }}>
                            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
                                <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <Button
                                            variant="text"
                                            color="error"
                                            sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                                            onClick={handleDrawerOpen}
                                        >
                                            <HighlightOffIcon />
                                        </Button>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                display: 'inline-block',
                                                width: 'calc(100% - 34px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                verticalAlign: 'middle'
                                            }}
                                        >
                                            {selectedData.title}
                                        </Typography>
                                    </Stack>
                                </Grid>

                                <Grid item>
                                    <Button variant="text" color="error" sx={{ p: 0.5, minWidth: 32 }} onClick={() => setOpenModal(true)}>
                                        <DeleteTwoToneIcon />
                                    </Button>
                                    <AlertItemDelete title={selectedData.title} open={openModal} handleClose={handleModalClose} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                        <PerfectScrollbar component="div">
                            <Box sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <EditItem
                                            item={selectedData}
                                            profiles={profiles}
                                            userStory={userStory}
                                            columns={columns}
                                            handleDrawerOpen={handleDrawerOpen}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {commentList}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddItemComment itemId={selectedItem} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </PerfectScrollbar>
                    </>
                )}
                {!selectedData && (
                    <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                        <Typography variant="h5" color="error">
                            No item found
                        </Typography>
                    </Stack>
                )}
            </>
        </Drawer>
    );
};

export default ItemDetails;
