function ColorPicker({
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div className="max-w-xl mx-auto mb-4 mt-4">

      <p className="font-semibold mb-2">
        Choose Color
      </p>

      <div className="flex gap-2">

        {/* Yellow */}
        <button
          type="button"
          onClick={() => setSelectedColor("yellow")}
          className={`w-8 h-8 rounded-full bg-yellow-300 ${
            selectedColor === "yellow"
              ? "ring-4 ring-black"
              : ""
          }`}
        ></button>


        {/* Blue */}
        <button
          type="button"
          onClick={() => setSelectedColor("blue")}
          className={`w-8 h-8 rounded-full bg-blue-300 ${
            selectedColor === "blue"
              ? "ring-4 ring-black"
              : ""
          }`}
        ></button>


        {/* Green */}
        <button
          type="button"
          onClick={() => setSelectedColor("green")}
          className={`w-8 h-8 rounded-full bg-green-300 ${
            selectedColor === "green"
              ? "ring-4 ring-black"
              : ""
          }`}
        ></button>


        {/* Pink */}
        <button
          type="button"
          onClick={() => setSelectedColor("pink")}
          className={`w-8 h-8 rounded-full bg-pink-300 ${
            selectedColor === "pink"
              ? "ring-4 ring-black"
              : ""
          }`}
        ></button>

      </div>


      {/* Selected color */}
      <p className="text-sm mt-2">
        Selected: <b>{selectedColor}</b>
      </p>

    </div>
  );
}

export default ColorPicker;