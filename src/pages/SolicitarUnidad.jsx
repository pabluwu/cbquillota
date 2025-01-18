import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import Input from "../components/Input";
import DatePicker from "../components/DatePicker";
import TextareaInput from "../components/TextAreaInput";
import NavbarCustom from "../components/Navbar";
import Loader from "../components/Loader";

const SolicitarUnidad = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, setValue, watch, reset } = useForm({
        shouldFocusError: false
    });
    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    setValue('estado', 1);
    setValue('creado_por', user.email);
    const solicitudesCollectionRef = collection(db, 'solicitud_unidades');

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

    const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);
        try {
            const response = await addDoc(solicitudesCollectionRef, data);
            navigate(`/solicitud/${response.id}`)
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {
                isLoading &&
                <Loader />
            }
            <NavbarCustom />
            <div className="border-bottom">
                <div className="container p-5">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <h2>Solicitar unidades</h2>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-5 border rounded px-4 py-3">
                    <div className="row g-3">
                        <div className="col-4">
                            <DatePicker control={control} errors={errors} required={{ required: true }} label={'Fecha Solicitud'} name={'fecha_solicitud'} />
                        </div>
                        <div className="col-4">
                            <Input errors={errors} label={'Conductor'} required={{ required: true }} register={register} name={'conductor'} />
                        </div>
                        <div className="col-4">
                            <Input errors={errors} label={'Obac'} required={{ required: true }} register={register} name={'obac'} />
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <p><strong>Seleccione las unidades.</strong></p>

                                <div className="col-6">
                                    <p><strong>Unidades de compañía.</strong></p>
                                    <div className="row">
                                        {
                                            compañia.map(unidad => (
                                                <div className="form-check col-4" key={unidad.id}>
                                                    <input className="form-check-input" {...register('unidades_cia')} type="checkbox" value={unidad.id} id={unidad.id} />
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
                                                    <input className="form-check-input" {...register('unidad_comandancia')} type="checkbox" value={unidad.id} id={unidad.id} />
                                                    <label className="form-check-label" htmlFor={unidad.nombre}>
                                                        {unidad.nombre}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr />
                                <TextareaInput errors={errors} label={'Motivo'} required={{ required: true }} register={register} name={'motivo'} />
                                <div className="mt-3">
                                    <input className="btn btn-success" type="submit" value="Enviar"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SolicitarUnidad;