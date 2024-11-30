"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { userStore } from "@/store/userStore";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next/client";

const Profile = () => {

  const [updatedUser, setUpdatedUser] = useState();
  const [editField, setEditField] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  const availableCrops = [
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
    const address = getCookie("address");

  useEffect(() => {
    setUpdatedUser(JSON.parse(getCookie("userData")));
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = async () => {
    if (editField === "crops" || editField === "phoneNumber") {
      try {
        await axios.put(`http://localhost:5000/api/farmers/${address}`, {
          ...updatedUser,
        });
        console.log("User data updated successfully");

        setUpdatedUser(updatedUser);
        setCookie('userData', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update user data:", error.response?.data);
      }
    }

    setEditField("");
  };

  const handleAddCrop = () => {
    if (selectedCrop && !updatedUser.selectedCrops.includes(selectedCrop)) {
      setUpdatedUser((prevData) => ({
        ...prevData,
        selectedCrops: [...prevData.selectedCrops, selectedCrop],
      }));
      setSelectedCrop(""); // Reset selected crop after adding
    }
  };

  const handleRemoveCrop = (cropName) => {
    setUpdatedUser((prevData) => ({
      ...prevData,
      selectedCrops: prevData.selectedCrops.filter((crop) => crop !== cropName),
    }));
  };  

  return (
    <>
      {updatedUser ? (
        <div className="min-h-screen px-12 py-8">
          {/* Name Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {updatedUser.fname} {updatedUser.lname}
            </h1>
          </div>

          {/* Horizontal Line */}
          <hr className="border-secondary mb-8" />

          {/* Table-like Structure */}
          <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <table className="table-auto w-full">
              <tbody>
                {/* Phone Number */}
                <tr className="border-b">
                  <td className="py-4 text-gray-700 font-medium">
                    Phone Number:
                  </td>
                  <td className="py-4 text-gray-900">
                    {editField === "phoneNumber" ? (
                      <input
                        type="text"
                        value={updatedUser.phone_number}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            phone_number: e.target.value,
                          })
                        }
                        className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    ) : (
                      updatedUser.phone_number
                    )}
                  </td>
                  <td className="py-4 text-right">
                    {editField === "phoneNumber" ? (
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit("phoneNumber")}
                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>

                {/* Crops */}
                <tr className="border-b">
                  <td className="py-4 text-gray-700 font-medium">Crops:</td>
                  <td className="py-4 text-gray-900">
                    {editField === "crops" ? (
                      <>
                        <div className="flex flex-wrap gap-4">
                          {updatedUser.selectedCrops.map((crop, index) => {
                            const cropData = availableCrops.find(
                              (item) => item.name === crop
                            );
                            return (
                              <div
                                key={index}
                                className="relative bg-green-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2"
                              >
                                {/* Circular Image */}
                                <Image
                                  src={cropData?.imageUrl || ""}
                                  alt={crop}
                                  width={60}
                                  height={60}
                                  className="w-20 h-20 rounded-full"
                                />
                                {/* Name Below Image */}
                                <span className="font-medium text-center">
                                  {crop}
                                </span>
                                <button
                                  onClick={() => handleRemoveCrop(crop)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4">
                          {/* Crop Selection */}
                          <select
                            name="selectedCrop"
                            value={selectedCrop}
                            onChange={(e) => setSelectedCrop(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-10"
                          >
                            <option value="" disabled>
                              Select a crop
                            </option>
                            {availableCrops
                              .filter(
                                (crop) =>
                                  !updatedUser.selectedCrops.includes(crop.name)
                              )
                              .map((crop, index) => (
                                <option key={index} value={crop.name}>
                                  {crop.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* Add Selected Crop */}
                        <button
                          onClick={handleAddCrop}
                          className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                        >
                          Add Crop
                        </button>
                      </>
                    ) : (
                      updatedUser.selectedCrops.join(", ")
                    )}
                  </td>
                  <td className="py-4 text-right">
                    {editField === "crops" ? (
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit("crops")}
                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>

                {/* Ether Coins */}
                <tr className="border-b">
                  <td className="py-4 text-gray-700 font-medium">
                    Ether Coins:
                  </td>
                  <td className="py-4 text-gray-900">
                    {updatedUser.totalRewards}
                  </td>
                  <td className="py-4 text-right"></td>
                </tr>

                {/* Achievements */}
                <tr>
                  <td className="py-4 text-gray-700 font-medium">
                    Achievements:
                  </td>
                  <td className="py-4 text-gray-900">
                    {updatedUser?.achievements ?? 0}
                  </td>
                  <td className="py-4 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Profile;
