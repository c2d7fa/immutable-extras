/// <reference types="@types/jest" />

import {Set} from "immutable";
import {BinaryRelation} from "./binary-relation";

describe(BinaryRelation, () => {
  describe("an empty binary relation", () => {
    const properties = BinaryRelation<number, "even" | "positive">();

    it("has nothing in its image for any element", () => {
      expect(properties.image(-1)).toEqual(Set([]));
      expect(properties.image(1)).toEqual(Set([]));
      expect(properties.image(2)).toEqual(Set([]));
    });

    it("has nothing in its preimage for any element", () => {
      expect(properties.preimage("even")).toEqual(Set([]));
      expect(properties.preimage("positive")).toEqual(Set([]));
    });
  });

  describe("after relating one element to one other element", () => {
    const properties = BinaryRelation<number, "even" | "positive">().relate(1, "positive");

    test("the image of the left-hand element is the right-hand element", () => {
      expect(properties.image(1)).toEqual(Set(["positive"]));
    });

    test("the preimage of the right-hand element is the left-hand element", () => {
      expect(properties.preimage("positive")).toEqual(Set([1]));
    });

    test("the image of any other element is still empty", () => {
      expect(properties.image(-1)).toEqual(Set([]));
      expect(properties.image(2)).toEqual(Set([]));
    });

    test("the preimage of any other element is still empty", () => {
      expect(properties.preimage("even")).toEqual(Set([]));
    });
  });

  describe("after relating another element to the same right-hand element", () => {
    const properties = BinaryRelation<number, "even" | "positive">().relate(1, "positive").relate(2, "positive");

    test("the image of each of the left-hand elements is still the right-hand element", () => {
      expect(properties.image(1)).toEqual(Set(["positive"]));
      expect(properties.image(2)).toEqual(Set(["positive"]));
    });

    test("the preimage of the right-hand element now has both of the left-hand elements", () => {
      expect(properties.preimage("positive")).toEqual(Set([1, 2]));
    });
  });

  describe("after relating the same left-hand element to mulitple right-hand elements", () => {
    const properties = BinaryRelation<number, "even" | "positive">()
      .relate(1, "positive")
      .relate(2, "positive")
      .relate(2, "even");

    test("the image of that element now has both the right-hand elements", () => {
      expect(properties.image(2)).toEqual(Set(["positive", "even"]));
    });
  });
});
