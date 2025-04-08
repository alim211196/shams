import { mkConfig, generateCsv } from "export-to-csv";

export const handleExportRows = async (fetchData, fileName, fieldMapping) => {
  try {
    const response = await fetchData();
    if (!response?.result?.length) {
      console.warn(`No data available for export: ${fileName}`);
      return;
    }

    const formattedData = response.result.map((item) =>
      Object.fromEntries(
        Object.entries(fieldMapping).map(([key, label]) => [
          label,
          key.split(".").reduce((acc, part) => acc?.[part], item),
        ])
      )
    );

    exportToCsv(formattedData, fileName);
  } catch (error) {
    console.error(`Error exporting ${fileName} CSV:`, error);
  }
};

export const exportToCsv = (data, fileName = "export") => {
  if (!data || data.length === 0) {
    console.warn("No data provided for export.");
    return;
  }

  const csv = generateCsv(
    mkConfig({ fieldSeparator: ",", useKeysAsHeaders: true })
  )(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
