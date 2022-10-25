export const fileToURL = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("loadend", () => resolve(fileReader.result));

    fileReader.addEventListener("error", () =>
      reject(new Error("Error al cargar"))
    );

    fileReader.addEventListener("abort", () =>
      reject(new Error("Error al cargar"))
    );

    fileReader.readAsDataURL(file);
  });
