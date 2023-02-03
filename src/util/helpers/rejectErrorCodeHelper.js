export const rejectErrorCodeHelper = (error) => {
  if (error?.response?.data?.error) {
    const errorMessage = error?.response?.data?.error.message;

    return errorMessage;
  }
};
