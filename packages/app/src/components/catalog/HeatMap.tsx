import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles } from "@material-ui/core";
import React from "react";
import chroma from 'chroma-js';

const industries = [
  { key: 'aerospaceDefense', value: 'Aerospace & Defense' },
  { key: 'automotive', value: 'Automotive' },
  { key: 'banking', value: 'Banking' },
  { key: 'capitalMarkets', value: 'Capital Markets' },
  { key: 'communications', value: 'Communications' },
  { key: 'consumerElectronics', value: 'Consumer Electronics' },
  { key: 'consumerPackagedGoods', value: 'Consumer Packaged Goods' },
  { key: 'education', value: 'Education' },
  { key: 'engineeringConstructionOperations', value: 'Engineering Construction & Operations' },
  { key: 'healthcare', value: 'Healthcare' },
  { key: 'industrialProcessManufacturing', value: 'Industrial & Process Manufacturing' },
  { key: 'insurance', value: 'Insurance' },
  { key: 'lifeSciencesPharma', value: 'Life Sciences & Pharma' },
  { key: 'mediaInfoServices', value: 'Media & Info Services' },
  { key: 'medicalDevices', value: 'Medical Devices' },
  { key: 'naturalResources', value: 'Natural Resources' },
  { key: 'networkEdgeProviders', value: 'Network & Edge Providers' },
  { key: 'oilGas', value: 'Oil & Gas' },
  { key: 'platformsSoftwareProducts', value: 'Platforms & Software Products' },
  { key: 'professionalServices', value: 'Professional Services' },
  { key: 'publicSector', value: 'Public Sector' },
  { key: 'retail', value: 'Retail' },
  { key: 'semiconductors', value: 'Semiconductors' },
  { key: 'transportationServices', value: 'Transportation & Services' },
  { key: 'utilities', value: 'Utilities' },
];

const getRandomInt = () => Math.floor(Math.random()*1000);

const regions = [
  'AMS1',
  'AMS2',
  'Europe',
  'APMEA',
  'SMUs',
];

const data = regions.map(region => {
  return {
    region,
    values: industries.map(industry => {
      return {
        key: industry.key,
        value: getRandomInt(),
      };
    }),
  };
});

const colorScale = chroma.scale([
  'green',
  'gold',
  'orange',
  'red'
]);

const HeatMap: React.FC = () => {
  const getMinMaxValues = () => {
    let min = Number.POSITIVE_INFINITY;
    let max = 0;
    for (const row of data) {
      for (const value of row.values) {
        if (value.value > max) max = value.value;
        if (value.value < min) min = value.value;
      }
    }
    return {
      min, max,
    };
  };
  const bounds = getMinMaxValues();
  return (
    <Table
      style={{
        border: '1px solid #999'
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell />
          {
            industries.map((industry) => {
              return (
                <TableCell key={industry.key} style={{
                  transform: 'rotate(-45deg)',
                  minWidth: '120px',
                  borderLeft: '1px solid #999'
                }}>
                  {industry.value}
                </TableCell>
              )
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((row, rowIdx) => {
            return (
              <TableRow key={rowIdx.toString()}>
                <TableCell style={{
                  minWidth: '100px',
                  position: 'sticky',
                  left: '-16px',
                  background: 'white',
                  zIndex: 800,
                  borderTop: '1px solid #999',
                  borderLeft: '1px solid #999',
                }}>{row.region}</TableCell>
                {
                  row.values.map((industryCount, rowValIdx) => {
                    const valueFraction = (industryCount.value - bounds.min) / (bounds.max - bounds.min);
                    const color = colorScale(valueFraction);
                    return (
                      <TableCell style={{
                        background: color.hex(),
                        color: valueFraction > 0.25 ? 'white' : 'black'
                      }} key={rowValIdx.toString()}>
                        {industryCount.value}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
};

export default HeatMap;