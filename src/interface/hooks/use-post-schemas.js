/**
 * It creates a function that will post a schema to the server.
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'
/* {"schema_name":"drone schema","schema_version":"1.91","attributes":["id","name","surname","type","title",
"subtitle","expiration_dateint","timestamp"]} */
export default function usePostSchemas() {
  const path = '/schemas'
  const transformData = (retrievedData) => retrievedData.schema_id
  const [error, setError] = useState(null)
  const onStartFetch = useCallback((fetchOrigin, schemaName, setStoreData) => {
    const createBody = (schemaName) => {
      const version = () => {
        const major = parseInt(Math.random() * 10 + 0)
        const minor = parseInt(Math.random() * 100 + 0)
        return `${major}.${minor}`
      }
      return {
        schema_name: schemaName,
        schema_version: version(),
        attributes: [
          'id',
          'type',
          'expiration_dateint',
          'timestamp',
          'test_cert_referent',
        ],
      }
    }

    const body = createBody(schemaName)
    post(
      fetchOrigin,
      path,
      {},
      body,
      () => {},
      setError,
      setStoreData,
      transformData
    )
  }, [])
  return [error, onStartFetch]
}
