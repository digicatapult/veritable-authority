import { useEffect, useState } from 'react'
import { AUTHORITY_LABEL, LICENSE_SCHEMA_NAME } from '../../../utils/env.js'

import useIssueLicense from '../../../interface/hooks/use-issue-license'
import useGetLoopedPresentProofRecords from '../../../interface/hooks/use-get-looped-present-proof-records'
import useGetCredDefinitionsCreated from '../../../interface/hooks/use-get-cred-definitions-created'
import usePostSchemas from '../../../interface/hooks/use-post-schemas'
import usePostCredentialDefinitions from '../../../interface/hooks/use-post-credential-definitions'

import Error from '../../Common/Misc/Error'

export default function IssueLicense({ origin }) {
  const [licenseCredDefId, setLicenseCredDefId] = useState('')
  const [, errorIssue, startIssueLicense] = useIssueLicense()
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetLoopedPresentProofRecords()
  const [errorDefinitionsCreated, startFetchHandlerDefinitionsCreated] =
    useGetCredDefinitionsCreated()

  const [errorPostSchema, startPostSchema] = usePostSchemas()
  const [errorPostCredDefs, startPostCredDef] = usePostCredentialDefinitions()

  useEffect(() => {
    const issueLicenses = (proposals) => {
      proposals.forEach((proposal) => {
        if (licenseCredDefId) {
          startIssueLicense(origin, proposal, licenseCredDefId)
        }
      })
    }

    const intervalIdFetch = startGetRecordsHandler(
      origin,
      'proposal-received',
      issueLicenses
    )
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [
    origin,
    statusRecords,
    startGetRecordsHandler,
    licenseCredDefId,
    startIssueLicense,
  ])

  useEffect(() => {
    startFetchHandlerDefinitionsCreated(origin, (credDefIds) => {
      const licenseCredDefId = credDefIds.find((credDefId) =>
        credDefId.includes(LICENSE_SCHEMA_NAME)
      )
      if (licenseCredDefId) {
        setLicenseCredDefId(licenseCredDefId)
      } else {
        startPostSchema(origin, LICENSE_SCHEMA_NAME, (schemaId) => {
          startPostCredDef(
            origin,
            schemaId,
            AUTHORITY_LABEL,
            setLicenseCredDefId
          )
        })
      }
    })
  }, [
    origin,
    startFetchHandlerDefinitionsCreated,
    startPostSchema,
    startPostCredDef,
    setLicenseCredDefId,
  ])

  return (
    <>
      <Error
        errors={[
          errorRecords,
          errorIssue,
          errorDefinitionsCreated,
          errorPostSchema,
          errorPostCredDefs,
        ]}
      />
    </>
  )
}
