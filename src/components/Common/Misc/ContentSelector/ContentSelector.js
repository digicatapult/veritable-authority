/**
 * This function is responsible for rendering the content of the Agent
 * @returns The ContentWrap component.
 */
import ContentWrap from '../../../AgentAuthority/ContentWrap'

export default function ContentSelector({ children, status, origin }) {
  return (
    <>
      {children && children}
      {!children && status !== 'fetched' && (
        <div className="py-4 my-4">&nbsp;</div>
      )}
      {!children && status === 'fetched' && <ContentWrap origin={origin} />}
    </>
  )
}
