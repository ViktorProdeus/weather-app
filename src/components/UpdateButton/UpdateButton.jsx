import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeChecked } from "../../bll/citiesReducer";

const UpdateButton = () => {
    const dispatch = useDispatch()
    const checked = useSelector(state => state.citiesReducer.checked)
    const onChangeCallback = (e) => dispatch(changeChecked(e.currentTarget.checked));
    return (
        <div className="updateButton">
            <label>
                Автообновление 5с

                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChangeCallback}
                />
            </label>
        </div>
    );
};

export default UpdateButton;