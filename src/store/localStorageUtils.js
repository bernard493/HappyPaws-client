export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("selectedPetForAdoption");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("selectedPetForAdoption", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
};

export const saveUserData = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch (error) {
    console.error("Error saving user state to localStorage", error);
  }
};

export const getSavedLocalUser = () => {
  try {
    const userData = localStorage.getItem("user");
    if (userData === null) {
      return undefined;
    }
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error getting  User state to localStorage", error);
  }
};
