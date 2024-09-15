import { Station } from "../../types";

export const getTopPopularStations = (
  stations: Array<Station>
): Array<Station> =>
  [...stations]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, Math.ceil(stations.length / 5));
