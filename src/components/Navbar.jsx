import { getAuth, signOut } from "firebase/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import CBLogo from '../assets/CBQuillota.png'

const NavbarCustom = () => {

    const auth = getAuth();

    const cerrarSesion = async () => {
        await signOut(auth).then(() => {
            console.log('Sesión cerrada correctamente');
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <Link className="navbar-brand text-white" to="/solicitar-unidad">
                    <img style={{
                        width: '48px'
                    }} src={CBLogo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                        {/* <li className="nav-item">
                            <Link className="nav-link active text-white" to="/solicitar-unidad">Inicio</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/solicitar-unidad">Solicitar Unidad</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/solicitudes">Solicitudes</Link>
                        </li>
                        <li className='nav-item'>
                            <span className="nav-link text-white pointer" role="button" onClick={cerrarSesion}>Cerrar Sesión</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarCustom;