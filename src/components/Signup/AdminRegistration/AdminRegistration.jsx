"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import userService from "@/services/user.service";
import basicRegistrationValidations from "@/validations/registration/registration.validations";
import aboutRegistrationValidation from "@/validations/registration/registration.validations";
import RegistrationAbout from "./RegistrationAbout";
import RegistrationBasic from "./RegistrationBasic";
import authService from "@/services/auth.service";
import { useGlobalContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

const AdminRegistration = () => {
  const router = useRouter();
  const pathname = usePathname();
  const email_id = pathname.split("/").pop();
  
  const { isAuth} = useGlobalContext();

  if (isAuth) {
    router.push("/");
  }


  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(1);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    college_name: "",
    street_name: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    roll_no: "",
    program: "",
    branch: "",
    batch: "",
    email_domain: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await userService.getUserById(email_id);
        if (data && data.user) {
          const { name, email } = data.user;

          setDetails((prevDetails) => ({
            ...prevDetails,
            name,
            email,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);
  
  // useEffect(() => {
  //   console.log("Details updated:", details);
  // }, [details]);

  const handleCheckboxChange = (isChecked) => {
    setIsCheckboxChecked(isChecked);
  };

  const handleStageClick = () => {
    setStage((stage) => (stage === 1 ? 2 : 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the completeSignUp API
      const data={...details}
      const response = await authService.completeAdminSignup(data); // Replace `data` with the required payload for the API
      // Handle response
      console.log(0,response,response.data.message);
      await toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      })
      router.push('/')
      console.log("Admin is registered ", response);
    } catch (error) {
      // Handle error
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      })
      console.error("Error completing sign-up:", error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-5 sm:py-8 ">
      {/* Content goes here */}
      <h1 className="text-2xl font-semibold text-center   text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
        Greetings From <span className="primary-text-color">SUZAN</span>
      </h1>
      <h4 className="font-medium text-center sm:text-lg">
        You are just few clicks away from making your college life easier!
      </h4>
      <div className="rounded-xl drop-shadow border md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        {/* Registration div */}
        <div>
          {stage === 1 ? (
            <RegistrationBasic details={details} setDetails={setDetails} />
          ) : (
            <RegistrationAbout
              setDetails={setDetails}
              details={details}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
        {/* Navigation buttons */}
        <div className="w-full flex items-center justify-center gap-4">
          {stage === 1 ? (
            <button
              onClick={handleStageClick}
              type="submit"
              className="px-6 py-2 text-lg rounded-full text-white mt-6 font-medium bg-[#36518F]"
            >
              Next
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleStageClick();
                  setIsCheckboxChecked(false);
                }}
                className="px-4 py-2 sm:px-6 sm:py-3  text-lg text-paleBlue rounded-full mt-6 border-paleBlue border-2 font-medium capitalize flex items-center justify-center gap-2 hover:bg-[#36518F] hover:text-white"
              >
                <BsArrowLeft size={20} />
                previous
              </button>
              <button
                disabled={!isCheckboxChecked}
                type="submit"
                onClick={handleSubmit}
                className={`px-6 py-2 sm:px-6 sm:py-3 text-lg rounded-full text-white mt-6 font-medium ${
                  !isCheckboxChecked
                    ? "bg-gray-400"
                    : "bg-[#36518F] hover:bg-blue-700"
                }`}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
