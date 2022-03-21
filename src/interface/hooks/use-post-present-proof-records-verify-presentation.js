/**
 * This function is used to post a verify presentation record.
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostPresentProofRecordsVerifyPresentation() {
  const [inflight, setInflight] = useState(new Set())

  const path = '/present-proof-2.0/records/?/verify-presentation'

  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (origin, presentationExchangeId, setStatus, setStoreData) => {
      if (!inflight.has(presentationExchangeId)) {
        const pathFinal = path.replace('?', presentationExchangeId)
        const params = {}
        const body = {}

        const transformData = (retrievedData) => {
          setInflight(
            (prev) =>
              new Set([...prev].filter((id) => id != presentationExchangeId))
          )
          return retrievedData
        }

        post(
          origin,
          pathFinal,
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
