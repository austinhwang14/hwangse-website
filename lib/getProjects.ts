import Papa from "papaparse";

export type Project = {
  id: number;
  name: string;
  type: string;
  architect: string;
  location: string;
  description: string;
  scope: string;
  projectImage: string;
  renderingImage: string;
  drawingImage: string;
  mainImage: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
};

const CSV_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzeiB0GESE_pKzQWcdJo63QgiaVbl7RbOVONXiZ8Eh97zrTTQjCznYipfhNnDBcLZTa18rllXQuMxW/pub?gid=442737463&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzeiB0GESE_pKzQWcdJo63QgiaVbl7RbOVONXiZ8Eh97zrTTQjCznYipfhNnDBcLZTa18rllXQuMxW/pub?gid=523342191&single=true&output=csv",
];

function clean(value: string) {
  return value?.trim() || "";
}

function convertGoogleDriveUrl(url: string) {
  const cleanedUrl = clean(url);

  if (!cleanedUrl) return "";

  const match = cleanedUrl.match(/\/d\/([^/]+)/);

  if (match?.[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }

  return cleanedUrl;
}

export async function getProjects(): Promise<Project[]> {
  const allProjects = await Promise.all(
    CSV_URLS.map(async (url) => {
      const response = await fetch(url, {
  next: { revalidate: 300 },
});
      const csvText = await response.text();

      const parsed = Papa.parse<string[]>(csvText, {
        skipEmptyLines: true,
      });

      const rows = parsed.data;

      const headerIndex = rows.findIndex(
        (row) => row.includes("ID") && row.includes("Name")
      );

      if (headerIndex === -1) return [];

      const headers = rows[headerIndex].map((header) => clean(header));
      const dataRows = rows.slice(headerIndex + 1);

      const getValue = (row: string[], columnName: string) => {
        const index = headers.findIndex(
          (header) =>
            header === columnName || header.startsWith(`${columnName} `)
        );

        return index >= 0 ? clean(row[index]) : "";
      };

      return dataRows
        .map((row) => {
          const projectImage = convertGoogleDriveUrl(
            getValue(row, "Project Image")
          );

          const renderingImage = convertGoogleDriveUrl(
            getValue(row, "Rendering Image")
          );

          const drawingImage = convertGoogleDriveUrl(
            getValue(row, "Drawing Image")
          );

          const images = [
            projectImage,
            renderingImage,
            drawingImage,
          ].filter(Boolean);

          return {
            id: Number(getValue(row, "ID")),
            name: getValue(row, "Name"),
            type: getValue(row, "Type"),
            architect: getValue(row, "Architect"),
            location: `${getValue(row, "Address")}, ${getValue(
              row,
              "City, State"
            )}`,
            description: getValue(row, "Description"),
            scope: getValue(row, "Scope"),
            projectImage,
            renderingImage,
            drawingImage,
            mainImage: images[0] || "",
            images,
            coordinates: {
              lat: Number(getValue(row, "Latitude")),
              lng: Number(getValue(row, "Longitude")),
            },
          };
        })
        .filter(
          (project) =>
            project.id &&
            project.name &&
            project.coordinates.lat &&
            project.coordinates.lng
        );
    })
  );

  return allProjects.flat();
}