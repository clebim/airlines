export default interface ICreateFlight {
  name: string;
  companyId: number;
  airportOriginId: number;
  airportDestinyId: number;
  dayWeek: string;
  exitAt: string;
  airplaneModel: string;
  price: number;
  capacity: number;
}
