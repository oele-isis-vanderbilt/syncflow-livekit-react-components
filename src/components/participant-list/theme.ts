export const participantListTheme = {
  root: {
    base: "max-w-md mx-auto bg-gray-900 text-white p-4",
  },
  header: {
    base: "flex justify-between items-center mb-4",
    title: "text-2xl font-bold",
    search: {
      base: "relative w-20 sm:w-35",
      input:
        " w-full bg-blue-600 text-white pl-3 py-1 rounded-md placeholder-white placeholder-opacity-75",
    },
  },
  participant: {
    base: "bg-gray-900 text-white p-3 rounded-lg mb-2",
    media: "mt-4 relative w-full h-48",
    header: {
      base:"flex justify-between items-center",
      identity:"font-semibold",
      room:"text-xs text-gray-400",
      inner:"flex items-center space-x-2"
    },
    audio: {
      base: "relative w-full rounded",
      title: "mb-2",
      audioTrack: {
        base: "flex flex-col items-center justify-center w-full",
        inner: "flex flex-col items-center gap-4",
        volume: {
          base: "w-10 h-10",
          on: "text-green-500",
          off: "text-gray-500",
        },
      },
      controls: {
        base: "absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2",
        left: {
          button: "bg-black bg-opacity-50 p-1 rounded-full",
          icon: "text-white",
        },
        right: {
          button: "bg-black bg-opacity-50 p-1 rounded-full",
          icon: "text-white",
        },
        numbers:
          "absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs text-white",
      },
    },
    video: {
      base: "relative w-full h-full",
      videoTrack:"w-full h-full object-cover rounded",
      controls: {
        base:"absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2",
        left: {
          button:"bg-black bg-opacity-50 p-1 rounded-full",
          icon:"text-white"
        },
        right: {
          button:"bg-black bg-opacity-50 p-1 rounded-full",
          icon: "text-white"
        },
        numbers:"absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs"
      }
    },
  },
};