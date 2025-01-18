import { useEffect, useState, useMemo } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { formatDate } from "../customHooks/formatDate";

import Table from "../components/Table";
import NavbarCustom from "../components/Navbar";
import { Link } from "react-router";
const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    const solicitudesCollectionRef = collection(db, 'solicitud_unidades');

    useEffect(() => {
        const getSolicitudes = async () => {
            try {
                const data = await getDocs(solicitudesCollectionRef);
                const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setSolicitudes(response);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }

        getSolicitudes();
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fecha_solicitud',
                header: 'Fecha Solicitud',
                cell: ({ getValue }) => {
                    return formatDate((getValue()[0].toDate()))
                },
            },
            {
                accessorKey: 'conductor',
                header: 'Conductor',
            },
            {
                accessorKey: 'obac',
                header: 'Obac',
            },
            {
                id: 'action',
                header: '',
                cell: ({ row }) => {
                    console.log(row); 
                    return (
                        <Link className="btn btn-dark" to={`/solicitud/${row.original.id}`}>
                            Ver más
                        </Link>
                    )// This will help confirm the structure of each row's data
                },
            }
        ],
        []
    );

    return (
        <>
            <NavbarCustom />
            <div className="border-bottom mb-3">
                <div className="container p-5">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <h2>Listado de Solicitudes</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Table data={solicitudes} columns={columns} />
            </div>
        </>
    )
}

export default Solicitudes;