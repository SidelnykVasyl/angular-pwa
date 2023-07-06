export interface Mission {
  id: number;
  functionalId: string;
  qualification: string;
  expectedStartDate: string;
  expectedEndDate: string;
  acceptanceStatus: string;
  contractSigned: boolean;
}

export interface User {
  id: string;
  talent: {
    functionalId: string;
    pixidId: string;
    osmoseId: string;
    firstName: string;
    lastName: string;
  };
  missions: Mission[];
}
