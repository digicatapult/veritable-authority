/**
 * This function is responsible for rendering the left content column of the screen.
 * @returns The `ColumnLeftWrap` component returns a `div` element with a `div`
 * element inside of it.
 */

export default function ColumnLeftWrap() {
  // const setStoreDataFn = (resData) => {
  //   setRecords(() => {
  //     const verifiedProofs = resData.filter(
  //       (record) => record.state === 'done'
  //     )
  //     const presentations = resData.filter(
  //       (record) => record.state === 'presentation-received'
  //     )
  //     verifiedProofs.forEach((verified) => {
  //       const presentation = verified.by_format.pres.indy.requested_proof
  //       // console.log(presentation)
  //       // startFetchHandlerCredOffer(
  //       //   origin,
  //       //   verified.connection_id,
  //       //   licenseCredDefId,
  //       //   presentation.revealed_attrs['0_id_uuid'].raw,
  //       //   presentation.revealed_attrs['0_type_uuid'].raw,
  //       //   'expiry',
  //       //   setStatusIssueCred,
  //       //   setDataIssueCred
  //       // )
  //     })
  //     return resData
  //   })
  // }
  //const intervalIdFetch = startGetRecordsHandler(origin, setStoreDataFn)
  // if (statusRecordEvents !== 'started') clearInterval(intervalIdFetch)
  // return function clear() {
  //   return clearInterval(intervalIdFetch)
  //}

  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>Enter Flyer ID</h5>
              <p className="small">View all certificates for a flyer ID</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
