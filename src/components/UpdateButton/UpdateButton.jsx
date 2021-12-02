import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeChecked } from "../../bll/citiesReducer";
import { Checkbox, Typography } from "@mui/material";

const UpdateButton = () => {
    const dispatch = useDispatch()
    const checked = useSelector(state => state.citiesReducer.checked)
    const onChangeCallback = (e) => dispatch(changeChecked(e.currentTarget.checked));
    return (
        <div className="updateButton">
            <label>
                <Typography>Автообновление 5с</Typography>

                <Checkbox
                    color="primary"
                    checked={checked}
                    onChange={onChangeCallback}
                />
            </label>
        </div>
    );
};

export default UpdateButton;