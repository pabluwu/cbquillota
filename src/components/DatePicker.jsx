import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Spanish } from "flatpickr/dist/l10n/es.js"
import { Controller } from "react-hook-form";

const DatePicker = ({ label, name, errors, control, disabled, required }) => {
    const [date, setDate] = useState();
    const handleChange = (date) => {
        setDate(date)
    }
    return (
        <div>
            <label>{label}</label>
            {/* <input type="hidden" {...register(name, { required })} value={date} /> */}
            <Controller
                name={name}
                control={control}
                rules={required}
                render={({ field }) => (
                    <Flatpickr
                        {...field}
                        options={{
                            enableTime: 0,
                            dateFormat: 'd-m-Y',
                            locale: {
                                ...Spanish,
                                firstDayOfWeek: 1
                            }
                        }}
                        className="form-control"
                        disabled={disabled}
                        // {...register(name, { required })}
                        // value={date}
                        onChange={(selectedDates) => {
                            handleChange;
                            field.onChange(selectedDates);
                        }}
                    />
                )}
            />
            {errors[name]?.type === 'required' && <p className='mb-1 text-danger'>Campo requerido</p>}
        </div>
    )
}

export default DatePicker;