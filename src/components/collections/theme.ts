export const collectionsTheme = {
  root: {
    base: "max-w-md mx-auto bg-gray-900 text-white p-4",
  },
  collection: {
    video: {
      base: "w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg",
      infoPanel: {
        base: "flex justify-between items-center bg-gray-800 text-white p-2",
        name: "font-bold",
        identity: "text-sm text-gray-300",
        type: "text-sm bg-gray-700 px-2 py-1 rounded",
      },
      videoContainer: "relative pt-[56.25%]", // 16:9 aspect ratio
      videoTrack: "absolute top-0 left-0 w-full h-full object-contain",
      controls: {
        base: "flex items-center justify-between bg-gray-800 p-2",
        button:
          "bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors",
        icon: "text-white w-5 h-5",
        numbers: "text-white text-sm",
        dropdown: {
          button: "relative",
          menu: "absolute bottom-full right-0 mb-2 bg-gray-700 rounded shadow-lg overflow-hidden",
          item: "block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600",
        },
      },
    },
  },
};