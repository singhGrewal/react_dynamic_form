// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
//
// const ExcelHandler = () => {
//   const [data, setData] = useState([]);
//   const [updatedData, setUpdatedData] = useState([]);
//
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
//
//       // Assuming the header is in the third row (index 2)
//       const headers = worksheet[2];
//       const dataRows = worksheet.slice(3);
//
//       setData(dataRows);
//     };
//     reader.readAsBinaryString(file);
//   };
//
//   const handleUpdate = () => {
//     const updatedData = data.map((row) => {
//       const updatedRow = [...row];
//       // Update specific cells here, for example:
//       // Assuming FY is in column 1, Sprint in column 2, and Distinct in column 3
//       const fyIndex = 0;
//       const sprintIndex = 1;
//       const distinctIndex = 2;
//
//       if (updatedRow[fyIndex] === 'FY23') {
//         updatedRow[sprintIndex] = 'S3'; // Update the sprint value
//       }
//       return updatedRow;
//     });
//     setUpdatedData(updatedData);
//   };
//
//   const handleDownload = () => {
//     const newWorksheet = XLSX.utils.aoa_to_sheet([['Header1', 'Header2', 'Header3'], ...updatedData]);
//     const newWorkbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
//     XLSX.writeFile(newWorkbook, 'UpdatedFile.xlsx');
//   };
//
//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <button onClick={handleUpdate}>Update Data</button>
//       <button onClick={handleDownload}>Download Updated File</button>
//       <table>
//         <thead>
//         <tr>
//           <th>FY</th>
//           <th>Sprint</th>
//           <th>Distinct</th>
//         </tr>
//         </thead>
//         <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             <td>{row[0]}</td>
//             <td>{row[1]}</td>
//             <td>{row[2]}</td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default ExcelHandler;

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { transformDataToObject } from '../utils/helpers';

const ExcelHandler = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      // Assuming the header is in the first row
      console.log('worksheet', worksheet);
      setData(worksheet);
    };
    reader.readAsBinaryString(file);
  };

  const handleFilter = () => {
    // console.log("data", data)
    // const filteredRow = data.find(row => row[0] === 'FY23Q1');
    // console.log("filteredRow", filteredRow)

    // if (filteredRow) {
    //   setFilteredData({
    //     quarter: filteredRow[0],
    //     average: filteredRow[1],
    //     total: filteredRow[2]
    //   });
    // }

    const availableData = transformDataToObject(data);
    console.log('availableData', availableData);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'UpdatedFile.xlsx');
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleFilter}>Filter FY23Q1</button>
      <button onClick={handleDownload}>Download Updated File</button>
      {/*{filteredData && (*/}
      {/*  <div>*/}
      {/*    <h3>Filtered Data</h3>*/}
      {/*    <p>Quarter: {filteredData.quarter}</p>*/}
      {/*    <p>Average: {filteredData.average}</p>*/}
      {/*    <p>Total: {filteredData.total}</p>*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className={'mt-20 w-full overflow-auto border-2 p-4'}>
        <table>
          <thead className={'underline underline-offset-2'}>
            <tr>
              {data[0] &&
                data[0].map((header, index) => (
                  <th className={'w-48 text-left'} key={index}>
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => {
                  return (
                    <td className={'w-48'} key={cellIndex}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelHandler;

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
//
// const ExcelHandler = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState(null);
//
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
//
//       // Assuming the header is in the first row
//       setData(worksheet);
//     };
//     reader.readAsBinaryString(file);
//   };
//
//   const handleFilter = () => {
//     const filteredRow = data.find(row => row[0] === 'FY23Q1');
//     if (filteredRow) {
//       setFilteredData({
//         quarter: filteredRow[0],
//         average: filteredRow[1],
//         total: filteredRow[2]
//       });
//     }
//   };
//
//   const handleDownload = () => {
//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     XLSX.writeFile(workbook, 'UpdatedFile.xlsx');
//   };
//
//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <button onClick={handleFilter}>Filter FY23Q1</button>
//       <button onClick={handleDownload}>Download Updated File</button>
//
//       <div>
//         <h2>Full Data</h2>
//         <table>
//           <thead>
//           <tr>
//             {data[0] && data[0].map((header, index) => (
//               <th key={index}>{header}</th>
//             ))}
//           </tr>
//           </thead>
//           <tbody>
//           {data.slice(1).map((row, index) => (
//             <tr key={index}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell}</td>
//               ))}
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       </div>
//
//       {/*{filteredData && (*/}
//       {/*  <div>*/}
//       {/*    <h2>Filtered Data</h2>*/}
//       {/*    <p>Quarter: {filteredData.quarter}</p>*/}
//       {/*    <p>Average: {filteredData.average}</p>*/}
//       {/*    <p>Total: {filteredData.total}</p>*/}
//       {/*  </div>*/}
//       {/*)}*/}
//     </div>
//   );
// };
//
// export default ExcelHandler;

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
//
// const ExcelHandler = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState(null);
//
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
//
//       // Filter out columns that are not FY, Sprint, Distinct_Velocity
//       const filteredWorksheet = worksheet.map(row => ({
//         FY: row[0],
//         Sprint: row[1],
//         Distinct_Velocity: row[2],
//       }));
//
//       setData(filteredWorksheet);
//     };
//     reader.readAsBinaryString(file);
//   };
//
//   const handleFilter = () => {
//     const filteredRow = data.find(row => row.FY === 'FY23Q1');
//     if (filteredRow) {
//       setFilteredData(filteredRow);
//     }
//   };
//
//   const handleDownload = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     XLSX.writeFile(workbook, 'UpdatedFile.xlsx');
//   };
//
//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <button onClick={handleFilter}>Filter FY23Q1</button>
//       <button onClick={handleDownload}>Download Updated File</button>
//
//       <div>
//         <h2>Full Data</h2>
//         <table>
//           <thead>
//           <tr>
//             <th>FY</th>
//             <th>Sprint</th>
//             <th>Distinct_Velocity</th>
//           </tr>
//           </thead>
//           <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td>{row.FY}</td>
//               <td>{row.Sprint}</td>
//               <td>{row.Distinct_Velocity}</td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       </div>
//
//       {filteredData && (
//         <div>
//           <h2>Filtered Data</h2>
//           <p>FY: {filteredData.FY}</p>
//           <p>Sprint: {filteredData.Sprint}</p>
//           <p>Distinct_Velocity: {filteredData.Distinct_Velocity}</p>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ExcelHandler;
