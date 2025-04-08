import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import styles

const CustomEditor = ({
  name,
  value,
  onChange,
  lang, // Optional
  height = "200px",
  editorOptions = {},
}) => {
  const isRTL = lang?.rtl === "1";

  return (
    <SunEditor
      dir={isRTL ? "rtl" : "ltr"}
      height={height}
      setDefaultStyle={`font-family: Roboto; font-size: 16px; text-align: ${
        isRTL ? "right" : "left"
      }`}
      name={name}
      setOptions={{ ...editorOptions, rtl: isRTL }}
      setContents={value}
      onChange={onChange}
    />
  );
};

export default CustomEditor;
