import React from "react"
export default function DetailsData({ keyPt, value }) {
  console.log("inside dd")
  return <div>
    ` <b>${
      keyPt
    } </b> {value}`
    </div>
}