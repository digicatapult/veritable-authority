/**
 * This function is used to send with POST a proposal for a present proof
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofSendRequest() {
  const path = '/present-proof-2.0/send-request'

  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  const createBody = (comment, connectionId, proposal, validity) => {
    const reqPrs4zkProofs = [
      {
        name: 'expiration_dateint',
        p_type: '>=',
        p_value: validity.split('-').join('') * 1,
        restrictions: [{ schema_name: 'drone schema' }],
      },
    ]

    const proofProposalWebRequest = {
      comment,
      connection_id: connectionId,
      presentation_request: {
        indy: {
          name: proposal.name,
          version: proposal.version,
          requested_attributes: proposal.requested_attributes,
          requested_predicates: Object.fromEntries(
            reqPrs4zkProofs.map((e) => [`0_${e.name}_GE_uuid`, e])
          ),
        },
      },

      trace: false,
    }
    return proofProposalWebRequest
  }

  const onStartFetch = useCallback(
    (origin, comment, connectionId, proposal, validity, setStoreData) => {
      const params = {}
      const body = createBody(comment, connectionId, proposal, validity)

      const transformData = (retrievedData) => retrievedData.pres_ex_id

      post(
        origin,
        path,
        params,
        body,
        setStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )
  return [status, error, onStartFetch]
}
