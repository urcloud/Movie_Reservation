export type Screening = {
  screeningid: number;
  movieid: number;
  theaterid: number;
  screeningdate: string; //혹은 Date 타입
  starttime: string;
  endtime: string;
  ticketprice: number;
};
