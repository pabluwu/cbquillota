import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router";
import { formatDate } from "../customHooks/formatDate";

import NavbarCustom from "../components/Navbar";

const SolicitudDetalle = () => {
    const [solicitud, setSolicitud] = useState(null);
    const { codigo } = useParams();
    const compañia = [
        { id: '31', nombre: 'Unidad 31' },
        { id: '32', nombre: 'Unidad 32' },
        { id: '33', nombre: 'Unidad 33' },
        { id: '34', nombre: 'Unidad 34' },
    ]
    const comandancia = [
        { id: 'cj1', nombre: 'Unidad CJ-1' },
        { id: 'cj2', nombre: 'Unidad CJ-2' },
        { id: 'cj3', nombre: 'Unidad CJ-3' },
        { id: 'cj4', nombre: 'Unidad CJ-4' },
        { id: 't1', nombre: 'Unidad T-1' },
        { id: 'l1', nombre: 'Unidad L-1' },
    ]
    useEffect(() => {
        const getSolicitud = async () => {
            try {
                const docRef = doc(db, 'solicitud_unidades', codigo);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setSolicitud(docSnap.data()); // Returns the document data
                } else {
                    console.log("No such document!");
                    return null;
                }
            } catch (err) {
                console.log(err);
            }
        }

        getSolicitud();
    }, [])
    return (
        <>
            <NavbarCustom />
            {solicitud &&
                <div className="border-bottom">
                    <div className="container p-5">
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <h2>Detalle Solicitud</h2>
                            </div>
                            <div className="container mt-5 border rounded px-4 py-3">
                                <p>Estado: {solicitud.estado}</p>
                                <hr />
                                <div className="row g-3">
                                    <div className="col-4">
                                        <p>Fecha Creación: <strong>{formatDate(solicitud.fecha_solicitud[0].toDate())}</strong></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Nombre Conductor: <strong>{solicitud.conductor}</strong></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Obac: <strong>{solicitud.obac}</strong></p>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <p><strong>Unidades Seleccionadas.</strong></p>

                                            <div className="col-6">
                                                <p><strong>Unidades de compañía.</strong></p>
                                                <div className="row">
                                                    {
                                                        compañia.map(unidad => (
                                                            <div className="form-check col-4" key={unidad.id}>
                                                                <input className="form-check-input"
                                                                    type="checkbox"
                                                                    disabled
                                                                    checked={
                                                                        solicitud.unidades_cia.length &&
                                                                            solicitud.unidades_cia.includes(unidad.id) ? true : false}
                                                                    value={unidad.id}
                                                                    id={unidad.id} />
                                                                <label className="form-check-label" htmlFor={unidad.nombre}>
                                                                    {unidad.nombre}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <p><strong>Unidades de comandancia.</strong></p>
                                                <div className="row">
                                                    {
                                                        comandancia.map(unidad => (
                                                            <div className="form-check col-4" key={unidad.id}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    disabled
                                                                    checked={
                                                                        solicitud.unidad_comandancia &&
                                                                            solicitud.unidad_comandancia?.includes(unidad.id) ? true : false
                                                                    }
                                                                    value={unidad.id}
                                                                    id={unidad.id} />
                                                                <label className="form-check-label" htmlFor={unidad.nombre}>
                                                                    {unidad.nombre}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <p>Motivo: <strong>{solicitud.motivo}</strong></p>
                                            <div className="mt-3">
                                                <input className="btn btn-success" type="submit" value="Enviar"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SolicitudDetalle;