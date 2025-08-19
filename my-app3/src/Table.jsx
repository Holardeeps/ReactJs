import Row from './Row'

const Table = ({ items }) => {
  return (
    //The table is first placed in a div to control how it looks in CSS 
    <div className='table-container'>
        {/* Then we create the table for the data structure */}
      <table> 
        {/* And the body since we need no header thead. then after this comes tr for each row in the table */}
        <tbody>
            {
                items.map(item => (
                    <Row
                        key={item.id} //every item mapped from the array has to have its special key
                        item={item} //This is the individual item gotten from the array
                     />
                ))
            }
            {/* What we get from the above block of code returns a tr(row) */}
        </tbody>
      </table>
    </div>
  )
}

export default Table
