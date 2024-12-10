export default function cleanData(
  data: { [key: string]: string | number | boolean | Date | null }[],
): { [key: string]: string | number | boolean | Date }[] {
  return data.map((row) => {
    const cleanedRow: { [key: string]: string | number | boolean | Date } = {};
    for (const key in row) {
      if (row[key] === null) {
        cleanedRow[key] = "";
      } else {
        cleanedRow[key] = row[key];
      }
    }
    return cleanedRow;
  });
}
