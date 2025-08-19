import Cells from './Cells'

const Row = ({ item }) => {
    const dataCell = Object.entries(item) //This converts the ITEM OBJECT into an ARRAY OF KEY,VALUE PAIRS.
  return (
    <tr>
        {/* Then we map to the ARRAY we created from the object */}
      {dataCell.map(([key, value]) => { //We destructure the values we are getting from the ARRAY
        const cellData = JSON.stringify(value) //This changes any object gotten as a value into a JS string. so all the values are stringified.
        return (
            <Cells
                key={key} //Since we are mapping every item has to have its unique key
                cellData={cellData}
             /> //The Cells component returns the td data for the tr in the tbody of the table
        )
      })}
    </tr>
  )
}

export default Row
