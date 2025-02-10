import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export default function Signup() {

    const [formData,setFormData] = useState({
        email:"",
        username:"",
        fullName:"",
        password:"",
    })

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullName, password }) => {
			try {
				const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/auth/signup`, {
					method: "POST",
                    credentials:"include",
					headers: {
						"Content-Type": "application/json",
                        "Accept":"application/json"
					},
					body: JSON.stringify({ email, username, fullName, password }),
				});
                const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
			} catch (error) {
				console.error(error);
				throw error;
			}
        },
        onSuccess: () => {
			toast.success("Account created successfully");

			{
				/* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
			}
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
    });

    const handleSubmit =(e)=>{
        e.preventDefault();
        mutate(formData);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    


    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-2000 text-white">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
              <label className="block text-sm mb-1">User Name</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your fullname"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="**********"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mt-4 transition"
            >
              {isPending ? "Loading..." : "Sign up"}
            </button>
            {isError && <p className='text-red-500'>{error.message}</p>}
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login"className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
  