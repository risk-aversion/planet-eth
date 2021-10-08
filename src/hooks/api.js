import { useEffect, useState } from "react";
import { staging, production } from "../utils/constants";

const URL = process.env.production ? production : staging;

export const RaribleHook = () => {
  const [metadata, setMetadata] = useState();
  const [ownerList, setOwnerList] = useState();

  useEffect(() => {
    (async () => {
      const meta = await (await fetch(URL)).json();
      if (meta) {
        setMetadata(meta);
        const list = meta.items.reduce((acc, val) => {
          const owner = val.owners[0];
          const country = val.meta.attributes.find(
            (trait) => trait.key === "name"
          );
          acc[owner]
            ? (acc[owner] = [...acc[owner], country.value])
            : (acc[owner] = [country.value]);
          return acc;
        }, {});

        setOwnerList(list);
      }
    })();
  }, []);

  return {
    metadata,
    ownerList,
  };
};
