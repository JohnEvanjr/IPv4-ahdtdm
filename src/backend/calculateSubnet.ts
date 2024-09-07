// /backend/calculateSubnet.ts

export function calculateSubnet(
    ip: string,
    subnetBits: number,
    requiredSubnets: number = 1
  ) {
    const ipToNumber = (ip: string) =>
      ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
  
    const numberToIp = (num: number) =>
      [(num >>> 24), (num >> 16) & 255, (num >> 8) & 255, num & 255].join(".");
  
    //số bit mượn
    let borrowedBits = 0;
    while (2 ** borrowedBits < requiredSubnets) {
      borrowedBits++;
    }
  
    const totalBits = subnetBits + borrowedBits;
    const maxHosts = 2 ** (32 - totalBits) - 2; // Số host/subnet
  
    const subnets = [];
    let currentAddress = ipToNumber(ip) & (~((1 << (32 - subnetBits)) - 1));
  
    // subnet
    for (let i = 0; i < requiredSubnets; i++) {
      const networkAddress = `${numberToIp(currentAddress)}/${totalBits}`;
      const broadcastAddress = numberToIp(currentAddress + maxHosts + 1);
      const subnetMask = numberToIp((~((1 << (32 - totalBits)) - 1)) >>> 0);
  
      const subnetRange = [
        numberToIp(currentAddress + 1),
        numberToIp(currentAddress + maxHosts),
      ];
  
      subnets.push({
        networkAddress,
        broadcastAddress,
        subnetMask,
        availableHosts: maxHosts,
        subnetRange,
      });
  
      currentAddress += maxHosts + 2;
    }
  
    return subnets;
  }  