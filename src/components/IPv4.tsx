// src/components/IPv4.tsx
"use client";
import React, { useState } from "react";
import { calculateSubnet } from "../backend/calculateSubnet";

export default function IPv4() {
  const [ipParts, setIpParts] = useState(["", "", "", ""]); // Chỉ nhập 4 octet
  const [subnet, setSubnet] = useState("24"); // Thêm ô nhập cho subnet
  const [subnetCount, setSubnetCount] = useState("1");
  const [results, setResults] = useState<any>(null);
  let IP_order = 0;

  const handleIpChange = (index: number, value: string) => {
    const newIpParts = [...ipParts];
    newIpParts[index] = value;
    setIpParts(newIpParts);
  };

  const handleCalculate = () => {
    const ip = ipParts.join(".");
    const subnetBits = parseInt(subnet) || 24; // Sử dụng subnet từ ô nhập
    const requiredSubnets = parseInt(subnetCount) || 1;

    try {
      const result = calculateSubnet(ip, subnetBits, requiredSubnets);
      setResults(result);
    } catch (error) {
      console.error("Error calculating subnet:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="text-3xl text-center font-black">
        Automatic IPv4 Network Division
      </div>
      <div className="flex items-center gap-2 mt-4">
        {ipParts.map((part, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              placeholder={`Octet ${index + 1}`}
              value={part}
              onChange={(e) => handleIpChange(index, e.target.value)}
              className="border p-2 rounded w-20"
            />
            {index < 3 && <span className="text-xl">.</span>}
          </React.Fragment>
        ))}
        <input
          type="text"
          placeholder="Subnet"
          value={subnet}
          onChange={(e) => setSubnet(e.target.value)}
          className="border p-2 rounded w-16"
        />
      </div>

      <input
        type="number"
        placeholder="Number of subnets to divide (default is 1)"
        value={subnetCount}
        onChange={(e) => setSubnetCount(e.target.value)}
        className="border p-2 rounded w-full mt-4"
      />
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Calculate
      </button>

      {results && (
        <div>
          <a className="text-3xl font-semibold">Calculation Results:</a>
          <div className="mt-5 grid grid-cols-3">
            {results.map((subnet: any, index: number) => (
              <div key={index} className="mt-3 py-5 border-b-2">
                <div className="font-bold text-2xl my-2">Network {++IP_order}</div>
                <p className="text-xl">Network Address: {subnet.networkAddress}</p>
                <p className="text-xl">Broadcast Address: {subnet.broadcastAddress}</p>
                <p className="text-xl">Subnet Mask: {subnet.subnetMask}</p>
                <p className="text-xl">Available Hosts: {subnet.availableHosts}</p>
                <p className="text-xl">
                  Subnet Range: {subnet.subnetRange[0]} - {subnet.subnetRange[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}