import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { IPData } from "../interfaces/ipData";
import { ipToNumeric } from "../utils/ip.util";

const countriesIPDataPath = path.join(
  __dirname,
  "../../../ip_data.CSV"
);
const countriesIPData: IPData[] = [];

fs.createReadStream(countriesIPDataPath)
  .pipe(csv(["from", "to", "countryShort", "country"]))
  .on("data", (data) => {
    const ipData: IPData = {
      from: data.from,
      to: data.to,
      countryShort: data.countryShort,
      country: data.country,
    };
    countriesIPData.push(ipData);
  });

const findCountryIPData = (
  numericIP: number
): IPData | undefined => {
  return countriesIPData.find((ipData: IPData) => {
    return (
      numericIP >= ipData.from && numericIP <= ipData.to
    );
  });
};

const findCountryByIP = (
  ip: string
): string | undefined => {
  const numericIP = ipToNumeric(ip);
  const countryIPData = findCountryIPData(numericIP);
  return countryIPData?.country;
};

export { findCountryByIP };
