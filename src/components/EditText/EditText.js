/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Input } from "react-native-elements";

function EditText(props) {
  const {
    style,
    disabled,
    disabledInputStyle,
    inputContainerStyle,
    errmsg,
    errorStyle,
    errorProps,
    inputComponent,
    inputStyle,
    label,
    labelStyle,
    labelProps,
    leftIcon,
    leftIconContainerStyle,
    rightIcon,
    rightIconContainerStyle,
    text,
    editable,
    booleanvalue,
    onChange,
    value,
    onFocus,
    onBlur,
    multiline,
    placeholderTextColor,
    keyboardType,
    maxLength,
    onSubmitEditing,
    inputRef,
    blurOnSubmit
  } = props;

  return (
    <Input
      blurOnSubmit={blurOnSubmit}
      ref={inputRef}
      multiline={multiline}
      containerStyle={style}
      disabled={disabled}
      editable={editable}
      placeholder={text}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={booleanvalue}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      errorProps={errorProps}
      disabledInputStyle={disabledInputStyle}
      inputContainerStyle={inputContainerStyle}
      errorMessage={errmsg}
      errorStyle={errorStyle}
      inputComponent={inputComponent}
      inputStyle={inputStyle}
      label={label}
      maxLength = {maxLength}
      labelStyle={labelStyle}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconContainerStyle={leftIconContainerStyle}
      rightIcon={rightIcon}
      onSubmitEditing={onSubmitEditing}
      rightIconContainerStyle={rightIconContainerStyle}
    />
  );
}

export default EditText;
