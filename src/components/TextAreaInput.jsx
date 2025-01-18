const TextareaInput = ({ label, register, required, name, errors, disabled }) => {
    return(
        <div className="col-12">
            <label>{label}</label>
            <textarea className="form-control" readOnly={disabled} {...register(name, required)}></textarea>
            {errors[name]?.type === 'required' && <p className='mb-1 text-danger'>Campo requerido</p>}
        </div>
    )
}

export default TextareaInput;