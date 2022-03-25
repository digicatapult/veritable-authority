/**
 * Listens for presentation proof proposals and sends requests in response, then deletes the original proposal
 */
import { useEffect } from 'react'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import useDeleteRecord from '../../../interface/hooks/use-delete-record'
import usePostPresentProofSendRequest from '../../../interface/hooks/use-post-present-proof-send-request'
import Error from '../../Common/Misc/Error'

export default function RequestProof({ origin }) {
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()
  const [errorRequest, startFetchHandlerRequest] =
    usePostPresentProofSendRequest()
  const [errorDelete, startDeleteHandler] = useDeleteRecord()

  useEffect(() => {
    const sendRequests = (proposals) => {
      proposals.forEach((proposal) => {
        startFetchHandlerRequest({
          origin,
          comment: proposal.pres_proposal.comment,
          connectionId: proposal.connection_id,
          proposal: proposal.by_format.pres_proposal.indy,
          validity: new Date().toISOString().split('T')[0],
          setStatus: () => {},
          setStoreData: () => {
            startDeleteHandler(
              origin,
              proposal.pres_ex_id,
              () => {},
              () => {}
            )
          },
        })
      })
    }
    const intervalIdFetch = startGetRecordsHandler(
      origin,
      'proposal-received',
      sendRequests
    )
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [
    origin,
    statusRecords,
    startFetchHandlerRequest,
    startGetRecordsHandler,
    startDeleteHandler,
  ])

  return <Error errors={[errorRecords, errorRequest, errorDelete]} />
}
