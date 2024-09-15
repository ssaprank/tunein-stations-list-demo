import { useQuery } from "react-query";
import { Station } from "../types";

// TODO - id is not unique across stations which is unusual
// for now I filter out the 404 station which got duplicated id, but I would clarify this with the team

// @TODO - add mapper to ensure we get proper data
const fetchStations = (): Promise<Array<Station>> =>
  fetch("https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json")
    .then((response) => response.json())
    .then(({ data }: { data: Array<Station> }) =>
      data.filter((station) => station.name !== "404 Station")
    );

export const useFetchStations = () => useQuery("stations", fetchStations);
