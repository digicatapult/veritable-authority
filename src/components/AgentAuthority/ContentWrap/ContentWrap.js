/**
 * This function returns the content of the issuer page which is
 * a div that contains two columns.
 * @returns A column left and a column right.
 */
import ColumnLeftWrap from '../ColumnLeft/ColumnLeftWrap'
import ColumnRightWrap from '../ColumnRight/ColumnRightWrap'

export default function ContentWrap({ origin }) {
  return (
    <>
      <ColumnLeftWrap origin={origin} />
      <ColumnRightWrap origin={origin} />
    </>
  )
}
