export interface LogEntry {
  date: string;
  name: string;
  address: string;
  functionId: string;
  serialNo: string;
  callTime: string;
  time: string;
  parameter: string;
  result: string;
  source: string;
  status: number;
}

export interface LcztLogEntry {
  businessAccount?: string; // Optional if it might be null
  serialId?: string;
  clientId?: string;
  serverIp?: string;
  clientIp?: string;
  sessionId?: string;
  functionId?: string;
  state: boolean; // Assuming this corresponds to the Java boolean field 'state'
  cifAccount?: string;
  req?: string;
  response?: string;
  source?: string;
  serverId?: string;
  tradeId?: string;
  ext?: string;
  callTime: number; // Assuming callTime is an integer in Java
  sendDate?: string; // Represents Timestamp as ISO string in TypeScript
}
