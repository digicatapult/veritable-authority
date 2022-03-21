/**
 * Get or create the credential definitions for the
 * license issued by the authority
 */
import { useEffect } from 'react'

import { AUTHORITY_LABEL, LICENSE_SCHEMA_NAME } from '../../../utils/env.js'
import useGetCredDefinitionsCreated from '../../../interface/hooks/use-get-cred-definitions-created'
import usePostSchemas from '../../../interface/hooks/use-post-schemas'
import usePostCredentialDefinitions from '../../../interface/hooks/use-post-credential-definitions'
import Error from '../../Common/Misc/Error'

export default function LicenseCredDef({ origin, setLicenseCredDefId }) {
  const [errorDefinitionsCreated, startFetchHandlerDefinitionsCreated] =
    useGetCredDefinitionsCreated()

  const [errorPostSchema, startPostSchema] = usePostSchemas()
  const [errorPostCredDefs, startPostCredDef] = usePostCredentialDefinitions()

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
    <Error
      errors={[errorDefinitionsCreated, errorPostSchema, errorPostCredDefs]}
    />
  )
}
