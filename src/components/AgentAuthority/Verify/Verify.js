/**
 * Listens for presentation proofs and verifies them
 */
import { useEffect } from 'react'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import usePostPresentProofRecordsVerifyPresentation from '../../../interface/hooks/use-post-present-proof-records-verify-presentation'
import Error from '../../Common/Misc/Error'

export default function Verify({ origin }) {
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()
  const [errorVerify, startFetchHandlerVerify] =
    usePostPresentProofRecordsVerifyPresentation()

  useEffect(() => {
    const sendVerifications = (presentations) => {
      presentations.forEach((presentation) => {
        startFetchHandlerVerify(
          origin,
          presentation.pres_ex_id,
          () => {},
          () => {}
        )
      })
    }
    const intervalIdFetch = startGetRecordsHandler(
      origin,
      'presentation-received',
      sendVerifications
    )
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [origin, statusRecords, startFetchHandlerVerify, startGetRecordsHandler])

  return <Error errors={[errorRecords, errorVerify]} />
}
