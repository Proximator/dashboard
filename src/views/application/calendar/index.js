import { useRef, useState, useEffect } from 'react';

// material-ui
import { Button, Dialog, useMediaQuery } from '@mui/material';

// third-party
import _ from 'lodash';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CalendarStyled from './CalendarStyled';
import Toolbar from './Toolbar';
import AddEventForm from './AddEventForm';
import axios from 'utils/axios';

// assets
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Calendar = () => {
    const calendarRef = useRef(null);
    const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

    // fetch events data
    const [events, setEvents] = useState([]);
    const getEvents = async () => {
        const response = await axios.get('/api/calendar/events');
        setEvents(response.data.events);
    };

    useEffect(() => {
        getEvents();
    }, []);

    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    // calendar toolbar events
    const handleDateToday = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // calendar event select/add/edit/delete
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleRangeSelect = (arg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }

        setSelectedRange({
            start: arg.start,
            end: arg.end
        });
        setIsModalOpen(true);
    };

    const handleEventSelect = (arg) => {
        if (arg.event.id) {
            const selectEvent = events.find((_event) => _event.id === arg.event.id);
            setSelectedEvent(selectEvent);
        } else {
            setSelectedEvent(null);
        }
        setIsModalOpen(true);
    };

    const handleEventUpdate = async ({ event }) => {
        try {
            const response = await axios.post('/api/calendar/events/update', {
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end
                }
            });

            setEvents(response.data.events);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventCreate = async (data) => {
        const response = await axios.post('/api/calendar/events/new', data);

        setEvents([...events, response.data.event]);
        handleModalClose();
    };

    const handleUpdateEvent = async (eventId, update) => {
        const response = await axios.post('/api/calendar/events/update', {
            eventId,
            update
        });

        setEvents(response.data.events);
        handleModalClose();
    };

    const handleEventDelete = async (id) => {
        try {
            await axios.post('/api/calendar/events/remove', {
                eventId: id
            });

            const newEvent = _.reject(events, { id });
            setEvents(newEvent);
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <MainCard
            title="Event Calendar"
            secondary={
                <Button color="secondary" variant="contained" onClick={handleAddClick}>
                    <AddAlarmTwoToneIcon fontSize="small" sx={{ mr: 0.75 }} />
                    Add New Event
                </Button>
            }
        >
            <CalendarStyled>
                <Toolbar
                    date={date}
                    view={view}
                    onClickNext={handleDateNext}
                    onClickPrev={handleDatePrev}
                    onClickToday={handleDateToday}
                    onChangeView={handleViewChange}
                />
                <SubCard>
                    <FullCalendar
                        weekends
                        editable
                        droppable
                        selectable
                        events={events}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={view}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        eventDrop={handleEventUpdate}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdate}
                        height={matchSm ? 'auto' : 720}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />
                </SubCard>
            </CalendarStyled>

            {/* Dialog renders its body even if not open */}
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                {isModalOpen && (
                    <AddEventForm
                        event={selectedEvent}
                        range={selectedRange}
                        onCancel={handleModalClose}
                        handleDelete={handleEventDelete}
                        handleCreate={handleEventCreate}
                        handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog>
        </MainCard>
    );
};

export default Calendar;
