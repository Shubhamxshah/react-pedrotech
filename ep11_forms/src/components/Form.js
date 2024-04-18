import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const Form = () => {
    const schema = yup.object().shape({
        FullName: yup.string().required("full name is required bitch"),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().min(18).required(),
        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "passwords dont match brada").required(),
    });

    const {register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full name..."  {...register("FullName")}/> <br />
            <p>{errors.FullName?.message}</p>
            <input type="text" placeholder="Email..." {...register("email")}/> <br />
            <p>{errors.email?.message}</p>
            <input type="text" placeholder="Age..." {...register("age")}/> <br />
            <p>{errors.age?.message}</p>
            <input type="password" placeholder="password" {...register("password")} /> <br />
            <p>{errors.password?.message}</p>
            <input type="password" placeholder="confirm password" {...register("confirmPassword")}/> <br />
            <p>{errors.confirmPassword?.message}</p>
            <input type="submit" />
        </form>
    )
}