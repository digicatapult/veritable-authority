/**
 * This function returns the content of the page which is
 * a div that contains two columns.
 * @returns A column left and a column right.
 */
import ColumnLeftWrap from '../ColumnLeft/ColumnLeftWrap'
import ColumnRightWrap from '../ColumnRight/ColumnRightWrap'

import RequestProof from '../RequestProof'
import Verify from '../Verify'
import IssueLicense from '../IssueLicense'

export default function ContentWrap({ origin }) {
  return (
    <>
      <RequestProof origin={origin} />
      <Verify origin={origin} />
      <IssueLicense origin={origin} />
      <ColumnLeftWrap origin={origin} />
      <ColumnRightWrap origin={origin} />
    </>
  )
}
