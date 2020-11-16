import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';

const Items = props => {
    const {data} =props;
    return (
        data.map(currency =>
            <ListItem key={currency.id}>
              <ListItemText primary={currency.name} />
            </ListItem>
        )
    )
};

export default Items;