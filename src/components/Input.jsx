

const Input = ({ label, register, required, name, errors, disabled, type }) => {
    return (
        <div>
            <label>
                {label}
            </label>
            <input className="form-control" type={type} {...register(name, required)}
                readOnly={disabled}
                aria-invalid={errors[name] ? "true" : "false"}
            />
            {errors[name]?.type === 'required' && <p className='mb-1 text-danger'>Campo requerido</p>}
        </div>
    )
}

export default Input;