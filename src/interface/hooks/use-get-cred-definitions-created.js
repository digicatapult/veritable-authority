/**
 * This function returns a function that, will fetch the credential
 * definitions created by the user
 */
import { useCallback, useState } from 'react'
import get from '../api/helpers/get'

export default function useGetCredDefinitionsCreated() {
  const path = '/credential-definitions/created'
  const transformData = (retrievedData) =>
    retrievedData.credential_definition_ids

  const [error, setError] = useState(null)

  const onStartFetch = useCallback((fetchOrigin, setStoreData) => {
    get(fetchOrigin, path, {}, () => {}, setError, setStoreData, transformData)
  }, [])
  return [error, onStartFetch]
}
