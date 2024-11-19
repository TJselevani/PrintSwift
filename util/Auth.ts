import { UserData } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from './Logger';

const logger = Logger.getInstance();
// Function to save user data
export const saveUserData = async (
  email: string,
  username: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userName', username);
  } catch (error) {
    logger.error(`Error saving user data ${error}`);
  }
};

// Function to retrieve user data
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const email = await AsyncStorage.getItem('userEmail');
    const username = await AsyncStorage.getItem('userName');
    return { email, username };
  } catch (error) {
    logger.error(`Error retrieving user data ${error}`);
    return null;
  }
};

// Function to remove user data (for logout)
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userName');
  } catch (error) {
    logger.error(`Error removing user data ${error}`);
  }
};
