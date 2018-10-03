import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export default class DialogInput extends React.PureComponent {
  static propTypes = {
    ...TextInput.propTypes,
    label: PropTypes.string,
    style: PropTypes.any,
    textInputRef: PropTypes.any,
    wrapperStyle: PropTypes.any,
    numberOfLines: PropTypes.number,
    multiline: PropTypes.bool
  };

  static displayName = "DialogInput";

  render() {
    const {
      label,
      style,
      wrapperStyle,
      textInputRef,
      multiline,
      numberOfLines,
      errorMessage,
      error,
      ...otherProps
    } = this.props;
    const lines = (multiline && numberOfLines) || 1;
    const height = 18 + Platform.select({ ios: 14, android: 22 }) * lines;
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.textInputWrapper, wrapperStyle]}>
          <TextInput
            ref={textInputRef}
            style={[styles.textInput, style, { height }]}
            multiline={multiline}
            numberOfLines={numberOfLines}
            {...otherProps}
          />
        </View>
        {error && <Text style={{ color: 'red', marginTop: 5, fontSize: 13 }}>{errorMessage}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      marginHorizontal: 20,
      marginBottom: 20
    },
    android: {
      marginHorizontal: 10,
      marginBottom: 20
    }
  }),
  textInputWrapper: Platform.select({
    ios: {
      backgroundColor: "white",
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      paddingHorizontal: 8,
      borderColor: "#A9ADAE",
    },
    android: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#A9ADAE",
    }
  }),
  label: Platform.select({
    ios: {},
    android: {
      color: "rgba(0, 0, 0, 0.5)",
      fontSize: 14
    }
  }),
  textInput: Platform.select({
    ios: {},
    android: {
      marginLeft: -4,
      paddingLeft: 4
    }
  })
});

