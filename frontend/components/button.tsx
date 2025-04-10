import React from "react";
import {
  Pressable,
  Text,
  PressableProps,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface ButtonProps extends PressableProps {
  variant?: "filled" | "outlined";
  label: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

const Button = ({
  variant = "filled",
  label,
  color = "#BDEE63",
  textColor,
  style,
  ...props
}: ButtonProps) => {
  // Create proper typed styles
  const buttonStyle: ViewStyle = {
    ...styles.baseButton,
    ...style,
  };
  const textStyle: TextStyle = {
    ...styles.buttonText,
  };

  if (variant === "filled") {
    buttonStyle.backgroundColor = color;
    textStyle.color = textColor || "black";
  } else if (variant === "outlined") {
    buttonStyle.borderWidth = 2;
    buttonStyle.borderColor = color;
    textStyle.color = color;
  }

  return (
    <Pressable style={buttonStyle} {...props}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Button;
