import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Input from "../components/Input";

const Login = () => {
    const { register, control, formState: { errors }, handleSubmit, setValue, watch, reset } = useForm({
        shouldFocusError: false
    });
    const auth = getAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/solicitar-unidad')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <>
            <div className="border-bottom">
                <div className="container p-5">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <h2>Iniciar Sesión</h2>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-5 border rounded px-5 py-3">
                    <div className="w-25 mx-auto">

                        <div className="row g-3">
                            <div className="col-12">
                                <Input type={'email'} errors={errors} label={'Email'} required={{ required: true }} register={register} name={'email'} />
                            </div>
                            <div className="col-12">
                                <Input type={'password'} errors={errors} label={'Contraseña'} required={{ required: true }} register={register} name={'password'} />
                            </div>
                            <div className="mt-3">
                                <input className="btn btn-success" type="submit" value="Enviar"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;