import { ChangeEvent, useState, MouseEvent } from 'react';
import loginImg from '../../assets/login/loginImg.png';
import { EyeIcon, SecretEye, UserIcon } from '../../assets/login/SvgIcons';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type passwordEyeState = boolean;

const Login = () => {
    const [name, setName] = useState<string>('admin');
    const [password, setPassword] = useState<string>('12345678');
    const [passwordEye, setPasswordEye] = useState<passwordEyeState>(true);
    const [nameError, setNameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value.length < 4) {
            setNameError('Name must be at least 4 characters long.');
        } else {
            setNameError('');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 7) {
            setPasswordError('Password must be at least 7 characters long.');
        } else {
            setPasswordError('');
        }
    };

    const handleEyeClick = () => {
        setPasswordEye(!passwordEye);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(name, password);
        if (name.length < 3) {
            setNameError('Name must be at least 3 characters long.');
            return;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            if (name === 'admin' && password === '12345678') {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                });
                toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully',
                    padding: '10px 20px',
                });

                dispatch(signIn({ token: 'test_token' }));
                setIsLoading(false);
                navigate('/');
            } else {
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                });
                toast.fire({
                    icon: 'error',
                    title: 'Problem to sign in, please try again!',
                    padding: '10px 20px',
                });

                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="bg-white">
            <form onSubmit={handleSubmit} className="mx-auto max-w-[1400px] w-full h-[100vh] z-30 relative flex justify-start px-5 items-center">
                <div className="w-[50%]">
                    <div className="text-center">
                        <h3 className="text-[32px] font-medium">
                            Welcome to <span className="text-[#3367F6] italic">Admin Dashboard</span>
                        </h3>
                        <p className="text-[20px] text-[#9EA3B5] font-medium">Please enter your admin credentials</p>
                    </div>
                    <div className="mt-8">
                        <div className={`w-full flex justify-between border rounded-[12px] p-4 ${name.length > 0 ? 'border-[#4361EE]' : ''}`}>
                            <input type="text" value={name} onChange={handleNameChange} placeholder="Admin name" className="border-none w-full outline-none" />
                            <UserIcon color={name.length > 0 ? '#4361EE' : '#9EA3B5'} />
                        </div>
                        {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
                        <div className={`w-full mt-[20px] flex justify-between border rounded-[12px] p-4 ${password.length > 0 ? 'border-[#4361EE]' : ''}`}>
                            <input type={passwordEye ? 'password' : 'text'} value={password} onChange={handlePasswordChange} placeholder="Admin password" className="border-none w-full outline-none" />
                            <div className="cursor-pointer" onClick={handleEyeClick}>
                                {passwordEye ? <EyeIcon color={password.length > 0 ? '#4361EE' : '#9EA3B5'} /> : <SecretEye color={password.length > 0 ? '#4361EE' : '#9EA3B5'} />}
                            </div>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                        {!isLoading && (
                            <button type="submit" className="w-full bg-[#4361EE] py-[10px] rounded-[12px] text-[#fff] font-semibold mt-[30px]">
                                Log in
                            </button>
                        )}
                        {isLoading && (
                            <button type="submit" className="w-full bg-[#4361EE] py-[10px] rounded-[12px] text-[#fff] font-semibold mt-[30px]">
                                <span>Please wait a second</span>
                                <span className="ml-3 animate-spin border-[3px] border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle m-auto"></span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
            <img src={loginImg} className="absolute bottom-0 h-[80%] w-[50%] right-0" alt="Login" />
        </div>
    );
};

export default Login;
