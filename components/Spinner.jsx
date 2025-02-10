import Spinner from "react-native-loading-spinner-overlay";

const SpinnerLoader = ({ visible, textContent, textStyle, overlayColor }) => {
  return (
    <Spinner
      visible={visible}
      textContent={textContent}
      textStyle={textStyle}
      overlayColor={overlayColor}
    />
  );
};

export default SpinnerLoader;
