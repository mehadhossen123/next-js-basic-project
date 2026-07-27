import LoginForm from "../_components/LoginForm";


export default function LoginPage() {
  return (
    <>
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md space-y-6 round-lg border p-8 shadow-lg">
        {/* for generic text  */}
        <div className=" space-y-2 text-center "> 
          <h1 className="font-bold text-3xl">Welcome Back ! </h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
        </div>
        {/* here i login form  */}
        <LoginForm></LoginForm>

      </div>
    </div>
    
    
    </>
  );
}
