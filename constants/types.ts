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
