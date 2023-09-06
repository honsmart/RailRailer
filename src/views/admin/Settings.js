import React from "react";
import CardTable from "components/Cards/CardTable";
// components

import CardSettings from "components/Cards/CardSettings.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-full px-4">
          <CardSettings />
        </div>
        <CardTable />
      </div>
    </>
  );
}
