import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

    const [formData,setFormData] = useState({
            email:"",
        });

        const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({email}) => {
			try {
				const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({email}),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			navigate('/login')
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});
    
        const handleSubmit =(e)=>{
            e.preventDefault();
            loginMutation(formData);
        }
    
        const handleInputChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };


    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-2000 text-white">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Forgot Password</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded mt-4 transition"
            >
              {isPending ? "Loading..." : "Send"}
            </button>
            {isError && <p className='text-red-500'>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
  