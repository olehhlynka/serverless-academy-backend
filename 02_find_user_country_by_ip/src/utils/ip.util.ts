const ipToNumeric = (ip: string): number => {
  const octets = ip.split(".");
  return (
    ((parseInt(octets[0], 10) << 24) >>> 0) +
    ((parseInt(octets[1], 10) << 16) >>> 0) +
    ((parseInt(octets[2], 10) << 8) >>> 0) +
    parseInt(octets[3], 10)
  );
};

export { ipToNumeric };
