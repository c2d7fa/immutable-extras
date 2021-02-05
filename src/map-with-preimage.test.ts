/// <reference types="@types/jest" />

import {Set} from "immutable";
import {MapWithPreimage} from "./map-with-preimage";

describe(MapWithPreimage, () => {
  describe("an empty map", () => {
    const authors = MapWithPreimage<string, string>();

    it("maps no elements to any value", () => {
      expect(authors.get("The Metamorphosis")).toBeUndefined();
      expect(authors.get("The Trial")).toBeUndefined();
      expect(authors.get("Steppenwolf")).toBeUndefined();
    });

    it("has nothing in its preimage for any element", () => {
      expect(authors.preimage("Franz Kafka")).toEqual(Set([]));
      expect(authors.preimage("Hermann Hesse")).toEqual(Set([]));
    });
  });

  describe("after adding an element", () => {
    const authors = MapWithPreimage<string, string>().set("The Metamorphosis", "Franz Kafka");

    it("maps that key to its value", () => {
      expect(authors.get("The Metamorphosis")).toEqual("Franz Kafka");
    });

    it("still maps no other keys to any value", () => {
      expect(authors.get("The Trial")).toBeUndefined();
      expect(authors.get("Steppenwolf")).toBeUndefined();
    });

    test("the preimage of the value is now the key that was added", () => {
      expect(authors.preimage("Franz Kafka")).toEqual(Set(["The Metamorphosis"]));
    });

    test("but no other value is mapped back to any key", () => {
      expect(authors.preimage("Hermann Hesse")).toEqual(Set([]));
    });
  });

  describe("setting an existing key to a new value", () => {
    const authors = MapWithPreimage<string, string>()
      .set("The Metamorphosis", "Franz Kafka")
      .set("The Metamorphosis", "Your Mom");

    it("maps the key to the newest value", () => {
      expect(authors.get("The Metamorphosis")).toEqual("Your Mom");
    });

    it("maps the preimage of the new value back to the key", () => {
      expect(authors.preimage("Your Mom")).toEqual(Set(["The Metamorphosis"]));
    });

    it("maps the preimage of the old value back to nothing", () => {
      expect(authors.preimage("Franz Kafka")).toEqual(Set([]));
    });
  });

  describe("setting a different key to the same value", () => {
    const authors = MapWithPreimage<string, string>()
      .set("The Metamorphosis", "Franz Kafka")
      .set("The Trial", "Franz Kafka");

    it("maps both keys to that value", () => {
      expect(authors.get("The Metamorphosis")).toEqual("Franz Kafka");
      expect(authors.get("The Trial")).toEqual("Franz Kafka");
    });

    it("maps the preimage of the value back to both keys", () => {
      expect(authors.preimage("Franz Kafka")).toEqual(Set(["The Metamorphosis", "The Trial"]));
    });
  });
});
