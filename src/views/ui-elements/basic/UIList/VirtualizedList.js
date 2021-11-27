import PropTypes from 'prop-types';

// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// list render
function renderRow({ index, style }) {
    return (
        <ListItemButton style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
};

// ================================|| UI LIST - SCROLLABLE ||================================ //

export default function VirtualizedList() {
    return (
        <div>
            <FixedSizeList height={280} width="auto" itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
