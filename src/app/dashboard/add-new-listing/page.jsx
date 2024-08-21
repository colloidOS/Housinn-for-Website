import React from "react";
import { ChevronDown } from "lucide-react";

function AddNewListing() {
  return (
    <div className="w-full flex flex-col gap-5 bg-background-2">
      <h1 className="py-4 px-12 text-2xl font-bold border-b border-gray-500">
        Add New Listing
      </h1>
      <div className="flex flex-col gap-[70px] items-center justify-center px-6 w-full">
        <section className="flex flex-col gap-10">
          <h2 className="font-bold text-lg text-primary text-center">
            Property Information
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <h1>Category</h1>
              <div className="flex flex-col gap-8">
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Property Type <span className="text-red-600">*</span>
                    </label>
                    <div className="relative ">
                      <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md ">
                        <span>Eg. Duplex, Flats, Selfcon</span>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Property Size
                    </label>
                    <input
                      type="text"
                      name=""
                      id="propertySize"
                      placeholder="Eg.50ft x 100ft, 156ft x 100ft"
                      className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Number of bedroom
                    </label>
                    <div className="relative">
                      <div className="w-[300px] bg-white cursor-pointer p-[10px] border border-gray-300 rounded-md ">
                        Eg. 1, 2, 4
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Amneities</label>
                    <input
                      type="text"
                      name=""
                      id="propertySize"
                      placeholder="Eg. Parking space, CCTV camera, water "
                      className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className="text-base text-primary font-semibold">
                  Location
                </h2>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <div className="relative ">
                        <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md ">
                          <span>State</span>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="relative ">
                        <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md ">
                          <span>City</span>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name=""
                        id="propertySize"
                        placeholder="Street Address"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name=""
                        id="propertySize"
                        placeholder="Popular Landmarks"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">
                    Price of Property <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id="propertyPrice"
                    className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    name=""
                    id="description"
                    className="p-[10px] w-[520px] h-[110px] resize-none border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col">
          <h2 className="text-lg font-bold text-primary">
            Photos and Videos of Property
          </h2>
        </section>
      </div>
    </div>
  );
}

export default AddNewListing;
