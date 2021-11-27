import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ButtonBase, CardMedia, IconButton, Link, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { Draggable } from 'react-beautiful-dnd';

// project imports
import EditStory from '../Backlogs/EditStory';
import AlertItemDelete from './AlertItemDelete';
import { DELETE_ITEM, SNACKBAR_OPEN, SELECT_ITEM } from 'store/actions';

// assets
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

const backImage = require.context('assets/images/profile', true);

// item drag wrapper
const getDragWrapper = (isDragging, draggableStyle, theme, radius) => ({
    userSelect: 'none',
    margin: `0 0 ${8}px 0`,
    padding: 16,
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
    backgroundColor: isDragging ? theme.palette.grey[50] : theme.palette.common.white,
    borderRadius: radius,
    ...draggableStyle
});

// ==============================|| KANBAN BOARD - ITEMS ||============================== //

const Items = ({ item, index }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const backProfile = item.image && backImage(`./${item.image}`).default;

    const customization = useSelector((state) => state.customization);
    const kanban = useSelector((state) => state.kanban);
    const { userStory } = kanban;

    const itemStory = userStory.filter((story) => story?.itemIds?.filter((itemId) => itemId === item.id)[0])[0];

    const handlerDetails = (id) => {
        dispatch({
            type: SELECT_ITEM,
            payload: {
                selectedItem: id
            }
        });
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const handleModalClose = (status) => {
        setOpen(false);
        if (status) {
            dispatch({
                type: DELETE_ITEM,
                payload: {
                    itemId: item.id
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

    const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
    const handleStoryDrawerOpen = () => {
        setOpenStoryDrawer((prevState) => !prevState);
    };

    const editStory = () => {
        setOpenStoryDrawer((prevState) => !prevState);
    };

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `${customization.borderRadius}px`)}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: itemStory ? -0.75 : 0 }}>
                        <Typography
                            onClick={() => handlerDetails(item.id)}
                            variant="subtitle1"
                            sx={{
                                display: 'inline-block',
                                width: 'calc(100% - 34px)',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                verticalAlign: 'middle',
                                cursor: 'pointer'
                            }}
                        >
                            {item.title}
                        </Typography>

                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick} aria-controls="menu-comment" aria-haspopup="true">
                            <IconButton component="span" size="small" disableRipple>
                                <MoreVertTwoToneIcon fontSize="inherit" />
                            </IconButton>
                        </ButtonBase>
                        <Menu
                            id="menu-comment"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handlerDetails(item.id);
                                }}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    setOpen(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        <AlertItemDelete title={item.title} open={open} handleClose={handleModalClose} />
                    </Stack>
                    {itemStory && (
                        <>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Tooltip title="User Story">
                                    <MenuBookTwoToneIcon color="secondary" sx={{ fontSize: '1rem' }} />
                                </Tooltip>
                                <Tooltip title={itemStory.title}>
                                    <Link
                                        variant="caption"
                                        color="secondary"
                                        underline="hover"
                                        onClick={editStory}
                                        sx={{ cursor: 'pointer', pt: 0.5 }}
                                    >
                                        {itemStory.id}
                                    </Link>
                                </Tooltip>
                            </Stack>
                            <EditStory story={itemStory} open={openStoryDrawer} handleDrawerOpen={handleStoryDrawerOpen} />
                        </>
                    )}
                    {backProfile && (
                        <CardMedia
                            component="img"
                            image={backProfile}
                            sx={{ width: '100%', borderRadius: 1, mt: 1.5 }}
                            title="Slider5 image"
                        />
                    )}
                </div>
            )}
        </Draggable>
    );
};

Items.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object
};

export default Items;
