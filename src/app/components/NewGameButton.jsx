import React from 'react';
import { withRouter } from "react-router-dom";
import uuid from 'uuid/v4';

export default withRouter(({ history, ...props }) => (
    <button
        type="button"
        onClick={() => history.push(`/${uuid().slice(0, 8)}`)}
    >{props.value}</button>
));
