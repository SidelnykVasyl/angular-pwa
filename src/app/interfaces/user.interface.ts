interface Mission {
  startDate: string;
  endDate: string;
  qualification: string;
  status: string;
  contractSigned: string;
}

export interface User {
  id?: number;
  functionalId: number;
  osmoseId: number;
  pixidId: number;
  firstName: string;
  lastName: string;
  missions: Mission[];
}
