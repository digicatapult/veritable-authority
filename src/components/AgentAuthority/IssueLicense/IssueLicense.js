/**
 * Listens for verified presentation proofs and issues a license
 */
import { useEffect, useState } from 'react'
import moment from 'moment'
import LicenseCredDef from '../LicenseCredDef'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import usePostIssueCredentialSendOffer from '../../../interface/hooks/use-post-issue-credential-send-offer'
import useDeleteRecord from '../../../interface/hooks/use-delete-record'
import Error from '../../Common/Misc/Error'

export default function IssueLicense({ origin }) {
  const [licenseCredDefId, setLicenseCredDefId] = useState('')
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()
  const [errorIssueCred, startFetchHandlerCredOffer] =
    usePostIssueCredentialSendOffer()
  const [errorDelete, startDeleteHandler] = useDeleteRecord()

  useEffect(() => {
    const sendCredOffers = (verifiedProofs) => {
      verifiedProofs.forEach((verified) => {
        const {
          by_format: {
            pres: {
              indy: {
                requested_proof: { revealed_attrs: attributes },
              },
            },
          },
        } = verified

        const expiry = moment().add(2, 'years').format('YYYYMMDD')

        startFetchHandlerCredOffer(
          origin,
          verified.connection_id,
          licenseCredDefId,
          attributes['0_id_uuid'].raw,
          attributes['0_type_uuid'].raw,
          expiry,
          () => {},
          () => {
            startDeleteHandler(
              origin,
              verified.pres_ex_id,
              () => {},
              () => {}
            )
          }
        )
      })
    }
    const intervalIdFetch = startGetRecordsHandler(
      origin,
      'done',
      sendCredOffers
    )
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [
    origin,
    statusRecords,
    startFetchHandlerCredOffer,
    startGetRecordsHandler,
    licenseCredDefId,
    startDeleteHandler,
  ])

  return (
    <>
      <LicenseCredDef
        origin={origin}
        setLicenseCredDefId={setLicenseCredDefId}
      />
      <Error errors={[errorIssueCred, errorRecords, errorDelete]} />
    </>
  )
}
