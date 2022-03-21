/**
 * This function is used to send with POST a proposal for a present proof
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofSendRequest() {
  const [inflight, setInflight] = useState(new Set())

  const path = '/present-proof-2.0/send-request'

  const [error, setError] = useState(null)

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
    ({
      origin,
      comment,
      connectionId,
      proposal,
      validity,
      setStatus,
      setStoreData,
    }) => {
      if (!inflight.has(proposal.pres_ex_id)) {
        setInflight((prev) => new Set(prev.add(proposal.pres_ex_id)))

        const params = {}
        const body = createBody(comment, connectionId, proposal, validity)

        const transformData = (retrievedData) => {
          setInflight(
            (prev) =>
              new Set([...prev].filter((id) => id != proposal.pres_ex_id))
          )
          return retrievedData.pres_ex_id
        }

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
      }
    },
    [inflight]
  )
  return [error, onStartFetch]
}
