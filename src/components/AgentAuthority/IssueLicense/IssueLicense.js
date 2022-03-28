import { useEffect, useState } from 'react'
import LicenseCredDef from '../LicenseCredDef'
import useIssueLicense from '../../../interface/hooks/use-issue-license'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import Error from '../../Common/Misc/Error'

export default function IssueLicense({ origin }) {
  const [licenseCredDefId, setLicenseCredDefId] = useState('')
  const [statusIssue, errorIssue, startIssueLicense] = useIssueLicense()
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()

  useEffect(() => {
    const issueLicenses = (proposals) => {
      proposals.forEach((proposal) => {
        if (licenseCredDefId) {
          startIssueLicense(origin, proposal, licenseCredDefId)
        }
      })
    }

    const intervalIdFetch = startGetRecordsHandler(
      origin,
      'proposal-received',
      issueLicenses
    )
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [
    origin,
    statusRecords,
    startGetRecordsHandler,
    licenseCredDefId,
    startIssueLicense,
  ])
  console.log(statusIssue)

  return (
    <>
      <LicenseCredDef
        origin={origin}
        setLicenseCredDefId={setLicenseCredDefId}
      />
      <Error errors={[errorRecords, errorIssue]} />
    </>
  )
}
