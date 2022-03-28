/**
 * It returns a function that can be used to delete a connection.
 */
import { useCallback, useState } from 'react'
import del from '../api/helpers/del'

export default function useDeleteRecord() {
  const path = '/present-proof-2.0/records/'
  const transformData = (retrievedData) => retrievedData
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const onStartFetch = useCallback((origin, presExId, setStoreData) => {
    del(
      origin,
      path + presExId,
      {},
      setStatus,
      setError,
      setStoreData,
      transformData
    )
  }, [])
  return [status, error, onStartFetch]
}
