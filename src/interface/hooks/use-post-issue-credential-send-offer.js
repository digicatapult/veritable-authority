/**
 * This function is used to send with POST a credential offer to the server
 */
import { useCallback, useState } from 'react'
import post from '../api/helpers/post'

export default function usePostIssueCredentialSendOffer() {
  const path = '/issue-credential-2.0/send-offer'
  const transformData = (retrievedData) => retrievedData.cred_ex_id
  const [error, setError] = useState(null)

  const convertToNameValueArr = (obj) => {
    const nameValueArr = []
    for (const [name, value] of Object.entries(obj)) {
      nameValueArr.push({ name, value })
    }
    return nameValueArr
  }

  const createBody = (connectionId, credDefId, id, type, expiry) => {
    const CRED_PREVIEW_TYPE =
      'https://didcomm.org/issue-credential/2.0/credential-preview'

    const getTimestamp = () => {
      const timestamp = new Date() / 1000
      return timestamp.toFixed()
    }

    const credAttrs = {
      id: id,
      type: type,
      expiration_dateint: expiry,
      timestamp: getTimestamp(),
    }

    return {
      connection_id: connectionId,
      comment: `Offer on cred def id ${credDefId}`,
      auto_remove: false,
      credential_preview: {
        '@type': CRED_PREVIEW_TYPE,
        attributes: convertToNameValueArr(credAttrs),
      },
      filter: { indy: { cred_def_id: credDefId } },
      trace: false,
    }
  }

  const onStartFetch = useCallback(
    (
      origin,
      connectionId,
      credDefId,
      id,
      type,
      expiry,
      setStoreStatus,
      setStoreData
    ) => {
      const params = {}
      const body = createBody(connectionId, credDefId, id, type, expiry)
      post(
        origin,
        path,
        params,
        body,
        setStoreStatus,
        setError,
        setStoreData,
        transformData
      )
    },
    []
  )
  return [error, onStartFetch]
}
