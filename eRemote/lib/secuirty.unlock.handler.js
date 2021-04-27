import * as LocalAuthentication from 'expo-local-authentication';
export const is_biometric_available = async () => {
  const hardwareCheck = await LocalAuthentication.hasHardwareAsync();
  const availableTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();

  console.log(hardwareCheck, availableTypes, isEnrolled, enrolledLevel);

  if (hardwareCheck && availableTypes.length > 0 && isEnrolled) {
    return true;
  } else {
    false;
  }
};
export const AuthPrompt = async () => {
  const res = await LocalAuthentication.authenticateAsync();

  if (res.success) return true;
  return false;
};
