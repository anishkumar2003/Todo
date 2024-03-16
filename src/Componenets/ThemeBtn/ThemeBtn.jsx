import { useContext } from "react";
import { ThemeContext } from "../../Context/Theme";

export default function ThemeBtn() {
  const { theme, darkTheme, lightTheme } = useContext(ThemeContext);

  const btnHandle = (e) => {
    const darkmodeStatus = e.currentTarget.checked;
    if (darkmodeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer ">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={btnHandle}
      />
      <div
        className={`w-11 h-6 rounded-full peer ${
          theme === "dark" ? "bg-blue-600" : "bg-gray-200"
        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
      ></div>
    </label>
  );
}
