/**
 * Polls for presentation proof proposals, then requests and verifies proofs.
 * Finally issues a license and deletes the proof
 */
import { useState, useCallback } from 'react'
import delay from 'delay'
import moment from 'moment'

import usePostPresentProofSendRequest from './use-post-present-proof-send-request'
import useGetPresentProofRecord from './use-get-present-proof-records'
import usePostIssueCredentialSendOffer from './use-post-issue-credential-send-offer'
import useDeleteRecord from './use-delete-record'

export default function useIssueLicense() {
  const [inflight, setInflight] = useState(new Set())
  const [status, setStatus] = useState('')
  const [timeoutError, setTimeoutError] = useState(null)

  const [statusRequest, errorRequest, postRequest] =
    usePostPresentProofSendRequest()
  const [statusDelete, errorDelete, deleteRecord] = useDeleteRecord()
  const [statusRecords, errorRecords, getRecord] = useGetPresentProofRecord()
  const [statusIssueCred, errorIssueCred, postCredOffer] =
    usePostIssueCredentialSendOffer()

  const postRequestP = useCallback(
    (origin, proposal) =>
      new Promise((resolve) => {
        postRequest(
          origin,
          proposal.pres_proposal.comment,
          proposal.connection_id,
          proposal.by_format.pres_proposal.indy,
          moment().format('YYYY-MM-DD'),
          (data) => {
            resolve(data)
          }
        )
      }),
    [postRequest]
  )

  const deleteRecordP = useCallback(
    (origin, presExId) =>
      new Promise((resolve) => {
        deleteRecord(origin, presExId, () => {
          resolve()
        })
      }),
    [deleteRecord]
  )

  const getRecordP = useCallback(
    (origin, presExId) =>
      new Promise((resolve) => {
        getRecord(origin, presExId, (data) => {
          resolve(data)
        })
      }),
    [getRecord]
  )

  const postCredOfferP = useCallback(
    (origin, verifiedRecord, licenseCredDefId) =>
      new Promise((resolve) => {
        const attr =
          verifiedRecord.by_format.pres.indy.requested_proof.revealed_attrs
        const expiry = moment().add(2, 'years').format('YYYYMMDD')

        postCredOffer(
          origin,
          verifiedRecord.connection_id,
          licenseCredDefId,
          attr['0_id_uuid'].raw,
          attr['0_type_uuid'].raw,
          expiry,
          verifiedRecord.pres_request.comment,
          (data) => {
            resolve(data)
          }
        )
      }),
    [postCredOffer]
  )

  const waitForVerifiedRecord = useCallback(
    async (origin, requestPresExId) => {
      let i = 0
      const retryCount = 10
      for (; i < retryCount; i++) {
        const record = await getRecordP(origin, requestPresExId)
        if (record?.state === 'done') {
          return record
        }
        await delay(3000)
      }
      if (i === retryCount) {
        setTimeoutError('timeout')
        return null
      }
    },
    [getRecordP]
  )

  const onStartFetch = useCallback(
    async (origin, proposal, licenseCredDefId) => {
      if (!inflight.has(proposal.pres_ex_id)) {
        setInflight((prev) => new Set(prev.add(proposal.pres_ex_id)))

        const requestPresExId = await postRequestP(origin, proposal)
        await deleteRecordP(origin, proposal.pres_ex_id)
        const verified = await waitForVerifiedRecord(origin, requestPresExId)
        if (!verified) return
        const licenseId = await postCredOfferP(
          origin,
          verified,
          licenseCredDefId
        )
        await deleteRecordP(origin, verified.pres_ex_id)

        setInflight(
          (prev) => new Set([...prev].filter((id) => id != proposal.pres_ex_id))
        )
        setStatus('done')
        return licenseId
      }
    },
    [
      inflight,
      postRequestP,
      deleteRecordP,
      waitForVerifiedRecord,
      postCredOfferP,
    ]
  )

  if (
    statusRequest === 'error' ||
    statusRecords === 'error' ||
    statusIssueCred === 'error' ||
    statusDelete === 'error'
  ) {
    setStatus('error')
  }

  return [
    status,
    errorRequest ||
      errorRecords ||
      errorIssueCred ||
      errorDelete ||
      timeoutError,
    onStartFetch,
  ]
}
