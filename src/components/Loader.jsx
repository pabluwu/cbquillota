import LoaderImg from '../assets/Loader.svg'
const Loader = () => {
    return (
        <div>
            <div className={`loader`} id="loader">
                <div className="loader__circular"></div>
                <div className="loader__icono">
                    <img style={{width: '100px'}} src={LoaderImg} />
                </div>
                <div className="loader__text">
                    <p>Envíando información...</p>
                </div>
            </div>
        </div>
    )
}

export default Loader;