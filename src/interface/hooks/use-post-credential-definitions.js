/**
 * This function is used to create a credential definition
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostCredentialDefinitions() {
  const path = '/credential-definitions'
  const transformData = (retrievedData) =>
    retrievedData.credential_definition_id
  const [error, setError] = useState(null)
  const onStartFetch = useCallback(
    (fetchOrigin, schemaId, persona, setStoreData) => {
      const params = {}
      const createBody = (schemaId, persona) => {
        const supportRevocation = false
        const sanitizeTitleWUnderscore = (str) => {
          const space = new RegExp(' ', 'g')
          str = str.replace(space, '_')
          return str
        }

        const schemaDefName = schemaId.split(':')[2]
        const schemaDefTagName = sanitizeTitleWUnderscore(schemaDefName)
        const schemaDefTagPrefix = `${persona}.agent`
        const credDefTag = `${schemaDefTagPrefix}.${schemaDefTagName}`
        const did = schemaId.split(':')[0]
        const definitionBody = {
          schema_id: schemaId,
          support_revocation: supportRevocation,
          tag: credDefTag,
          did: did,
        }
        return definitionBody
      }
      const body = createBody(schemaId, persona)
      post(
        fetchOrigin,
        path,
        params,
        body,
        () => {},
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )
  return [error, onStartFetch]
}
