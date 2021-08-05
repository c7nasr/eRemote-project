exports.handleLockStatus = (lock) => {
  if (lock === 0) {
    return "Unlock";
  } else {
    return "Lock";
  }
};
exports.handleLockType = (g_id) => {
  if (g_id) {
    return "Emergency Locker";
  } else {
    return "Windows Lock";
  }
};
exports.handleRetries = (tries) => {
  if (tries) {
    return tries;
  } else {
    return 0;
  }
};
