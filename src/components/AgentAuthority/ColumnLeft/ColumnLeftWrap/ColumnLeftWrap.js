/**
 * This function is used to display issued credential records log
 */
import { useEffect, useState } from 'react'
import IssuedRecordItem from '../IssuedRecordItem'
import useGetIssueCredentialRecords from '../../../../interface/hooks/use-get-looped-issue-credential-records'

export default function ColumnLeftWrap({ origin }) {
  const [dataRecords, setDataRecords] = useState([])
  const [flyerIdSearch, setFlyerIdSearch] = useState('')
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetIssueCredentialRecords()
  useEffect(() => {
    const setStoreDataFn = (resData) => setDataRecords(resData)
    const intervalIdFetch = startGetRecordsHandler(origin, setStoreDataFn)
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [origin, statusRecords, startGetRecordsHandler])

  const inputNameHandler = (e) => {
    setFlyerIdSearch(e.target.value)
  }

  const renderedRecords = dataRecords.filter((record) => {
    const flyerId = record.cred_ex_record.cred_preview.attributes[0].value
    return flyerId.indexOf(flyerIdSearch) !== -1
  })

  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>Issued Licenses</h5>
              <p className="small">Search for issued licenses by flyer ID</p>
              <input
                type="text"
                value={flyerIdSearch}
                onChange={inputNameHandler}
                required
                className="form-control"
                id="name"
                placeholder="GBR-RP-123456"
              />
              <div className="container py-3">
                <div className="accordion" id="accordion">
                  {renderedRecords.length === 0 && (
                    <p className="small">No credentials found</p>
                  )}

                  {renderedRecords.length > 0 && (
                    <>
                      <div className="card m-0 p-0"></div>
                    </>
                  )}

                  {renderedRecords.map((r, i) => (
                    <div key={r.cred_ex_record.cred_ex_id} className="card">
                      <IssuedRecordItem record={r} index={i} />
                    </div>
                  ))}

                  {renderedRecords.length > 0 && (
                    <>
                      <div className="card m-0 p-0"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={errorRecords ? 'd-block' : 'd-none'}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          {' '}
          <small>{errorRecords}</small>{' '}
        </div>
      </div>
    </>
  )
}
