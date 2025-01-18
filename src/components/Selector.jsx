
const Selector = ({ register, opciones, icono, text, name }) => {
    return (

        <div>
            <div>
                <img src={icono} alt="" />
                <p>{text}</p>
            </div>
            <div>
                {
                    opciones &&
                    opciones.map(item => (
                        <div key={item.labelName}>
                            <input
                                type="radio"
                                {...register}
                                name={name}
                                id={item.labelName}
                                value={item.labelName}
                            />
                            <label htmlFor={item.labelName}>{item.labelText}</label>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Selector;