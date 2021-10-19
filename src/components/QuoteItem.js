import React from 'react';
import classes from './QuoteItem.module.css';

const QuoteItem = (props) => {
    return <div className={classes.quoteitem}>
        <h1>{props.item.text}</h1>
        <h3>{props.item.author}</h3>
    </div>
};

export default QuoteItem;