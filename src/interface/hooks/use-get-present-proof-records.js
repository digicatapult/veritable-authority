/**
 * This function returns continuously the present proof records
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'
export default function useGetPresentProofRecord() {
  const path = '/present-proof-2.0/records'
  const transformData = (retData) => retData
  const statusOptions = ['started', 'error', 'stopped']
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((origin, presExId, setStoreData) => {
    get(
      origin,
      `${path}/${presExId}`,
      {},
      setStatus,
      setError,
      setStoreData,
      transformData
    )
  }, [])
  return [status, error, onStartFetch]
}
