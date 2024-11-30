"use client";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { TransactionContext } from "../context/context";
import axios from 'axios'
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    selectedCrops: [],
  });

    const setUser = userStore((state) => state.setUser);

    const router = useRouter();

  // Available crops with images
  const crops = [
    { name: "Wheat", imageUrl: "/assets/Images/wheat.png" },
    { name: "Ragi", imageUrl: "/assets/Images/ragi.png" },
    { name: "Corn", imageUrl: "/assets/Images/corn.png" },
    { name: "Barley", imageUrl: "/assets/Images/barley.png" },
    { name: "Millet", imageUrl: "/assets/Images/millet.png" },
    { name: "Apple", imageUrl: "/assets/Images/apple.png" },
    { name: "Banana", imageUrl: "/assets/Images/banana.png" },
    { name: "Kiwi", imageUrl: "/assets/Images/kiwi.png" },
    { name: "Litchi", imageUrl: "/assets/Images/litchi.png" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCrop = (crop) => {
    if (!formData.selectedCrops.includes(crop)) {
      setFormData((prevData) => ({
        ...prevData,
        selectedCrops: [...prevData.selectedCrops, crop],
      }));
    }
  };

  const handleRemoveCrop = (cropName) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedCrops: prevData.selectedCrops.filter(
        (crop) => crop.name !== cropName
      ),
    }));
  };

  const { currentAccount } = useContext(TransactionContext);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/farmers/register",
        {
          address: currentAccount, 
          fname: formData.firstName,
          lname: formData.lastName,
          phone_number: formData.phoneNumber,
          selectedCrops: formData.selectedCrops.map((crop) => crop.name),
        }
      );
      toast.success("Farmer registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        selectedCrops: [],
      });
      setUser(response.data);
      router.push("/feed")
      
    } catch (error) {
      toast.error("Failed to register farmer: " + error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/Images/background.jpg")' }} // Update the URL for your background image
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-10">
        <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-xl mt-10">
          <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
            Farmer Registration Form
          </h2>

          <div className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                {" "}
                {/* Flexbox for side by side layout */}
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="register-input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-green-400 w-1/2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="register-input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-green-400 w-1/2"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="register-input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>

            {/* Crop Selection Section */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="crop"
                className="text-lg font-semibold text-center text-green-600"
              >
                Select Crops
              </label>
              <div className="relative">
                <select
                  name="selectedCrop"
                  onChange={(e) =>
                    handleAddCrop(
                      crops.find((crop) => crop.name === e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-10"
                >
                  <option value="" disabled selected className="text-gray-400">
                    Select a crop
                  </option>
                  {crops
                    .filter((crop) => !formData.selectedCrops.includes(crop)) // Hide already selected crops
                    .map((crop, index) => (
                      <option key={index} value={crop.name}>
                        {crop.name}
                      </option>
                    ))}
                </select>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 10 13 14 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {formData.selectedCrops.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Selected Crops</h3>
                <div className="flex flex-wrap gap-4">
                  {formData.selectedCrops.map((crop) => (
                    <div
                      key={crop.name}
                      className="relative bg-green-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2"
                    >
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        className="w-16 h-16 object-cover rounded-full border-2 border-green-500"
                      />
                      <span className="font-medium text-center">
                        {crop.name}
                      </span>
                      <button
                        onClick={() => handleRemoveCrop(crop.name)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
