import classNames from 'classnames';

export const layoutClass = classNames('md:flex md:items-center mb-6');
export const leftSideClass = classNames('md:w-2/5');
export const rightSideClass = classNames('md:w-3/5');

export const layoutClassTwo = classNames('flex flex-col md:items-center mb-6');
export const leftSideClassTwo = classNames('mb-10');
export const rightSideClassTwo = classNames('grid grid-cols-2 gap-x-8 gap-y-4');

// const findIndices = (array, value) => {
//     const flattenedArray = array.flat();
//     const firstIndex = flattenedArray.indexOf(value);
//     const lastIndex = flattenedArray.lastIndexOf(value);
//     return { firstIndex, lastIndex };
// }

// const fy23Indices = findIndices(filteredData, "FY23");
// const fy24Indices = findIndices(filteredData, "FY24");

// console.log("FY23 Indices:", fy23Indices);
// console.log("FY24 Indices:", fy24Indices);

// // for (let i = fy23Indices.firstIndex; i <= fy23Indices.lastIndex; i++) {
// //     const rowIndex = Math.floor(i / filteredData[0].length);
// //     const colIndex = i % filteredData[0].length;
// //     console.log(`Value at index ${i} (row ${rowIndex}, column ${colIndex}):`, filteredData[rowIndex][colIndex]);
// // }

// const dataNew = [
//     ["FY",          "FY23",  "FY23", "FY23", "FY23"],
//     ["Sprint #",    "S1",    "S2",   "S3",   "S4"],
//     ["Cleo Chang",  45,     207,     72,     127],
//     ["Des Murray",  7819,   731,    608,    594],

// ];

// function transformData(data, startIndex, endIndex) {
//     // Extract headers from the first elements of each sub-array
//     const headers = data.map(row => row[0]);

//     // Initialize transformedData with headers
//     const transformedData = [headers];

//     // Loop through the columns starting from the second element
//     for (let i = startIndex; i <= endIndex; i++) {
//         const newRow = [];
//         for (let j = 0; j < data.length; j++) {
//             newRow.push(data[j][i]);
//         }
//         transformedData.push(newRow);
//     }

//     return transformedData;
// }

// const transformedData = transformData(filteredData,1, 27);
// const transformedData2 = transformData(filteredData,28, 54);

// console.log('transformedData', transformedData);
// console.log('transformedData2', transformedData2);

// function transformDataToYearTotal(data) {
//     const result = [];

//     // Loop through each column starting from the second element to the second last element
//     for (let i = 1; i < data[0].length - 1; i++) {
//         const year = `${data[0][i]}_${data[1][i]}`;
//         const total = data[2][i] + data[3][i];
//         result.push({ year, total });
//     }

//     return result;
// }

// // function transformDataToYearTotal(data, startIndex = 1, endIndex = 4) {
// //     const result = [];

// //     // Loop through each column starting from startIndex to endIndex
// //     for (let i = startIndex; i <= endIndex; i++) {
// //         const year = `${data[0][i]}_${data[1][i]}`;
// //         const total = data[2][i] + data[3][i];
// //         result.push({ year, total });
// //     }

// //     return result;
// // }

// const transformedDataToObj = transformDataToYearTotal(transformedData);
// console.log('transformedDataToObj', transformedDataToObj);

// const aa ={
//   "Cleo Chang":{
//     FY23:{
//     "S1": 45,
//     "S2": 207
//       ...
//   }
//     FY24:{
//     "S1": 1598,
//     "S2": 1580
//       ...
//   }
//   }
// }

export function transformDataToObject(data) {
  const indexToRemoveFrom = data.findIndex(subArray => subArray[0] === 'Total');
  const filteredData = indexToRemoveFrom !== -1 ? data.slice(0, indexToRemoveFrom) : data;

  const result = {};

  // Extract the unique fiscal years
  const fiscalYears = ['FY23', 'Fy24'];

  // Loop through each leader (skipping the first three rows which are headers)
  for (let i = 3; i < filteredData.length - 1; i++) {
    const leader = filteredData[i][0];
    result[leader] = {};

    // Initialize totals
    const totals = {};

    // Loop through each fiscal year
    fiscalYears.forEach(fy => {
      result[leader][fy] = {};
      totals[fy] = 0;

      // Loop through each column and match fiscal year with sprint
      for (let j = 1; j < filteredData[0].length; j++) {
        if (filteredData[0][j] === fy && /^S\d+$/.test(filteredData[1][j])) {
          result[leader][fy][filteredData[1][j]] = filteredData[i][j];
          totals[fy] += filteredData[i][j] || 0; // Add to the total for this fiscal year
        }
      }
    });

    // Add totals to the result
    result[leader]['total'] = {};
    for (let fy in totals) {
      result[leader]['total'][fy] = totals[fy];
    }
  }

  return result;
}
