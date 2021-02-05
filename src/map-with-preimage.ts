import {Set} from "immutable";
import {BinaryRelation} from "./binary-relation";

interface MapWithPreimage<T, U> {
  get(x: T): U | undefined;
  preimage(y: U): Set<T>;
  set(x: T, y: U): MapWithPreimage<T, U>;
}

export function MapWithPreimage<T, U>(): MapWithPreimage<T, U> {
  function of(relation: BinaryRelation<T, U>): MapWithPreimage<T, U> {
    return {
      get(x: T): U | undefined {
        return relation.image(x).toList().get(0, undefined);
      },

      preimage(y: U): Set<T> {
        return relation.preimage(y);
      },

      set(x: T, y: U): MapWithPreimage<T, U> {
        return of(
          relation
            .image(x)
            .reduce((relation, y) => relation.unrelate(x, y), relation)
            .relate(x, y),
        );
      },
    };
  }

  return of(BinaryRelation<T, U>());
}
