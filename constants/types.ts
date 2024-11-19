// types.ts

export interface Printer {
  id: string;
  name: string;
  connected: boolean;
}

export interface PrinterDevice {
  deviceName: string;
  macAddress: string;
}

// Define an interface for user data
export interface UserData {
  email: string | null;
  username: string | null;
}
